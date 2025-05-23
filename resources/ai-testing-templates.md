# AI-Powered Testing Templates

Comprehensive templates and strategies for leveraging AI in your testing workflows.

## 🧪 Unit Testing with AI

### 1. AI-Generated Test Suite Template

```javascript
// Template for AI-assisted unit test generation
// Use GitHub Copilot with these prompts for best results

describe('UserService', () => {
  let userService;
  let mockDatabase;
  let mockLogger;

  beforeEach(() => {
    // TODO: Create mock dependencies
    // Requirements:
    // - Mock database with jest.fn() implementations
    // - Mock logger with all required methods
    // - Reset all mocks between tests
    
    mockDatabase = {
      query: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    };
    
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn()
    };
    
    userService = new UserService(mockDatabase, mockLogger);
  });

  describe('createUser', () => {
    // TODO: Generate comprehensive test cases for createUser method
    // Test scenarios needed:
    // 1. Happy path - valid user creation
    // 2. Duplicate email handling
    // 3. Invalid email format
    // 4. Missing required fields
    // 5. Database error handling
    // 6. Password hashing verification
    
    it('should create a user successfully with valid data', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User'
      };
      
      mockDatabase.query.mockResolvedValueOnce({ rows: [] }); // No existing user
      mockDatabase.insert.mockResolvedValueOnce({ 
        rows: [{ id: 1, ...userData, password: 'hashed_password' }] 
      });
      
      // Act
      const result = await userService.createUser(userData);
      
      // Assert
      expect(result).toHaveProperty('id');
      expect(result.email).toBe(userData.email);
      expect(result.password).not.toBe(userData.password); // Should be hashed
      expect(mockLogger.info).toHaveBeenCalledWith('User created', { userId: 1 });
    });

    // AI will generate additional test cases based on the TODO comments
  });

  describe('error scenarios', () => {
    // TODO: Generate error handling tests
    // Include:
    // - Network timeouts
    // - Database connection failures  
    // - Concurrent modification conflicts
    // - Transaction rollback scenarios
  });
});
```

### 2. Property-Based Testing Template

```python
# AI-enhanced property-based testing using Hypothesis

import hypothesis.strategies as st
from hypothesis import given, assume, settings, example
import pytest

class TestStringProcessor:
    """Property-based tests for string processing functions"""
    
    # TODO: Generate property-based tests for string reversal
    # Properties to verify:
    // - Reversing twice returns original
    // - Length is preserved
    // - Characters are in reverse order
    
    @given(st.text())
    def test_reverse_twice_returns_original(self, s):
        """Reversing a string twice should return the original"""
        assert reverse_string(reverse_string(s)) == s
    
    @given(st.text(min_size=1))
    def test_reverse_preserves_length(self, s):
        """Reversed string should have same length as original"""
        assert len(reverse_string(s)) == len(s)
    
    @given(st.text(min_size=2))
    @example("ab")  # Minimal example
    @example("racecar")  # Palindrome
    @example("Hello, World!")  # Special characters
    def test_reverse_first_last_swap(self, s):
        """First char becomes last, last becomes first"""
        reversed_s = reverse_string(s)
        assert reversed_s[0] == s[-1]
        assert reversed_s[-1] == s[0]
    
    # TODO: Generate property tests for URL slug generation
    // Properties:
    // - Output only contains allowed characters
    // - Idempotent (slugifying twice gives same result)
    // - No leading/trailing hyphens
    // - No consecutive hyphens
    
    @given(st.text(min_size=1, max_size=100))
    def test_slug_valid_characters(self, title):
        """Slug should only contain lowercase letters, numbers, and hyphens"""
        slug = generate_slug(title)
        assert all(c.islower() or c.isdigit() or c == '-' for c in slug)
    
    @given(st.text(min_size=1))
    def test_slug_idempotent(self, title):
        """Slugifying a slug should return the same slug"""
        slug1 = generate_slug(title)
        slug2 = generate_slug(slug1)
        assert slug1 == slug2
    
    // Stateful testing for complex scenarios
    @st.composite
    def user_actions(draw):
        """Generate realistic user action sequences"""
        action_type = draw(st.sampled_from(['create', 'update', 'delete']))
        user_id = draw(st.integers(min_value=1, max_value=1000))
        
        if action_type == 'create':
            return {
                'action': 'create',
                'data': {
                    'name': draw(st.text(min_size=1, max_size=50)),
                    'email': draw(st.emails()),
                    'age': draw(st.integers(min_value=0, max_value=150))
                }
            }
        elif action_type == 'update':
            return {
                'action': 'update',
                'user_id': user_id,
                'data': {'name': draw(st.text(min_size=1, max_size=50))}
            }
        else:
            return {'action': 'delete', 'user_id': user_id}
    
    @given(actions=st.lists(user_actions(), min_size=1, max_size=20))
    @settings(max_examples=100)
    def test_user_management_invariants(self, actions):
        """Test system invariants hold across action sequences"""
        system = UserManagementSystem()
        
        for action in actions:
            if action['action'] == 'create':
                user = system.create_user(**action['data'])
                // Invariant: Created users have unique IDs
                assert user.id not in [u.id for u in system.get_all_users() if u.id != user.id]
            
            elif action['action'] == 'update':
                try:
                    system.update_user(action['user_id'], action['data'])
                except UserNotFoundError:
                    pass  // Expected for non-existent users
            
            elif action['action'] == 'delete':
                system.delete_user(action['user_id'])
        
        // System-wide invariants
        all_users = system.get_all_users()
        all_ids = [u.id for u in all_users]
        assert len(all_ids) == len(set(all_ids))  // No duplicate IDs
```

