let currentlyRoute = "initial";
let currentBackground = null;
let factors = {};
let routes = {
    ascencao: "Consciência",
    indioMata: "Tentativa",
    aldeiaRato: "Pestilência branca",
    colonLimpa: "Dominação",
    morteDigna: "À glória",
    mortoCompanheiros: "Resistir"
}

function typewriter(element, onFinish){
    const fullText = element.textContent;
    element.textContent = "";             

    let i = 0;
    const speed = 40;

    function type() {
        if (i < fullText.length) {
            element.textContent += fullText[i];
            i++;
            setTimeout(type, speed);
        }else{
            if (onFinish) onFinish();
        }
    }

  type();
}

const game = document.querySelector(".game");
const dialogue = document.getElementById("Dialogue");
const divs = document.querySelectorAll(".text");
const reset = document.getElementById("reset");

function ChangeDialogue(div) {
    
  const elements = Array.from(div.children);
  let index = 0;
    
  function showNext(blank) {
      
    if (index >= elements.length) return;
      
      if(blank){
          dialogue.innerHTML = "";
      }
      
      const nameH2 = document.createElement("h2");
      dialogue.appendChild(nameH2);
      nameH2.id = "Name";
      
      const el = elements[index].cloneNode(true);
      dialogue.appendChild(el);
      
      dialogue.scrollTop += el.getBoundingClientRect().bottom * 2;
      
      typewriter(el, () =>{
          
      if (el.dataset.jumpTo){
          ChangeDialogue(document.getElementById(el.dataset.jumpTo));
          return;
      }
      if (el.dataset.playFinal){
          playFinal(el.dataset.playFinal);
          return;
      }
      if (el.dataset.playNext){
          showNext(false);
          return;
      }    
          
      });
      
      if (el.dataset.img){
          changeBackground(el.dataset.img);
      }
      
      nameH2.textContent = el.dataset.h2;
      
      if (el.tagName === "P") {
          if (elements[index + 1]?.tagName === "DIV"){

            const btnDiv = elements[index + 1];
            el.addEventListener("click", () => showChooses(btnDiv), { once: true });
              
          }else{
            el.addEventListener("click", () => showNext(true), { once: true });
              
          }
    }

    index++;
  }

  showNext(true);
}

function showChooses(btnDiv){

    const buttons = Array.from(btnDiv.children);

    buttons.forEach(button => {
        
        const neededFactor = button.dataset.needFactor;
        if (neededFactor && !factors[neededFactor]) return;

        const clone = button.cloneNode(true);
        dialogue.appendChild(clone);

        clone.addEventListener("click", () => {
            reset.style.display = "block";
            currentlyRoute = clone.value;
            dialogue.innerHTML = "";
            
            const factor = clone.dataset.factor;
            const final = clone.dataset.final;
            
            if (factor) factors[factor] = true;
            if (final){
                
                if (final === "aldeiaRato" && !factors["mouse"]) {
                    ChangeDialogue(document.getElementById("esperarAtacarText"));
                    return;
                }
                if (final === "canibalizado" && factors["mouse"]) {
                    playFinal("mortoCompanheiros");
                    return;
                }
                
                
                playFinal(final);
                return;
            } 
            
            ChangeDialogue(document.getElementById(clone.value + "Text"));
        });
    })
}

function resetToInitial() {
  factors = {};  
  dialogue.innerHTML = "";
  dialogue.style.display = "block";  
  currentlyRoute = "initial";
  reset.style.display = "none";
  dialogue.classList.remove("finalDialogue")  
  changeBackground("casa");
  ChangeDialogue(document.getElementById("initialText"));
}


reset.addEventListener("click", resetToInitial);


function changeBackground(path) {
  const newBg = `url("img/${path}.jpg")`;
    
  if (currentBackground === newBg) return;
  currentBackground = newBg;

  game.style.filter = "brightness(0.1)";

  setTimeout(() => {
    game.style.backgroundImage = newBg;
    game.style.filter = "brightness(1)";
  }, 400);
}


const playScreen = document.querySelector(".playScreen");
const playButton = document.querySelector("#playButton");

changeBackground("vilaFogo");

playButton.addEventListener("click", (() => {
  playScreen.style.display = "none";
  dialogue.style.display = "block";
  ChangeDialogue(document.getElementById("initialText"));
  
}))


function playFinal(final){
    const el = document.getElementById(final);

    if (!el) {
        console.error("Final não encontrado:", final);
        return;
    }

    ChangeDialogue(el);
    
    const title = document.createElement("span");
    title.classList.add("title");
    title.textContent = routes[final];
    dialogue.appendChild(title);
    dialogue.prepend(title);
    
    dialogue.classList.add("finalDialogue");
    
    const routesDiv = document.getElementById("routesDiv");
    routesDiv.style.display = "block";
    
    const ul = document.getElementById("routesUl");
    const li = document.createElement("li");
    li.textContent = routes[final];
    ul.appendChild(li);
    
}