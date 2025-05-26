# Deploy via GitHub Actions

Este projeto está configurado para fazer deploy **APENAS** via GitHub Actions. Não use `npm run deploy` localmente.

## 🚀 Como funciona o Deploy Automático

### 1. **Deploy Automático**
O deploy acontece automaticamente quando:
- Você faz push de mudanças no diretório `website-react/`
- Você faz push de mudanças nos workflows

### 2. **Deploy Manual**
Para fazer deploy manualmente via GitHub Actions:

1. Vá para a aba **Actions** no GitHub
2. Selecione um dos workflows:
   - **"Deploy React Site to GitHub Pages"**
   - **"Deploy React Site with gh-pages"**
3. Clique em **"Run workflow"**
4. Selecione a branch `main`
5. Clique no botão verde **"Run workflow"**

## 📋 Workflows Disponíveis

### Deploy React Site to GitHub Pages
- **Arquivo**: `.github/workflows/deploy-react-site.yml`
- **Trigger**: Push em `website-react/**` ou manual
- **Ações**: Build e deploy usando peaceiris/actions-gh-pages

### Deploy React Site with gh-pages
- **Arquivo**: `.github/workflows/deploy-react-gh-pages.yml`
- **Trigger**: Push em `website-react/**` ou manual
- **Ações**: Build e deploy usando peaceiris/actions-gh-pages

## 🔧 Configurações Importantes

- **Node.js**: versão 18
- **Install**: usa `npm install --legacy-peer-deps`
- **Branch de deploy**: `gh-pages`
- **Permissões**: `contents: write, pages: write, id-token: write`

## ⚠️ NÃO use deploy local

**NÃO execute** os seguintes comandos localmente:
```bash
# NÃO USE ESTES COMANDOS
npm run deploy
npm run predeploy
```

Todo deploy deve ser feito via GitHub Actions para garantir consistência e segurança.

## 🐛 Troubleshooting

Se o workflow falhar:
1. Verifique os logs na aba Actions
2. Certifique-se de que o `package-lock.json` está commitado
3. Verifique se as permissões do workflow estão corretas
4. Confirme que a branch `gh-pages` existe

## 📊 Status do Deploy

Para verificar o status:
1. Aba **Actions** → veja os workflows executados
2. Aba **Settings** → **Pages** → veja o status do GitHub Pages
3. Acesse: https://paulasilvatech.github.io/Code-AI-Dev/ 