#!/bin/bash

# Azure Infrastructure Setup Script for AI-Powered DevOps Workshop
# This script creates all necessary Azure resources for the workshop exercises

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Workshop configuration - standardized names and settings
WORKSHOP_PREFIX="aidevops"
LOCATION="East US"  # Best zone for most Azure services
RESOURCE_GROUP_NAME="${WORKSHOP_PREFIX}-workshop-rg"
SQL_SERVER_NAME="${WORKSHOP_PREFIX}-sql-server-$(date +%s)"
SQL_DATABASE_NAME="${WORKSHOP_PREFIX}-workshop-db"
SQL_ADMIN_USER="workshopadmin"
SQL_ADMIN_PASSWORD="Workshop2024!"  # Standard password for workshop
APP_INSIGHTS_NAME="${WORKSHOP_PREFIX}-appinsights"
LOG_ANALYTICS_NAME="${WORKSHOP_PREFIX}-loganalytics"
AI_SERVICES_NAME="${WORKSHOP_PREFIX}-ai-services"
STORAGE_ACCOUNT_NAME="${WORKSHOP_PREFIX}storage$(date +%s | tail -c 6)"
KEY_VAULT_NAME="${WORKSHOP_PREFIX}-keyvault-$(date +%s)"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    print_error "Azure CLI is not installed. Please install it first:"
    print_error "Visit: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Check if user is logged in
if ! az account show &> /dev/null; then
    print_error "Please login to Azure first:"
    print_error "Run: az login"
    exit 1
fi

# Get subscription information
SUBSCRIPTION_ID=$(az account show --query id -o tsv)
SUBSCRIPTION_NAME=$(az account show --query name -o tsv)

print_status "Using Azure Subscription: $SUBSCRIPTION_NAME ($SUBSCRIPTION_ID)"
print_status "Workshop resources will be created in: $LOCATION"

# Confirmation prompt
read -p "Do you want to proceed with creating workshop resources? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Setup cancelled by user"
    exit 0
fi

print_status "Starting Azure infrastructure setup..."

# Create Resource Group
print_status "Creating Resource Group: $RESOURCE_GROUP_NAME"
az group create \
    --name "$RESOURCE_GROUP_NAME" \
    --location "$LOCATION" \
    --tags "Purpose=Workshop" "Project=AI-DevOps" "Environment=Learning"

print_success "Resource Group created successfully"

# Create Log Analytics Workspace (needed for Application Insights)
print_status "Creating Log Analytics Workspace: $LOG_ANALYTICS_NAME"
az monitor log-analytics workspace create \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --workspace-name "$LOG_ANALYTICS_NAME" \
    --location "$LOCATION" \
    --sku "PerGB2018"

print_success "Log Analytics Workspace created successfully"

# Create Application Insights
print_status "Creating Application Insights: $APP_INSIGHTS_NAME"
az monitor app-insights component create \
    --app "$APP_INSIGHTS_NAME" \
    --location "$LOCATION" \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --workspace "$LOG_ANALYTICS_NAME"

print_success "Application Insights created successfully"

# Create Storage Account
print_status "Creating Storage Account: $STORAGE_ACCOUNT_NAME"
az storage account create \
    --name "$STORAGE_ACCOUNT_NAME" \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --location "$LOCATION" \
    --sku "Standard_LRS" \
    --kind "StorageV2"

print_success "Storage Account created successfully"

# Create Key Vault
print_status "Creating Key Vault: $KEY_VAULT_NAME"
az keyvault create \
    --name "$KEY_VAULT_NAME" \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --location "$LOCATION" \
    --sku "standard"

print_success "Key Vault created successfully"

# Create SQL Server
print_status "Creating SQL Server: $SQL_SERVER_NAME"
az sql server create \
    --name "$SQL_SERVER_NAME" \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --location "$LOCATION" \
    --admin-user "$SQL_ADMIN_USER" \
    --admin-password "$SQL_ADMIN_PASSWORD"

print_success "SQL Server created successfully"

# Configure SQL Server firewall to allow Azure services
print_status "Configuring SQL Server firewall rules"
az sql server firewall-rule create \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --server "$SQL_SERVER_NAME" \
    --name "AllowAzureServices" \
    --start-ip-address "0.0.0.0" \
    --end-ip-address "0.0.0.0"

