import "./styles.css";
import { ToDo, Project } from "./objects.js";
import { generateAllCards, sortByToday, sortByWeek } from "./populateDom";
import info from './images/Info.png';
import deleteButton from './images/delete.png';

export {cardContent, cardArea, content}

//getDomElements
const prioField = document.getElementById("prio");
const cardDiv = document.getElementById("card");
const cardContent = document.getElementsByClassName("contentCards");
const cardArea = document.getElementById("cardArea");
const taskToday = document.getElementById("taskToday");
const allTasks = document.getElementById("taskAll");
const taskWeek = document.getElementById("taskWeek");
const addToDo = document.getElementById("plus");
const dialog = document.getElementById("dialog");

//Create IMG Containers(InfoButton)
const img = document.createElement('img');
img.src = info;
img.id = "info";
prioField.insertAdjacentElement("afterend",img);
//Create IMG Containers(DeleteButton)
const delButton = document.createElement('img');
delButton.src = deleteButton;
delButton.id = "deleteBtn";
prioField.insertAdjacentElement("afterend",delButton);

//Grab HTML-Structure of #card and put it into one variable; remove it after that 
const content = document.querySelector('#card').innerHTML;
cardDiv.remove();

//get To-Do Cards on DOM (Default, autoloading)
generateAllCards();

//get To-Do Cards on DOM, which are dated for today
taskToday.addEventListener("click", () => {
    sortByToday();
})

//get To-Do Cards on DOM, which are in this week
taskWeek.addEventListener("click", () => {
    sortByWeek();
})

//get all to-Do Tasks on DOM
allTasks.addEventListener("click", () => {
    cardArea.innerHTML = "";
    generateAllCards();
})

//add toDo Card Button

addToDo.addEventListener("click", () => {
    dialog.showModal();
})





// Aufgaben.editName("Tortellini");



