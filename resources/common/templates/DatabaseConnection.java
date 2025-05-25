// Java Database Connection Template for Workshop Exercises
// This file demonstrates secure database connection patterns for the workshop

package workshop.exercises;

import java.sql.*;
import java.util.Properties;
import java.util.logging.Logger;
import java.util.logging.Level;

/**
 * Secure database connection class for workshop exercises
 * Demonstrates best practices for SQL Server connectivity
 */
public class DatabaseConnection {
    
    private static final Logger LOGGER = Logger.getLogger(DatabaseConnection.class.getName());
    private final String connectionString;
    
    // Workshop database configuration
    private static final String DEFAULT_SERVER = "aidevops-sql-server.database.windows.net";
    private static final String DEFAULT_DATABASE = "aidevops-workshop-db";
    private static final String DEFAULT_USER = "workshopadmin";
    
    /**
     * Constructor with connection string
     * @param connectionString JDBC connection string
     */
    public DatabaseConnection(String connectionString) {
        if (connectionString == null || connectionString.trim().isEmpty()) {
            throw new IllegalArgumentException("Connection string cannot be null or empty");
        }
        this.connectionString = connectionString;
    }
    
    /**
     * Constructor with individual parameters for workshop setup
     * @param server SQL Server hostname
     * @param database Database name
     * @param username Username
     * @param password Password
     */
    public DatabaseConnection(String server, String database, String username, String password) {
        if (server == null || database == null || username == null || password == null) {
            throw new IllegalArgumentException("All connection parameters must be provided");
        }
        
        this.connectionString = String.format(
            "jdbc:sqlserver://%s:1433;database=%s;user=%s;password=%s;" +
            "encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;" +
            "loginTimeout=30;",
            server, database, username, password
        );
    }
    
    /**
     * Gets a secure SQL connection for workshop exercises
     * @return Configured Connection
     * @throws SQLException if connection fails
     */
    public Connection getConnection() throws SQLException {
        try {
            // Set connection properties for security
            Properties props = new Properties();
            props.setProperty("encrypt", "true");
            props.setProperty("trustServerCertificate", "false");
            props.setProperty("loginTimeout", "30");
            
            Connection connection = DriverManager.getConnection(connectionString);
            LOGGER.info("Database connection created successfully");
            return connection;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Failed to create database connection", e);
            throw e;
        }
    }
    
    /**
     * Tests database connectivity for workshop setup
     * @return true if connection successful
     */
    public boolean testConnection() {
        try (Connection connection = getConnection()) {
            LOGGER.info("Database connection test successful");
            return true;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Database connection test failed", e);
            return false;
        }
    }
    
    /**
     * Executes the workshop database setup script
     * @return true if initialization successful
     */
    public boolean initializeWorkshopDatabase() {
        String initScript = """
            -- Check if tables already exist
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
            BEGIN
                -- Create Users table for workshop exercises
                CREATE TABLE users (
                    id INT IDENTITY(1,1) PRIMARY KEY,
                    username NVARCHAR(50) NOT NULL UNIQUE,
                    email NVARCHAR(100) NOT NULL,
                    password_hash NVARCHAR(255) NOT NULL,
                    created_date DATETIME2 DEFAULT GETDATE(),
                    last_login DATETIME2 NULL,
                    is_active BIT DEFAULT 1
                );
                
                -- Create index for performance exercises
                CREATE INDEX IX_users_username ON users(username);
                
                -- Insert sample data for exercises
                INSERT INTO users (username, email, password_hash) VALUES
                ('alice.johnson', 'alice.johnson@example.com', 'hashed_password_1'),
                ('bob.smith', 'bob.smith@example.com', 'hashed_password_2'),
                ('charlie.brown', 'charlie.brown@example.com', 'hashed_password_3'),
                ('diana.prince', 'diana.prince@example.com', 'hashed_password_4'),
                ('eve.wilson', 'eve.wilson@example.com', 'hashed_password_5');
                
                PRINT 'Workshop database initialized successfully';
            END
            ELSE
            BEGIN
                PRINT 'Workshop database already initialized';
            END
            """;
        
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement()) {
            
            statement.execute(initScript);
            LOGGER.info("Workshop database initialization completed");
            return true;
            
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Failed to initialize workshop database", e);
            return false;
        }
    }
    
    /**
     * Creates a workshop-specific connection for exercises
     * Uses environment variables for configuration
     * @return DatabaseConnection instance
     */
    public static DatabaseConnection createWorkshopConnection() {
        String server = System.getenv("SQL_SERVER_NAME");
        String database = System.getenv("SQL_DATABASE_NAME");
        String username = System.getenv("SQL_ADMIN_USER");
        String password = System.getenv("SQL_ADMIN_PASSWORD");
        
        // Use defaults if environment variables not set
        if (server == null) server = DEFAULT_SERVER;
        if (database == null) database = DEFAULT_DATABASE;
        if (username == null) username = DEFAULT_USER;
        if (password == null) {
            throw new IllegalStateException("SQL_ADMIN_PASSWORD environment variable must be set");
        }
        
        return new DatabaseConnection(server, database, username, password);
    }
    
    /**
     * Example method demonstrating secure parameterized queries
     * @param username Username to search for
     * @return User information if found
     */
    public String findUserSecurely(String username) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        
        // Input validation for workshop security exercises
        if (username.length() > 50) {
            throw new IllegalArgumentException("Username too long");
        }
        
        if (username.contains("'") || username.contains(";") || username.contains("--")) {
            throw new IllegalArgumentException("Username contains invalid characters");
        }
        
        String query = "SELECT username, email, created_date FROM users WHERE username = ? AND is_active = 1";
        
        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {
            
            statement.setString(1, username);
            
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return String.format("User: %s, Email: %s, Created: %s",
                        resultSet.getString("username"),
                        resultSet.getString("email"),
                        resultSet.getTimestamp("created_date"));
                } else {
                    return "User not found";
                }
            }
            
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Database error occurred", e);
            throw new RuntimeException("Database operation failed");
        }
    }
}