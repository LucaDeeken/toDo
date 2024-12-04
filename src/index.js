import "./styles.css";
import { ToDo, Project } from "./objects.js";
//import { generateAllCards } from "./populateDom";
import mySvg from './images/Info.svg';

const prioField = document.getElementById("prio");
const cardDiv = document.getElementById("card");
const cardContent = document.getElementsByClassName("contentCards");
const cardArea = document.getElementById("cardArea");
const checkBox = document.getElementById("checkBox");
checkBox.type = "checkbox";

const img = document.createElement('img');
img.src = mySvg;
img.id = "info";
prioField.insertAdjacentElement("afterend",img);
const content = document.querySelector('#card').innerHTML;
cardDiv.remove();





const Aufgaben = new Project("Aufgaben");
Aufgaben.addToDo("Bad putzen", "Das Badezimmer muss sauber gemacht werden", "12.24.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Fenster putzen", "Fenster müssen gereinigt werden", "12.30.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Flur saugen", "Hier liegen zu viele Krümel", "01.03.2025", "hoch", "keine AHnung");
Aufgaben.addToDo("Bad putzen", "Das Badezimmer muss sauber gemacht werden", "12.24.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Fenster putzen", "Fenster müssen gereinigt werden", "12.30.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Flur saugen", "Hier liegen zu viele Krümel", "01.03.2025", "hoch", "keine AHnung");
Aufgaben.addToDo("Bad putzen", "Das Badezimmer muss sauber gemacht werden", "12.24.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Fenster putzen", "Fenster müssen gereinigt werden", "12.30.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Flur saugen", "Hier liegen zu viele Krümel", "01.03.2025", "hoch", "keine AHnung");
Aufgaben.addToDo("Bad putzen", "Das Badezimmer muss sauber gemacht werden", "12.24.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Fenster putzen", "Fenster müssen gereinigt werden", "12.30.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Flur saugen", "Hier liegen zu viele Krümel", "01.03.2025", "hoch", "keine AHnung");
Aufgaben.addToDo("Bad putzen", "Das Badezimmer muss sauber gemacht werden", "12.24.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Fenster putzen", "Fenster müssen gereinigt werden", "12.30.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Flur saugen", "Hier liegen zu viele Krümel", "01.03.2025", "hoch", "keine AHnung");
Aufgaben.addToDo("Bad putzen", "Das Badezimmer muss sauber gemacht werden", "12.24.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Fenster putzen", "Fenster müssen gereinigt werden", "12.30.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Flur saugen", "Hier liegen zu viele Krümel", "01.03.2025", "hoch", "keine AHnung");

// Aufgaben.editName("Tortellini");

// Aufgaben.deleteToDo(0);
// console.log(Aufgaben);

// Aufgaben.toDos[0].setDone();
// console.log(Aufgaben);

// Aufgaben.sortToDosByDate();
// console.log(Aufgaben);

console.log(Aufgaben.toDos.length);


function getIndexOnDefaultProject() {

}

function generateAllCards() {

    let j=0;
    for(let i=0; i<Aufgaben.toDos.length;i++) {

        const newDiv = document.createElement("div");
        newDiv.id = "card";
        newDiv.innerHTML = content;
        cardArea.appendChild(newDiv);
        newDiv.setAttribute("data-index", [i]);
        const toDoKeys = Aufgaben.toDos[i];
        const checkBox = newDiv.querySelector("#checkBox");
        checkBox.setAttribute("data-index", [i]);
        const checkBoxIndex = document.querySelector(`#checkBox[data-index="${i}"]`);
        console.log(checkBoxIndex);
            for(let key in toDoKeys) {
                    if(toDoKeys[key] === false || toDoKeys[key] === true) {
                       if (toDoKeys[key] === false) {
                        checkBoxIndex.checked = false;
                       } else {
                        checkBoxIndex.checked = true;
                        console.log("true");
                       }
                    } else {
                        cardContent[j].textContent= `${toDoKeys[key]}`;
                    }
                j++;
            }
    };
}
generateAllCards();
