// script.js

async function showRates(){

const crop = document.getElementById("crop").value;
const result = document.getElementById("result");

result.innerHTML = "Loading mandi prices...";

try{

const response = await fetch("data.json");
const data = await response.json();

const rates = data[crop];

if(!rates){
result.innerHTML = "No data found.";
return;
}

let bestMarket = "";
let bestPrice = 0;

let html = `<h3>🌾 ${crop} Live Market Rates</h3><br>`;

for(let market in rates){

html += `📍 ${market}: ₹${rates[market]} / quintal <br>`;

if(rates[market] > bestPrice){
bestPrice = rates[market];
bestMarket = market;
}

}

html += `<br><b>🤖 AI Suggestion:</b> Sell in <span style="color:green">${bestMarket}</span><br>`;
html += `💰 Highest Price: ₹${bestPrice} / quintal<br>`;
html += `🌤 Weather Impact: Stable prices expected this week.<br>`;
html += `📦 Storage Tip: Keep crop dry and ventilated.`;

result.innerHTML = html;

}catch(error){

result.innerHTML = "Error loading data.";

}

}



function scanCrop(){

const file = document.getElementById("file").files[0];
const scanResult = document.getElementById("scanResult");

if(!file){
scanResult.innerHTML = "Please upload crop photo.";
return;
}

const name = file.name.toLowerCase();

let crop = "Unknown Crop";
let advice = "Please upload a clear image.";

if(name.includes("wheat")){
crop = "Wheat";
advice = "Demand high. Good time to sell.";
}

else if(name.includes("rice")){
crop = "Rice";
advice = "Wait 2 days for possible rise.";
}

else if(name.includes("potato")){
crop = "Potato";
advice = "Use storage if available.";
}

else if(name.includes("onion")){
crop = "Onion";
advice = "Compare nearby mandis before selling.";
}

scanResult.innerHTML = `
<h3>📸 Crop Scan Result</h3><br>
Detected Crop: <b>${crop}</b><br>
Quality Grade: A<br>
🤖 AI Advice: ${advice}<br>
💰 Use Rates Section for live prices.
`;

}



function toggleDark(){

document.body.classList.toggle("dark-mode");

}



function startVoice(){

const voiceText = document.getElementById("voiceText");

const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = "en-IN";

recognition.start();

voiceText.innerHTML = "🎤 Listening...";

recognition.onresult = function(event){

let text = event.results[0][0].transcript.toLowerCase();

voiceText.innerHTML = "You said: " + text;

if(text.includes("wheat")){
document.getElementById("crop").value = "Wheat";
showRates();
}

if(text.includes("rice")){
document.getElementById("crop").value = "Rice";
showRates();
}

if(text.includes("potato")){
document.getElementById("crop").value = "Potato";
showRates();
}

if(text.includes("onion")){
document.getElementById("crop").value = "Onion";
showRates();
}

};

}



function askAI(){

const ask = document.getElementById("ask").value.toLowerCase();
const aiResult = document.getElementById("aiResult");

let reply = "";

if(ask.includes("wheat")){
reply = "🌾 Wheat prices are stable. Best to compare Patna and Ara mandi.";
}

else if(ask.includes("rice")){
reply = "🍚 Rice demand may rise next week. Hold if storage available.";
}

else if(ask.includes("rain")){
reply = "🌧 Rain expected in some areas. Protect stored crops.";
}

else if(ask.includes("sell")){
reply = "💰 Sell where transport cost is low and mandi price is highest.";
}

else{
reply = "🤖 Please ask about crop price, weather, storage or selling advice.";
}

aiResult.innerHTML = `
<h3>Farmer AI Assistant</h3><br>
${reply}
`;

}



setInterval(function(){

const weather = document.getElementById("weather");

const reports = [
"Sunny | 31°C | Good Harvest Day",
"Cloudy | 29°C | Watch Moisture",
"Rain Chance | 27°C | Cover Crops",
"Hot Day | 34°C | Irrigation Needed"
];

let random = Math.floor(Math.random()*reports.length);

weather.innerHTML = reports[random];

},5000);