# PowerShell Script for Azure Infrastructure Setup (Windows)
# AI-Powered DevOps Workshop - Azure Resources Creation

param(
    [Parameter(Mandatory=$false)]
    [string]$SubscriptionId = "",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "East US",
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipConfirmation = $false
)

# Workshop configuration
$WorkshopPrefix = "aidevops"
$ResourceGroupName = "$WorkshopPrefix-workshop-rg"
$SqlServerName = "$WorkshopPrefix-sql-server-$(Get-Date -Format 'yyyyMMddHHmm')"
$SqlDatabaseName = "$WorkshopPrefix-workshop-db"
$SqlAdminUser = "workshopadmin"
$SqlAdminPassword = "Workshop2024!"
$AppInsightsName = "$WorkshopPrefix-appinsights"
$LogAnalyticsName = "$WorkshopPrefix-loganalytics"
$AiServicesName = "$WorkshopPrefix-ai-services"
$StorageAccountName = "$WorkshopPrefix" + "storage" + (Get-Date -Format 'yyyyMMddHHmm')
$KeyVaultName = "$WorkshopPrefix-keyvault-$(Get-Date -Format 'yyyyMMddHHmm')"

# Color functions for output
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if Azure PowerShell module is installed
Write-Info "Checking Azure PowerShell module..."
if (-not (Get-Module -ListAvailable -Name Az)) {
    Write-Error "Azure PowerShell module is not installed."
    Write-Error "Please install it by running: Install-Module -Name Az -AllowClobber -Force"
    exit 1
}

# Check if user is logged in
try {
    $context = Get-AzContext
    if (-not $context) {
        throw "Not logged in"
    }
    Write-Success "Already logged in to Azure"
} catch {
    Write-Info "Please login to Azure..."
    Connect-AzAccount
    $context = Get-AzContext
    if (-not $context) {
        Write-Error "Failed to login to Azure"
        exit 1
    }
}

# Set subscription if provided
if ($SubscriptionId) {
    Write-Info "Setting subscription to: $SubscriptionId"
    Set-AzContext -SubscriptionId $SubscriptionId
}

# Get current subscription
$subscription = Get-AzContext
Write-Info "Using Azure Subscription: $($subscription.Subscription.Name) ($($subscription.Subscription.Id))"
Write-Info "Workshop resources will be created in: $Location"

# Confirmation
if (-not $SkipConfirmation) {
    $confirmation = Read-Host "Do you want to proceed with creating workshop resources? (y/N)"
    if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
        Write-Warning "Setup cancelled by user"
        exit 0
    }
}

Write-Info "Starting Azure infrastructure setup..."

