# 🚀 Module 2: String Optimization Exercise Template

## 🎯 Exercise Goal
Learn to optimize string operations using AI assistance to achieve 10x+ performance improvements.

## 🐌 Inefficient Code to Start With

### Java Version
```java
// INEFFICIENT: String concatenation in loop
String result = "";
for (String name : names) {
    result = result + name + ", ";  // Creates new String object each time!
}
```

### C# Version
```csharp
// INEFFICIENT: String concatenation in loop
string result = "";
foreach (string name in names) {
    result = result + name + ", ";  // Creates new string object each time!
}
```

## 🤖 AI Optimization Prompt
```
// Optimize this string concatenation for better performance
// Use StringBuilder for efficient string building
// Show performance comparison between both approaches
```

## 📊 Performance Metrics to Track
- Execution time (nanoseconds/milliseconds)
- Memory usage (if possible)
- Number of objects created

## ✅ Expected Optimization

### Java - StringBuilder
```java
StringBuilder sb = new StringBuilder();
for (String name : names) {
    sb.append(name).append(", ");
}
String result = sb.toString();
```

### C# - StringBuilder
```csharp
StringBuilder sb = new StringBuilder();
foreach (string name in names) {
    sb.Append(name).Append(", ");
}
string result = sb.ToString();
```

## 🎯 Success Criteria
- [ ] Original inefficient code runs and times recorded
- [ ] AI suggests StringBuilder optimization
- [ ] Optimized code implemented
- [ ] Performance improvement measured (should be 5-10x faster)
- [ ] Both versions produce identical output 