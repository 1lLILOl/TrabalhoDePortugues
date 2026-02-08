let currentlyRoute = null;

const divs = document.querySelectorAll(".text");
//habilitar uma div em especifico
function ableDiv(name){
    for (let div of divs) {
        if (div.id === name + "Text"){
            div.style.display = "block";
        }else{
            div.style.display = "none";
        }
    }
}
//por padrao a inicial
ableDiv("initial");

//resetar para a div inicial
const resetToInital = document.getElementById("reset");
resetToInital.style.display = "none";

resetToInital.addEventListener("click", () => {
    currentlyRoute = null;
    ableDiv("initial");
    resetToInital.style.display = "none";
})

//pego cada um dos botoes e, quando clicados, habilita aquela div
const firstChoose = document.querySelectorAll(".FirstChoose");
firstChoose.forEach((btn) => {

    btn.addEventListener("click", () => {
        currentlyRoute = btn.value;
        ableDiv(currentlyRoute);
        resetToInital.style.display = "block";
    });
}) 