### 3. Mutation Testing Template

```java
// AI-assisted mutation testing configuration

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.pitest.mutationtest.config.ReportOptions;
import static org.junit.jupiter.api.Assertions.*;

public class CalculatorMutationTest {
    private Calculator calculator;
    
    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }
    
    // TODO: Generate tests that kill all possible mutations
    // Mutation types to cover:
    // - Arithmetic operator replacement (+, -, *, /)
    // - Conditional boundary mutations (>, >=, <, <=)
    // - Increment/decrement mutations
    // - Return value mutations
    // - Void method call removal
    
    @Test
    void testAddition_KillsArithmeticMutations() {
        // This test should kill mutations that change + to -, *, /
        assertEquals(5, calculator.add(2, 3));
        assertEquals(0, calculator.add(0, 0));
        assertEquals(-1, calculator.add(-3, 2));
        assertEquals(Integer.MAX_VALUE, 
            calculator.add(Integer.MAX_VALUE - 1, 1));
    }
    
    @Test
    void testDivision_KillsBoundaryMutations() {
        // Test boundary conditions to kill >= to > mutations
        assertEquals(2, calculator.divide(4, 2));
        assertEquals(0, calculator.divide(0, 5));
        
        // Kill mutations in division by zero check
        assertThrows(ArithmeticException.class, 
            () -> calculator.divide(5, 0));
        
        // Ensure exactly 0 throws exception (not near 0)
        assertDoesNotThrow(() -> calculator.divide(5, 1));
    }
    
    @Test
    void testIsPositive_KillsConditionalMutations() {
        // Kill mutations changing > to >=, <, <=
        assertTrue(calculator.isPositive(1));
        assertFalse(calculator.isPositive(0));  // Critical: 0 is not positive
        assertFalse(calculator.isPositive(-1));
        
        // Edge cases
        assertTrue(calculator.isPositive(Integer.MAX_VALUE));
        assertFalse(calculator.isPositive(Integer.MIN_VALUE));
    }
    
    // Pitest configuration
    /*
    <plugin>
        <groupId>org.pitest</groupId>
        <artifactId>pitest-maven</artifactId>
        <configuration>
            <targetClasses>
                <param>com.example.Calculator</param>
            </targetClasses>
            <targetTests>
                <param>com.example.CalculatorMutationTest</param>
            </targetTests>
            <mutators>
                <mutator>ALL</mutator>
            </mutators>
            <mutationThreshold>100</mutationThreshold>
            <coverageThreshold>100</coverageThreshold>
        </configuration>
    </plugin>
    */
}
```

## 🔄 Integration Testing with AI

### 4. API Integration Test Template