# Allow current client IP
CLIENT_IP=$(curl -s https://ipinfo.io/ip)
az sql server firewall-rule create \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --server "$SQL_SERVER_NAME" \
    --name "AllowClientIP" \
    --start-ip-address "$CLIENT_IP" \
    --end-ip-address "$CLIENT_IP"

print_success "SQL Server firewall configured successfully"

# Create SQL Database
print_status "Creating SQL Database: $SQL_DATABASE_NAME"
az sql db create \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --server "$SQL_SERVER_NAME" \
    --name "$SQL_DATABASE_NAME" \
    --service-objective "S0" \
    --collation "SQL_Latin1_General_CP1_CI_AS"

print_success "SQL Database created successfully"

# Create Azure AI Services (Cognitive Services)
print_status "Creating Azure AI Services: $AI_SERVICES_NAME"
az cognitiveservices account create \
    --name "$AI_SERVICES_NAME" \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --kind "CognitiveServices" \
    --sku "S0" \
    --location "$LOCATION" \
    --yes

print_success "Azure AI Services created successfully"

# Store secrets in Key Vault
print_status "Storing connection strings and secrets in Key Vault"

# Get SQL connection string
SQL_CONNECTION_STRING="Server=tcp:${SQL_SERVER_NAME}.database.windows.net,1433;Initial Catalog=${SQL_DATABASE_NAME};Persist Security Info=False;User ID=${SQL_ADMIN_USER};Password=${SQL_ADMIN_PASSWORD};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"

# Get Application Insights instrumentation key
APP_INSIGHTS_KEY=$(az monitor app-insights component show \
    --app "$APP_INSIGHTS_NAME" \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --query "instrumentationKey" -o tsv)

# Get AI Services key
AI_SERVICES_KEY=$(az cognitiveservices account keys list \
    --name "$AI_SERVICES_NAME" \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --query "key1" -o tsv)

# Get Storage Account connection string
STORAGE_CONNECTION_STRING=$(az storage account show-connection-string \
    --name "$STORAGE_ACCOUNT_NAME" \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --query "connectionString" -o tsv)

# Store secrets in Key Vault
az keyvault secret set --vault-name "$KEY_VAULT_NAME" --name "SqlConnectionString" --value "$SQL_CONNECTION_STRING"
az keyvault secret set --vault-name "$KEY_VAULT_NAME" --name "ApplicationInsightsKey" --value "$APP_INSIGHTS_KEY"
az keyvault secret set --vault-name "$KEY_VAULT_NAME" --name "AiServicesKey" --value "$AI_SERVICES_KEY"
az keyvault secret set --vault-name "$KEY_VAULT_NAME" --name "StorageConnectionString" --value "$STORAGE_CONNECTION_STRING"

print_success "Secrets stored in Key Vault successfully"

# Create configuration file for workshop
CONFIG_FILE="$PWD/workshop-config.env"
print_status "Creating workshop configuration file: $CONFIG_FILE"

cat > "$CONFIG_FILE" << EOF
# AI-Powered DevOps Workshop Configuration
# Generated on: $(date)

# Azure Subscription
AZURE_SUBSCRIPTION_ID=$SUBSCRIPTION_ID
AZURE_RESOURCE_GROUP=$RESOURCE_GROUP_NAME
AZURE_LOCATION=$LOCATION

# SQL Database Configuration
SQL_SERVER_NAME=$SQL_SERVER_NAME
SQL_DATABASE_NAME=$SQL_DATABASE_NAME
SQL_ADMIN_USER=$SQL_ADMIN_USER
SQL_ADMIN_PASSWORD=$SQL_ADMIN_PASSWORD
SQL_CONNECTION_STRING="$SQL_CONNECTION_STRING"

# Monitoring and Logging
APPLICATION_INSIGHTS_NAME=$APP_INSIGHTS_NAME
APPLICATION_INSIGHTS_KEY=$APP_INSIGHTS_KEY
LOG_ANALYTICS_WORKSPACE=$LOG_ANALYTICS_NAME

# AI Services
AI_SERVICES_NAME=$AI_SERVICES_NAME
AI_SERVICES_KEY=$AI_SERVICES_KEY

# Storage
STORAGE_ACCOUNT_NAME=$STORAGE_ACCOUNT_NAME
STORAGE_CONNECTION_STRING="$STORAGE_CONNECTION_STRING"

# Security
KEY_VAULT_NAME=$KEY_VAULT_NAME

# Development URLs
SQL_SERVER_URL=${SQL_SERVER_NAME}.database.windows.net
EOF

print_success "Configuration file created: $CONFIG_FILE"

# Setup database schema for workshop exercises
print_status "Setting up database schema for workshop exercises"

# Create SQL script for database initialization
cat > "$PWD/init-database.sql" << 'EOF'
-- Workshop Database Initialization Script
-- Creates tables and sample data for security exercises

-- Create Users table for SQL injection exercises
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    email NVARCHAR(100) NOT NULL,
    password_hash NVARCHAR(255) NOT NULL,
    created_date DATETIME2 DEFAULT GETDATE(),
    last_login DATETIME2 NULL,
    is_active BIT DEFAULT 1
);

