package com.enterprise.optimization.service;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.math.BigDecimal;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;

/**
 * Service for data processing operations using optimized Java streams.
 * This implementation demonstrates best practices for efficient stream processing.
 * 
 * GitHub Copilot Agent Autonomous Mode:
 * To use with Copilot Agent, instruct it to: "Analyze this class for stream performance
 * bottlenecks and suggest improvements for handling large transaction volumes."
 */
public class DataProcessingService {

    /**
     * Process transaction data to calculate total amount by category.
     * Optimized implementation using a single stream operation with groupingBy collector.
     */
    public Map<String, BigDecimal> calculateTotalByCategory(List<Transaction> transactions) {
        if (transactions == null || transactions.isEmpty()) {
            return new HashMap<>();
        }
        
        // Single stream operation with collectors for better performance
        return transactions.stream()
            .filter(t -> t.getAmount().compareTo(BigDecimal.ZERO) > 0) // Filter valid transactions
            .collect(Collectors.groupingBy(
                Transaction::getCategory,
                Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)
            ));
    }
    
    /**
     * Find transactions that meet specific criteria.
     * Optimized implementation using a single stream with multiple filters.
     */
    public List<Transaction> findTransactionsByCriteria(List<Transaction> transactions, 
                                                       String merchant, 
                                                       LocalDate startDate, 
                                                       LocalDate endDate, 
                                                       BigDecimal minAmount) {
        if (transactions == null || transactions.isEmpty()) {
            return new ArrayList<>();
        }
        
        // Using a single stream with all filters combined
        return transactions.stream()
            .filter(t -> t.getMerchant().equalsIgnoreCase(merchant))
            .filter(t -> !t.getDate().isBefore(startDate) && !t.getDate().isAfter(endDate))
            .filter(t -> t.getAmount().compareTo(minAmount) >= 0)
            .collect(Collectors.toList());
    }
    
    /**
     * Group transactions by month and calculate monthly statistics.
     * Optimized implementation with efficient collectors and reduced object creation.
     */
    public List<MonthlyStatistics> calculateMonthlyStatistics(List<Transaction> transactions) {
        if (transactions == null || transactions.isEmpty()) {
            return new ArrayList<>();
        }
        
        // Create a reusable YearMonth function to avoid creating duplicate objects
        Function<Transaction, YearMonth> yearMonthExtractor = 
            t -> new YearMonth(t.getDate().getYear(), t.getDate().getMonthValue());
        
        // Using advanced groupingBy collector with downstream collectors
        Map<YearMonth, List<Transaction>> transactionsByMonth = transactions.stream()
            .collect(Collectors.groupingBy(yearMonthExtractor));
        
        // Process each month's statistics in a more efficient manner
        return transactionsByMonth.entrySet().stream()
            .map(entry -> {
                YearMonth yearMonth = entry.getKey();
                List<Transaction> monthTransactions = entry.getValue();
                
                // Calculate all statistics in a single stream pass
                MonthlyStatistics stats = new MonthlyStatistics();
                stats.yearMonth = yearMonth;
                stats.transactionCount = monthTransactions.size();
                
                // Get total and find largest transaction in a single pass using custom collector
                MonthlyStats monthlyStats = monthTransactions.stream()
                    .collect(
                        // Initial result supplier
                        () -> new MonthlyStats(BigDecimal.ZERO, null),
                        // Accumulator
                        (result, transaction) -> {
                            // Add amount to total
                            result.total = result.total.add(transaction.getAmount());
                            
                            // Update max transaction if needed
                            if (result.max == null || 
                                transaction.getAmount().compareTo(result.max.getAmount()) > 0) {
                                result.max = transaction;
                            }
                        },
                        // Combiner (for parallel streams)
                        (result1, result2) -> {
                            result1.total = result1.total.add(result2.total);
                            if (result1.max == null ||
                                (result2.max != null && 
                                 result2.max.getAmount().compareTo(result1.max.getAmount()) > 0)) {
                                result1.max = result2.max;
                            }
                        }
                    );
                
                stats.totalAmount = monthlyStats.total;
                stats.largestTransactionAmount = 
                    monthlyStats.max != null ? monthlyStats.max.getAmount() : BigDecimal.ZERO;
                
                // Calculate average amount
                if (stats.transactionCount > 0) {
                    stats.averageAmount = stats.totalAmount
                        .divide(BigDecimal.valueOf(stats.transactionCount), 2, BigDecimal.ROUND_HALF_UP);
                } else {
                    stats.averageAmount = BigDecimal.ZERO;
                }
                
                return stats;
            })
            .collect(Collectors.toList());
    }
    
    /**
     * Process transactions in parallel for large datasets.
     * Uses parallel streams with appropriate safeguards.
     */
    public Map<String, BigDecimal> calculateTotalByCategoryParallel(List<Transaction> transactions) {
        if (transactions == null || transactions.isEmpty()) {
            return new HashMap<>();
        }
        
        // For large datasets, parallel streams can provide performance benefits
        return transactions.parallelStream()
            .filter(t -> t.getAmount().compareTo(BigDecimal.ZERO) > 0)
            .collect(Collectors.groupingByConcurrent(
                Transaction::getCategory,
                Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)
            ));
    }
    
    /**
     * Filter unique transactions using a stateful predicate.
     * Uses a more efficient approach to remove duplicates.
     */
    public List<Transaction> filterUniqueTransactions(List<Transaction> transactions) {
        if (transactions == null || transactions.isEmpty()) {
            return new ArrayList<>();
        }
        
        // Create a stateful predicate to track seen IDs
        Predicate<Transaction> distinctById = 
            distinctByKey(Transaction::getId);
        
        // Filter transactions keeping only the first occurrence of each ID
        return transactions.stream()
            .filter(distinctById)
            .collect(Collectors.toList());
    }
    
    /**
     * Helper method to create a stateful predicate for distinct filtering by key.
     */
    private static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
        Map<Object, Boolean> seen = new ConcurrentHashMap<>();
        return t -> seen.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
    }
    
    /**
     * Helper class for collecting monthly statistics in a single pass
     */
    private static class MonthlyStats {
        BigDecimal total;
        Transaction max;
        
        MonthlyStats(BigDecimal total, Transaction max) {
            this.total = total;
            this.max = max;
        }
    }
    
    /**
     * Transaction class for the example
     */
    public static class Transaction {
        private String id;
        private LocalDate date;
        private BigDecimal amount;
        private String merchant;
        private String category;
        
        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public LocalDate getDate() { return date; }
        public void setDate(LocalDate date) { this.date = date; }
        
        public BigDecimal getAmount() { return amount; }
        public void setAmount(BigDecimal amount) { this.amount = amount; }
        
        public String getMerchant() { return merchant; }
        public void setMerchant(String merchant) { this.merchant = merchant; }
        
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
    }
    
    /**
     * Year-Month helper class
     */
    public static class YearMonth {
        public int year;
        public int month;
        
        public YearMonth(int year, int month) {
            this.year = year;
            this.month = month;
        }
        
        @Override
        public boolean equals(Object obj) {
            if (!(obj instanceof YearMonth)) return false;
            YearMonth other = (YearMonth) obj;
            return this.year == other.year && this.month == other.month;
        }
        
        @Override
        public int hashCode() {
            return 31 * year + month;
        }
    }
    
    /**
     * Monthly statistics class
     */
    public static class MonthlyStatistics {
        public YearMonth yearMonth;
        public int transactionCount;
        public BigDecimal totalAmount;
        public BigDecimal averageAmount;
        public BigDecimal largestTransactionAmount;
    }
} 