try {
    # Create Resource Group
    Write-Info "Creating Resource Group: $ResourceGroupName"
    $resourceGroup = New-AzResourceGroup -Name $ResourceGroupName -Location $Location -Tag @{
        "Purpose" = "Workshop"
        "Project" = "AI-DevOps"
        "Environment" = "Learning"
    }
    Write-Success "Resource Group created successfully"

    # Create Log Analytics Workspace
    Write-Info "Creating Log Analytics Workspace: $LogAnalyticsName"
    $logAnalytics = New-AzOperationalInsightsWorkspace -ResourceGroupName $ResourceGroupName -Name $LogAnalyticsName -Location $Location -Sku "PerGB2018"
    Write-Success "Log Analytics Workspace created successfully"

    # Create Application Insights
    Write-Info "Creating Application Insights: $AppInsightsName"
    $appInsights = New-AzApplicationInsights -ResourceGroupName $ResourceGroupName -Name $AppInsightsName -Location $Location -WorkspaceResourceId $logAnalytics.ResourceId
    Write-Success "Application Insights created successfully"

    # Create Storage Account
    Write-Info "Creating Storage Account: $StorageAccountName"
    $storageAccount = New-AzStorageAccount -ResourceGroupName $ResourceGroupName -Name $StorageAccountName -Location $Location -SkuName "Standard_LRS" -Kind "StorageV2"
    Write-Success "Storage Account created successfully"

    # Create Key Vault
    Write-Info "Creating Key Vault: $KeyVaultName"
    $keyVault = New-AzKeyVault -ResourceGroupName $ResourceGroupName -VaultName $KeyVaultName -Location $Location -Sku "Standard"
    Write-Success "Key Vault created successfully"

    # Create SQL Server
    Write-Info "Creating SQL Server: $SqlServerName"
    $sqlServerCredential = New-Object System.Management.Automation.PSCredential($SqlAdminUser, (ConvertTo-SecureString $SqlAdminPassword -AsPlainText -Force))
    $sqlServer = New-AzSqlServer -ResourceGroupName $ResourceGroupName -ServerName $SqlServerName -Location $Location -SqlAdministratorCredentials $sqlServerCredential
    Write-Success "SQL Server created successfully"

    # Configure SQL Server firewall
    Write-Info "Configuring SQL Server firewall rules"
    New-AzSqlServerFirewallRule -ResourceGroupName $ResourceGroupName -ServerName $SqlServerName -FirewallRuleName "AllowAzureServices" -StartIpAddress "0.0.0.0" -EndIpAddress "0.0.0.0"
    
    # Allow current client IP
    $clientIp = (Invoke-WebRequest -Uri "https://ipinfo.io/ip" -UseBasicParsing).Content.Trim()
    New-AzSqlServerFirewallRule -ResourceGroupName $ResourceGroupName -ServerName $SqlServerName -FirewallRuleName "AllowClientIP" -StartIpAddress $clientIp -EndIpAddress $clientIp
    Write-Success "SQL Server firewall configured successfully"

    # Create SQL Database
    Write-Info "Creating SQL Database: $SqlDatabaseName"
    $sqlDatabase = New-AzSqlDatabase -ResourceGroupName $ResourceGroupName -ServerName $SqlServerName -DatabaseName $SqlDatabaseName -RequestedServiceObjectiveName "S0" -CollationName "SQL_Latin1_General_CP1_CI_AS"
    Write-Success "SQL Database created successfully"

    # Create AI Services
    Write-Info "Creating Azure AI Services: $AiServicesName"
    $aiServices = New-AzCognitiveServicesAccount -ResourceGroupName $ResourceGroupName -Name $AiServicesName -Type "CognitiveServices" -SkuName "S0" -Location $Location
    Write-Success "Azure AI Services created successfully"

    # Get connection strings and keys
    Write-Info "Retrieving connection strings and secrets..."
    
    $sqlConnectionString = "Server=tcp:$($SqlServerName).database.windows.net,1433;Initial Catalog=$SqlDatabaseName;Persist Security Info=False;User ID=$SqlAdminUser;Password=$SqlAdminPassword;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
    $appInsightsKey = $appInsights.InstrumentationKey
    $aiServicesKeys = Get-AzCognitiveServicesAccountKey -ResourceGroupName $ResourceGroupName -Name $AiServicesName
    $aiServicesKey = $aiServicesKeys.Key1
    $storageKeys = Get-AzStorageAccountKey -ResourceGroupName $ResourceGroupName -Name $StorageAccountName
    $storageConnectionString = "DefaultEndpointsProtocol=https;AccountName=$StorageAccountName;AccountKey=$($storageKeys[0].Value);EndpointSuffix=core.windows.net"

    # Store secrets in Key Vault
    Write-Info "Storing connection strings and secrets in Key Vault"
    $sqlConnectionStringSecure = ConvertTo-SecureString $sqlConnectionString -AsPlainText -Force
    $appInsightsKeySecure = ConvertTo-SecureString $appInsightsKey -AsPlainText -Force
    $aiServicesKeySecure = ConvertTo-SecureString $aiServicesKey -AsPlainText -Force
    $storageConnectionStringSecure = ConvertTo-SecureString $storageConnectionString -AsPlainText -Force

    Set-AzKeyVaultSecret -VaultName $KeyVaultName -Name "SqlConnectionString" -SecretValue $sqlConnectionStringSecure
    Set-AzKeyVaultSecret -VaultName $KeyVaultName -Name "ApplicationInsightsKey" -SecretValue $appInsightsKeySecure
    Set-AzKeyVaultSecret -VaultName $KeyVaultName -Name "AiServicesKey" -SecretValue $aiServicesKeySecure
    Set-AzKeyVaultSecret -VaultName $KeyVaultName -Name "StorageConnectionString" -SecretValue $storageConnectionStringSecure
    Write-Success "Secrets stored in Key Vault successfully"

    # Create configuration file
    $configFile = "workshop-config.env"
    Write-Info "Creating workshop configuration file: $configFile"
    
    $configContent = @"
# AI-Powered DevOps Workshop Configuration
# Generated on: $(Get-Date)

# Azure Subscription
AZURE_SUBSCRIPTION_ID=$($subscription.Subscription.Id)
AZURE_RESOURCE_GROUP=$ResourceGroupName
AZURE_LOCATION=$Location

# SQL Database Configuration
SQL_SERVER_NAME=$SqlServerName
SQL_DATABASE_NAME=$SqlDatabaseName
SQL_ADMIN_USER=$SqlAdminUser
SQL_ADMIN_PASSWORD=$SqlAdminPassword
SQL_CONNECTION_STRING="$sqlConnectionString"

# Monitoring and Logging
APPLICATION_INSIGHTS_NAME=$AppInsightsName
APPLICATION_INSIGHTS_KEY=$appInsightsKey
LOG_ANALYTICS_WORKSPACE=$LogAnalyticsName

# AI Services
AI_SERVICES_NAME=$AiServicesName
AI_SERVICES_KEY=$aiServicesKey

# Storage
STORAGE_ACCOUNT_NAME=$StorageAccountName
STORAGE_CONNECTION_STRING="$storageConnectionString"

# Security
KEY_VAULT_NAME=$KeyVaultName

# Development URLs
SQL_SERVER_URL=$SqlServerName.database.windows.net
"@

    $configContent | Out-File -FilePath $configFile -Encoding UTF8
    Write-Success "Configuration file created: $configFile"

    # Create database initialization script
    Write-Info "Creating database initialization script"
    $sqlScript = @"
-- Workshop Database Initialization Script
-- Creates tables and sample data for security exercises

-- Create Users table for SQL injection exercises
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
BEGIN
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(50) NOT NULL UNIQUE,
        email NVARCHAR(100) NOT NULL,
        password_hash NVARCHAR(255) NOT NULL,
        created_date DATETIME2 DEFAULT GETDATE(),
        last_login DATETIME2 NULL,
        is_active BIT DEFAULT 1
    );

    -- Insert sample data for testing
    INSERT INTO users (username, email, password_hash) VALUES
    ('alice.johnson', 'alice.johnson@example.com', 'hashed_password_1'),
    ('bob.smith', 'bob.smith@example.com', 'hashed_password_2'),
    ('charlie.brown', 'charlie.brown@example.com', 'hashed_password_3'),
    ('diana.prince', 'diana.prince@example.com', 'hashed_password_4'),
    ('eve.wilson', 'eve.wilson@example.com', 'hashed_password_5');

    -- Create indexes for performance exercises
    CREATE INDEX IX_users_username ON users(username);
    CREATE INDEX IX_users_email ON users(email);

    PRINT 'Workshop database schema created successfully!';
