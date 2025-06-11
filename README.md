
# 💸 GastoSmart

**GastoSmart** é uma aplicação de controle financeiro pessoal desenvolvida em **React.js**, com o objetivo de ajudar usuários a registrar, visualizar e analisar suas receitas e despesas de forma simples e intuitiva.

## 🚀 Tecnologias Utilizadas

- [React.js](https://reactjs.org/)
- [Chart.js](https://www.chartjs.org/) para gráficos
- [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) para geração de relatórios em PDF
- CSS puro para estilização
- Local Storage para persistência de dados (frontend)

## 📁 Estrutura de Pastas
<br>
GastoSmart-master/
<br>
├── public/ # Arquivos públicos e estáticos
<br>
├── src/ # Código-fonte principal
<br>
│ ├── components/ # Componentes React modulares
<br>
│ ├── lib/ # Utilitários e funções auxiliares
<br>
│ ├── types/ # Tipagens de objetos (transações, usuários)
<br>
│ ├── App.js # Componente principal da aplicação
<br>
│ └── index.js # Ponto de entrada da aplicação

## ⚙️ Como Rodar o Projeto
```
  1. Clone este repositório:
   git clone https://github.com/seu-usuario/GastoSmart.git

  2.Instale as dependências:
    npm install

  3.Inicie o projeto:
    npm start
````

## 📦 Explicação dos Principais Componentes
### 1. App.js
É o ponto central da aplicação. Define rotas, contexto global (como autenticação) e organiza os principais componentes da interface.

### 2. components/
Cada pasta representa um componente modular:

### 🔐 Login/ & Register/
Permitem autenticação fictícia do usuário (sem backend).

Simulam sessão usando localStorage.

### 🧾 Add-Transations/
Componente de formulário para adicionar nova transação (renda ou despesa).

Atualiza o contexto global.

### 📋 Transations-List/
Lista todas as transações do usuário.

Permite remover itens.

### ⚖️ Balance/ & IncomeExpenses/
Exibem o saldo total, entradas e saídas.

São recalculados dinamicamente.

### 📊 Analics/ & Ui/Chart*
Mostram gráficos estatísticos usando Chart.js.

Grupos por categorias, comparação mês a mês, etc.

### 📁 Dashboard/
Página principal com todos os dados financeiros agregados.

Serve como painel de controle central.

### 3. lib/
### 🧰 Utils.js
Funções auxiliares para formatação de datas, cálculos de totais, etc.

### 🧾 GeneraitorPdf.js
Gera relatório PDF com os dados do usuário usando html2pdf.

### 4. types/
Define tipagens para transações e usuários, útil para padronização e prevenção de erros.
