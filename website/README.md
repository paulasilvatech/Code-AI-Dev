# AI Code Development Landing Page

Esta é a landing page do workshop **AI-Powered Code Development** construída com React, TypeScript, Vite e Tailwind CSS.

## 🚀 Deploy Automático via GitHub Actions

O deploy é feito automaticamente via GitHub Actions para GitHub Pages sempre que houver:

- Push para a branch `main` com alterações no diretório `website/`
- Execução manual do workflow

### Como funciona o deploy:

1. **Trigger**: Push para `main` ou execução manual
2. **Build**: 
   - Instala dependências com `npm ci`
   - Executa build com `npm run build`
   - Gera arquivos estáticos na pasta `dist/`
3. **Deploy**: Publica automaticamente no GitHub Pages

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Node.js 18+
- npm

### Comandos disponíveis:

```bash
# Instalar dependências
npm install

# Desenvolvimento (servidor local)
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

## 📁 Estrutura do Projeto

```
website/
├── src/
│   ├── components/
│   │   └── LandingPageComplete.tsx  # Componente principal
│   ├── App.tsx                      # App principal
│   ├── main.tsx                     # Ponto de entrada
│   └── index.css                    # Estilos globais
├── public/                          # Arquivos estáticos
├── index.html                       # Template HTML
├── package.json                     # Dependências
├── vite.config.ts                   # Configuração Vite
├── tailwind.config.js               # Configuração Tailwind
└── tsconfig.json                    # Configuração TypeScript
```

## 🎨 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Ícones

## 🌐 URLs

- **Site ao vivo**: https://paulasilvatech.github.io/Code-AI-Dev/
- **Repositório**: https://github.com/paulasilvatech/Code-AI-Dev

## 📋 Features Implementadas

✅ **Modal interativo** para módulos do workshop  
✅ **Formulário de solicitação de acesso** com validação  
✅ **Design responsivo** com gradientes purple/pink  
✅ **Logo customizado** com animações  
✅ **Seções completas**: Hero, Módulos, Impacto, Formulário  
✅ **Deploy automático** via GitHub Actions  

## 🔄 Fluxo de Deploy

1. Desenvolva localmente
2. Commit e push para `main`
3. GitHub Actions automaticamente:
   - Faz build do projeto
   - Deploy para GitHub Pages
   - Site atualizado em ~2-3 minutos

## 🐛 Troubleshooting

### Build falhando:
- Verifique se todas as dependências estão instaladas
- Execute `npm run build` localmente para testar

### Deploy não funcionando:
- Verifique se GitHub Pages está habilitado no repositório
- Confirme que as permissões do workflow estão corretas
- Veja os logs do GitHub Actions para detalhes

## 📞 Suporte

Em caso de problemas com o deploy ou desenvolvimento, verifique:
1. Logs do GitHub Actions
2. Console do navegador para erros
3. Configurações do repositório no GitHub 