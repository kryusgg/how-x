# Conecta Itajaí 🚀

O **Conecta Itajaí** é um MVP (Minimum Viable Product) desenvolvido como projeto acadêmico para o curso de Análise e Desenvolvimento de Sistemas. A plataforma funciona como uma vitrine digital integrada, projetada para apoiar microempreendedores e confeiteiros autônomos locais, permitindo a divulgação de seus produtos e a automação de pedidos de forma gratuita e sem taxas intermediárias.

## 🔗 Links do Projeto
* **Site Oficial (Deploy na Vercel):** (https://how-x.vercel.app/)
* **Vídeo Demonstrativo do MVP:** https://www.youtube.com/watch?v=uJ6hhQe2tp4

---

## ✨ Funcionalidades Principais

* **Vitrine Inteligente (UX Clientes):** Navegação fluida por categorias (Bolos, Doces e Copos da Felicidade) evitando poluição visual na tela.
* **Redirecionamento Dinâmico (WhatsApp):** O sistema opera em modelo *multi-vendedor*. Cada produto possui o número do seu respectivo dono; ao clicar em pedir, o cliente é direcionado ao WhatsApp correto com a mensagem preenchida.
* **Autenticação e Sessão Segura:** Tela de login e cadastro dinâmicos com persistência via `localStorage` (o usuário permanece conectado ao navegar entre as telas).
* **Painel do Vendedor Isolado (Multi-tenancy):** Proteção e isolamento de dados por e-mail. Um vendedor cadastrado só visualiza, gerencia e exclui os seus próprios produtos.
* **Máscara de Moeda Automática:** Campo de preço inteligente que formata o valor em tempo real no padrão brasileiro (R$) enquanto o usuário digita.
* **Upload Real de Imagens:** Integração com a API do ImgBB para processamento e armazenamento gratuito de fotos na nuvem.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React.js + Vite (JavaScript / HTML5 / CSS3)
* **Banco de Dados:** Firebase Cloud Firestore (NoSQL em tempo real)
* **Hospedagem / Deploy:** Vercel
* **Armazenamento de Imagens:** API ImgBB

---

## 🚀 Como Executar o Projeto Localmente

Se desejar rodar este projeto em ambiente de desenvolvimento, siga os passos abaixo:

1. Clone o repositório:
```bash
   git clone [https://github.com/kryusgg/how-x.git](https://github.com/kryusgg/how-x.git)
   
2.  Entre na pasta do projeto:

Bash
   cd how-x

3. Instale as dependências:
npm install

4. Execute o servidor local:
npm run dev

Abra o endereço indicado no terminal (geralmente http://localhost:5173) no seu navegador.

