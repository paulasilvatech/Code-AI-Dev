using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace Enterprise.Web.Services
{
    /// <summary>
    /// Service for handling API data processing.
    /// This implementation contains several performance issues.
    /// </summary>
    public class ApiService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;
        private readonly ILogger<ApiService> _logger;

        public ApiService(HttpClient httpClient, IMemoryCache cache, ILogger<ApiService> logger)
        {
            _httpClient = httpClient;
            _cache = cache;
            _logger = logger;
        }

        /// <summary>
        /// Process large data arrays.
        /// Inefficient implementation with unnecessary allocations.
        /// </summary>
        public string ProcessLargeData(string[] data)
        {
            _logger.LogInformation("Processing {Count} data items", data.Length);
            
            // Inefficient: Creating many intermediate string objects
            string result = "";
            foreach (var item in data)
            {
                // Inefficient string concatenation
                result += item + ",";
            }
            
            // Inefficient string manipulation
            if (result.EndsWith(","))
            {
                result = result.Substring(0, result.Length - 1);
            }
            
            return result;
        }
        
        /// <summary>
        /// Fetch and transform data from external API.
        /// Inefficient implementation with blocking calls and poor error handling.
        /// </summary>
        public async Task<List<ProductDto>> GetProductsAsync(string category)
        {
            _logger.LogInformation("Fetching products for category: {Category}", category);
            
            // Inefficient: Not using caching effectively
            var cacheKey = "products_" + category;
            
            // Inefficient: Unnecessary synchronous call
            var response = _httpClient.GetAsync($"api/products?category={category}").Result;
            
            // Inefficient error handling
            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("Error fetching products: " + response.StatusCode);
                return new List<ProductDto>();
            }
            
            // Inefficient: Blocking call to read content
            var content = response.Content.ReadAsStringAsync().Result;
            
            // Inefficient: Creating unnecessary intermediate objects
            var products = JsonSerializer.Deserialize<List<ProductDto>>(content);
            
            // Inefficient: Creating unnecessary list
            var result = new List<ProductDto>();
            foreach (var product in products)
            {
                // Inefficient: Not filtering at the source
                if (product.Price > 0 && product.IsActive)
                {
                    result.Add(product);
                }
            }
            
            // Inefficient: Unnecessary processing
            result = result.OrderBy(p => p.Name).ToList();
            
            return result;
        }
        
        /// <summary>
        /// Transform product data to JSON.
        /// Inefficient implementation with poor memory usage.
        /// </summary>
        public string TransformProductsToJson(List<ProductDto> products)
        {
            _logger.LogInformation("Transforming {Count} products to JSON", products.Count);
            
            // Inefficient: Creating unnecessary intermediate representation
            var productDict = new Dictionary<string, object>();
            
            foreach (var product in products)
            {
                var productData = new Dictionary<string, object>
                {
                    { "id", product.Id },
                    { "name", product.Name },
                    { "price", product.Price },
                    { "category", product.Category },
                    { "isActive", product.IsActive }
                };
                
                productDict.Add(product.Id.ToString(), productData);
            }
            
            // Inefficient: Using string concatenation for JSON
            var result = "{";
            foreach (var kvp in productDict)
            {
                result += "\"" + kvp.Key + "\":{";
                var productData = (Dictionary<string, object>)kvp.Value;
                
                foreach (var prop in productData)
                {
                    result += "\"" + prop.Key + "\":";
                    
                    if (prop.Value is string)
                    {
                        result += "\"" + prop.Value + "\",";
                    }
                    else
                    {
                        result += prop.Value + ",";
                    }
                }
                
                // Inefficient: Removing trailing comma this way
                result = result.TrimEnd(',');
                result += "},";
            }
            
            // Inefficient string manipulation
            if (result.EndsWith(","))
            {
                result = result.Substring(0, result.Length - 1);
            }
            
            result += "}";
            
            return result;
        }
    }
    
    /// <summary>
    /// Data transfer object for products
    /// </summary>
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public bool IsActive { get; set; }
    }
} 