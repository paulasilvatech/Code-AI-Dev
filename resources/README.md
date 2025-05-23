# Workshop Resources - Azure Infrastructure Setup

Este diretório contém todos os scripts, templates e arquivos de configuração necessários para executar os exercícios do workshop "AI-Powered DevOps".

## 📋 Visão Geral

Os recursos fornecidos permitem que os participantes criem rapidamente a infraestrutura Azure necessária para os exercícios práticos do workshop, incluindo:

- **Banco de dados SQL Server** para exercícios de segurança
- **Azure AI Services** para integração de IA
- **Application Insights** para monitoramento
- **Key Vault** para gerenciamento seguro de secrets
- **Storage Account** para armazenamento de arquivos
- **Templates de CI/CD** para Azure DevOps e GitHub Actions

## 🚀 Início Rápido

### Pré-requisitos

- Conta Azure ativa
- Azure CLI ou Azure PowerShell instalado
- Permissões para criar recursos na subscription

### Configuração Rápida

1. **Clone o repositório:**
   ```bash
   git clone <repository-url>
   cd Code-AI-Dev/resources
   ```

2. **Execute o script de setup:**
   
   **Linux/macOS:**
   ```bash
   chmod +x setup-azure-infrastructure.sh
   ./setup-azure-infrastructure.sh
   ```
   
   **Windows (PowerShell):**
   ```powershell
   .\setup-azure-infrastructure.ps1
   ```

3. **Configure as variáveis de ambiente:**
   ```bash
   source workshop-config.env
   ```

4. **Inicie os exercícios do workshop!**

## 📁 Estrutura dos Arquivos

### Scripts de Infraestrutura

| Arquivo | Descrição |
|---------|-----------|
| `setup-azure-infrastructure.sh` | Script bash para criar recursos Azure (Linux/macOS) |
| `setup-azure-infrastructure.ps1` | Script PowerShell para criar recursos Azure (Windows) |
| `cleanup-azure-infrastructure.sh` | Script para remover todos os recursos criados |

### Templates de CI/CD

| Arquivo | Descrição |
|---------|-----------|
| `azure-devops-pipeline.yml` | Pipeline completo para Azure DevOps |
| `github-actions-workflow.yml` | Workflow para GitHub Actions |

### Templates de Código

| Arquivo | Descrição |
|---------|-----------|
| `DatabaseConnection.cs` | Classe C# para conexão segura com banco de dados |
| `DatabaseConnection.java` | Classe Java para conexão segura com banco de dados |
| `appsettings.json` | Configurações para aplicações .NET |
| `application.properties` | Configurações para aplicações Java/Spring |

### Outros Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `multi_agent_orchestrator.py` | Sistema de orquestração multi-agente |
| `workshop-config.env` | Variáveis de ambiente (gerado pelo script) |
| `init-database.sql` | Script de inicialização do banco (gerado pelo script) |

## ⚙️ Configuração Detalhada

### 1. Recursos Azure Criados

O script de setup cria os seguintes recursos com nomenclatura padronizada:

- **Resource Group**: `aidevops-workshop-rg`
- **SQL Server**: `aidevops-sql-server-[timestamp]`
- **SQL Database**: `aidevops-workshop-db`
- **Application Insights**: `aidevops-appinsights`
- **AI Services**: `aidevops-ai-services`
- **Storage Account**: `aidevopsstorage[timestamp]`
- **Key Vault**: `aidevops-keyvault-[timestamp]`

### 2. Configurações Padrão

#### Credenciais de Banco de Dados
- **Usuário**: `workshopadmin`
- **Senha**: `Workshop2024!`
- **Localização**: `East US`

#### Configurações de Segurança
- SSL/TLS habilitado por padrão
- Firewall configurado para Azure Services
- IP do cliente atual incluído automaticamente
- Secrets armazenados no Key Vault

### 3. Estrutura do Banco de Dados

O script cria automaticamente:

```sql
-- Tabela para exercícios de segurança
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    email NVARCHAR(100) NOT NULL,
    password_hash NVARCHAR(255) NOT NULL,
    created_date DATETIME2 DEFAULT GETDATE(),
    last_login DATETIME2 NULL,
    is_active BIT DEFAULT 1
);

-- Dados de exemplo inseridos automaticamente
```

