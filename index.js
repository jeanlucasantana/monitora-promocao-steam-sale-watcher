require('dotenv').config();
const { startWhatsApp, sendMessage } = require('./whatsapp');
const { getDiscountedGames } = require('./steam');

//inicializa o bot e checa as promocoes, encaminhando a resposta para o whatsapp desejado
(async () => {
  try {
    const sock = await startWhatsApp();

    console.log('📤 Buscando promoções na Steam...');
    const games = await getDiscountedGames();

    if (games.length === 0) {
      await sendMessage(sock, process.env.MY_NUMBER, 'Nenhum jogo da sua wishlist está em promoção no momento 😕');
    } else {
      const message = games.map(game =>
        `🎮 ${game.title}\n🔻 ${game.discount} — De ${game.original} por ${game.price}`
      ).join('\n\n');

      await sendMessage(sock, process.env.MY_NUMBER, `🔥 Jogos em promoção na sua wishlist:\n\n${message}`);
    }
  } catch (error) {
    console.error('Erro inesperado:', error);
  }
})();
