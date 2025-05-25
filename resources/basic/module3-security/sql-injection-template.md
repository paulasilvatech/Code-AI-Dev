# 🔒 Module 3: SQL Injection Prevention Exercise Template

## 🎯 Exercise Goal
Learn to identify and fix SQL injection vulnerabilities using AI assistance.

## ⚠️ Vulnerable Code Examples

### Java - UNSAFE
```java
// ❌ VULNERABLE: SQL Injection risk
String query = "SELECT * FROM users WHERE username = '" + username + "'";
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(query);
```

### C# - UNSAFE
```csharp
// ❌ VULNERABLE: SQL Injection risk
string query = $"SELECT * FROM users WHERE username = '{username}'";
using var command = new SqlCommand(query, connection);
using var reader = command.ExecuteReader();
```

## 🚨 Attack Examples
```sql
-- Malicious inputs that would break vulnerable code:
username = "admin' OR '1'='1"
username = "'; DROP TABLE users; --"
username = "' UNION SELECT password FROM admin_users --"
```

## 🤖 AI Security Analysis Prompt
```
Analyze this code for SQL injection vulnerabilities.
Show how an attacker could exploit it.
Provide a secure version using parameterized queries.
```

## ✅ Secure Code Solutions

### Java - Parameterized Query
```java
// ✅ SECURE: Using parameterized queries
String query = "SELECT * FROM users WHERE username = ?";
PreparedStatement stmt = conn.prepareStatement(query);
stmt.setString(1, username);  // Safe parameter binding
ResultSet rs = stmt.executeQuery();
```

### C# - Parameterized Query
```csharp
// ✅ SECURE: Using parameterized queries
string query = "SELECT * FROM users WHERE username = @username";
using var command = new SqlCommand(query, connection);
command.Parameters.AddWithValue("@username", username); // Safe parameter binding
using var reader = command.ExecuteReader();
```

## 🛡️ Additional Security Measures
1. Input validation (length, format, allowed characters)
2. Least privilege database access
3. Stored procedures where appropriate
4. Regular security scanning
5. Audit logging

## 🎯 Success Criteria
- [ ] Vulnerable code identified
- [ ] Attack vectors understood
- [ ] Parameterized queries implemented
- [ ] Input validation added
- [ ] Code tested with malicious inputs (safely!) 