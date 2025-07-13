//whatsapp.js

//importa as apis necessarias para criacao do bot que manda mensagens para o whatsapp
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const P = require('pino');

let sock = null;

//funcao para inicializar o whatsapp para servir como bot
async function startWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_multi');
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: 'silent' }),
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('📲 Escaneie o QR Code com o WhatsApp:');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('❌ Conexão fechada. Reconectando?', shouldReconnect);

      if (shouldReconnect) {
        setTimeout(() => {
          console.log('🔄 Reconnect...');
          startWhatsApp();
        }, 3000); // espera 3 segundos
      }
    } else if (connection === 'open') {
      console.log('✅ Conectado ao WhatsApp!');
    }
  });

  return sock;
}

//funcao para o bot mandar mensagem
async function sendMessage(sock, number, message) {
  const jid = number.includes('@s.whatsapp.net') ? number : `${number}@s.whatsapp.net`;
  await sock.sendMessage(jid, { text: message });
}

//exporta as funcoes para serem usadas em outros codigos
module.exports = { startWhatsApp, sendMessage };
