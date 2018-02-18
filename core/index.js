'use strict';
/* Carder
*by Di */

// Информация о программе
try{ // Проверка ошибок
let basicInfo, info = {name : "Carder",	version : "1.1"};
let JSON_info = JSON.stringify(info);
let sum, luckPercent, bonus = 0, bonusStatus = false, platinumBonus = false, averageCardCost, lucky,
cards = { // Кол-во всех карт
standard : 0,
silver : 0,
gold : 0,
platinum : 0
},
value = { // Рандомное число выпавших карт
standard: Math.floor(Math.random()*4+4),
silver: Math.floor(Math.random()*5+1),
gold: Math.floor(Math.random()*3+2),
platinum: Math.floor(Math.random()*3+2)
},
 _oneCardCost = { // Предцена одной карты (неокруг.)
standard: Math.random()*1+2,
silver: Math.random()*2+3,
gold: Math.random()*3+5,
platinum: Math.random()*3+7
};
// Округление цены одной карты
let oneCardCost = {};
oneCardCost.standard = parseFloat(_oneCardCost.standard.toFixed(1));
oneCardCost.silver = parseFloat(_oneCardCost.silver.toFixed(1));
oneCardCost.gold = parseFloat(_oneCardCost.gold.toFixed(1));
oneCardCost.platinum = parseFloat(_oneCardCost.platinum.toFixed(1));
oneCardCost.average = (((oneCardCost.standard+oneCardCost.silver+oneCardCost.gold+oneCardCost.platinum)/4).toFixed(1));

function cardCore() { // init cardCore
	this.getInfo = function(){
		basicInfo = JSON.parse(JSON_info);
	 console.log(basicInfo.name + " v." + basicInfo.version);
	 console.log("================");
	 console.log("Your cards: ");
	 console.log("Standard: "+cards.standard);
	 console.log("Silver: "+cards.silver);
	 console.log("Gold: "+cards.gold);
	 console.log("Platinum: "+cards.platinum)
	 console.log("================");
	 console.log("Your platinum luck: "+luckPercent+"%");
	 console.log("Bonus ($×2): "+bonusStatus);
	 console.log("================");
	 console.log("One card cost for:");
	 console.log("Standard: "+oneCardCost.standard+" $");
	 console.log("Silver: "+oneCardCost.silver+" $");
	 console.log("Gold: "+oneCardCost.gold+" $");
	 console.log("Platinum: "+oneCardCost.platinum+" $");
	 console.log("================");
	 console.log("Average card cost: "+oneCardCost.average+" $");
	 console.log("================");
	 console.log("Total: "+sum.toFixed(1)+" $");
	}

	this.getCards = function(){
	// Нахождение бонуса
	bonus = Math.floor(Math.random()*100)+1;
	// Нахождение основной удачи
	lucky = Math.floor(Math.random()*255)+1;
	// Нахождение легендарной удачи
	luckPercent = (parseFloat(lucky/256*100)).toFixed(1);
	// Бонус
	if(bonus>97&&bonus!=100||bonus>50&&bonus<53||bonus>10&&bonus<12){
		bonusStatus = true;
	}
	// Обычные
	if(lucky>=1&&lucky<256&&lucky!=256&&lucky!=200){
	cards.standard=+value.standard;
	}
	// Серебрянные
	if(lucky>238&&lucky<256&&lucky!=200||lucky>=150&&lucky<237){
	cards.silver =+value.silver;
	cards.standard=+value.standard;
	}
	if(lucky>=75&&lucky<=145||lucky==200){ //Золотые
	cards.silver =+value.silver;
	cards.standard=+value.standard;
	cards.gold=+value.gold;
	}
	if(lucky==256){ //Платиновые
	 cards.platinum=+value.platinum;
	 cards.silver=+value.silver;
	cards.standard=+value.standard*2;
	cards.gold=+value.gold;
	platinumBonus = true;
	}
	// Нахождение суммы
	sum = (cards.standard*oneCardCost.standard)+(cards.silver*oneCardCost.silver)+(cards.gold*oneCardCost.gold)+(cards.platinum*oneCardCost.platinum);
	if(platinumBonus){
		sum =+ sum*2;
	}
	if(bonusStatus){
	 sum =+ sum+(sum/2);
	}
	this.getInfo();// Нахождение всей стоимости
	}
}

let CardAPI = new cardCore();
CardAPI.getCards(); // Старт программы

	}catch(e){ // Если найдена ошибка, то...
		console.log("Error: \n"+e.stack);
}