```typescript
// AI-enhanced API integration testing

import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

// TODO: Generate comprehensive API test scenarios
// Include:
// - Happy path CRUD operations
// - Error responses (400, 401, 403, 404, 500)
// - Rate limiting behavior
// - Pagination edge cases
// - Concurrent request handling

test.describe('User API Integration Tests', () => {
  let apiContext;
  let authToken;
  
  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    // Authenticate once for all tests
    const authResponse = await apiContext.post('/auth/login', {
      data: {
        username: process.env.TEST_USER,
        password: process.env.TEST_PASSWORD
      }
    });
    
    const authData = await authResponse.json();
    authToken = authData.token;
  });
  
  test.describe('CRUD Operations', () => {
    let createdUserId;
    
    test('should create a new user', async () => {
      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: 'user'
      };
      
      const response = await apiContext.post('/api/users', {
        headers: { 'Authorization': `Bearer ${authToken}` },
        data: userData
      });
      
      expect(response.status()).toBe(201);
      
      const responseData = await response.json();
      expect(responseData).toMatchObject({
        id: expect.any(String),
        ...userData,
        createdAt: expect.any(String)
      });
      
      createdUserId = responseData.id;
    });
    
    test('should handle duplicate email gracefully', async () => {
      const userData = {
        name: faker.person.fullName(),
        email: 'existing@example.com', // Assume this exists
        role: 'user'
      };
      
      const response = await apiContext.post('/api/users', {
        headers: { 'Authorization': `Bearer ${authToken}` },
        data: userData
      });
      
      expect(response.status()).toBe(409);
      
      const error = await response.json();
      expect(error).toMatchObject({
        error: 'DUPLICATE_EMAIL',
        message: expect.stringContaining('already exists')
      });
    });
    
    // TODO: Generate tests for:
    // - GET /api/users with various query parameters
    // - PUT /api/users/:id with partial updates
    // - DELETE /api/users/:id with cascade behavior
    // - Bulk operations
  });
  
  test.describe('Error Scenarios', () => {
    test('should return 401 for unauthorized requests', async () => {
      const response = await apiContext.get('/api/users');
      expect(response.status()).toBe(401);
    });
    
    test('should return 404 for non-existent resources', async () => {
      const response = await apiContext.get('/api/users/non-existent-id', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      
      expect(response.status()).toBe(404);
      const error = await response.json();
      expect(error.error).toBe('NOT_FOUND');
    });
    
    test('should handle malformed requests', async () => {
      const response = await apiContext.post('/api/users', {
        headers: { 'Authorization': `Bearer ${authToken}` },
        data: { invalid: 'data' }
      });
      
      expect(response.status()).toBe(400);
      const error = await response.json();
      expect(error.errors).toBeDefined();
    });
  });
  
  test.describe('Performance and Limits', () => {
    test('should respect rate limiting', async () => {
      const requests = Array(150).fill(null).map(() => 
        apiContext.get('/api/users', {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
      );
      
      const responses = await Promise.all(requests);
      const rateLimited = responses.filter(r => r.status() === 429);
      
      expect(rateLimited.length).toBeGreaterThan(0);
      
      // Check rate limit headers
      const limitedResponse = rateLimited[0];
      expect(limitedResponse.headers()['x-ratelimit-limit']).toBeDefined();
      expect(limitedResponse.headers()['x-ratelimit-remaining']).toBe('0');
    });
    
    test('should handle pagination correctly', async () => {
      // Test first page
      const page1 = await apiContext.get('/api/users?page=1&limit=10', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      
      const data1 = await page1.json();
      expect(data1.data).toHaveLength(10);
      expect(data1.meta.currentPage).toBe(1);
      expect(data1.meta.hasNextPage).toBe(true);
      
      // Test last page behavior
      const lastPage = await apiContext.get(
        `/api/users?page=${data1.meta.totalPages}&limit=10`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      
      const dataLast = await lastPage.json();
      expect(dataLast.meta.hasNextPage).toBe(false);
    });
  });
});
```

### 5. Database Integration Test Template

