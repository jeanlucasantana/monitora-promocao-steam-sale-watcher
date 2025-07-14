# 🎮 Steam Sale Watcher

Um bot automatizado que verifica diariamente a sua lista de desejos da Steam e envia alertas via WhatsApp sempre que um jogo estiver em promoção.  
A great automated bot that checks your Steam wishlist daily and sends WhatsApp alerts whenever a game is on sale.

## 🚀 Funcionalidades | Features

- ✅ Acessa a wishlist pública da sua conta Steam.  
  ✅ Accesses your public Steam wishlist.
- ✅ Identifica quais jogos estão com desconto.  
  ✅ Identifies which games are discounted.
- ✅ Envia mensagens com imagem, desconto, preço original e link.  
  ✅ Sends messages with image, discount, original price and link.
- ✅ Totalmente automatizado com Node.js + Baileys (API WhatsApp).  
  ✅ Fully automated with Node.js + Baileys (WhatsApp Web API).

## 🧰 Tecnologias | Technologies

- Node.js
- Baileys (API WhatsApp Web)
- Steam Web API
- dotenv

## ⚙️ Como usar | How to use

1. Clone o repositório | Clone the repository:
   ```bash
   git clone https://github.com/jeanlucasantana/monitora-promocao-steam-sale-watcher.git
   cd monitora-promocao-steam-sale-watcher
   ```

2. Instale as dependências | Install dependencies:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` com as seguintes variáveis | Create a `.env` file:
   ```env
   STEAM_ID=seu_id_steam          # Your Steam ID
   STEAM_API_KEY=sua_chave_steam  # Your Steam API key
   MY_NUMBER=5599999999999        # Your WhatsApp number (country code + number)
   ```

4. Execute o bot | Run the bot:
   ```bash
   node index.js
   ```

5. Escaneie o QR code no terminal com o WhatsApp | Scan the QR code on terminal using WhatsApp

## 📦 Estrutura | Structure

```
📁 monitora-promocao-steam-sale-watcher/
├── steam.js            # Lida com a API da Steam
├── whatsapp.js         # Conecta e envia mensagens via WhatsApp
├── index.js            # Script principal (manual ou via cron)
├── .env                # Variáveis de ambiente (não subir no GitHub)
├── package.json        # Configuração do projeto Node.js
└── auth_info_multi/    # Credenciais do WhatsApp (não subir no GitHub)
```

## 💡 Observações | Notes

- 🔐 Nunca compartilhe sua pasta `auth_info_multi` ou o conteúdo do `.env` publicamente.
- ⚠️ O uso da API do WhatsApp Web via Baileys pode ser instável ou temporariamente bloqueado.

## 📜 Licença | License

Este projeto é open-source e licenciado sob os termos da licença MIT.  
This project is open-source and licensed under the MIT license.