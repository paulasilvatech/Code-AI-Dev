using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;

namespace Enterprise.Web.Services
{
    /// <summary>
    /// Service for handling string operations in the application.
    /// This implementation demonstrates optimized string handling.
    /// </summary>
    public class StringHandlingService
    {
        private readonly ILogger<StringHandlingService> _logger;

        public StringHandlingService(ILogger<StringHandlingService> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <summary>
        /// Concatenates a list of strings with a separator.
        /// Optimized implementation using string.Join.
        /// </summary>
        public string ConcatenateStrings(IEnumerable<string> strings, string separator)
        {
            if (strings == null || !strings.Any())
            {
                return string.Empty;
            }
            
            // Using string.Join is more efficient
            return string.Join(separator, strings);
        }

        /// <summary>
        /// Builds a complex string representation from an object.
        /// Optimized implementation using StringBuilder.
        /// </summary>
        public string BuildComplexString(UserProfile profile)
        {
            if (profile == null)
            {
                return string.Empty;
            }
            
            // Pre-allocate capacity for better performance
            var builder = new StringBuilder(256);
            builder.AppendLine($"User: {profile.Username}")
                   .AppendLine($"Name: {profile.FirstName} {profile.LastName}")
                   .AppendLine($"Email: {profile.Email}")
                   .AppendLine($"Joined: {profile.JoinDate}")
                   .AppendLine($"Status: {profile.Status}")
                   .Append("Roles: ");
            
            if (profile.Roles != null && profile.Roles.Any())
            {
                builder.Append(string.Join(", ", profile.Roles));
            }
            
            return builder.ToString();
        }

        /// <summary>
        /// Searches for occurrences of a string within text.
        /// Optimized implementation using Regex.
        /// </summary>
        public List<int> FindAllOccurrences(string text, string searchString)
        {
            if (string.IsNullOrEmpty(text) || string.IsNullOrEmpty(searchString))
            {
                return new List<int>();
            }
            
            var matches = Regex.Matches(text, Regex.Escape(searchString));
            return matches.Select(m => m.Index).ToList();
        }

        /// <summary>
        /// Replaces all occurrences of a string with another string.
        /// Optimized implementation using built-in string.Replace method.
        /// </summary>
        public string ReplaceAllOccurrences(string text, string searchString, string replacement)
        {
            if (string.IsNullOrEmpty(text) || string.IsNullOrEmpty(searchString))
            {
                return text;
            }
            
            // Using the built-in Replace method is more efficient
            return text.Replace(searchString, replacement ?? string.Empty);
        }
        
        /// <summary>
        /// Extension method to safely process large strings in chunks to avoid memory issues
        /// </summary>
        public string ProcessLargeText(string text, Func<string, string> processor, int chunkSize = 8192)
        {
            if (string.IsNullOrEmpty(text) || processor == null)
            {
                return text;
            }
            
            // For small strings, process directly
            if (text.Length <= chunkSize)
            {
                return processor(text);
            }
            
            // For large strings, process in chunks
            var result = new StringBuilder(text.Length);
            for (int i = 0; i < text.Length; i += chunkSize)
            {
                int length = Math.Min(chunkSize, text.Length - i);
                string chunk = text.Substring(i, length);
                result.Append(processor(chunk));
            }
            
            return result.ToString();
        }
    }

    /// <summary>
    /// Dummy user profile class for the example
    /// </summary>
    public class UserProfile
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime JoinDate { get; set; }
        public string Status { get; set; }
        public List<string> Roles { get; set; } = new List<string>();
    }
} 