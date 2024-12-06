import "./styles.css";
import { ToDo, Project, Aufgaben } from "./objects.js";
import { generateAllCards, sortByToday, sortByWeek } from "./populateDom";
import info from './images/Info.png';
import deleteButton from './images/delete.png';

export {cardContent, cardArea, content}

//GET DOM ELEMENTS
    const prioField = document.getElementById("prio");
    const cardDiv = document.getElementById("card");
    const cardContent = document.getElementsByClassName("contentCards");
    const cardArea = document.getElementById("cardArea");
    const taskToday = document.getElementById("taskToday");
    const allTasks = document.getElementById("taskAll");
    const taskWeek = document.getElementById("taskWeek");
    //get Input-Fields
    const favDialog = document.getElementById("dialog");
    const confirmBtn = favDialog.querySelector("#confirmBtn");
    const titleInput = favDialog.querySelector("#titleInput");
    const descriptionInput = favDialog.querySelector("#descriptionInput");
    const dateInput = favDialog.querySelector("#dateInput");
    const notesnInput = favDialog.querySelector("#descriptionInput");
    //create IMG-Containers(InfoButton)
    const img = document.createElement('img');
    img.src = info;
    img.id = "info";
    prioField.insertAdjacentElement("afterend",img);
    //create IMG Containers(DeleteButton)
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

//add new toDo to object
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const prioInput = favDialog.querySelector('input[name="prioInput"]:checked');
    console.log(prioInput);
    Aufgaben.addToDo(titleInput.value, descriptionInput.value, dateInput.value, prioInput.value, notesnInput.value);
    cardArea.innerHTML = "";
    generateAllCards();
} )



// Aufgaben.editName("Tortellini");



