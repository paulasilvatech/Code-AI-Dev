# Prompt Engineering Templates for GitHub Copilot

Master the art of writing effective prompts to get the best results from GitHub Copilot.

## 🎯 Core Prompt Patterns

### 1. The Context-Action-Constraint Pattern

```javascript
// Context: What you're working on
// Action: What you want to achieve
// Constraint: Any limitations or requirements

// Example:
// Context: Building an e-commerce shopping cart
// Action: Create a function to calculate total price with tax
// Constraint: Support multiple tax rates by region, handle discounts

function calculateTotalPrice(items, region, discountCode) {
  // Copilot will generate implementation considering all constraints
}
```

### 2. The Input-Process-Output Pattern

```python
# Pattern: Define clear input, processing logic, and expected output

# TODO: Create a data transformation function
# Input: List of user objects with nested addresses
# Process: Flatten the structure and extract key fields
# Output: List of simplified user records with concatenated address
# Example Input: [{"name": "John", "address": {"street": "123 Main", "city": "NYC"}}]
# Example Output: [{"name": "John", "full_address": "123 Main, NYC"}]

def transform_user_data(users):
    # Copilot will implement based on the clear specification
    pass
```

### 3. The Problem-Solution-Example Pattern

```java
// Problem: Need to validate credit card numbers
// Solution: Implement Luhn algorithm validation
// Example: 
//   - Valid: 4532015112830366
//   - Invalid: 1234567890123456

public boolean isValidCreditCard(String cardNumber) {
    // TODO: Implement Luhn algorithm to validate credit card
    // Steps:
    // 1. Remove spaces and validate format
    // 2. Apply Luhn algorithm
    // 3. Return validation result
}
```

## 📝 Specific Use Case Templates

### 4. API Endpoint Generation

```typescript
// TODO: Create REST API endpoint for user management
// Method: POST
// Path: /api/users
// Request Body: {
//   "username": "string",
//   "email": "string",
//   "password": "string",
//   "role": "admin" | "user"
// }
// Response: {
//   "id": "uuid",
//   "username": "string",
//   "email": "string",
//   "role": "string",
//   "createdAt": "ISO-8601"
// }
// Requirements:
// - Validate email format
// - Hash password before storage
// - Generate unique ID
// - Return 201 on success, 400 on validation error
```

### 5. Database Query Generation

```sql
-- TODO: Create a complex query to analyze user behavior
-- Tables: users, orders, products
-- Requirements:
-- - Find top 10 customers by total spending in last 30 days
-- - Include customer name, email, total orders, total amount
-- - Only include customers with at least 3 orders
-- - Sort by total amount descending

-- Expected columns: customer_name, email, order_count, total_spent
```

### 6. Algorithm Implementation

```python
# TODO: Implement binary search tree with the following operations
# Operations needed:
# - insert(value): Add new node maintaining BST property
# - search(value): Return True if value exists, False otherwise
# - delete(value): Remove node and reorganize tree
# - inorder_traversal(): Return sorted list of values
# 
# Constraints:
# - Handle duplicate values by ignoring them
# - Implement iterative versions where possible
# - Include proper error handling

class BinarySearchTree:
    # Copilot will implement complete BST with all operations
    pass
```

## 🔧 Advanced Prompt Techniques

### 7. Multi-Step Process Prompts

```javascript
// TODO: Implement a multi-step data processing pipeline
// Step 1: Validate input data format
// Step 2: Clean and normalize data
// Step 3: Apply business logic transformations
// Step 4: Generate summary statistics
// Step 5: Format output for API response

// Input format: Array of raw transaction objects
// Output format: Processed summary with statistics

async function processTransactionPipeline(rawTransactions) {
  // Step 1: Validation
  // Check required fields: id, amount, date, type
  
  // Step 2: Cleaning
  // Remove duplicates, fix date formats, convert currencies
  
  // Step 3: Business Logic
  // Apply tax calculations, categorize transactions
  
  // Step 4: Statistics
  // Calculate totals, averages, trends
  
  // Step 5: Formatting
  // Structure response according to API specification
}
```

### 8. Error Handling Templates

```csharp
// TODO: Add comprehensive error handling to file processing function
// Error scenarios to handle:
// - File not found
// - Insufficient permissions
// - Corrupted file format
// - Network timeout (for remote files)
// - Disk space issues
// 
// Requirements:
// - Use specific exception types
// - Log errors with context
// - Provide user-friendly error messages
// - Implement retry logic for transient failures
// - Clean up resources in finally block

public async Task<ProcessingResult> ProcessFileAsync(string filePath) {
    // Copilot will add comprehensive error handling
}
```

### 9. Performance Optimization Prompts

```java
// TODO: Optimize this method for processing millions of records
// Current performance: 100 records/second
// Target performance: 10,000 records/second
// 
// Optimization hints:
// - Use parallel processing
// - Implement batch operations
// - Minimize object creation
// - Use efficient data structures
// - Consider memory-mapped files for large datasets

public List<ProcessedRecord> processLargeDataset(List<RawRecord> records) {
    // Current slow implementation
    return records.stream()
        .map(this::expensiveTransformation)
        .collect(Collectors.toList());
}
```

