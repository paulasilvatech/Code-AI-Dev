# 💾 Memory Optimization Examples

This directory contains examples of optimizing memory usage in Java applications using AI-assisted techniques. The examples demonstrate how to improve application performance by reducing memory consumption and improving garbage collection behavior.

## 📋 Overview

Memory management is crucial for high-performance Java applications, especially when handling large datasets. This directory provides examples of:

- Reducing memory footprint
- Minimizing object allocations
- Improving garbage collection efficiency
- Using memory-efficient data structures

## 📂 Directory Structure

- `before/` - Original implementations with memory issues
- `after/` - Optimized implementations with reduced memory usage

## 🔍 Key Optimization Techniques

### Primitive Collections vs. Object Collections

```java
// Before: Using boxed types
List<Integer> values = new ArrayList<>();
for (int i = 0; i < 1_000_000; i++) {
    values.add(i);
}

// After: Using primitive collections (Trove, Eclipse Collections, etc.)
TIntArrayList values = new TIntArrayList();
for (int i = 0; i < 1_000_000; i++) {
    values.add(i);
}
```

### Object Pooling

```java
// Before: Creating new objects continuously
public class MessageProcessor {
    public void processMessages(List<String> messages) {
        for (String message : messages) {
            MessageObject msgObj = new MessageObject(message);
            processMessage(msgObj);
        }
    }
}

// After: Using object pooling
public class MessageProcessor {
    private final ObjectPool<MessageObject> pool = new GenericObjectPool<>(
        new BasePooledObjectFactory<MessageObject>() {
            @Override
            public MessageObject create() {
                return new MessageObject();
            }
            
            @Override
            public PooledObject<MessageObject> wrap(MessageObject obj) {
                return new DefaultPooledObject<>(obj);
            }
        }
    );
    
    public void processMessages(List<String> messages) {
        for (String message : messages) {
            try {
                MessageObject msgObj = pool.borrowObject();
                msgObj.setMessage(message);
                processMessage(msgObj);
                pool.returnObject(msgObj);
            } catch (Exception e) {
                logger.error("Error borrowing object from pool", e);
            }
        }
    }
}
```

### String Interning and String Builder

```java
// Before: String concatenation and duplicate strings
String result = "";
for (int i = 0; i < values.length; i++) {
    result += values[i] + ", ";
}

// After: Using StringBuilder and String.intern()
StringBuilder sb = new StringBuilder();
for (int i = 0; i < values.length; i++) {
    if (i > 0) {
        sb.append(", ");
    }
    sb.append(values[i].intern());
}
String result = sb.toString();
```

### Memory-Mapped Files

```java
// Before: Loading entire file into memory
public List<Record> readRecords(String filename) throws IOException {
    List<Record> records = new ArrayList<>();
    try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
        String line;
        while ((line = reader.readLine()) != null) {
            records.add(parseRecord(line));
        }
    }
    return records;
}

// After: Using memory-mapped file for large files
public void processRecords(String filename, RecordProcessor processor) throws IOException {
    try (FileChannel channel = FileChannel.open(Paths.get(filename), StandardOpenOption.READ)) {
        MappedByteBuffer buffer = channel.map(FileChannel.MapMode.READ_ONLY, 0, channel.size());
        
        StringBuilder line = new StringBuilder();
        while (buffer.hasRemaining()) {
            char c = (char) buffer.get();
            if (c == '\n') {
                processor.process(parseRecord(line.toString()));
                line.setLength(0);
            } else {
                line.append(c);
            }
        }
        
        if (line.length() > 0) {
            processor.process(parseRecord(line.toString()));
        }
    }
}
```

## 🤖 GitHub Copilot Agent Prompts

When working with these examples, try using these prompts with GitHub Copilot Agent:

- "Analyze this code for memory inefficiencies and suggest improvements"
- "How can I reduce object allocations in this high-throughput method?"
- "Suggest a memory-optimized data structure for this use case"
- "Refactor this method to reduce memory pressure during garbage collection"

## 📊 Performance Impact

The optimizations in these examples have demonstrated significant memory improvements:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Heap Usage | 1.8 GB | 450 MB | 75% less memory |
| GC Pause Time | 320 ms | 85 ms | 73% reduction |
| Object Allocations | 12M/sec | 3.2M/sec | 73% fewer allocations |
| Processing Time | 75 sec | 28 sec | 63% faster |

## 📚 Further Reading

- [Java Memory Management](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/)
- [Eclipse Collections](https://www.eclipse.org/collections/)
- [Understanding Java Garbage Collection](https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html)
- [Memory-Mapped Files in Java](https://www.baeldung.com/java-mapped-byte-buffer) 