```python
# AI-powered database integration testing

import pytest
import asyncio
from sqlalchemy import create_engine, pool
from sqlalchemy.orm import sessionmaker
import asyncpg
from testcontainers.postgres import PostgresContainer

class TestDatabaseIntegration:
    """Comprehensive database integration tests with AI assistance"""
    
    @pytest.fixture(scope="session")
    def postgres_container():
        """Spin up a test database container"""
        with PostgresContainer("postgres:14") as postgres:
            yield postgres
    
    @pytest.fixture
    async def db_session(postgres_container):
        """Create isolated database session for each test"""
        # TODO: Generate database setup with proper isolation
        # Requirements:
        // - Each test gets a fresh schema
        // - Automatic rollback after test
        // - Connection pool management
        // - Proper cleanup
        
        engine = create_engine(
            postgres_container.get_connection_url(),
            poolclass=pool.NullPool  // Disable pooling for tests
        )
        
        // Create schema
        Base.metadata.create_all(engine)
        
        // Create session
        SessionLocal = sessionmaker(bind=engine)
        session = SessionLocal()
        
        yield session
        
        // Cleanup
        session.rollback()
        session.close()
        Base.metadata.drop_all(engine)
    
    @pytest.mark.asyncio
    async def test_concurrent_transactions(self, db_session):
        """Test database handles concurrent transactions correctly"""
        // TODO: Generate test for concurrent transaction handling
        // Scenarios:
        // - Optimistic locking
        // - Deadlock detection
        // - Transaction isolation levels
        
        async def update_balance(user_id, amount):
            async with db_session.begin():
                user = await db_session.get(User, user_id)
                user.balance += amount
                await db_session.commit()
        
        // Create test user
        user = User(name="Test User", balance=1000)
        db_session.add(user)
        await db_session.commit()
        
        // Simulate concurrent updates
        tasks = [
            update_balance(user.id, 100),
            update_balance(user.id, -50),
            update_balance(user.id, 200),
            update_balance(user.id, -150)
        ]
        
        // All updates should succeed
        await asyncio.gather(*tasks)
        
        // Verify final balance is correct
        db_session.refresh(user)
        assert user.balance == 1100  // 1000 + 100 - 50 + 200 - 150
    
    @pytest.mark.asyncio
    async def test_cascade_behaviors(self, db_session):
        """Test cascade delete and update behaviors"""
        // TODO: Generate comprehensive cascade tests
        // Test:
        // - ON DELETE CASCADE
        // - ON UPDATE CASCADE  
        // - RESTRICT behaviors
        // - SET NULL behaviors
        
        // Create parent and children
        parent = Parent(name="Parent")
        children = [
            Child(name=f"Child {i}", parent=parent) 
            for i in range(3)
        ]
        
        db_session.add(parent)
        db_session.add_all(children)
        await db_session.commit()
        
        // Delete parent should cascade to children
        db_session.delete(parent)
        await db_session.commit()
        
        // Verify children are deleted
        remaining_children = db_session.query(Child).filter_by(
            parent_id=parent.id
        ).count()
        assert remaining_children == 0
    
    @pytest.mark.asyncio
    async def test_migration_compatibility(self, db_session):
        """Test database migrations maintain compatibility"""
        // TODO: Generate migration compatibility tests
        // Verify:
        // - Forward migrations work
        // - Rollback migrations work
        // - Data integrity maintained
        // - No breaking changes
        
        from alembic import command
        from alembic.config import Config
        
        alembic_cfg = Config("alembic.ini")
        
        // Downgrade to base
        command.downgrade(alembic_cfg, "base")
        
        // Apply all migrations
        command.upgrade(alembic_cfg, "head")
        
        // Verify schema is correct
        inspector = inspect(db_session.bind)
        tables = inspector.get_table_names()
        
        assert "users" in tables
        assert "orders" in tables
        
        // Verify constraints exist
        user_constraints = inspector.get_unique_constraints("users")
        assert any(c["name"] == "uq_users_email" for c in user_constraints)
```

## 🎭 End-to-End Testing with AI

### 6. E2E Test Automation Template

