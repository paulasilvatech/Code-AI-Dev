using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace Enterprise.DataProcessing.Services
{
    /// <summary>
    /// Service for data processing operations using LINQ.
    /// This implementation has several performance issues.
    /// </summary>
    public class DataProcessingService
    {
        private readonly ILogger<DataProcessingService> _logger;

        public DataProcessingService(ILogger<DataProcessingService> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Process transaction data to calculate total amount by category.
        /// Inefficient implementation using multiple LINQ operations.
        /// </summary>
        public Dictionary<string, decimal> CalculateTotalByCategory(List<Transaction> transactions)
        {
            var result = new Dictionary<string, decimal>();
            
            // Filter valid transactions
            var validTransactions = transactions
                .Where(t => t.Amount > 0)
                .ToList();
            
            // Get all categories
            var categories = validTransactions
                .Select(t => t.Category)
                .Distinct()
                .ToList();
            
            // Calculate total for each category
            foreach (var category in categories)
            {
                var total = validTransactions
                    .Where(t => t.Category == category)
                    .Sum(t => t.Amount);
                
                result.Add(category, total);
            }
            
            return result;
        }
        
        /// <summary>
        /// Find transactions that meet specific criteria.
        /// Inefficient implementation with repeated LINQ queries.
        /// </summary>
        public List<Transaction> FindTransactionsByCriteria(List<Transaction> transactions, 
                                                          string merchant, 
                                                          DateTime startDate, 
                                                          DateTime endDate, 
                                                          decimal minAmount)
        {
            // Filter by merchant
            var byMerchant = transactions
                .Where(t => t.Merchant.Equals(merchant, StringComparison.OrdinalIgnoreCase))
                .ToList();
            
            // Filter by date range
            var byDateRange = byMerchant
                .Where(t => t.Date >= startDate && t.Date <= endDate)
                .ToList();
            
            // Filter by minimum amount
            var result = byDateRange
                .Where(t => t.Amount >= minAmount)
                .ToList();
            
            return result;
        }
        
        /// <summary>
        /// Group transactions by month and calculate monthly statistics.
        /// Inefficient implementation with multiple iterations.
        /// </summary>
        public List<MonthlyStatistics> CalculateMonthlyStatistics(List<Transaction> transactions)
        {
            var result = new List<MonthlyStatistics>();
            
            // Get all year-months
            var yearMonths = transactions
                .Select(t => new { Year = t.Date.Year, Month = t.Date.Month })
                .Distinct()
                .ToList();
            
            // Calculate statistics for each month
            foreach (var yearMonth in yearMonths)
            {
                var monthTransactions = transactions
                    .Where(t => t.Date.Year == yearMonth.Year && t.Date.Month == yearMonth.Month)
                    .ToList();
                
                // Calculate total amount
                var totalAmount = monthTransactions.Sum(t => t.Amount);
                
                // Calculate average amount
                var avgAmount = monthTransactions.Average(t => t.Amount);
                
                // Find largest transaction
                var largestTransaction = monthTransactions
                    .OrderByDescending(t => t.Amount)
                    .FirstOrDefault();
                
                // Create monthly statistics
                var stats = new MonthlyStatistics
                {
                    Year = yearMonth.Year,
                    Month = yearMonth.Month,
                    TransactionCount = monthTransactions.Count,
                    TotalAmount = totalAmount,
                    AverageAmount = avgAmount,
                    LargestTransactionAmount = largestTransaction?.Amount ?? 0
                };
                
                result.Add(stats);
            }
            
            return result;
        }
        
        /// <summary>
        /// Process a large list of orders.
        /// Inefficient implementation with multiple expensive operations.
        /// </summary>
        public List<OrderSummary> ProcessOrders(List<Order> orders)
        {
            // Process each order and create a summary
            var orderSummaries = new List<OrderSummary>();
            
            foreach (var order in orders)
            {
                // Get items for this order
                var orderItems = order.Items;
                
                // Calculate total price
                decimal totalPrice = 0;
                foreach (var item in orderItems)
                {
                    totalPrice += item.Price * item.Quantity;
                }
                
                // Calculate discount
                decimal discount = 0;
                if (totalPrice > 1000)
                {
                    discount = totalPrice * 0.1m; // 10% discount for orders over $1000
                }
                else if (totalPrice > 500)
                {
                    discount = totalPrice * 0.05m; // 5% discount for orders over $500
                }
                
                // Count items by category
                var categoryCounts = new Dictionary<string, int>();
                foreach (var item in orderItems)
                {
                    if (categoryCounts.ContainsKey(item.Category))
                    {
                        categoryCounts[item.Category] += item.Quantity;
                    }
                    else
                    {
                        categoryCounts.Add(item.Category, item.Quantity);
                    }
                }
                
                // Get top category
                string topCategory = null;
                int maxCount = 0;
                foreach (var kvp in categoryCounts)
                {
                    if (kvp.Value > maxCount)
                    {
                        maxCount = kvp.Value;
                        topCategory = kvp.Key;
                    }
                }
                
                // Create and add summary
                var summary = new OrderSummary
                {
                    OrderId = order.OrderId,
                    CustomerId = order.CustomerId,
                    OrderDate = order.OrderDate,
                    ItemCount = orderItems.Sum(i => i.Quantity),
                    TotalAmount = totalPrice,
                    Discount = discount,
                    NetAmount = totalPrice - discount,
                    TopCategory = topCategory
                };
                
                orderSummaries.Add(summary);
            }
            
            return orderSummaries;
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