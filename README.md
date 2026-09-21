# Front-end Finances

Aplicação web de finanças pessoais construída com **Next.js 16** e **React 19**. Consome a API [`backend-finances-api`](https://github.com/LeonardoRoche/backend-finances-api) para exibir dashboard, transações, orçamentos e conexões bancárias via Open Finance (Pluggy).

## Funcionalidades

- **Visão geral** — KPIs de saldo, gastos, PIX/TED e cartões de crédito
- **Transações** — listagem, filtros, criação, edição e exclusão
- **Orçamentos** — limites por categoria com acompanhamento de gastos
- **Conexões** — conectar bancos, sincronizar e recategorizar transações

## Pré-requisitos

- Node.js 20+
- npm
- API backend rodando em `http://localhost:3001`

## Como rodar

1. Clone o repositório:

```bash
git clone git@github.com:LeonardoRoche/front-end-finances.git
cd front-end-finances
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse [http://localhost:3000](http://localhost:3000)

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NEXT_PUBLIC_API_URL` | URL da API backend | `http://localhost:3001` |

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | ESLint |

## Estrutura principal

```
app/
├── (auth)/          # Páginas autenticadas (home, transaction, budget, connections)
├── components/      # Componentes reutilizáveis
├── lib/             # API client, hooks e utilitários
└── types/           # Tipos TypeScript por área da aplicação
```

## Repositório relacionado

- **Backend:** [backend-finances-api](https://github.com/LeonardoRoche/backend-finances-api)
