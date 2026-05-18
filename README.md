# Conecta Itajaí 🚀
> Vitrine digital simplificada para inclusão digital e fortalecimento do comércio artesanal e local em Itajaí, SC.

Este repositório armazena o código-fonte e a documentação técnica do projeto **Conecta Itajaí**, desenvolvido como parte do projeto de extensão do curso de Análise e Desenvolvimento de Sistemas da Univali.

---

## 📌 Status do Projeto
* **Etapa 1 (Concluída):** Idealização, Prova de Conceito, Alocação no Scrum e Modelagem de Negócios (Canvas de Proposta de Valor, BMC e Canvas MVP).
* **Etapa 2 (Planeada):** Estruturação do ambiente, desenvolvimento dos componentes do MVP e preparação para testes de usabilidade.

---

## 🛠️ Stack Tecnológica (Planeada)
A arquitetura do MVP foi desenhada para garantir baixo custo de manutenção, alta responsividade e performance mobile-first:

* **Frontend:** JavaScript / React (Interface dinâmica e componentizada)
* **Backend & Banco de Dados:** Firebase (Persistência de catálogo e autenticação ágil)
* **Integrações:** API nativa do WhatsApp (Disparo de pedidos estruturados sem intermediários financeiros)
* **Hospedagem/Deploy:** Vercel

---

## 📁 Estrutura de Pastas do Repositório (Arquitetura)
O projeto seguirá o padrão arquitetural clássico do React para o MVP:

```text
├── public/          # Arquivos estáticos e ícones do PWA
├── src/
│   ├── assets/      # Imagens e estilizações globais
│   ├── components/  # Componentes reutilizáveis (Card, Vitrine, Botão)
│   ├── config/      # Inicialização e credenciais do Firebase
│   ├── pages/       # Telas principais (Catálogo do Cliente / Painel do Vendedor)
│   ├── App.js       # Componente raiz com o roteamento
│   └── index.js     # Ponto de entrada do React
├── .gitignore       # Bloqueio de variáveis de ambiente e node_modules
├── package.json     # Gerenciamento de dependências e scripts do Node
└── README.md        # Documentação principal do projeto
⚙️ Como Executar o Projeto (Futuramente)
Após a liberação dos arquivos-fonte da Etapa 2, os passos para execução local serão:

Clonar o repositório:

Bash
git clone [https://github.com/kryusgg/how-x.git](https://github.com/kryusgg/how-x.git)
Instalar as dependências do projeto:

Bash
npm install
Inicializar o servidor de desenvolvimento:

Bash
npm start
📄 Licença
Este projeto está sob a licença MIT.



