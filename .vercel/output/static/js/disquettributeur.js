let _10drawsCost = 50;
let _1drawCost = 5;

let coinsInTheBag = 0;


if (localStorage.getItem('coins') !== null) {
  coinsInTheBag = parseInt(localStorage.getItem('coins'));
}

const draw1button = document.getElementById("draw1button");
const draw10button = document.getElementById("draw10button");
const machine = document.getElementById("disquettributeur");
const machineHandle = document.getElementById("gachapon_handle");
const coinsLeftLabel = document.getElementById("coinsLeft");
coinsLeftLabel.textContent = coinsInTheBag;
// const gachaball = document.getElementById("gachaball");

const smoke_explosion = document.createElement("img");
smoke_explosion.src = "img/smoke_explosion_once.gif";
smoke_explosion.id = "smoke-explosion";

const spotlight = document.createElement("div");
spotlight.id = "spotlight";
spotlight.style.background = `radial-gradient(circle at ${window.innerWidth / 2}px ${window.innerHeight / 2}px, #00000000 10px, #000000ee  ${window.innerHeight / 2}px)`;

const lootedText = document.createElement("p");
lootedText.id = "looted-text";
lootedText.textContent = "Wait there is still nothing here !"

const gachaball = document.createElement("img");
gachaball.src = "img/gachaball_cb.svg";
gachaball.id = "gachaball";

const claimButton = document.createElement("button");
claimButton.textContent = "Récupérer";
claimButton.id = "claim-button";
claimButton.addEventListener('click', () => {
  delElement(lootedText);
  delElement(spotlight);
  delElement(claimButton);
});

const gachaponShaking = [
  { transform: "rotate(0deg)" },
  { transform: "rotate(5deg)" },
  { transform: "rotate(0deg)" },
  { transform: "rotate(-5deg)" },
  { transform: "rotate(0deg)" },
];

const handleRotating = [
  { transform: "rotate(0deg)" },
  { transform: "rotate(-180deg)" },
  { transform: "rotate(0deg)" },
];

const ballFalling = [
  // { transform: "rotate(90deg)" },
  // { display: "block" },
  // { transform: "translateY(-15%)" },
  // { transform: "translateY(-15%)" },
  // { transform: "translateY(-15%)" },
  // { transform: "translateY(-15%)" },
  // { transform: "translateY(-15%)" },
  // { transform: "translateY(-15%)" },
  { transform: "translateY(18%) ease-out" },
  { transform: "translateY(-18%) ease-in" },
];

  
const gachaponShakingTiming = {
  duration: 100,
  iterations: 10,
  delay: 750,
};

const handleRotatingTiming = {
  duration: 750,
  iterations: 1,
};

  
const ballFallingTiming = {
  duration: 4000,
  delay: 1750,
};

function delElement(element) {
  element.remove()
}

function addClaimButton() {
  machine.appendChild(claimButton);
}

function spawnSmoke() {
  machine.appendChild(smoke_explosion);

  setTimeout(function() { delElement(smoke_explosion); }, 800);
  
  machine.appendChild(spotlight);
  
  machine.appendChild(lootedText);

  setTimeout(function() { addClaimButton(); }, 2000);
}

function drawButtonCommonHandler() {
  coinsLeftLabel.textContent = coinsInTheBag;
  machineHandle.animate(handleRotating, handleRotatingTiming);
  machine.animate(gachaponShaking, gachaponShakingTiming);
  machine.appendChild(gachaball);
  setTimeout(function() { spawnSmoke(); }, 2650);
}


draw1button.addEventListener('click', () => {
  if (coinsInTheBag > _1drawCost) {
    coinsInTheBag -= _1drawCost
    localStorage.setItem('coins', coinsInTheBag);
    drawButtonCommonHandler();
  }
});

draw10button.addEventListener('click', () => {
  if (coinsInTheBag > _10drawsCost) {
    coinsInTheBag -= _10drawsCost
    localStorage.setItem('coins', coinsInTheBag);
    drawButtonCommonHandler();
  }
});