## 🔧 Personalização

### Modificar Configurações Padrão

Edite as variáveis no início dos scripts para personalizar:

```bash
# setup-azure-infrastructure.sh
WORKSHOP_PREFIX="seu-prefixo"
LOCATION="sua-regiao"
SQL_ADMIN_PASSWORD="sua-senha-segura"
```

### Configurações Específicas do Projeto

Modifique os arquivos de configuração conforme necessário:

- **appsettings.json**: Para aplicações .NET
- **application.properties**: Para aplicações Java/Spring

## 🚨 Exercícios de Segurança

### SQL Injection Prevention

Os templates incluem exemplos seguros e vulneráveis para demonstração:

**❌ Código Vulnerável (para demonstração):**
```csharp
string query = $"SELECT * FROM users WHERE username = '{username}'";
```

**✅ Código Seguro (para uso):**
```csharp
string query = "SELECT * FROM users WHERE username = @username";
command.Parameters.AddWithValue("@username", username);
```

## 📊 Monitoramento e IA

### Application Insights

Configurado automaticamente para monitorar:
- Performance da aplicação
- Erros e exceções
- Métricas customizadas
- Análise de uso

### Azure AI Services

Integração pronta para:
- Análise de código com IA
- Detecção de anomalias
- Otimização de performance
- Segurança preditiva

## 🔄 CI/CD Templates

### Azure DevOps Pipeline

Inclui estágios para:
- Build e testes
- Análise de segurança com IA
- Deploy para desenvolvimento
- Deploy para produção
- Monitoramento contínuo

### GitHub Actions Workflow

Inclui jobs para:
- Build e testes com AI assistance
- Code review automatizado com IA
- Deploy para Azure
- Monitoramento pós-deploy

## 🧹 Limpeza de Recursos

**IMPORTANTE**: Para evitar custos desnecessários, sempre execute o script de limpeza após o workshop:

```bash
./cleanup-azure-infrastructure.sh
```

Este script remove **TODOS** os recursos criados pelo workshop.

## 🔐 Segurança

### Boas Práticas Implementadas

- ✅ Passwords seguros com complexidade adequada
- ✅ SSL/TLS habilitado por padrão
- ✅ Firewall configurado restritivamente
- ✅ Secrets armazenados no Key Vault
- ✅ Conexões parameterizadas nos exemplos
- ✅ Validação de entrada implementada

### Para Produção

**⚠️ NUNCA use em produção sem modificar:**
- Passwords padrão
- Configurações de firewall
- Chaves de exemplo
- Configurações de desenvolvimento

## 🆘 Solução de Problemas

### Erro: "Insufficient permissions"
- Verifique se tem permissões de Contributor na subscription
- Confirme se está logado com a conta correta

### Erro: "Resource name already exists"
- Os nomes incluem timestamp para evitar conflitos
- Se ainda houver conflito, modifique o WORKSHOP_PREFIX

### Erro: "Region not available"
- Alguns serviços não estão disponíveis em todas as regiões
- Use "East US" como padrão (testado e funcional)

### Erro: "Database connection failed"
- Verifique se o firewall está configurado corretamente
- Confirme se o IP atual está nas regras de firewall
- Aguarde alguns minutos após a criação dos recursos

## 💡 Dicas para o Workshop

1. **Execute o setup com antecedência** - A criação dos recursos pode levar 10-15 minutos
2. **Mantenha o arquivo de configuração** - Contém todas as informações necessárias
3. **Use o Key Vault** - Para acessar secrets de forma segura
4. **Monitore custos** - Configure alertas de billing se necessário
5. **Documente modificações** - Para facilitar troubleshooting

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte os logs de execução dos scripts
2. Verifique a documentação do Azure
3. Use o troubleshooting guide do workshop
4. Contate o instrutor do workshop

---

**Versão**: 1.0  
**Última atualização**: Janeiro 2024  
**Compatibilidade**: Azure CLI 2.0+, PowerShell 5.1+