// C# Database Connection Template for Workshop Exercises
// This file demonstrates secure database connection patterns for the workshop

using System;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace WorkshopExercises
{
    /// <summary>
    /// Secure database connection class for workshop exercises
    /// Demonstrates best practices for SQL Server connectivity
    /// </summary>
    public class DatabaseConnection
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<DatabaseConnection> _logger;
        private readonly string _connectionString;

        public DatabaseConnection(IConfiguration configuration, ILogger<DatabaseConnection> logger)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            
            // Get connection string from configuration
            _connectionString = _configuration.GetConnectionString("DefaultConnection") 
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found");
        }

        /// <summary>
        /// Gets a secure SQL connection for workshop exercises
        /// </summary>
        /// <returns>Configured SqlConnection</returns>
        public SqlConnection GetConnection()
        {
            try
            {
                var connection = new SqlConnection(_connectionString);
                _logger.LogInformation("Database connection created successfully");
                return connection;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to create database connection");
                throw;
            }
        }

        /// <summary>
        /// Tests database connectivity for workshop setup
        /// </summary>
        /// <returns>True if connection successful</returns>
        public async Task<bool> TestConnectionAsync()
        {
            try
            {
                using var connection = GetConnection();
                await connection.OpenAsync();
                _logger.LogInformation("Database connection test successful");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Database connection test failed");
                return false;
            }
        }

        /// <summary>
        /// Executes the workshop database setup script
        /// </summary>
        public async Task<bool> InitializeWorkshopDatabaseAsync()
        {
            const string initScript = @"
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

                    -- Insert sample data for exercises
                    INSERT INTO users (username, email, password_hash) VALUES
                    ('alice.johnson', 'alice.johnson@example.com', 'hashed_password_1'),
                    ('bob.smith', 'bob.smith@example.com', 'hashed_password_2'),
                    ('charlie.brown', 'charlie.brown@example.com', 'hashed_password_3');

                    PRINT 'Workshop database initialized successfully';
                END
                ELSE
                BEGIN
                    PRINT 'Workshop database already initialized';
                END";

            try
            {
                using var connection = GetConnection();
                await connection.OpenAsync();
                
                using var command = new SqlCommand(initScript, connection);
                await command.ExecuteNonQueryAsync();
                
                _logger.LogInformation("Workshop database initialization completed");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to initialize workshop database");
                return false;
            }
        }
    }
}