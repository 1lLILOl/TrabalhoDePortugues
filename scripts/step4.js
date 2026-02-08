let currentlyRoute = null;

const dialogue = document.getElementById("Dialogue");
const divs = document.querySelectorAll(".text");
const reset = document.getElementById("reset");

function ChangeDialogue(div) {
  const elements = Array.from(div.children);
  let index = 0;

  function showNext() {
    if (index >= elements.length) return;

    dialogue.innerHTML = "";

    const nameH2 = document.createElement("h2");
    nameH2.id = "Name";
    nameH2.textContent = "OI"
    dialogue.appendChild(nameH2);

    const el = elements[index].cloneNode(true);
    dialogue.appendChild(el);
    

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
            dialogue.innerHTML = "";
            ChangeDialogue(document.getElementById(clone.value + "Text"));
        });
    })
}

ChangeDialogue(document.getElementById("initialText"));


function resetToInitial() {
  dialogue.innerHTML = "";
  currentlyRoute = null;
  reset.style.display = "none";
  ChangeDialogue(document.getElementById("initialText"));
}


reset.addEventListener("click", resetToInitial);
