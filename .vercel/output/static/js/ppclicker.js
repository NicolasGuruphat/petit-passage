let money = 0;
let coins = 0;

if (localStorage.getItem('money') !== null) {
    money = parseInt(localStorage.getItem('money'));
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    money = Infinity
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

// Price computing formulas
function exponentialOneFifth(level) {
    return Math.ceil(Math.exp(0.2 * level));
}

function squarred_polynome(level) {
    return Math.ceil(1.75  * level + 2 * Math.sqrt(level) + 10)
}

function increased_squarred_polynome(level) {
    return Math.ceil(3  * level + 5 * Math.sqrt(level) + 25)
}

function one_point_five_expo_x_base_five_hundred(level) {
    return Math.ceil(Math.pow(4, level + 10) + 500)
}

// Money per click upgrade
let moneyUpgrade = {
    value: 1,
    level: 1,
    increment: 1,
    price: Math.ceil(Math.exp(0.2 * 1)),
    label: multiplicatorLabel,
    button: multiplicatorButton,
    priceLabel: multiplicatorPriceLabel,
    priceFormula: squarred_polynome,
}

// Critical chance upgrade
let critChanceUpgrade = {
    value: 1,
    level: 1,
    increment: 1,
    price: Math.ceil(Math.exp(0.2 * 1)),
    label: critChanceLabel,
    button: critChanceButton,
    priceLabel: critChancePriceLabel,
    priceFormula: increased_squarred_polynome,
}

// Critical multiplicator upgrade
let critMultiplicatorUpgrade = {
    value: 1,
    level: 1,
    increment: 0.1,
    price: Math.ceil(Math.exp(0.2 * 1)),
    label: critMultiplicatorLabel,
    button: critMultiplicatorButton,
    priceLabel: critMultiplicatorPriceLabel,
    priceFormula: increased_squarred_polynome,
}

// Auto click upgrade
let adminAutoClickerUpgrade = {
    value: 0,
    level: 1,
    increment: 1,
    price: Math.ceil(Math.exp(0.2 * 1)),
    label: adminAutoClickerLabel,
    button: adminAutoClickerButton,
    priceLabel: adminAutoClickerPriceLabel,
    priceFormula: one_point_five_expo_x_base_five_hundred,
}

update();

// Refactor click action into a function to reuse for auto‑clicker:
function doClick() {
    money += Math.ceil(
        multiplicator *
        (1 +
            critMultiplicator *
            ((Math.random() * 100 <= (critChance % 100) ? 1 : 0) + Math.floor(critChance / 100)))
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

// Upgrade: Common / Template
function upgradeButtonEventHandler(upgradeDict) {
    if (money >= upgradeDict.price) {
        money -= upgradeDict.price;
        upgradeDict.value += upgradeDict.increment;
        upgradeDict.level += 1;
        upgradeDict.price = upgradeDict.priceFormula(upgradeDict.level)
        moneyDisplay.textContent = money;
        upgradeDict.label.textContent = upgradeDict.value;
        upgradeDict.priceLabel.textContent = upgradeDict.price;
    }
}

// Upgrade: Multiplicator
multiplicatorButton.addEventListener('click', () => {
    upgradeButtonEventHandler(moneyUpgrade)
});

// Upgrade: Crit Chance
critChanceButton.addEventListener('click', () => {
    upgradeButtonEventHandler(critChanceUpgrade)
});

// Upgrade: Crit Multiplicator
critMultiplicatorButton.addEventListener('click', () => {
    upgradeButtonEventHandler(critMultiplicatorUpgrade)
});

// Upgrade: Auto‑clicker ("l'admin clique pour toi")
adminAutoClickerButton.addEventListener('click', () => {
    upgradeButtonEventHandler(adminAutoClickerUpgrade)
});


setInterval(() => {
    for (let i = 0; i < adminAutoClickerUpgrade.value; i++) {
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
