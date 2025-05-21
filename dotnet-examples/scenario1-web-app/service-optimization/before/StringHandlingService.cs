using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace Enterprise.Web.Services
{
    /// <summary>
    /// Service for handling string operations in the application.
    /// This implementation has several performance issues.
    /// </summary>
    public class StringHandlingService
    {
        private readonly ILogger<StringHandlingService> _logger;

        public StringHandlingService(ILogger<StringHandlingService> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Concatenates a list of strings with a separator.
        /// Inefficient implementation using string concatenation in a loop.
        /// </summary>
        public string ConcatenateStrings(IEnumerable<string> strings, string separator)
        {
            string result = "";
            foreach (var str in strings)
            {
                result = result + str + separator;
            }

            // Remove trailing separator
            if (result.Length > 0 && strings.Any())
            {
                result = result.Substring(0, result.Length - separator.Length);
            }

            return result;
        }

        /// <summary>
        /// Builds a complex string representation from an object.
        /// Inefficient implementation using string concatenation.
        /// </summary>
        public string BuildComplexString(UserProfile profile)
        {
            string result = "";
            result = result + "User: " + profile.Username + "\n";
            result = result + "Name: " + profile.FirstName + " " + profile.LastName + "\n";
            result = result + "Email: " + profile.Email + "\n";
            result = result + "Joined: " + profile.JoinDate + "\n";
            result = result + "Status: " + profile.Status + "\n";
            
            result = result + "Roles: ";
            foreach (var role in profile.Roles)
            {
                result = result + role + ", ";
            }
            
            // Remove trailing comma and space
            if (profile.Roles.Any())
            {
                result = result.Substring(0, result.Length - 2);
            }
            
            return result;
        }

        /// <summary>
        /// Searches for occurrences of a string within text.
        /// Inefficient implementation using repeated string operations.
        /// </summary>
        public List<int> FindAllOccurrences(string text, string searchString)
        {
            List<int> positions = new List<int>();
            string remainingText = text;
            int currentPosition = 0;
            
            while (remainingText.Contains(searchString))
            {
                int index = remainingText.IndexOf(searchString);
                currentPosition += index;
                positions.Add(currentPosition);
                
                // Move past this occurrence
                remainingText = remainingText.Substring(index + searchString.Length);
                currentPosition += searchString.Length;
            }
            
            return positions;
        }

        /// <summary>
        /// Replaces all occurrences of a string with another string.
        /// Inefficient implementation using string operations in a loop.
        /// </summary>
        public string ReplaceAllOccurrences(string text, string searchString, string replacement)
        {
            while (text.Contains(searchString))
            {
                int index = text.IndexOf(searchString);
                text = text.Substring(0, index) + replacement + text.Substring(index + searchString.Length);
            }
            return text;
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