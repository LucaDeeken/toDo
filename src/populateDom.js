import { Aufgaben, Project } from "./objects.js";
import { cardContent, cardArea, content } from "./index.js";
import { isToday, parse, isWithinInterval, addDays } from "date-fns";
import plusIMG from "./images/plus.png";
export { generateAllCards, sortByToday, sortByWeek };

//Create IMG Containers(PlusButton)


//function-library

//generating Cards

function generateCard(i, j) {
    
    const newDiv = document.createElement("div");
    newDiv.id = "card";
    newDiv.classList.add("card");
    newDiv.innerHTML = content;
    cardArea.appendChild(newDiv);
    newDiv.setAttribute("data-index", [i]);
    const toDoKeys = Aufgaben.toDos[i];
    const checkBox = newDiv.querySelector("#checkBox");
    checkBox.setAttribute("data-index", [i]);
    const checkBoxIndex = document.querySelector(`#checkBox[data-index="${i}"]`);
        for(let key in toDoKeys) {
                if(toDoKeys[key] === false || toDoKeys[key] === true) {
                   if (toDoKeys[key] === false) {
                    checkBoxIndex.checked = false;
                   } else {
                    checkBoxIndex.checked = true;
                   }
                } else {
                    cardContent[j].textContent= `${toDoKeys[key]}`;
                };
                j++
        }
    //add EventListener for deleteButton
    const deleteButton = newDiv.querySelector("#deleteBtn");
    deleteButton.addEventListener("click", () => {
        Aufgaben.deleteToDo(i);
        cardArea.innerHTML = "";
        generateAllCards();
    });
    //add EventListener for checkBox
    checkBoxIndex.addEventListener("click", () => {
        Aufgaben.toDos[i].setDone();
    });
    return j;
}

//generate add container

function addContainer() {

const addDiv = document.createElement("div");
addDiv.id = "addDiv";
cardArea.appendChild(addDiv);
const plusBtn = document.createElement('img');
plusBtn.src = plusIMG;
plusBtn.id = "plus";
addDiv.appendChild(plusBtn);

}



//generate all Cards based of the Object Arrays
function generateAllCards() {
    let j=0;
    Aufgaben.sortToDosByDate();
    for(let i=0; i<Aufgaben.toDos.length;i++) {
        j=generateCard(i, j);
    };
        // add "add"-Container at the last spot
    addContainer();
}

//generate all Cards dated today
function sortByToday() {
    cardArea.innerHTML = "";
    let j=0;    
    for (let i=0; i<Aufgaben.toDos.length;i++) {

        if ((isToday(parse(Aufgaben.toDos[i].dueDate, 'dd-MM-yyyy', new Date()))) === true) {
            j=generateCard(i, j);
        }
    }
    addContainer();
}
//generate all Cards dated for the next seven days, today included
function sortByWeek() {
    cardArea.innerHTML = "";
    let j=0;
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const sevenDaysLater = addDays(today, 7);
    console.log(sevenDaysLater);
        for (let i=0; i<Aufgaben.toDos.length;i++) {
            const isInNextSevenDays = isWithinInterval((parse(Aufgaben.toDos[i].dueDate, 'dd-MM-yyyy', new Date())), { start: today, end: sevenDaysLater });
            if (isInNextSevenDays === true) {
                j=generateCard(i, j);
            }
    }
    addContainer();
}

