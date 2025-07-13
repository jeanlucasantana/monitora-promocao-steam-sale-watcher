// whatsapp.js

// Importa as bibliotecas necessárias para criar o bot que envia mensagens via WhatsApp
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
} = require('@whiskeysockets/baileys');

const qrcode = require('qrcode-terminal');
const P = require('pino');

// Função para inicializar o bot do WhatsApp
async function startWhatsApp() {
  // Carrega ou cria credenciais de autenticação
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_multi');
  const { version } = await fetchLatestBaileysVersion();

  // Retorna uma Promise que só será resolvida após a conexão ser estabelecida
  return new Promise((resolve) => {
    const sock = makeWASocket({
      version,
      auth: state,
      logger: P({ level: 'silent' }),
    });

    // Salva as credenciais a cada atualização
    sock.ev.on('creds.update', saveCreds);

    // Lida com atualizações de conexão
    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;

      // Gera QR Code no terminal para autenticação
      if (qr) {
        console.log('📲 Escaneie o QR Code com o WhatsApp:');
        qrcode.generate(qr, { small: true });
      }

      // Se a conexão for fechada, tenta reconectar (caso não seja logout)
      if (connection === 'close') {
        const shouldReconnect =
          lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        console.log('❌ Conexão fechada. Reconectando?', shouldReconnect);

        if (shouldReconnect) {
          setTimeout(() => {
            console.log('🔄 Reconnect...');
            startWhatsApp();
          }, 3000); // espera 3 segundos antes de tentar reconectar
        }
      }

      // Quando conectado com sucesso, resolve a Promise e retorna o socket
      else if (connection === 'open') {
        console.log('✅ Conectado ao WhatsApp!');
        resolve(sock);
      }
    });
  });
}

// Função que envia uma mensagem de texto para o número especificado
async function sendMessage(sock, number, message) {
  const jid = number.includes('@s.whatsapp.net') ? number : `${number}@s.whatsapp.net`;
  await sock.sendMessage(jid, { text: message });
}

// Exporta as funções para uso em outros arquivos
module.exports = { startWhatsApp, sendMessage };