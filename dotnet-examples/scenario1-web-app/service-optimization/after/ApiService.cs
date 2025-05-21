using System;
using System.Buffers;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace Enterprise.Web.Services
{
    /// <summary>
    /// Service for handling API data processing.
    /// This implementation demonstrates optimized performance techniques.
    /// 
    /// GitHub Copilot Agent Autonomous Mode:
    /// To use with Copilot Agent, instruct it to: "Analyze this service for performance
    /// bottlenecks and optimize it for high-throughput API scenarios."
    /// </summary>
    public class ApiService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;
        private readonly ILogger<ApiService> _logger;
        
        // Optimized: Static JsonSerializerOptions to avoid recreating it
        private static readonly JsonSerializerOptions _jsonOptions = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = false
        };

        public ApiService(HttpClient httpClient, IMemoryCache cache, ILogger<ApiService> logger)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _cache = cache ?? throw new ArgumentNullException(nameof(cache));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <summary>
        /// Process large data arrays.
        /// Optimized implementation using StringBuilder and Span.
        /// </summary>
        public string ProcessLargeData(string[] data)
        {
            if (data == null || data.Length == 0)
            {
                return string.Empty;
            }
            
            _logger.LogInformation("Processing {Count} data items", data.Length);
            
            // Optimized: Pre-calculating capacity to avoid reallocations
            int estimatedCapacity = data.Sum(s => s.Length) + data.Length - 1;
            var sb = new StringBuilder(estimatedCapacity);
            
            // Optimized: Efficient iteration and string building
            for (int i = 0; i < data.Length; i++)
            {
                sb.Append(data[i]);
                
                // Avoid adding comma after the last item
                if (i < data.Length - 1)
                {
                    sb.Append(',');
                }
            }
            
            return sb.ToString();
        }
        
        /// <summary>
        /// Fetch and transform data from external API.
        /// Optimized implementation with proper async/await and caching.
        /// </summary>
        public async Task<IReadOnlyList<ProductDto>> GetProductsAsync(
            string category, 
            CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrEmpty(category))
            {
                throw new ArgumentException("Category cannot be null or empty", nameof(category));
            }
            
            _logger.LogInformation("Fetching products for category: {Category}", category);
            
            // Optimized: Proper cache key generation and usage
            var cacheKey = $"products:{category}";
            
            // Optimized: Using GetOrCreateAsync for thread-safe caching
            return await _cache.GetOrCreateAsync(cacheKey, async entry =>
            {
                entry.SetAbsoluteExpiration(TimeSpan.FromMinutes(15));
                entry.SetSlidingExpiration(TimeSpan.FromMinutes(5));
                
                try
                {
                    // Optimized: Proper async/await usage
                    using var response = await _httpClient.GetAsync(
                        $"api/products?category={Uri.EscapeDataString(category)}", 
                        cancellationToken);
                    
                    // Optimized: Proper status code handling
                    response.EnsureSuccessStatusCode();
                    
                    // Optimized: Async content reading
                    using var contentStream = await response.Content.ReadAsStreamAsync(cancellationToken);
                    
                    // Optimized: Deserializing directly from stream
                    var products = await JsonSerializer.DeserializeAsync<List<ProductDto>>(
                        contentStream, 
                        _jsonOptions,
                        cancellationToken);
                    
                    // Optimized: Single LINQ query with proper deferred execution
                    var result = products
                        .Where(p => p.Price > 0 && p.IsActive)
                        .OrderBy(p => p.Name)
                        .ToArray(); // Materialize once
                    
                    return result;
                }
                catch (HttpRequestException ex)
                {
                    _logger.LogError(ex, "Error fetching products for category {Category}", category);
                    return Array.Empty<ProductDto>();
                }
            });
        }
        
        /// <summary>
        /// Transform product data to JSON.
        /// Optimized implementation with efficient serialization.
        /// </summary>
        public string TransformProductsToJson(IReadOnlyList<ProductDto> products)
        {
            if (products == null || products.Count == 0)
            {
                return "{}";
            }
            
            _logger.LogInformation("Transforming {Count} products to JSON", products.Count);
            
            // Optimized: Using proper serialization instead of manual string building
            return JsonSerializer.Serialize(
                products.ToDictionary(p => p.Id.ToString(), p => p),
                _jsonOptions);
        }
        
        /// <summary>
        /// Process large data with minimal allocations.
        /// New optimized method showing advanced memory techniques.
        /// </summary>
        public void ProcessLargeDataMinimalAlloc(ReadOnlySpan<string> data, IBufferWriter<char> output)
        {
            if (data.IsEmpty)
            {
                return;
            }
            
            _logger.LogInformation("Processing {Count} data items with minimal allocations", data.Length);
            
            // Optimized: Working directly with spans to minimize allocations
            for (int i = 0; i < data.Length; i++)
            {
                ReadOnlySpan<char> item = data[i];
                
                // Get a span from the buffer writer to write directly into
                Span<char> buffer = output.GetSpan(item.Length + 1);
                
                // Copy the string data directly to the buffer
                item.CopyTo(buffer);
                
                // Add comma if not the last item
                if (i < data.Length - 1)
                {
                    buffer[item.Length] = ',';
                    output.Advance(item.Length + 1);
                }
                else
                {
                    output.Advance(item.Length);
                }
            }
        }
        
        /// <summary>
        /// Asynchronously stream products by category.
        /// New optimized method showing streaming capabilities.
        /// </summary>
        public async IAsyncEnumerable<ProductDto> StreamProductsAsync(
            string category,
            [EnumeratorCancellation] CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrEmpty(category))
            {
                yield break;
            }
            
            _logger.LogInformation("Streaming products for category: {Category}", category);
            
            try
            {
                using var response = await _httpClient.GetAsync(
                    $"api/products?category={Uri.EscapeDataString(category)}",
                    HttpCompletionOption.ResponseHeadersRead, // Optimized: Don't buffer entire response
                    cancellationToken);
                
                response.EnsureSuccessStatusCode();
                
                using var contentStream = await response.Content.ReadAsStreamAsync(cancellationToken);
                
                // Optimized: Stream JSON elements without loading everything into memory
                await foreach (var product in JsonSerializer.DeserializeAsyncEnumerable<ProductDto>(
                    contentStream, 
                    _jsonOptions, 
                    cancellationToken))
                {
                    if (product != null && product.Price > 0 && product.IsActive)
                    {
                        yield return product;
                    }
                }
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Error streaming products for category {Category}", category);
                yield break;
            }
        }
    }
    
    /// <summary>
    /// Data transfer object for products
    /// </summary>
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Category { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
} 