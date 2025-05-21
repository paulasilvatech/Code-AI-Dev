package com.enterprise.optimization.service;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.math.BigDecimal;

/**
 * Service for data processing operations using Java streams.
 * This implementation has several performance issues.
 */
public class DataProcessingService {

    /**
     * Process transaction data to calculate total amount by category.
     * Inefficient implementation using multiple stream operations.
     */
    public Map<String, BigDecimal> calculateTotalByCategory(List<Transaction> transactions) {
        Map<String, BigDecimal> result = new HashMap<>();
        
        // Filter valid transactions
        List<Transaction> validTransactions = transactions.stream()
            .filter(t -> t.getAmount().compareTo(BigDecimal.ZERO) > 0)
            .collect(Collectors.toList());
        
        // Get all categories
        List<String> categories = validTransactions.stream()
            .map(Transaction::getCategory)
            .distinct()
            .collect(Collectors.toList());
        
        // Calculate total for each category
        for (String category : categories) {
            BigDecimal total = validTransactions.stream()
                .filter(t -> t.getCategory().equals(category))
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            result.put(category, total);
        }
        
        return result;
    }
    
    /**
     * Find transactions that meet specific criteria.
     * Inefficient implementation with repeated streams.
     */
    public List<Transaction> findTransactionsByCriteria(List<Transaction> transactions, 
                                                       String merchant, 
                                                       LocalDate startDate, 
                                                       LocalDate endDate, 
                                                       BigDecimal minAmount) {
        // Filter by merchant
        List<Transaction> byMerchant = transactions.stream()
            .filter(t -> t.getMerchant().equalsIgnoreCase(merchant))
            .collect(Collectors.toList());
        
        // Filter by date range
        List<Transaction> byDateRange = byMerchant.stream()
            .filter(t -> !t.getDate().isBefore(startDate) && !t.getDate().isAfter(endDate))
            .collect(Collectors.toList());
        
        // Filter by minimum amount
        List<Transaction> result = byDateRange.stream()
            .filter(t -> t.getAmount().compareTo(minAmount) >= 0)
            .collect(Collectors.toList());
        
        return result;
    }
    
    /**
     * Group transactions by month and calculate monthly statistics.
     * Inefficient implementation with multiple iterations.
     */
    public List<MonthlyStatistics> calculateMonthlyStatistics(List<Transaction> transactions) {
        List<MonthlyStatistics> result = new ArrayList<>();
        
        // Get all year-months
        List<YearMonth> yearMonths = transactions.stream()
            .map(t -> new YearMonth(t.getDate().getYear(), t.getDate().getMonthValue()))
            .distinct()
            .collect(Collectors.toList());
        
        // Calculate statistics for each month
        for (YearMonth yearMonth : yearMonths) {
            List<Transaction> monthTransactions = transactions.stream()
                .filter(t -> t.getDate().getYear() == yearMonth.year && t.getDate().getMonthValue() == yearMonth.month)
                .collect(Collectors.toList());
            
            // Calculate total amount
            BigDecimal totalAmount = monthTransactions.stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            // Calculate average amount
            BigDecimal avgAmount = totalAmount.divide(BigDecimal.valueOf(monthTransactions.size()), 2, BigDecimal.ROUND_HALF_UP);
            
            // Find largest transaction
            Transaction largestTransaction = monthTransactions.stream()
                .max((t1, t2) -> t1.getAmount().compareTo(t2.getAmount()))
                .orElse(null);
            
            // Create monthly statistics
            MonthlyStatistics stats = new MonthlyStatistics();
            stats.yearMonth = yearMonth;
            stats.transactionCount = monthTransactions.size();
            stats.totalAmount = totalAmount;
            stats.averageAmount = avgAmount;
            stats.largestTransactionAmount = largestTransaction != null ? largestTransaction.getAmount() : BigDecimal.ZERO;
            
            result.add(stats);
        }
        
        return result;
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