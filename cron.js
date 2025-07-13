//cron.js
/*const cron = require('node-cron');
const { getDiscountedGames } = require('./steam');
const { startWhatsApp, sendMessage } = require('./whatsapp');
require('dotenv').config();

//automatiza o processo diariamente, analisando os jogos da wishlist e mandando no whatsapp os que estao em promocao
(async () => {
  const sock = await startWhatsApp();

  //roda todos os dias as 9 da manha
  cron.schedule('0 12 * * *', async () => {
    console.log('⏰ Verificando promoções da Steam...');
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
  });
})();*/
