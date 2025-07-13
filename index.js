// index.js
const { getDiscountedGames } = require('./steam');
const { startWhatsApp, sendMessage } = require('./whatsapp');
require('dotenv').config();

// inicia o bot, verifica se ha promocao na wishlist e encaminha notificacao sobre a analise
(async () => {
  console.log('⏰ Verificando promoções da Steam...');
  const sock = await startWhatsApp();
  const games = await getDiscountedGames();

  if (games.length > 0) {
    for (const game of games) {
      await sock.sendMessage(process.env.MY_NUMBER, {
        image: { url: game.image },
        caption: `🎮 *${game.title}*\n🔻 ${game.discount} — De ${game.original} por ${game.price}\n🔗 ${game.url}`
      });
    }
  } else {
    await sendMessage(sock, process.env.MY_NUMBER, 'Nenhum jogo da sua wishlist está em promoção hoje 😕');
  }
})();
