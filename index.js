// Get a reference to the HTML element with the ID "coingecko"
const tokenInfoContainer = document.getElementById("coingecko");

// Get the "token-name" attribute from the "coingecko" element
const tokenName = tokenInfoContainer.getAttribute("token-name");

// Function to fetch and display token details in the UI
async function getTokenDetails(token) {
  // Fetch data from the CoinGecko API for the specified token
  const tokenDetailsRes = await fetch(
    `https://api.coingecko.com/api/v3/coins/${token}`
  );
  const tokenDetails = await tokenDetailsRes.json();

  // Format market cap, volume, and current price
  const formatedMarketCap = formatLargeCurrencyAmount(
    tokenDetails.market_data.market_cap.usd
  );
  const formatedVolume = formatLargeCurrencyAmount(
    tokenDetails.market_data.total_volume.usd
  );
  const formatedCurrrentPrice = formatLargeCurrencyAmount(
    tokenDetails.market_data.current_price.usd
  );

  // Update the HTML content of the "coingecko" element with the token details
  tokenInfoContainer.innerHTML = `
  <div style = "width:80vw;
  height:25vh;
  margin:auto;
  border:2px solid #e1e5ea;
  border-radius:10px;
  display:flex;
  flex-direction:column;
  margin-top:1rem;">
  <div  style = "display:flex; height:40%; border-bottom:1px solid #e1e5ea; padding:10px 0;">
  <div  style = "display:flex; align-items:center; flex:0.2; justify-content:center; margin-right:7px">
    <img
      src= "${tokenDetails.image.small}"
      alt="token-image"
    />
  </div>
  <div style = "display:flex; flex-direction:column; justify-content:center; flex:0.8; font-family:sans-serif; ">
    <p style = "margin:0; margin-bottom:3px; color:#1170e0;">${
      tokenDetails.name
    } (${tokenDetails.symbol.toUpperCase()})</p>
    <p style = "margin: 0; margin-bottom:3px">${formatedCurrrentPrice} <span style = "font-size:12px; font-family:monospace;">USD</span></p>
  </div>
</div>
<div style = "height:45%; display:flex; justify-content:space-evenly; align-items:center; text-align:center; padding:0; border-bottom:1px solid #e1e5ea; 
">
  <div style = "border-right:1px solid #e1e5ea; flex:1; height:100%; display:flex; flex-direction:column; justify-content:center;">
    <p style = "margin:0; margin-bottom:4px; font-family:system-ui;">Rank</p>
    <p style = "margin:0; margin-bottom:3px">${tokenDetails.coingecko_rank}</p>
  </div>
  <div style = "border-right:1px solid #e1e5ea; flex:1; height:100%; display:flex; flex-direction:column; justify-content:center;">
    <p style = "margin:0; margin-bottom:4px; font-family:system-ui;">Market Cap</p>
    <p style = "margin:0; margin-bottom:3px">$${formatedMarketCap} <span style = "font-size:12px; font-family:monospace;">USD</span></p>
  </div>
  <div style = "flex:1; height:100%; display:flex; flex-direction:column; justify-content:center;">
    <p style = "margin:0; margin-bottom:4px; font-family:system-ui;">Volume</p>
    <p style = "margin:0; margin-bottom:3px">$${formatedVolume} <span style = "font-size:12px; font-family:monospace;">USD</span></p>
  </div>
</div>
<div style = "padding: 2px 0; height:15%; display:flex;align-items:center; justify-content:center; color:#1170e0; font-family:ui-monospace; font-style:italic; "><p>Powered by Coingecko</p></div>
</div>
  `;
}

// Call the getTokenDetails function with the provided token name
getTokenDetails(tokenName);

// Function to format large currency amounts (e.g., market cap, volume)
function formatLargeCurrencyAmount(amount) {
  if (amount < 1000) {
    return amount;
  } else if (amount < 1e6) {
    return (amount / 1000).toFixed(1) + " K";
  } else if (amount < 1e9) {
    return (amount / 1e6).toFixed(1) + " M";
  } else if (amount < 1e12) {
    return (amount / 1e9).toFixed(1) + " B";
  } else {
    return (amount / 1e12).toFixed(1) + " T";
  }
}