## 🎨 Code Generation Patterns

### 10. Builder Pattern Template

```typescript
// TODO: Generate a fluent builder for complex configuration object
// Class: DatabaseConfiguration
// Properties:
// - host: string (required)
// - port: number (default: 5432)
// - username: string (required)
// - password: string (required)
// - database: string (required)
// - ssl: boolean (default: true)
// - poolSize: number (default: 10)
// - timeout: number (default: 30000)
// 
// Requirements:
// - Fluent interface (method chaining)
// - Validation in build() method
// - Throw error if required fields missing
// - Immutable configuration object

class DatabaseConfigurationBuilder {
    // Copilot will generate complete builder pattern
}
```

### 11. Test Generation Templates

```python
# TODO: Generate comprehensive unit tests for the Calculator class
# Test categories:
# 1. Basic operations (add, subtract, multiply, divide)
# 2. Edge cases (division by zero, overflow, underflow)
# 3. Decimal precision handling
# 4. Negative number operations
# 5. Chain operations
# 
# Use pytest framework with:
# - Fixtures for calculator setup
# - Parametrized tests for multiple inputs
# - Clear test names following given_when_then pattern
# - Assertions with helpful error messages

import pytest
from calculator import Calculator

class TestCalculator:
    # Copilot will generate comprehensive test suite
    pass
```

### 12. Documentation Generation

```javascript
/**
 * TODO: Generate JSDoc documentation for this complex function
 * Include:
 * - Detailed description of algorithm
 * - @param with type and description for each parameter
 * - @returns with type and description
 * - @throws for possible exceptions
 * - @example with 2-3 usage examples
 * - @since version information
 * - @see related functions or documentation
 */
function optimizedSortWithFilter(data, filterFn, sortKey, options = {}) {
    // Complex implementation here
}
```

## 🚀 Prompt Optimization Tips

### 13. Iterative Refinement Template

```java
// Initial prompt:
// TODO: Create a method to process user data

// Better prompt:
// TODO: Create a method to validate and transform user registration data

// Best prompt:
// TODO: Create a method to validate and transform user registration data
// Input: Raw user registration form data (Map<String, Object>)
// Validation rules:
// - Email: Valid format and not already registered
// - Password: Minimum 8 characters, at least one number and special character
// - Age: Must be 18 or older
// - Username: Alphanumeric, 3-20 characters, unique
// 
// Transformations:
// - Trim all string fields
// - Lowercase email
// - Hash password using bcrypt
// - Generate unique user ID
// 
// Return: ValidatedUser object or throw ValidationException with details
```

### 14. Context-Aware Prompts

```python
# When working in an existing codebase, reference existing patterns:

# TODO: Create a new repository class for Order entity
# Follow the same pattern as UserRepository:
# - Inherit from BaseRepository
# - Implement standard CRUD operations
# - Use the same error handling approach
# - Include logging as in other repositories
# - Add custom methods: findByCustomerId, findByDateRange
# - Use existing database connection pool
# - Follow project naming conventions

class OrderRepository(BaseRepository):
    # Copilot will follow established patterns
    pass
```

### 15. Constraint-Heavy Prompts

```typescript
// TODO: Implement rate limiter middleware
// Constraints:
// - Max 100 requests per minute per IP
// - Max 1000 requests per hour per API key
// - Use Redis for distributed state
// - Return 429 status with Retry-After header
// - Implement sliding window algorithm
// - Exempt certain IPs (whitelist)
// - Different limits for different endpoints
// - Graceful degradation if Redis unavailable
// 
// Middleware signature: (req, res, next) => void
```

## 📋 Prompt Checklists

### Before Writing a Prompt:
- [ ] Define clear objective
- [ ] Identify inputs and outputs
- [ ] List constraints and requirements
- [ ] Provide examples when helpful
- [ ] Reference existing patterns
- [ ] Specify error handling needs
- [ ] Include performance requirements

### Prompt Quality Checklist:
- [ ] Is the intent clear?
- [ ] Are all requirements specified?
- [ ] Are edge cases mentioned?
- [ ] Is the expected output format clear?
- [ ] Are there example inputs/outputs?
- [ ] Are constraints realistic?
- [ ] Is the scope appropriate?

## 🎯 Common Prompt Improvements

| ❌ Weak Prompt | ✅ Strong Prompt |
|----------------|------------------|
| "Create a login function" | "Create a secure login function that validates email/password, implements rate limiting, uses bcrypt for password verification, and returns a JWT token" |
| "Sort this array" | "Sort array of objects by 'createdAt' date property in descending order, handling null values by placing them at the end" |
| "Add error handling" | "Add try-catch blocks for network errors, validate input parameters, log errors with context, and return user-friendly error messages" |
| "Make this faster" | "Optimize this function to handle 1M+ records using parallel processing, batch operations, and efficient data structures" |

## 🚀 Next Steps

1. **Practice** these patterns in your daily coding
2. **Experiment** with variations to find what works best
3. **Document** successful prompts for team reuse
4. **Share** effective patterns with colleagues
5. **Iterate** and refine based on results 