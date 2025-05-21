using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;

namespace Enterprise.DataProcessing.Services
{
    /// <summary>
    /// Service for data processing operations using optimized LINQ.
    /// This implementation demonstrates best practices for efficient LINQ usage.
    /// 
    /// GitHub Copilot Agent Autonomous Mode:
    /// To use with Copilot Agent, instruct it to: "Analyze this class for LINQ performance
    /// bottlenecks and suggest improvements for handling large datasets."
    /// </summary>
    public class DataProcessingService
    {
        private readonly ILogger<DataProcessingService> _logger;

        public DataProcessingService(ILogger<DataProcessingService> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <summary>
        /// Process transaction data to calculate total amount by category.
        /// Optimized implementation using GroupBy with aggregation.
        /// </summary>
        public Dictionary<string, decimal> CalculateTotalByCategory(IEnumerable<Transaction> transactions)
        {
            if (transactions == null || !transactions.Any())
            {
                return new Dictionary<string, decimal>();
            }
            
            // Single pass using GroupBy with aggregation
            return transactions
                .Where(t => t.Amount > 0)
                .GroupBy(t => t.Category)
                .ToDictionary(
                    g => g.Key,
                    g => g.Sum(t => t.Amount)
                );
        }
        
        /// <summary>
        /// Find transactions that meet specific criteria.
        /// Optimized implementation with a single LINQ query.
        /// </summary>
        public IReadOnlyList<Transaction> FindTransactionsByCriteria(IEnumerable<Transaction> transactions, 
                                                                   string merchant, 
                                                                   DateTime startDate, 
                                                                   DateTime endDate, 
                                                                   decimal minAmount)
        {
            if (transactions == null || !transactions.Any())
            {
                return Array.Empty<Transaction>();
            }
            
            // Single LINQ query combining all filters
            return transactions
                .Where(t => t.Merchant.Equals(merchant, StringComparison.OrdinalIgnoreCase) &&
                           t.Date >= startDate && t.Date <= endDate &&
                           t.Amount >= minAmount)
                .ToList();
        }
        
        /// <summary>
        /// Group transactions by month and calculate monthly statistics.
        /// Optimized implementation with efficient grouping.
        /// </summary>
        public IReadOnlyList<MonthlyStatistics> CalculateMonthlyStatistics(IEnumerable<Transaction> transactions)
        {
            if (transactions == null || !transactions.Any())
            {
                return Array.Empty<MonthlyStatistics>();
            }
            
            // Group by year and month with a single LINQ query
            return transactions
                .GroupBy(t => new { t.Date.Year, t.Date.Month })
                .Select(g => new MonthlyStatistics
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    TransactionCount = g.Count(),
                    TotalAmount = g.Sum(t => t.Amount),
                    AverageAmount = g.Average(t => t.Amount),
                    LargestTransactionAmount = g.Max(t => t.Amount)
                })
                .ToList();
        }
        
        /// <summary>
        /// Process a large list of orders using optimized LINQ.
        /// Efficiently processes orders in a single pass where possible.
        /// </summary>
        public IReadOnlyList<OrderSummary> ProcessOrders(IEnumerable<Order> orders)
        {
            if (orders == null || !orders.Any())
            {
                return Array.Empty<OrderSummary>();
            }
            
            return orders.Select(order =>
            {
                // Calculate total price and item count in one pass
                var orderItems = order.Items;
                var (totalPrice, itemCount) = orderItems.Aggregate(
                    (TotalPrice: 0m, ItemCount: 0),
                    (acc, item) => (
                        acc.TotalPrice + (item.Price * item.Quantity),
                        acc.ItemCount + item.Quantity
                    )
                );
                
                // Calculate discount
                var discount = totalPrice > 1000 ? totalPrice * 0.1m :
                               totalPrice > 500 ? totalPrice * 0.05m : 0m;
                
                // Find top category in one pass
                var topCategory = orderItems
                    .GroupBy(item => item.Category)
                    .Select(g => new { Category = g.Key, Count = g.Sum(i => i.Quantity) })
                    .OrderByDescending(x => x.Count)
                    .FirstOrDefault()?.Category;
                
                // Create summary
                return new OrderSummary
                {
                    OrderId = order.OrderId,
                    CustomerId = order.CustomerId,
                    OrderDate = order.OrderDate,
                    ItemCount = itemCount,
                    TotalAmount = totalPrice,
                    Discount = discount,
                    NetAmount = totalPrice - discount,
                    TopCategory = topCategory
                };
            }).ToList();
        }
        
