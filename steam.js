const axios = require('axios');
require('dotenv').config();

const STEAM_ID = process.env.STEAM_ID;//steam id
const API_KEY = process.env.STEAM_API_KEY; //api key

//pega os jogos da wishlist
async function getWishlistAppIds(steamId) {
  try {
    const url = `https://api.steampowered.com/IWishlistService/GetWishlist/v1/?steamid=${steamId}&key=${API_KEY}`; 
    const res = await axios.get(url);
    const items = res.data?.response?.items || [];
    return items.map(item => item.appid);
  } catch (error) {
    console.error('Erro ao buscar wishlist:', error.message);
    return [];
  }
}

//pega os detalhes dos jogos na wishlist
async function getAppDetails(appid) {
  try {
    const url = `https://store.steampowered.com/api/appdetails?appids=${appid}`;
    const res = await axios.get(url);
    const data = res.data[appid];
    if (data && data.success) {
      return data.data;
    } else {
      console.log(`Falha ao obter detalhes para o appid ${appid}`);
      return null;
    }
  } catch (error) {
    console.error(`Erro ao buscar detalhes do appid ${appid}:`, error.message);
    return null;
  }
}

//verifica os jogos com desconto
async function getDiscountedGames() {
  const appIds = await getWishlistAppIds(STEAM_ID);
  const discounted = [];

  for (const appid of appIds) {//analisa cada jogo da wishlist
    const data = await getAppDetails(appid);
    if (!data) {
      console.log(`AppID ${appid} sem dados ou erro`);
      continue;
    }

    // Debug - verifica as informacoes do jogo
    console.log(`Analisando: ${data.name}`, data.price_overview);

    if (!data.price_overview) continue;

    const { discount_percent, final_formatted, initial_formatted } = data.price_overview;

    if (discount_percent > 0) {//se tiver desconto, adiciona na lista de jogos com desconto
      discounted.push({
        title: data.name,
        discount: discount_percent + '%',
        price: final_formatted,
        original: initial_formatted,
        image: data.header_image,
        url: `https://store.steampowered.com/app/${appid}`
      });
    }
  }

  return discounted;//retorna jogos com desconto
}

module.exports = { getDiscountedGames };
