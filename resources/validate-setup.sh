#!/bin/bash

# Workshop Setup Validation Script
# This script validates that all Azure resources were created correctly

set -e

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

# Workshop configuration
WORKSHOP_PREFIX="aidevops"
RESOURCE_GROUP_NAME="${WORKSHOP_PREFIX}-workshop-rg"

# Validation counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

# Function to run validation check
run_check() {
    local description="$1"
    local command="$2"
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    print_status "Checking: $description"
    
    if eval "$command" > /dev/null 2>&1; then
        print_success "✓ $description"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
        return 0
    else
        print_error "✗ $description"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
        return 1
    fi
}

print_status "Starting workshop setup validation..."
echo ""

# Check if Azure CLI is installed
run_check "Azure CLI installation" "az --version"

# Check if user is logged in
run_check "Azure authentication" "az account show"

# Get subscription info
if az account show > /dev/null 2>&1; then
    SUBSCRIPTION_ID=$(az account show --query id -o tsv)
    SUBSCRIPTION_NAME=$(az account show --query name -o tsv)
    print_status "Using subscription: $SUBSCRIPTION_NAME ($SUBSCRIPTION_ID)"
    echo ""
fi

# Check if resource group exists
run_check "Resource group exists" "az group show --name $RESOURCE_GROUP_NAME"

if az group show --name "$RESOURCE_GROUP_NAME" > /dev/null 2>&1; then
    print_status "Validating workshop resources in: $RESOURCE_GROUP_NAME"
    echo ""
    
    # Get all resources in the resource group
    resources=$(az resource list --resource-group "$RESOURCE_GROUP_NAME" --query "[].{Name:name, Type:type}" -o tsv)
    
    if [ -z "$resources" ]; then
        print_error "No resources found in resource group"
    else
        print_status "Found resources:"
        echo "$resources" | while IFS=$'\t' read -r name type; do
            echo "  • $name ($type)"
        done
        echo ""
    fi
    
    # Validate specific resource types
    run_check "SQL Server exists" "az sql server list --resource-group $RESOURCE_GROUP_NAME --query '[0].name' -o tsv"
    
    run_check "SQL Database exists" "az sql db list --resource-group $RESOURCE_GROUP_NAME --server \$(az sql server list --resource-group $RESOURCE_GROUP_NAME --query '[0].name' -o tsv) --query '[0].name' -o tsv"
    
    run_check "Application Insights exists" "az monitor app-insights component show --resource-group $RESOURCE_GROUP_NAME --app \$(az monitor app-insights component list --resource-group $RESOURCE_GROUP_NAME --query '[0].name' -o tsv)"
    
    run_check "Storage Account exists" "az storage account list --resource-group $RESOURCE_GROUP_NAME --query '[0].name' -o tsv"
    
    run_check "Key Vault exists" "az keyvault list --resource-group $RESOURCE_GROUP_NAME --query '[0].name' -o tsv"
    
    run_check "AI Services exists" "az cognitiveservices account list --resource-group $RESOURCE_GROUP_NAME --query '[0].name' -o tsv"
    
    # Test database connectivity if sqlcmd is available
    if command -v sqlcmd > /dev/null 2>&1; then
        if [ -f "workshop-config.env" ]; then
            source workshop-config.env
            print_status "Testing database connectivity..."
            
            if sqlcmd -S "$SQL_SERVER_URL" -d "$SQL_DATABASE_NAME" -U "$SQL_ADMIN_USER" -P "$SQL_ADMIN_PASSWORD" -Q "SELECT @@VERSION" > /dev/null 2>&1; then
                print_success "✓ Database connectivity test"
                PASSED_CHECKS=$((PASSED_CHECKS + 1))
            else
                print_error "✗ Database connectivity test"
                FAILED_CHECKS=$((FAILED_CHECKS + 1))
            fi
            TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
        else
            print_warning "workshop-config.env not found, skipping database connectivity test"
        fi
    else
        print_warning "sqlcmd not found, skipping database connectivity test"
    fi
    
    # Validate configuration files
    echo ""
    print_status "Validating configuration files..."
    
    run_check "workshop-config.env exists" "test -f workshop-config.env"
    run_check "init-database.sql exists" "test -f init-database.sql"
    
    # Check if secrets are stored in Key Vault
    if az keyvault list --resource-group "$RESOURCE_GROUP_NAME" --query '[0].name' -o tsv > /dev/null 2>&1; then
        KEY_VAULT_NAME=$(az keyvault list --resource-group "$RESOURCE_GROUP_NAME" --query '[0].name' -o tsv)
        print_status "Checking Key Vault secrets..."
        
        run_check "SQL connection string secret" "az keyvault secret show --vault-name $KEY_VAULT_NAME --name SqlConnectionString"
        run_check "Application Insights key secret" "az keyvault secret show --vault-name $KEY_VAULT_NAME --name ApplicationInsightsKey"
        run_check "AI Services key secret" "az keyvault secret show --vault-name $KEY_VAULT_NAME --name AiServicesKey"
        run_check "Storage connection string secret" "az keyvault secret show --vault-name $KEY_VAULT_NAME --name StorageConnectionString"
    fi
    
else
    print_error "Resource group not found. Please run the setup script first."
fi

# Validate template files
echo ""
print_status "Validating template files..."

run_check "Azure DevOps pipeline template" "test -f azure-devops-pipeline.yml"
run_check "GitHub Actions workflow template" "test -f github-actions-workflow.yml"
run_check "C# database connection template" "test -f DatabaseConnection.cs"
run_check "Java database connection template" "test -f DatabaseConnection.java"
run_check "appsettings.json template" "test -f appsettings.json"
run_check "application.properties template" "test -f application.properties"

# Check for required tools
echo ""
print_status "Checking development tools..."

run_check "Git installation" "git --version"
run_check "Visual Studio Code availability" "code --version || which code"

# Optional tools
if command -v dotnet > /dev/null 2>&1; then
    run_check ".NET SDK installation" "dotnet --version"
else
    print_warning ".NET SDK not found (optional for Java track)"
fi

if command -v java > /dev/null 2>&1; then
    run_check "Java installation" "java -version"
else
    print_warning "Java not found (optional for .NET track)"
fi

if command -v mvn > /dev/null 2>&1; then
    run_check "Maven installation" "mvn -version"
else
    print_warning "Maven not found (optional for .NET track)"
fi

# Summary
echo ""
echo "=========================================="
print_status "VALIDATION SUMMARY"
echo "=========================================="
print_status "Total checks: $TOTAL_CHECKS"
print_success "Passed: $PASSED_CHECKS"

if [ $FAILED_CHECKS -gt 0 ]; then
    print_error "Failed: $FAILED_CHECKS"
    echo ""
    print_warning "Some validation checks failed. Please review the output above."
    print_warning "You may need to:"
    print_warning "  • Re-run the setup script"
    print_warning "  • Check Azure permissions"
    print_warning "  • Install missing tools"
    print_warning "  • Wait for resources to fully provision"
    exit 1
else
    echo ""
    print_success "🎉 All validation checks passed!"
    print_success "Your workshop environment is ready!"
    echo ""
    print_status "Next steps:"
    echo "  1. Load environment variables: source workshop-config.env"
    echo "  2. Open your preferred IDE (VS Code recommended)"
    echo "  3. Start with Module 1 of the workshop guide"
    echo ""
    print_status "Happy coding! 🚀"
fi