```javascript
// AI-enhanced E2E testing with Playwright

import { test, expect } from '@playwright/test';
import { generateTestData } from './test-data-generator';

// TODO: Generate comprehensive E2E test scenarios
// Cover:
// - Complete user journeys
// - Cross-browser compatibility
// - Mobile responsiveness
// - Performance metrics
// - Accessibility compliance

test.describe('E-commerce User Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Set up test data and initial state
    await page.addInitScript(() => {
      // Mock payment gateway in tests
      window.PAYMENT_GATEWAY_URL = 'http://localhost:4000/mock-payment';
    });
  });
  
  test('complete purchase flow from browse to checkout', async ({ page, browserName }) => {
    // Test data generation with AI
    const testUser = generateTestData.user();
    const paymentMethod = generateTestData.creditCard();
    
    // 1. Browse products
    await test.step('Browse and search products', async () => {
      await page.goto('/');
      
      // AI-powered visual regression test
      await expect(page).toHaveScreenshot(`homepage-${browserName}.png`, {
        fullPage: true,
        animations: 'disabled'
      });
      
      // Search for product
      await page.fill('[data-testid="search-input"]', 'laptop');
      await page.press('[data-testid="search-input"]', 'Enter');
      
      // Wait for results
      await expect(page.locator('[data-testid="product-card"]')).toHaveCount(
        { min: 1, max: 20 }
      );
    });
    
    // 2. Add to cart
    await test.step('Add product to cart', async () => {
      // Select first product
      const firstProduct = page.locator('[data-testid="product-card"]').first();
      const productName = await firstProduct.locator('h3').textContent();
      const productPrice = await firstProduct.locator('[data-testid="price"]').textContent();
      
      await firstProduct.click();
      
      // Product detail page
      await expect(page.locator('h1')).toContainText(productName);
      
      // Add to cart
      await page.click('[data-testid="add-to-cart"]');
      
      // Verify cart updated
      await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
    });
    
    // 3. Checkout process
    await test.step('Complete checkout', async () => {
      await page.goto('/cart');
      
      // Verify cart contents
      await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1);
      
      // Proceed to checkout
      await page.click('[data-testid="checkout-button"]');
      
      // Fill shipping information
      await page.fill('[data-testid="shipping-name"]', testUser.name);
      await page.fill('[data-testid="shipping-email"]', testUser.email);
      await page.fill('[data-testid="shipping-address"]', testUser.address);
      await page.fill('[data-testid="shipping-city"]', testUser.city);
      await page.fill('[data-testid="shipping-zip"]', testUser.zipCode);
      
      // Continue to payment
      await page.click('[data-testid="continue-to-payment"]');
      
      // Fill payment information
      await page.fill('[data-testid="card-number"]', paymentMethod.number);
      await page.fill('[data-testid="card-expiry"]', paymentMethod.expiry);
      await page.fill('[data-testid="card-cvv"]', paymentMethod.cvv);
      
      // Place order
      await page.click('[data-testid="place-order"]');
      
      // Wait for confirmation
      await expect(page.locator('[data-testid="order-confirmation"]')).toBeVisible();
      const orderId = await page.locator('[data-testid="order-id"]').textContent();
      
      expect(orderId).toMatch(/^ORD-\d{10}$/);
    });
  });
  
  test('handles errors gracefully', async ({ page }) => {
    // TODO: Generate error scenario tests
    // Test:
    // - Network failures
    // - Invalid inputs
    // - Session timeouts
    // - Payment failures
    
    await test.step('Payment failure recovery', async () => {
      // Set up payment to fail
      await page.route('**/api/payment/process', route => {
        route.fulfill({
          status: 400,
          body: JSON.stringify({
            error: 'INSUFFICIENT_FUNDS',
            message: 'Payment declined due to insufficient funds'
          })
        });
      });
      
      // Navigate to checkout with items in cart
      await page.goto('/checkout');
      
      // Fill and submit payment
      await page.fill('[data-testid="card-number"]', '4111111111111111');
      await page.click('[data-testid="place-order"]');
      
      // Verify error handling
      await expect(page.locator('[data-testid="error-message"]')).toContainText(
        'Payment declined'
      );
      
      // Verify user can retry
      await expect(page.locator('[data-testid="retry-payment"]')).toBeVisible();
    });
  });
  
  test('accessibility compliance', async ({ page }) => {
    // TODO: Generate comprehensive accessibility tests
    // Check:
    // - WCAG 2.1 AA compliance
    // - Keyboard navigation
    // - Screen reader compatibility
    // - Color contrast
    
    await page.goto('/');
    
    // Automated accessibility scan
    const accessibilityScanResults = await page.accessibility.snapshot();
    
    // Check for violations
    const violations = await page.evaluate(() => {
      return window.axe.run();
    });
    
    expect(violations.violations).toHaveLength(0);
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('data-testid', 'skip-to-content');
    
    // Test with screen reader
    // Note: Requires additional setup
  });
});
```

## 🤖 AI Test Data Generation

### 7. Smart Test Data Generator

