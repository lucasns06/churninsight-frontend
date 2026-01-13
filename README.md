<h1 id="inicio" align="center">
ChurnInsight — Previsão de Churn<br>Front End<br>

<p align="center">
  <img src="./src/assets/gifDemo.gif" alt="Pagina inicial do ChurnInsight" width="100%">
</p>

<h2 align="center">📑 Sumário</h2>

- [Visão Geral do Projeto](#visao-geral)
- [Tecnologias Utilizadas](#tecnologias)
- [Estrutura do Projeto](#estrutura)
- [Pré Requisitos](#pre-requisitos)
- [Como Executar o Projeto](#como-executar)

---

<h2 id="visao-geral" align="center">Visão Geral do Projeto</h2>

O **ChurnInsight** é uma solução desenvolvida durante o **Hackathon da Alura** com o objetivo de prever o risco de **cancelamento de clientes (churn)** em serviços recorrentes, como bancos digitais, plataformas de assinatura e soluções SaaS.

A plataforma integra **Data Science** e **Backend** para transformar dados de clientes em **insights acionáveis**, permitindo que empresas antecipem riscos de evasão e tomem decisões baseadas em dados.

Este repositório corresponde ao **Front-End da aplicação**, desenvolvido como um **MVP funcional**, com foco em clareza, usabilidade e integração com a API de previsão.

[Acesse o site aqui!](https://churninsight-frontend.vercel.app/)

#### Repositórios relacionados

- [Backend](https://github.com/renancvitor/churninsight-backend-h12-25b)
- [Data-Science](https://github.com/LeticiaPaesano/Churn_Hackathon)

<p align="right"><a href="#inicio">⬆️ Voltar ao início</a></p>

---

<h2 id="tecnologias" align="center">Tecnologias Utilizadas e Versões</h2>

### Front End

- ⚛️ React - v19.2.0
- 🟨 JavaScript
- 🎨 Tailwind CSS - v4.1.18
- 🎨 Headlessui - v2.2.9
- 🎨 Heroicons - v2.2.0
- 🎨 Tsparticles - v3.0.0
- 🔌 Axios v1.13.2
- ⚡ Vite - v7.2.4

<p align="right"><a href="#inicio">⬆️ Voltar ao início</a></p>

---

<h2 id="estrutura" align="center">📁 Estrutura do Projeto</h2>

```plaintext
churninsight-frontend/
 └── src/
      ├── @types/         # Interfaces
      ├── assets/         # Imagens e ícones
      ├── components/     # Componentes reutilizáveis (UI)
      |     ├── effects/  # Particulas
      |     ├──  layout/  # Navbar, Footer
      ├── constants/      # Dados estáticos
      ├── pages/          # Páginas
      ├── services/       # Comunicação com a API
      ├── App.tsx         # Página princípal
```

<p align="right"><a href="#inicio">⬆️ Voltar ao início</a></p>

---

<h2 id="pre-requisitos" align="center">Pré-requisitos</h2>

Antes de executar o projeto, é necessário ter o Node.js instalado no sistema.
O Node.js inclui o NPM (Node Package Manager) e o NPX, que são utilizados para instalar dependências e executar o projeto.

👉 Download: https://nodejs.org

Versão recomendada: LTS

---

<h2 id="como-executar" align="center">Como Executar o Projeto</h2>

Instalar as dependências

```bash
npm install
```

Rodar

```bash
npx vite
```

<p align="right"><a href="#inicio">⬆️ Voltar ao início</a></p>

---
