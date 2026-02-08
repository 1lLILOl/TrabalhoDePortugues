let currentlyRoute = "initial";

function typewriter(element){
    const fullText = element.textContent;
    element.textContent = "";             

    let i = 0;
    const speed = 40;

    function type() {
        if (i < fullText.length) {
            element.textContent += fullText[i];
            i++;
            setTimeout(type, speed);
        }
    }

  type();
}

const game = document.querySelector(".game");
const dialogue = document.getElementById("Dialogue");
const divs = document.querySelectorAll(".text");
const reset = document.getElementById("reset");

setTimeout(() => {
    changeBackground(currentlyRoute);
},400)

function ChangeDialogue(div) {
  const elements = Array.from(div.children);
  let index = 0;

  function showNext() {
    if (index >= elements.length) return;

    dialogue.innerHTML = "";

    const nameH2 = document.createElement("h2");
    dialogue.appendChild(nameH2);
    nameH2.id = "Name";

    const el = elements[index].cloneNode(true);
    dialogue.appendChild(el);
    typewriter(el);

    nameH2.textContent = el.dataset.h2;
  
    if (el.tagName === "P") {
        if (elements[index + 1]?.tagName === "DIV"){

            const btnDiv = elements[index + 1];
            el.addEventListener("click", () => showChooses(btnDiv), { once: true });
        }else{
            el.addEventListener("click", showNext, { once: true });
        }
    }

    index++;
  }

  showNext();
}

function showChooses(btnDiv){

    const buttons = Array.from(btnDiv.children);

    buttons.forEach(button => {

        const clone = button.cloneNode(true);
        dialogue.appendChild(clone);

        clone.addEventListener("click", () => {
            reset.style.display = "block";
            currentlyRoute = clone.value;
            changeBackground(currentlyRoute);
            dialogue.innerHTML = "";
            ChangeDialogue(document.getElementById(clone.value + "Text"));
        });
    })
}

ChangeDialogue(document.getElementById("initialText"));


function resetToInitial() {
  dialogue.innerHTML = "";
  currentlyRoute = "initial";
  reset.style.display = "none";
  changeBackground(currentlyRoute);
  ChangeDialogue(document.getElementById("initialText"));
}


reset.addEventListener("click", resetToInitial);


let currentBackground = null;

function changeBackground(path) {
  const newBg = `url("../img/${path}.jpeg")`;

  if (currentBackground === newBg) return;
  currentBackground = newBg;

  game.style.filter = "brightness(0.1)";

  setTimeout(() => {
    game.style.backgroundImage = newBg;
    game.style.filter = "brightness(1)";
  }, 400);
}