```typescript
// AI-powered test data generation

import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

// TODO: Generate intelligent test data factories
// Requirements:
// - Realistic data relationships
// - Edge case generation
// - Locale-specific data
// - Stateful sequences

class TestDataGenerator {
  private userIdCounter = 1000;
  private orderIdCounter = 5000;
  
  // User factory with realistic constraints
  userFactory = Factory.define(({ sequence, params, transientParams }) => {
    const age = params.age || faker.number.int({ min: 18, max: 90 });
    const isMinor = age < 18;
    
    return {
      id: sequence,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: this.generateSecurePassword(),
      profile: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: age,
        phone: faker.phone.number(),
        address: this.generateAddress(params.country),
        preferences: {
          newsletter: !isMinor,
          marketing: !isMinor && faker.datatype.boolean(),
          language: params.language || 'en'
        }
      },
      accountType: isMinor ? 'restricted' : params.accountType || 'standard',
      createdAt: faker.date.past(),
      isVerified: !isMinor && faker.datatype.boolean({ probability: 0.8 })
    };
  });
  
  // Order factory with business logic
  orderFactory = Factory.define(({ sequence, params, associations }) => {
    const items = params.items || this.generateOrderItems();
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 100 ? 0 : 9.99;
    
    return {
      id: `ORD-${String(sequence).padStart(10, '0')}`,
      userId: associations.user?.id || faker.number.int({ min: 1, max: 1000 }),
      items: items,
      pricing: {
        subtotal: subtotal,
        tax: tax,
        shipping: shipping,
        total: subtotal + tax + shipping
      },
      status: this.generateOrderStatus(params.daysOld),
      shippingAddress: associations.user?.profile.address || this.generateAddress(),
      paymentMethod: this.generatePaymentMethod(),
      createdAt: faker.date.recent({ days: params.daysOld || 30 }),
      expectedDelivery: this.calculateDeliveryDate(params.daysOld)
    };
  });
  
  // Generate realistic passwords
  private generateSecurePassword(): string {
    const length = faker.number.int({ min: 12, max: 20 });
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    
    // Ensure at least one of each required character type
    password += faker.helpers.arrayElement('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    password += faker.helpers.arrayElement('abcdefghijklmnopqrstuvwxyz'.split(''));
    password += faker.helpers.arrayElement('0123456789'.split(''));
    password += faker.helpers.arrayElement('!@#$%^&*'.split(''));
    
    // Fill rest randomly
    for (let i = password.length; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    // Shuffle password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
  
  // Generate contextual addresses
  private generateAddress(country?: string) {
    const selectedCountry = country || faker.location.country();
    
    return {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: selectedCountry === 'United States' ? faker.location.state() : faker.location.county(),
      postalCode: faker.location.zipCode(),
      country: selectedCountry
    };
  }
  
  // Generate order items with relationships
  private generateOrderItems() {
    const itemCount = faker.number.int({ min: 1, max: 5 });
    const categories = ['electronics', 'clothing', 'books', 'home', 'sports'];
    
    return Array.from({ length: itemCount }, () => {
      const category = faker.helpers.arrayElement(categories);
      
      return {
        productId: faker.string.uuid(),
        name: this.generateProductName(category),
        category: category,
        price: this.generatePrice(category),
        quantity: faker.number.int({ min: 1, max: 3 }),
        sku: `${category.toUpperCase()}-${faker.string.alphanumeric(8)}`
      };
    });
  }
  
  // Category-specific product names
  private generateProductName(category: string): string {
    const productNames = {
      electronics: ['Laptop', 'Smartphone', 'Headphones', 'Tablet', 'Smart Watch'],
      clothing: ['T-Shirt', 'Jeans', 'Jacket', 'Shoes', 'Hat'],
      books: ['Novel', 'Textbook', 'Comic Book', 'Magazine', 'E-book'],
      home: ['Lamp', 'Chair', 'Table', 'Rug', 'Curtains'],
      sports: ['Basketball', 'Tennis Racket', 'Yoga Mat', 'Dumbbells', 'Running Shoes']
    };
    
    const baseName = faker.helpers.arrayElement(productNames[category] || ['Item']);
    const brand = faker.company.name();
    
    return `${brand} ${baseName}`;
  }
  
  // Realistic pricing by category
  private generatePrice(category: string): number {
    const priceRanges = {
      electronics: { min: 50, max: 2000 },
      clothing: { min: 10, max: 200 },
      books: { min: 5, max: 50 },
      home: { min: 20, max: 500 },
      sports: { min: 15, max: 300 }
    };
    
    const range = priceRanges[category] || { min: 10, max: 100 };
    return parseFloat(faker.commerce.price(range));
  }
  
  // Generate payment methods with validation
  private generatePaymentMethod() {
    const type = faker.helpers.arrayElement(['credit_card', 'debit_card', 'paypal', 'apple_pay']);
    
    if (type === 'credit_card' || type === 'debit_card') {
      return {
        type: type,
        last4: faker.string.numeric(4),
        brand: faker.helpers.arrayElement(['Visa', 'Mastercard', 'Amex', 'Discover']),
        expiryMonth: faker.number.int({ min: 1, max: 12 }),
        expiryYear: faker.number.int({ min: 2024, max: 2030 })
      };
    }
    
    return { type: type };
  }
  
  // Generate contextual data sets
  generateScenarioData(scenario: string) {
    switch (scenario) {
      case 'black_friday':
        return {
          users: this.userFactory.buildList(100, {
            isVerified: true,
            accountType: 'premium'
          }),
          orders: this.orderFactory.buildList(500, {
            daysOld: 1,
            items: this.generateOrderItems().map(item => ({
              ...item,
              price: item.price * 0.5 // 50% off
            }))
          })
        };
      
      case 'new_user_onboarding':
        return {
          user: this.userFactory.build({
            isVerified: false,
            createdAt: new Date()
          }),
          welcomeEmail: this.generateWelcomeEmail(),
          tutorialProgress: this.generateTutorialProgress()
        };
      
      case 'abandoned_cart':
        const user = this.userFactory.build();
        return {
          user: user,
          cart: {
            userId: user.id,
            items: this.generateOrderItems(),
            abandonedAt: faker.date.recent({ days: 3 }),
            remindersSent: faker.number.int({ min: 0, max: 2 })
          }
        };
      
      default:
        return null;
    }
  }
}

// Usage
const generator = new TestDataGenerator();

// Generate single entities
const user = generator.userFactory.build();
const order = generator.orderFactory.build({ user });

// Generate scenarios
const blackFridayData = generator.generateScenarioData('black_friday');

// Generate with specific constraints
const minorUser = generator.userFactory.build({ age: 16 });
const europeanUser = generator.userFactory.build({ country: 'Germany' });

export { TestDataGenerator };
```

