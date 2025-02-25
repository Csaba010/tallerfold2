let player = {
    level: 1,
    xp: 0,
    money: 0,
    resources: {
        wood: 0,
        stone: 0,
        food: 0,
        iron: 0,
        water: 0
    },
    tools: {
        axe: false,
        pickaxe: false,
        fishingRod: false
    },
    quest: null
};

function updateUI() {
    document.getElementById("player-level").textContent = player.level;
    document.getElementById("player-xp").textContent = player.xp;
    document.getElementById("player-money").textContent = player.money;
    for (let key in player.resources) {
        document.getElementById(key).querySelector("span").textContent = player.resources[key];
    }
}

function gatherResource(type) {
    let amount = 1;
    if (type === "wood" && player.tools.axe) amount += 2;
    if (type === "stone" && player.tools.pickaxe) amount += 2;
    if (type === "food" && player.tools.fishingRod) amount += 2;
    
    player.resources[type] += amount;
    player.xp += 5;

    if (player.xp >= 100) {
        player.level++;
        player.xp = 0;
    }

    updateUI();
}

function buyItem(item, cost) {
    if (player.money >= cost) {
        player.money -= cost;
        player.tools[item] = true;
        updateUI();
    } else {
        alert("Nincs elég Tallérod!");
    }
}

function acceptQuest() {
    const quests = [
        { name: "Gyűjts 10 fát!", type: "wood", amount: 10, reward: 5 },
        { name: "Gyűjts 5 követ!", type: "stone", amount: 5, reward: 7 }
    ];
    player.quest = quests[Math.floor(Math.random() * quests.length)];
    document.getElementById("quest-text").textContent = player.quest.name;
}

function completeQuest() {
    if (player.quest && player.resources[player.quest.type] >= player.quest.amount) {
        player.money += player.quest.reward;
        player.quest = null;
        document.getElementById("quest-text").textContent = "Nincs aktív küldetés.";
        updateUI();
    } else {
        alert("Még nem teljesítetted a küldetést!");
    }
}

function spawnWanderer() {
    const wanderers = ["Kereskedő", "Vadász", "Földműves"];
    let chosen = wanderers[Math.floor(Math.random() * wanderers.length)];
    document.getElementById("wanderer-text").textContent = `Egy ${chosen} érkezett!`;
}

updateUI();
