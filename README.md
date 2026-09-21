# Front-end Finances

Aplicação web de **finanças pessoais** construída com **Next.js 16**, **React 19** e **React Query**. Integra com Open Finance (Pluggy) para dashboard, transações, orçamentos, investimentos e conexões bancárias.

## Funcionalidades

- **Visão geral** — saldo, gastos, PIX/TED, cartões e **total investido**
- **Transações** — listagem, filtros, criação, edição e exclusão
- **Orçamentos** — limites por categoria com acompanhamento de gastos
- **Conexões** — conectar bancos, sincronizar e recategorizar transações
- **SSR** — dados pré-carregados no servidor com `initialData` no React Query

## Stack

| Área | Tecnologia |
|------|------------|
| Framework | Next.js 16 (App Router) |
| UI | Tailwind CSS 4, Base UI, Lucide |
| Estado servidor | TanStack React Query v5 |
| Open Finance | Pluggy Connect SDK |
| Linguagem | TypeScript |

## Pré-requisitos

- Node.js 20+
- npm
- [backend-finances-api](https://github.com/LeonardoRoche/backend-finances-api) rodando

## Como rodar

```bash
git clone git@github.com:LeonardoRoche/front-end-finances.git
cd front-end-finances
npm install
cp .env.example .env
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_API_URL` | URL da API (`http://localhost:3001`) |

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Produção |
| `npm run lint` | ESLint |

## Estrutura

```
app/
├── (auth)/       # home, transaction, budget, connections
├── components/   # UI reutilizável
├── lib/          # API, hooks, utils
└── types/        # tipos por área
```

## Repositório relacionado

- **Backend:** [backend-finances-api](https://github.com/LeonardoRoche/backend-finances-api)