## 🔍 Performance Testing with AI

### 8. Load Testing Template

```python
# AI-enhanced load testing with Locust

from locust import HttpUser, task, between, events
from locust.env import Environment
from locust.stats import stats_printer, stats_history
import random
import json
import time

class AIOptimizedLoadTest(HttpUser):
    """AI-powered load testing that adapts based on system behavior"""
    
    wait_time = between(1, 3)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.auth_token = None
        self.user_data = self.generate_user_data()
        
    def on_start(self):
        """Authenticate before starting tasks"""
        # TODO: Generate authentication flow
        # Handle different auth methods:
        # - Basic auth
        # - OAuth2
        # - JWT tokens
        # - API keys
        
        response = self.client.post("/auth/login", json={
            "username": self.user_data["username"],
            "password": self.user_data["password"]
        })
        
        if response.status_code == 200:
            self.auth_token = response.json()["token"]
            self.client.headers.update({"Authorization": f"Bearer {self.auth_token}"})
        else:
            self.environment.runner.quit()
    
    @task(3)
    def browse_products(self):
        """Simulate product browsing behavior"""
        # AI-generated realistic browsing patterns
        categories = ["electronics", "clothing", "books", "home"]
        category = random.choice(categories)
        
        # Browse category
        with self.client.get(
            f"/api/products?category={category}&page=1&limit=20",
            catch_response=True
        ) as response:
            if response.status_code == 200:
                products = response.json()["products"]
                
                # Simulate viewing individual products
                if products:
                    product = random.choice(products)
                    self.client.get(f"/api/products/{product['id']}")
                    
                    # Occasionally add to cart
                    if random.random() < 0.3:
                        self.add_to_cart(product["id"])
            else:
                response.failure(f"Got status code {response.status_code}")
    
    @task(2)
    def search_products(self):
        """Simulate search behavior with realistic queries"""
        # TODO: Generate realistic search queries
        # Include:
        # - Common search terms
        # - Typos and corrections
        # - Filter combinations
        # - Sort options
        
        search_terms = [
            "laptop",
            "gaming laptop",  
            "laptop under 1000",
            "macbook pro 16",
            "best laptop 2024"
        ]
        
        query = random.choice(search_terms)
        filters = self.generate_search_filters()
        
        self.client.get(
            f"/api/search?q={query}&{filters}",
            name="/api/search?q=[query]"  # Group statistics
        )
    
    @task(1)
    def checkout_flow(self):
        """Simulate complete checkout process"""
        # Only proceed if cart has items
        cart_response = self.client.get("/api/cart")
        
        if cart_response.status_code == 200:
            cart = cart_response.json()
            
            if cart["items"]:
                # Shipping information
                shipping_data = self.generate_shipping_data()
                shipping_response = self.client.post(
                    "/api/checkout/shipping",
                    json=shipping_data
                )
                
                if shipping_response.status_code == 200:
                    # Payment information
                    payment_data = self.generate_payment_data()
                    payment_response = self.client.post(
                        "/api/checkout/payment",
                        json=payment_data
                    )
                    
                    if payment_response.status_code == 200:
                        # Place order
                        order_response = self.client.post("/api/checkout/place-order")
                        
                        if order_response.status_code == 201:
                            order_id = order_response.json()["orderId"]
                            # Track order
                            self.client.get(f"/api/orders/{order_id}")
    
    def add_to_cart(self, product_id):
        """Add item to cart with realistic quantity"""
        quantity = random.choices([1, 2, 3, 4, 5], weights=[50, 30, 15, 4, 1])[0]
        
        self.client.post("/api/cart/items", json={
            "productId": product_id,
            "quantity": quantity
        })
    
    def generate_user_data(self):
        """Generate realistic user data for testing"""
        # TODO: Create diverse user profiles
        # Include:
        # - Different geographic locations
        # - Various user types (new, returning, premium)
        # - Different device types
        # - Varying connection speeds
        
        return {
            "username": f"loadtest_user_{random.randint(1000, 9999)}",
            "password": "LoadTest123!",
            "profile": {
                "location": random.choice(["US", "EU", "ASIA"]),
                "userType": random.choice(["new", "returning", "premium"]),
                "device": random.choice(["desktop", "mobile", "tablet"])
            }
        }
    
    def generate_search_filters(self):
        """Generate realistic search filter combinations"""
        filters = []
        
        # Price range
        if random.random() < 0.4:
            min_price = random.choice([0, 50, 100, 500])
            max_price = min_price + random.choice([50, 100, 500, 1000])
            filters.append(f"price_min={min_price}&price_max={max_price}")
        
        # Brand
        if random.random() < 0.3:
            brand = random.choice(["Apple", "Samsung", "Sony", "Dell", "HP"])
            filters.append(f"brand={brand}")
        
        # Rating
        if random.random() < 0.2:
            min_rating = random.choice([3, 4, 4.5])
            filters.append(f"rating_min={min_rating}")
        
        return "&".join(filters)
    
    def generate_shipping_data(self):
        """Generate realistic shipping information"""
        return {
            "fullName": f"Test User {random.randint(1000, 9999)}",
            "address": f"{random.randint(1, 999)} Main Street",
            "city": random.choice(["New York", "Los Angeles", "Chicago", "Houston"]),
            "state": random.choice(["NY", "CA", "IL", "TX"]),
            "zipCode": f"{random.randint(10000, 99999)}",
            "phone": f"555-{random.randint(100, 999)}-{random.randint(1000, 9999)}"
        }
    
    def generate_payment_data(self):
        """Generate test payment information"""
        return {
            "method": random.choice(["credit_card", "paypal", "apple_pay"]),
            "testMode": True,
            "token": "test_token_" + str(random.randint(100000, 999999))
        }

# Custom event handlers for AI-powered analysis
@events.request.add_listener
def on_request(request_type, name, response_time, response_length, exception, **kwargs):
    """Analyze request patterns and adapt test behavior"""
    if exception:
        # Log errors for AI analysis
        print(f"Request failed: {name} - {exception}")
        
    if response_time > 5000:  # 5 seconds
        # Flag slow endpoints for investigation
        print(f"Slow endpoint detected: {name} took {response_time}ms")

@events.test_start.add_listener
def on_test_start(environment, **kwargs):
    """Initialize AI monitoring"""
    print("Starting AI-optimized load test")
    print(f"Target host: {environment.host}")
    print(f"Total users: {environment.runner.target_user_count}")

# AI-powered test scenarios
class ScenarioRunner:
    """Run different load test scenarios based on AI recommendations"""
    
    @staticmethod
    def run_scenario(scenario_name, host, users, spawn_rate, run_time):
        """Execute a specific load test scenario"""
        
        scenarios = {
            "normal_traffic": {
                "users": users,
                "spawn_rate": spawn_rate,
                "run_time": run_time
            },
            "black_friday": {
                "users": users * 10,
                "spawn_rate": spawn_rate * 5,
                "run_time": run_time,
                "tasks": ["browse_products", "add_to_cart", "checkout_flow"]
            },
            "flash_sale": {
                "users": users * 20,
                "spawn_rate": users * 2,  # Rapid spike
                "run_time": 300,  # 5 minutes
                "tasks": ["checkout_flow"]  # Everyone trying to buy
            },
            "gradual_ramp": {
                "users": users,
                "spawn_rate": 1,  # Slow ramp up
                "run_time": run_time * 2,
                "step_load": True,
                "step_users": 10,
                "step_time": 60
            }
        }
        
        scenario = scenarios.get(scenario_name, scenarios["normal_traffic"])
        
        # Configure and run
        env = Environment(user_classes=[AIOptimizedLoadTest])
        env.create_local_runner()
        
        # Start test
        env.runner.start(
            scenario["users"], 
            spawn_rate=scenario["spawn_rate"]
        )
        
        # Run for specified time
        env.runner.greenlet.join(timeout=scenario["run_time"])
        
        # Generate report
        stats = env.stats
        print("\n=== Load Test Results ===")
        print(f"Total requests: {stats.total.num_requests}")
        print(f"Failed requests: {stats.total.num_failures}")
        print(f"Average response time: {stats.total.avg_response_time}ms")
        print(f"RPS: {stats.total.current_rps}")

# Usage
if __name__ == "__main__":
    runner = ScenarioRunner()
    runner.run_scenario("black_friday", "https://api.example.com", 100, 10, 600)
```

## 🎯 Best Practices

1. **Test Naming Convention**
   - Use descriptive names that explain what is being tested
   - Include the scenario and expected outcome
   - Group related tests logically

2. **Test Data Management**
   - Use factories for consistent test data
   - Separate test data from test logic
   - Clean up test data after execution

3. **AI Prompt Optimization**
   - Be specific about test requirements
   - Include edge cases in prompts
   - Review and refine generated tests

4. **Continuous Improvement**
   - Monitor test execution metrics
   - Update tests based on failures
   - Keep tests synchronized with code changes

5. **Performance Considerations**
   - Run tests in parallel when possible
   - Use test containers for isolation
   - Optimize database queries in tests
``` 