        /// <summary>
        /// Process orders in parallel for large datasets.
        /// Uses Parallel LINQ (PLINQ) for better performance with large data sets.
        /// </summary>
        public IReadOnlyList<OrderSummary> ProcessOrdersParallel(IEnumerable<Order> orders, int minOrdersForParallel = 1000)
        {
            if (orders == null)
            {
                return Array.Empty<OrderSummary>();
            }
            
            // Convert to array once to avoid multiple enumeration
            var orderArray = orders as Order[] ?? orders.ToArray();
            
            // Only use parallel processing for large datasets
            if (orderArray.Length < minOrdersForParallel)
            {
                return ProcessOrders(orderArray);
            }
            
            // Use PLINQ for parallel processing
            return orderArray.AsParallel()
                .Select(order =>
                {
                    // Calculate total price and item count
                    var orderItems = order.Items;
                    var totalPrice = orderItems.Sum(item => item.Price * item.Quantity);
                    var itemCount = orderItems.Sum(item => item.Quantity);
                    
                    // Calculate discount
                    var discount = totalPrice > 1000 ? totalPrice * 0.1m :
                                  totalPrice > 500 ? totalPrice * 0.05m : 0m;
                    
                    // Find top category
                    var topCategory = orderItems
                        .GroupBy(item => item.Category)
                        .Select(g => new { Category = g.Key, Count = g.Sum(i => i.Quantity) })
                        .OrderByDescending(x => x.Count)
                        .FirstOrDefault()?.Category;
                    
                    // Create summary
                    return new OrderSummary
                    {
                        OrderId = order.OrderId,
                        CustomerId = order.CustomerId,
                        OrderDate = order.OrderDate,
                        ItemCount = itemCount,
                        TotalAmount = totalPrice,
                        Discount = discount,
                        NetAmount = totalPrice - discount,
                        TopCategory = topCategory
                    };
                })
                .ToList();
        }
        
        /// <summary>
        /// Process orders asynchronously, optimized for memory efficiency.
        /// </summary>
        public async Task<IReadOnlyList<OrderSummary>> ProcessOrdersAsync(IAsyncEnumerable<Order> orders)
        {
            var results = new ConcurrentBag<OrderSummary>();
            
            await foreach (var order in orders)
            {
                // Process each order individually
                var orderItems = order.Items;
                
                // Efficiently calculate order metrics
                decimal totalPrice = 0;
                int itemCount = 0;
                var categoryCounts = new Dictionary<string, int>();
                
                foreach (var item in orderItems)
                {
                    totalPrice += item.Price * item.Quantity;
                    itemCount += item.Quantity;
                    
                    if (!categoryCounts.TryAdd(item.Category, item.Quantity))
                    {
                        categoryCounts[item.Category] += item.Quantity;
                    }
                }
                
                // Calculate discount
                var discount = totalPrice > 1000 ? totalPrice * 0.1m :
                              totalPrice > 500 ? totalPrice * 0.05m : 0m;
                
                // Find top category
                var topCategory = categoryCounts
                    .OrderByDescending(kvp => kvp.Value)
                    .FirstOrDefault().Key;
                
                // Create summary
                var summary = new OrderSummary
                {
                    OrderId = order.OrderId,
                    CustomerId = order.CustomerId,
                    OrderDate = order.OrderDate,
                    ItemCount = itemCount,
                    TotalAmount = totalPrice,
                    Discount = discount,
                    NetAmount = totalPrice - discount,
                    TopCategory = topCategory
                };
                
                results.Add(summary);
            }
            
            return results.ToList();
        }
    }

    /// <summary>
    /// Transaction class for the example
    /// </summary>
    public class Transaction
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Merchant { get; set; }
        public string Category { get; set; }
    }
    
    /// <summary>
    /// Monthly statistics class
    /// </summary>
    public class MonthlyStatistics
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int TransactionCount { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal AverageAmount { get; set; }
        public decimal LargestTransactionAmount { get; set; }
    }
    
    /// <summary>
    /// Order class for the example
    /// </summary>
    public class Order
    {
        public string OrderId { get; set; }
        public string CustomerId { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
    
    /// <summary>
    /// Order item class
    /// </summary>
    public class OrderItem
    {
        public string ItemId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
    
    /// <summary>
    /// Order summary class
    /// </summary>
    public class OrderSummary
    {
        public string OrderId { get; set; }
        public string CustomerId { get; set; }
        public DateTime OrderDate { get; set; }
        public int ItemCount { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal Discount { get; set; }
        public decimal NetAmount { get; set; }
        public string TopCategory { get; set; }
    }
} 