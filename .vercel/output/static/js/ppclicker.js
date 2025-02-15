let money = 100000000000000000000;
let coins = 0;

let multiplicator = 1;
let multiplicatorLevel = 1;
let multiplicatorPrice = Math.ceil(Math.exp(0.2 * multiplicatorLevel));

let critChance = 1;
let critChanceLevel = 1;
let critChancePrice = Math.ceil(Math.exp(0.2 * multiplicatorLevel));

let critMultiplicator = 1;
let critMultiplicatorLevel = 1;
let critMultiplicatorPrice = Math.ceil(Math.exp(0.2 * multiplicatorLevel));

let coinMultiplicator = 1;

let coinThreshold = 10;
let clicks = 0;

const clickable = document.getElementById('ppclickable');

const moneyDisplay = document.getElementById('money-label');
const coinDisplay = document.getElementById('coin-label');

const multiplicatorLabel = document.getElementById('multiplicator-label');
const multiplicatorButton = document.getElementById('multiplicator-button');
const multiplicatorPriceLabel = document.getElementById('multiplicator-price-label');

const critChanceLabel = document.getElementById('crit-pc-label');
const critChanceButton = document.getElementById('crit-pc-button');
const critChancePriceLabel = document.getElementById('crit-pc-price-label');

const critMultiplicatorLabel = document.getElementById('crit-mult-label');
const critMultiplicatorButton = document.getElementById('crit-mult-button');
const critMultiplicatorPriceLabel = document.getElementById('crit-mult-price-label');

multiplicatorLabel.textContent = multiplicator;
multiplicatorPriceLabel.textContent = multiplicatorPrice;

critChanceLabel.textContent = multiplicator;
critChancePriceLabel.textContent = multiplicatorPrice;

critMultiplicatorLabel.textContent = multiplicator;
critMultiplicatorPriceLabel.textContent = multiplicatorPrice;

clickable.addEventListener('click', () => {
    money += Math.ceil(multiplicator * (1 + critMultiplicator * (Math.random() * 100 <= critChance ? 1 : 0)));
    clicks += 1;
    if(clicks >= coinThreshold) {
        clicks -= coinThreshold;
        coins += coinMultiplicator;
        coinDisplay.textContent = coins;
    }
    moneyDisplay.textContent = money;
});

multiplicatorButton.addEventListener('click', () => {
    if(money >= multiplicatorPrice) {
        money -= multiplicatorPrice;
        multiplicator += 1;
        multiplicatorLevel += 1;
        multiplicatorPrice = Math.ceil(Math.exp(0.2 * multiplicatorLevel));
        moneyDisplay.textContent = money;
        multiplicatorLabel.textContent = multiplicator;
        multiplicatorPriceLabel.textContent = multiplicatorPrice;
    }
})

critChanceButton.addEventListener('click', () => {
    if(money >= critChancePrice) {
        money -= critChancePrice;
        critChance += 1;
        critChanceLevel += 1;
        critChancePrice = Math.ceil(Math.exp(0.2 * critChanceLevel));
        moneyDisplay.textContent = money;
        critChanceLabel.textContent = critChance;
        critChancePriceLabel.textContent = critChancePrice;
    }
})

critMultiplicatorButton.addEventListener('click', () => {
    if(money >= critMultiplicatorPrice) {
        money -= critMultiplicatorPrice;
        critMultiplicator += 1;
        critMultiplicatorLevel += 1;
        critMultiplicatorPrice = Math.ceil(Math.exp(0.2 * critMultiplicatorLevel));
        moneyDisplay.textContent = money;
        critMultiplicatorLabel.textContent = critMultiplicator;
        critMultiplicatorPriceLabel.textContent = critMultiplicatorPrice;
    }
})