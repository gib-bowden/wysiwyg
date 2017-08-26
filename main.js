var people = [
	{
	  title: "Knight",
	  name: "Edward the Black Prince", 
	  bio: "Edward of Woodstock, Prince of Wales (1330-1376) came to be called the Black Prince (most likely after the black armor he wore) after the Battle of Crecy (1346), one of the most notable battles of the Hundred Years’ War. He fought in France with his father Edward III of England and played the key role in another important victory of the English – the Battle of Poitiers (1356). In the late 1360s, he led an expedition to Spain and restored Peter of Castile to the throne. He then returned to France but his ill health soon forced him to return to England. He died in 1376, one year before his father whom he was supposed to succeed. The English throne passed to Edward’s minor son Richard II.",
	  image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Cernoch.jpg",
	  lifespan: {
	    birth: 1330,
	    death: 1376
	  }
	},

	{
	  title: "Samurai",
	  name: "Tomoe Gozen",
	  bio: "Serving under Minamoto Yoshinaka, Tomoe was one of his finest soldiers, and her skills in battle dwarfed many of those held by even the strongest men in her unit.",
	  image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Tomoe-Gozen.jpg",
	  lifespan: {
	    birth: 1747,
	    death: 1797
	  }
	},

	{
	  title: "Gladiator",
	  name: "Spartacus",
	  bio: "A Thracian soldier by origin, Spartacus was captured by the Romans and then sold as a slave. His owner owned a gladiator school in Capua and noticed the opportunity of cashing in the various skills of Spartacus as a gladiator. But a true soldier reveres his freedom far more than anything else. Soon, Spartacus helped to mastermind a rebellion that ended with about 70 gladiators escaping out of the gladiator school – all of them well-armed with makeshift weapons. Crixus was also among the escapees and soon he became the right hand of Spartacus.",
	  image: "https://en.wikipedia.org/wiki/Spartacus#/media/File:Spartacus_II.JPG",
	  lifespan: {
	    birth: 111,
	    death: 71
	  }
	}
]

var container = document.getElementById("container");
var inputField = document.getElementById("input-field");
var cardList = container.getElementsByClassName("card");
var messageText = document.getElementById("message-text")

//builds a card element and prints to the dom - calls the color generator to assign the card color
function buildDom(arr) {
	var domString = ""
	if (arr !== []) {
		for (let [i, person] of arr.entries()) {
			var color = colorGenerator(i)
			domString +=	`<div class="card ${color}" id="card-${i}">
								<h1>${person.title}</h1>
								<h3>${person.name}</h3>
								<img src="${person.image}">
								<p class="bio">${person.bio}</p>
								<p>Birth: ${person.lifespan.birth} Death: ${person.lifespan.death}</p>
							</div>`;
		} 
		container.innerHTML = domString;
	}
}

//takes a number and returns yellow if even, blue if odd 
function colorGenerator(num) {
	return (num % 2 === 0) ? "yellow" : "blue";
}

//returns a person div having the dots class 
function findDottedPerson() {
	for (var i = 0; i < cardList.length; i++) {
		if (cardList[i].classList.contains("dots")) {
			var dottedPerson = cardList[i];
		}
	} return dottedPerson;
}

//Finds the dotted person's element with the ID of a given string
function findDottedPersonElementId(str) {
	var personElements = findDottedPerson().children; //returns all the children elements of the dotted div
	for (let element of personElements) {
		if (element.classList.contains(str)) {
			var targetElement = element;
		}
	} return targetElement;
}

//Event listener for the person divs 
//adds the dots border and brings the input field in focus
container.addEventListener("click", (e) => {
	if (e.target.classList.contains("card")) {
		e.target.classList.add("dots");
	} else if (e.target.parentNode.classList.contains("card")) {
		e.target.parentNode.classList.add("dots");
	}
	inputField.disabled = false;
	messageText.innerHTML = "";
	inputField.focus();
});

//Event listener for for the input field when it loses focus
//Removes the dots border from a person div if exists 
inputField.addEventListener("focusout", () => {
	if (findDottedPerson() !== undefined) {
		findDottedPerson().classList.remove("dots");
		}
	inputField.value = "";
	})

inputField.addEventListener("focusin", () => {
	if (findDottedPerson() === undefined) {
		messageText.innerHTML = "Select a person to edit their bio";
		inputField.disabled = true;
		} else {
			inputField.value = findDottedPersonElementId("bio").innerHTML
		}
	})

//Event listener for the input field for keypress 
//If the keystroke is not enter -> gets the dotted person bio element and updates the innerHTML with the text field value
//If keystroke is enter -> clears the value in the input field 
inputField.addEventListener("keypress",(e) => {
	if (e.key !== "Enter") {
		findDottedPersonElementId("bio").innerHTML = inputField.value + e.key;
		}
	else {
		inputField.value = "";
	}
})


inputField.addEventListener("keydown",(e) => {
	if (e.key === "Backspace" || e.key === "Delete") {
		findDottedPersonElementId("bio").innerHTML = inputField.value + "";
		}
})

buildDom(people);