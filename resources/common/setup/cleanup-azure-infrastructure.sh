#!/bin/bash

# Azure Infrastructure Cleanup Script for AI-Powered DevOps Workshop
# This script removes all workshop resources to avoid ongoing charges

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

# Workshop configuration
WORKSHOP_PREFIX="aidevops"
RESOURCE_GROUP_NAME="${WORKSHOP_PREFIX}-workshop-rg"

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

# Check if resource group exists
if ! az group exists --name "$RESOURCE_GROUP_NAME" &> /dev/null; then
    print_warning "Resource group '$RESOURCE_GROUP_NAME' does not exist."
    print_warning "No workshop resources found to clean up."
    exit 0
fi

# Show resources that will be deleted
print_status "Workshop resources found in resource group: $RESOURCE_GROUP_NAME"
az resource list --resource-group "$RESOURCE_GROUP_NAME" --output table

echo ""
print_warning "This will DELETE ALL workshop resources and cannot be undone!"
print_warning "All data in databases and storage accounts will be permanently lost!"

# Confirmation prompt
read -p "Are you sure you want to delete all workshop resources? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Cleanup cancelled by user"
    exit 0
fi

# Additional confirmation for safety
read -p "Type 'DELETE' to confirm permanent deletion of all workshop resources: " confirm
if [[ "$confirm" != "DELETE" ]]; then
    print_warning "Cleanup cancelled - confirmation text did not match"
    exit 0
fi

print_status "Starting cleanup of workshop resources..."

# Delete the entire resource group (this deletes all contained resources)
print_status "Deleting resource group: $RESOURCE_GROUP_NAME"
print_status "This may take several minutes..."

az group delete \
    --name "$RESOURCE_GROUP_NAME" \
    --yes \
    --no-wait

print_success "Resource group deletion initiated"
print_status "Deletion is running in the background and may take several minutes to complete"

# Clean up local configuration files
CONFIG_FILE="$PWD/workshop-config.env"
if [[ -f "$CONFIG_FILE" ]]; then
    print_status "Removing local configuration file: $CONFIG_FILE"
    rm "$CONFIG_FILE"
    print_success "Local configuration file removed"
fi

SQL_SCRIPT="$PWD/init-database.sql"
if [[ -f "$SQL_SCRIPT" ]]; then
    print_status "Removing database initialization script: $SQL_SCRIPT"
    rm "$SQL_SCRIPT"
    print_success "Database script removed"
fi

print_success "Workshop cleanup completed!"
echo ""
print_status "Summary:"
echo "  • Resource group deletion initiated: $RESOURCE_GROUP_NAME"
echo "  • Local configuration files removed"
echo ""
print_status "All workshop resources will be deleted within the next few minutes."
print_status "You can verify completion in the Azure Portal or by running:"
print_status "az group exists --name '$RESOURCE_GROUP_NAME'"
echo ""
print_success "Thank you for using the AI-Powered DevOps Workshop!"