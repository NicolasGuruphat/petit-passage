let money = 100000000000000000000;
let coins = 0;

if (localStorage.getItem('money') !== null) {
    money = parseInt(localStorage.getItem('money'));
}

if (localStorage.getItem('coins') !== null) {
    coins = parseInt(localStorage.getItem('coins'));
}

let multiplicator = 1;
let multiplicatorLevel = 1;
let multiplicatorPrice = Math.ceil(Math.exp(0.2 * multiplicatorLevel));

let critChance = 1;
let critChanceLevel = 1;
let critChancePrice = Math.ceil(Math.exp(0.2 * critChanceLevel));

let critMultiplicator = 1;
let critMultiplicatorLevel = 1;
let critMultiplicatorPrice = Math.ceil(Math.exp(0.2 * critMultiplicatorLevel));

let coinMultiplicator = 1;

let coinThreshold = 10;
let clicks = 0;

// New variables for the auto‑clicker upgrade:
let adminAutoClickerLevel = 0;
let adminAutoClickerPrice = Math.ceil(Math.exp(0.2 * (adminAutoClickerLevel + 1)));

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

// New UI elements for the auto‑clicker upgrade:
const adminAutoClickerLabel = document.getElementById('admin-autoclicker-label');
const adminAutoClickerButton = document.getElementById('admin-autoclicker-button');
const adminAutoClickerPriceLabel = document.getElementById('admin-autoclicker-price-label');

// Set initial text content for labels:
multiplicatorLabel.textContent = multiplicator;
multiplicatorPriceLabel.textContent = multiplicatorPrice;

critChanceLabel.textContent = critChance;
critChancePriceLabel.textContent = critChancePrice;

critMultiplicatorLabel.textContent = critMultiplicator;
critMultiplicatorPriceLabel.textContent = critMultiplicatorPrice;

adminAutoClickerLabel.textContent = adminAutoClickerLevel;
adminAutoClickerPriceLabel.textContent = adminAutoClickerPrice;

update();

// Refactor click action into a function to reuse for auto‑clicker:
function doClick() {
    money += Math.ceil(
        multiplicator *
        (1 +
            critMultiplicator *
            (Math.random() * 100 <= critChance ? 1 : 0))
    );
    clicks += 1;
    if (clicks >= coinThreshold) {
        clicks -= coinThreshold;
        coins += coinMultiplicator;
    }
    update();
    save();
}

// Manual click event:
clickable.addEventListener('click', () => {
    doClick();
});

// Upgrade: Multiplicator
multiplicatorButton.addEventListener('click', () => {
    if (money >= multiplicatorPrice) {
        money -= multiplicatorPrice;
        multiplicator += 1;
        multiplicatorLevel += 1;
        multiplicatorPrice = Math.ceil(Math.exp(0.2 * multiplicatorLevel));
        moneyDisplay.textContent = money;
        multiplicatorLabel.textContent = multiplicator;
        multiplicatorPriceLabel.textContent = multiplicatorPrice;
    }
});

// Upgrade: Crit Chance
critChanceButton.addEventListener('click', () => {
    if (money >= critChancePrice) {
        money -= critChancePrice;
        critChance += 1;
        critChanceLevel += 1;
        critChancePrice = Math.ceil(Math.exp(0.2 * critChanceLevel));
        moneyDisplay.textContent = money;
        critChanceLabel.textContent = critChance;
        critChancePriceLabel.textContent = critChancePrice;
    }
});

// Upgrade: Crit Multiplicator
critMultiplicatorButton.addEventListener('click', () => {
    if (money >= critMultiplicatorPrice) {
        money -= critMultiplicatorPrice;
        critMultiplicator += 1;
        critMultiplicatorLevel += 1;
        critMultiplicatorPrice = Math.ceil(
            Math.exp(0.2 * critMultiplicatorLevel)
        );
        moneyDisplay.textContent = money;
        critMultiplicatorLabel.textContent = critMultiplicator;
        critMultiplicatorPriceLabel.textContent = critMultiplicatorPrice;
    }
});

// Upgrade: Auto‑clicker ("l'admin clique pour toi")
adminAutoClickerButton.addEventListener('click', () => {
    if (money >= adminAutoClickerPrice) {
        money -= adminAutoClickerPrice;
        adminAutoClickerLevel += 1;
        adminAutoClickerPrice = Math.ceil(
            Math.exp(0.2 * (adminAutoClickerLevel + 1))
        );
        moneyDisplay.textContent = money;
        adminAutoClickerLabel.textContent = adminAutoClickerLevel;
        adminAutoClickerPriceLabel.textContent = adminAutoClickerPrice;
    }
});


setInterval(() => {
    for (let i = 0; i < adminAutoClickerLevel; i++) {
        doClick();
    }
}, 1000);

function update() {
    moneyDisplay.textContent = money;
    coinDisplay.textContent = coins;
}

function save() {
    localStorage.setItem('money', money);
    localStorage.setItem('coins', coins);
}
