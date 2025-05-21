using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Enterprise.Web.Controllers
{
    /// <summary>
    /// REST controller for user operations.
    /// This implementation contains several security vulnerabilities.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly string _connectionString;

        public UsersController(ILogger<UsersController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        /// <summary>
        /// Get user by ID.
        /// VULNERABILITY: SQL Injection due to string concatenation.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            _logger.LogInformation("Getting user with ID: " + id);
            
            // VULNERABLE: Direct string concatenation in SQL query
            string sql = "SELECT * FROM Users WHERE UserId = " + id;
            
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(sql, connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            var user = new User
                            {
                                UserId = reader["UserId"].ToString(),
                                Username = reader["Username"].ToString(),
                                Email = reader["Email"].ToString(),
                                Role = reader["Role"].ToString()
                            };
                            return Ok(user);
                        }
                    }
                }
            }
            
            return NotFound();
        }

        /// <summary>
        /// Search for users by name.
        /// VULNERABILITY: SQL Injection in LIKE clause.
        /// </summary>
        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers([FromQuery] string name)
        {
            _logger.LogInformation("Searching for users with name: " + name);
            
            // VULNERABLE: Unsanitized input in LIKE clause
            string sql = "SELECT * FROM Users WHERE Username LIKE '%" + name + "%'";
            
            var users = new List<User>();
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(sql, connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            users.Add(new User
                            {
                                UserId = reader["UserId"].ToString(),
                                Username = reader["Username"].ToString(),
                                Email = reader["Email"].ToString(),
                                Role = reader["Role"].ToString()
                            });
                        }
                    }
                }
            }
            
            return Ok(users);
        }

        /// <summary>
        /// Create a new user.
        /// VULNERABILITY: No input validation, potential SQL Injection.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            _logger.LogInformation("Creating new user: " + user.Username);
            
            // VULNERABLE: No input validation or sanitization
            string sql = $"INSERT INTO Users (Username, Email, Password, Role) VALUES ('{user.Username}', '{user.Email}', '{user.Password}', '{user.Role}'); SELECT SCOPE_IDENTITY()";
            
            // VULNERABLE: Logging sensitive information
            _logger.LogInformation("Creating user with password: " + user.Password);
            
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(sql, connection))
                {
                    var userId = await command.ExecuteScalarAsync();
                    user.UserId = userId.ToString();
                    return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
                }
            }
        }

        /// <summary>
        /// Update user role.
        /// VULNERABILITY: No authorization check.
        /// </summary>
        [HttpPut("{id}/role")]
        public async Task<IActionResult> UpdateUserRole(string id, [FromQuery] string newRole)
        {
            _logger.LogInformation("Updating role for user ID: " + id);
            
            // VULNERABLE: No authorization check for admin-only action
            string sql = $"UPDATE Users SET Role = '{newRole}' WHERE UserId = {id}";
            
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(sql, connection))
                {
                    int rowsAffected = await command.ExecuteNonQueryAsync();
                    if (rowsAffected == 0)
                    {
                        return NotFound();
                    }
                    return NoContent();
                }
            }
        }

        /// <summary>
        /// Delete user by ID.
        /// VULNERABILITY: No authorization check and SQL Injection.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            _logger.LogInformation("Deleting user with ID: " + id);
            
            // VULNERABLE: No authorization check and SQL Injection
            string sql = "DELETE FROM Users WHERE UserId = " + id;
            
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(sql, connection))
                {
                    int rowsAffected = await command.ExecuteNonQueryAsync();
                    if (rowsAffected == 0)
                    {
                        return NotFound();
                    }
                    return NoContent();
                }
            }
        }

        /// <summary>
        /// Execute custom query (admin only).
        /// VULNERABILITY: Direct execution of user input.
        /// </summary>
        [HttpPost("query")]
        public async Task<IActionResult> ExecuteQuery([FromQuery] string query)
        {
            _logger.LogInformation("Executing custom query");
            
            // VULNERABLE: Direct execution of user input
            var results = new List<Dictionary<string, object>>();
            
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(query, connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var row = new Dictionary<string, object>();
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                row[reader.GetName(i)] = reader.GetValue(i);
                            }
                            results.Add(row);
                        }
                    }
                }
            }
            
            return Ok(results);
        }
    }

    /// <summary>
    /// User class for request/response
    /// </summary>
    public class User
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
} 