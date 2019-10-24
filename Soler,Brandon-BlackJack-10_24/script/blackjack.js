let cardImg = [
			  "img/10C.png","img/10D.png","img/10H.png","img/10S.png","img/2C.png","img/2D.png","img/2H.png","img/2S.png","img/3C.png","img/3D.png","img/3H.png","img/3S.png",
			  "img/4C.png","img/4D.png","img/4H.png","img/5S.png","img/5C.png","img/5D.png","img/5H.png","img/6C.png","img/6D.png","img/6H.png","img/6S.png",
			  "img/7C.png","img/7D.png","img/7H.png","img/7S.png","img/8C.png","img/8D.png","img/8H.png","img/8S.png",
			  "img/9C.png","img/9D.png","img/9H.png","img/9S.png","img/AC.png","img/AD.png","img/AH.png","img/AS.png","img/JC.png","img/JD.png","img/JH.png","img/JS.png",
			  "img/KC.png","img/KD.png","img/KH.png","img/KS.png","img/QC.png","img/QD.png","img/QH.png","img/QS.png"
			  ];
let oldCards = [];
let oldCardVal= [];

let cardPlaceVal = null;
let cardNumVal = null;
let card = null;

let dealerCard = null;
let dealerCardVal = null;

let totalPlayer = 0;
let totalDealer = 0;
let playerAce = 0;
let dealerAce = 0;


function newGame()
{
	document.getElementById("start").disabled = true;
	document.getElementById("hit").disabled = false;
	document.getElementById("stand").disabled = false;
	document.getElementById("init").disabled = false;

	document.getElementById("gameMsg").innerHTML = "Press hit for another card<br> Press stand to keep your deck and let dealer play";
	document.getElementById("dealerScore").innerHTML = "Total:";
	document.getElementById("playerScore").innerHTML = "Total:";

	deal("player", false);
	deal("player", false);

	deal("dealer", true);
	deal("dealer", false);

}

function init()
{
	
	document.getElementById("player").innerHTML = "";
	document.getElementById("dealer").innerHTML = "";
	
	document.getElementById("start").disabled = false;
	document.getElementById("hit").disabled = true;
	document.getElementById("stand").disabled = true;
	document.getElementById("init").disabled = true;

	document.getElementById("gameMsg").innerHTML = "Press Start to Play";


	cardImg = cardImg.concat(oldCardVal);
	
	oldCards = [];
	oldCardVal= [];
	
	cardPlaceVal = null;
	previousCardPlaceVal = null;
	card = null;
	
	totalPlayer = 0;
	totalDealer = 0;
	playerAce = 0;
	dealerAce = 0;

	document.getElementById("dealerScore").innerHTML = "Total: 0";
	document.getElementById("playerScore").innerHTML = "Total: 0";


}

function hit()
{
	if (totalPlayer <= 21)
	{
		deal("player", false);
	}

	if (totalPlayer > 21)
	{
		document.getElementById("hit").disabled = true;
		document.getElementById("stand").disabled = true;

		document.getElementById("dealerCard").src = dealerCard;

		document.getElementById("dealerScore").innerHTML = "Total" + totalDealer;

		document.getElementById("gameMsg").innerHTML = "Busted!"
	}
}

function stand()
{
		document.getElementById("hit").disabled = true;
		document.getElementById("stand").disabled = true;

		document.getElementById("dealerCard").src = dealerCard;

		document.getElementById("dealerScore").innerHTML = "Total: " +totalDealer

		if (totalDealer < 17)
		{
				deal("dealer", false);
				stand();
		}

		else if (totalDealer >= 17 || totalPlayer >= 21)
		{
				results();
		}
}

function deal(user, isdealerCard)
{
	cardNumVal = 0;

	cardPlaceVal = cardImg[Math.floor(Math.random() * cardImg.length)];

	card = document.createElement("img");
	
	if (isdealerCard == true)
	{
		dealerCard = cardPlaceVal;
		card.setAttribute("src", "img/red_back.png");
		card.setAttribute("id", "dealerCard");

		document.getElementById(user).appendChild(card);

	}

	else
	{
		card.setAttribute("src", cardPlaceVal);

		document.getElementById(user).appendChild(card);
	}

	oldCards.push(card);
	oldCardVal.push(cardPlaceVal);

	cardImg.splice(cardImg.indexOf(cardPlaceVal), 1);

	for (var valueNum = 2; valueNum <= 10; valueNum++)
	{
		if(cardPlaceVal.includes(valueNum))
		{
			cardNumVal = valueNum;
		}
	}

	if (cardPlaceVal.includes("J"))
	{
		cardNumVal = 10;
	}
	else if (cardPlaceVal.includes("K"))
	{
		cardNumVal = 10;
	}
	else if (cardPlaceVal.includes("Q"))
	{
		cardNumVal = 10;
	}


	else if (cardPlaceVal.includes("A") && user == "dealer")
	{
		
		dealerAce++;

		cardNumVal = 11;
	}

	else if (cardPlaceVal.includes("A") && user == "player")
	{
		
		playerAce++;

		cardNumVal = 11;
	}

	if (isdealerCard == true)
	{
		dealerCardVal = cardNumVal;
	}

	switch(user)
	{

			case "player":
				totalPlayer += cardNumVal;
				document.getElementById("playerScore").innerHTML = "Total: "+totalPlayer;
				break;
			case "dealer":
				totalDealer += cardNumVal;
				document.getElementById("dealerScore").innerHTML = "Total: " +(totalDealer - dealerCardVal);
				break;
	}

	if (totalPlayer > 21 && playerAce > 0)
	{
		checkAces(user);
	}

	else if (totalDealer > 21 && dealerAce > 0)
	{
		checkAces(user);
	}
}


function checkAces(user)
{
	switch(user)
	{

		case "player":

			playerAce--;

			totalPlayer -= 10;
			document.getElementById("playerScore").innerHTML = "Total: "+totalPlayer;
			break;

		case "dealer":

		dealerAce--;

			dealerScore -= 10;
			document.getElementById("dealerScore").innerHTML ="Total: "+ (totalDealer - dealerCardVal);
			break;
	}
}


function results()
{
	if ((totalDealer > totalPlayer && totalDealer <= 21) || (totalPlayer > 21 && totalDealer <= 21))
	{
	
		document.getElementById("gameMsg").innerHTML = "Dealer Wins!";
	
	}

	else  if ((totalPlayer > totalDealer && totalPlayer <= 21) || (totalDealer > 21 && totalPlayer <= 21))
	{
	
		document.getElementById("gameMsg").innerHTML = "Player Wins!";
	
	}

	else  if ((totalPlayer === totalDealer) || (totalDealer = totalPlayer))
	{
	
		document.getElementById("gameMsg").innerHTML = "Tie..";
	
	}
}