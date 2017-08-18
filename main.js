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
	}
]

var container = document.getElementById("container")



function buildDom(arr) {
	var domString = ""
	if (arr !== []) {
		for (let [i, person] of arr.entries()) {
			var color = colorGenerator(i)
			domString +=	`<div class="card ${color}" id="card-${i}">
								<h1>${person.title}</h1>
								<h3>${person.name}</h3>
								<img src="${person.image}">
								<p>${person.bio}</p>
								<p>Birth: ${person.lifespan.birth} Death: ${person.lifespan.death}</p>
							</div>`;
		} 
		container.innerHTML = domString
	}
}

function colorGenerator(num) {
	return (num % 2 === 0) ? "yellow" : "blue" 
}


	container.addEventListener("click", (e) => {
	    if (e.target.classList.contains("card")) {
			e.target.classList.toggle("dots");
		} else if (e.target.parentNode.classList.contains("card")) {
			e.target.parentNode.classList.toggle("dots")
		}
	});


document.getElementById("input-field").addEventListener("keypress",(e) => {
	console.log(e);
	if (e.key !== "Enter") {
	console.log(e)
	console.log(e.target.parentNode.children.container.querySelectorAll("div").indexOf("dot"))
	// = e.target.value + e.key;

	}
})

buildDom(people)