-- Create sensitive_data table for security testing
CREATE TABLE sensitive_data (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES users(id),
    credit_card NVARCHAR(20),
    ssn NVARCHAR(12),
    phone NVARCHAR(15),
    address NVARCHAR(255)
);

-- Insert sample data for testing
INSERT INTO users (username, email, password_hash) VALUES
('alice.johnson', 'alice.johnson@example.com', 'hashed_password_1'),
('bob.smith', 'bob.smith@example.com', 'hashed_password_2'),
('charlie.brown', 'charlie.brown@example.com', 'hashed_password_3'),
('diana.prince', 'diana.prince@example.com', 'hashed_password_4'),
('eve.wilson', 'eve.wilson@example.com', 'hashed_password_5');

-- Insert sample sensitive data
INSERT INTO sensitive_data (user_id, credit_card, ssn, phone, address) VALUES
(1, '1234-5678-9012-3456', '123-45-6789', '555-0101', '123 Main St, Anytown USA'),
(2, '2345-6789-0123-4567', '234-56-7890', '555-0102', '456 Oak Ave, Somewhere USA'),
(3, '3456-7890-1234-5678', '345-67-8901', '555-0103', '789 Pine Rd, Elsewhere USA'),
(4, '4567-8901-2345-6789', '456-78-9012', '555-0104', '321 Elm St, Nowhere USA'),
(5, '5678-9012-3456-7890', '567-89-0123', '555-0105', '654 Maple Dr, Anywhere USA');

-- Create stored procedures for advanced exercises
CREATE PROCEDURE GetUserByUsername
    @Username NVARCHAR(50)
AS
BEGIN
    SELECT id, username, email, created_date, last_login, is_active
    FROM users
    WHERE username = @Username AND is_active = 1;
END;

CREATE PROCEDURE ValidateUser
    @Username NVARCHAR(50),
    @PasswordHash NVARCHAR(255)
AS
BEGIN
    SELECT COUNT(*) as IsValid
    FROM users
    WHERE username = @Username 
    AND password_hash = @PasswordHash 
    AND is_active = 1;
END;

-- Create indexes for performance exercises
CREATE INDEX IX_users_username ON users(username);
CREATE INDEX IX_users_email ON users(email);
CREATE INDEX IX_users_created_date ON users(created_date);

PRINT 'Workshop database schema created successfully!';
EOF

# Execute database initialization if sqlcmd is available
if command -v sqlcmd &> /dev/null; then
    print_status "Initializing database schema"
    sqlcmd -S "${SQL_SERVER_NAME}.database.windows.net" -d "$SQL_DATABASE_NAME" -U "$SQL_ADMIN_USER" -P "$SQL_ADMIN_PASSWORD" -i "init-database.sql"
    print_success "Database schema initialized successfully"
else
    print_warning "sqlcmd not found. Please run init-database.sql manually against your database"
fi

print_success "Azure infrastructure setup completed successfully!"
echo ""
print_status "Workshop Resources Created:"
echo "  • Resource Group: $RESOURCE_GROUP_NAME"
echo "  • SQL Server: $SQL_SERVER_NAME"
echo "  • SQL Database: $SQL_DATABASE_NAME"
echo "  • Application Insights: $APP_INSIGHTS_NAME"
echo "  • AI Services: $AI_SERVICES_NAME"
echo "  • Storage Account: $STORAGE_ACCOUNT_NAME"
echo "  • Key Vault: $KEY_VAULT_NAME"
echo ""
print_status "Configuration files created:"
echo "  • workshop-config.env (environment variables)"
echo "  • init-database.sql (database schema)"
echo ""
print_status "Next steps:"
echo "  1. Source the configuration: source workshop-config.env"
echo "  2. Start the workshop exercises!"
echo "  3. When finished, run: ./cleanup-azure-infrastructure.sh"
echo ""
print_warning "Important: This setup creates billable Azure resources."
print_warning "Remember to clean up resources when finished with the workshop."