END
ELSE
BEGIN
    PRINT 'Workshop database already initialized';
END
"@

    $sqlScript | Out-File -FilePath "init-database.sql" -Encoding UTF8

    Write-Success "Azure infrastructure setup completed successfully!"
    Write-Host ""
    Write-Info "Workshop Resources Created:"
    Write-Host "  • Resource Group: $ResourceGroupName"
    Write-Host "  • SQL Server: $SqlServerName"
    Write-Host "  • SQL Database: $SqlDatabaseName"
    Write-Host "  • Application Insights: $AppInsightsName"
    Write-Host "  • AI Services: $AiServicesName"
    Write-Host "  • Storage Account: $StorageAccountName"
    Write-Host "  • Key Vault: $KeyVaultName"
    Write-Host ""
    Write-Info "Configuration files created:"
    Write-Host "  • workshop-config.env (environment variables)"
    Write-Host "  • init-database.sql (database schema)"
    Write-Host ""
    Write-Info "Next steps:"
    Write-Host "  1. Set environment variables from workshop-config.env"
    Write-Host "  2. Run init-database.sql against your database"
    Write-Host "  3. Start the workshop exercises!"
    Write-Host "  4. When finished, run: .\cleanup-azure-infrastructure.ps1"
    Write-Host ""
    Write-Warning "Important: This setup creates billable Azure resources."
    Write-Warning "Remember to clean up resources when finished with the workshop."

} catch {
    Write-Error "An error occurred during setup: $($_.Exception.Message)"
    Write-Error "Please check the error details and try again."
    exit 1
}