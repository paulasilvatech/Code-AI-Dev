using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Enterprise.Web.Controllers
{
    /// <summary>
    /// REST controller for user operations.
    /// This implementation demonstrates security best practices.
    /// 
    /// GitHub Copilot Agent Autonomous Mode:
    /// To use with Copilot Agent, instruct it to: "Scan this controller for security
    /// vulnerabilities and remediate them using parameterized queries and proper authorization."
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly string _connectionString;

        public UsersController(ILogger<UsersController> logger, IConfiguration configuration)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? 
                throw new ArgumentNullException("DefaultConnection string is missing");
        }

        /// <summary>
        /// Get user by ID.
        /// SECURE: Uses parameterized query to prevent SQL injection.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById([FromRoute] int id)
        {
            _logger.LogInformation("Getting user with ID: {UserId}", id);
            
            // Verify the user has permission to access this record
            if (!User.IsInRole("Admin") && !IsResourceOwner(id))
            {
                return Forbid();
            }
            
            // SECURE: Parameterized query
            const string sql = "SELECT UserId, Username, Email, Role FROM Users WHERE UserId = @UserId";
            
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(sql, connection))
                {
                    // SECURE: Using parameters instead of string concatenation
                    command.Parameters.Add("@UserId", SqlDbType.Int).Value = id;
                    
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            var user = new UserResponse
                            {
                                UserId = Convert.ToInt32(reader["UserId"]),
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
        /// SECURE: Uses parameterized query with wildcard characters.
        /// </summary>
        [HttpGet("search")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SearchUsers([FromQuery] [RegularExpression(@"^[a-zA-Z0-9\s]*$")] string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Search term is required");
            }
            
            _logger.LogInformation("Searching for users with name: {Name}", name);
            
            // SECURE: Parameterized query with wildcards
            const string sql = "SELECT UserId, Username, Email, Role FROM Users WHERE Username LIKE @NamePattern";
            
            var users = new List<UserResponse>();
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(sql, connection))
                {
                    // SECURE: Using parameters instead of string concatenation
                    command.Parameters.Add("@NamePattern", SqlDbType.NVarChar).Value = $"%{name}%";
                    
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            users.Add(new UserResponse
                            {
                                UserId = Convert.ToInt32(reader["UserId"]),
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
        /// SECURE: Input validation and parameterized query.
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            _logger.LogInformation("Creating new user: {Username}", request.Username);
            
            // SECURE: Validate role to prevent privilege escalation
            string role = "User"; // Default role
            if (User.IsInRole("Admin") && IsValidRole(request.Role))
            {
                role = request.Role;
            }
            
            // SECURE: Parameterized query
            const string sql = @"
                INSERT INTO Users (Username, Email, Password, Role) 
                VALUES (@Username, @Email, @Password, @Role);
                SELECT SCOPE_IDENTITY()";
            
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();
                    using (var command = new SqlCommand(sql, connection))
                    {
                        // SECURE: Using parameters instead of string concatenation
                        command.Parameters.Add("@Username", SqlDbType.NVarChar, 50).Value = request.Username;
                        command.Parameters.Add("@Email", SqlDbType.NVarChar, 100).Value = request.Email;
                        command.Parameters.Add("@Password", SqlDbType.NVarChar, 100).Value = HashPassword(request.Password);
                        command.Parameters.Add("@Role", SqlDbType.NVarChar, 20).Value = role;
                        
                        var userId = Convert.ToInt32(await command.ExecuteScalarAsync());
                        
                        var response = new UserResponse
                        {
                            UserId = userId,
                            Username = request.Username,
                            Email = request.Email,
                            Role = role
                        };
                        
                        return CreatedAtAction(nameof(GetUserById), new { id = userId }, response);
                    }
                }
            }
            catch (SqlException ex)
            {
                _logger.LogError(ex, "Error creating user");
                return StatusCode(500, "An error occurred while creating the user");
            }
        }

        /// <summary>
        /// Update user role.
        /// SECURE: Authorization check and parameterized query.
        /// </summary>
        [HttpPut("{id}/role")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUserRole(
            [FromRoute] int id, 
            [FromQuery] [RegularExpression(@"^(User|Editor|Admin)$")] string newRole)
        {
            if (string.IsNullOrEmpty(newRole) || !IsValidRole(newRole))
            {
                return BadRequest("Invalid role specified");
            }
            
            _logger.LogInformation("Updating role for user ID: {UserId}", id);
            
            // SECURE: Authorization check through [Authorize] attribute
            // SECURE: Parameterized query
            const string sql = "UPDATE Users SET Role = @Role WHERE UserId = @UserId";
            
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();
                    using (var command = new SqlCommand(sql, connection))
                    {
                        // SECURE: Using parameters instead of string concatenation
                        command.Parameters.Add("@Role", SqlDbType.NVarChar, 20).Value = newRole;
                        command.Parameters.Add("@UserId", SqlDbType.Int).Value = id;
                        
                        int rowsAffected = await command.ExecuteNonQueryAsync();
                        if (rowsAffected == 0)
                        {
                            return NotFound();
                        }
                        return NoContent();
                    }
                }
            }
            catch (SqlException ex)
            {
                _logger.LogError(ex, "Error updating user role");
                return StatusCode(500, "An error occurred while updating the user role");
            }
        }

        /// <summary>
        /// Delete user by ID.
        /// SECURE: Authorization check and parameterized query.
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            _logger.LogInformation("Deleting user with ID: {UserId}", id);
            
            // SECURE: Authorization check through [Authorize] attribute
            // SECURE: Parameterized query
            const string sql = "DELETE FROM Users WHERE UserId = @UserId";
            
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();
                    using (var command = new SqlCommand(sql, connection))
                    {
                        // SECURE: Using parameters instead of string concatenation
                        command.Parameters.Add("@UserId", SqlDbType.Int).Value = id;
                        
                        int rowsAffected = await command.ExecuteNonQueryAsync();
                        if (rowsAffected == 0)
                        {
                            return NotFound();
                        }
                        return NoContent();
                    }
                }
            }
            catch (SqlException ex)
            {
                _logger.LogError(ex, "Error deleting user");
                return StatusCode(500, "An error occurred while deleting the user");
            }
        }

        // The ExecuteQuery method has been removed as it cannot be made secure while allowing arbitrary SQL execution

        /// <summary>
        /// Helper method to hash passwords.
        /// In a real application, use a proper password hashing library like BCrypt.
        /// </summary>
        private string HashPassword(string password)
        {
            // This is a placeholder. In a real application, use a secure password hashing algorithm
            // Example: BCrypt.Net.BCrypt.HashPassword(password);
            return "HASHED_" + password;
        }

        /// <summary>
        /// Check if the current user is the owner of the resource being accessed.
        /// </summary>
        private bool IsResourceOwner(int userId)
        {
            // This is a placeholder. In a real application, get the current user ID from claims
            var currentUserIdClaim = User.Claims.FirstOrDefault(c => c.Type == "sub" || c.Type == "userId");
            if (currentUserIdClaim != null && int.TryParse(currentUserIdClaim.Value, out int currentUserId))
            {
                return currentUserId == userId;
            }
            return false;
        }

        /// <summary>
        /// Validate that the specified role is allowed.
        /// </summary>
        private bool IsValidRole(string role)
        {
            return role == "User" || role == "Editor" || role == "Admin";
        }
    }

    /// <summary>
    /// Request model for creating users with validation
    /// </summary>
    public class CreateUserRequest
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Username must be alphanumeric")]
        public string Username { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 8)]
        public string Password { get; set; }
        
        public string Role { get; set; } = "User";
    }

    /// <summary>
    /// Response model for user data (does not include sensitive information)
    /// </summary>
    public class UserResponse
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
} 