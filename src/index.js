import "./styles.css";
import { ToDo, Project, Aufgaben, projects } from "./objects.js";
import { addContainer, generateAllCards, sortByToday, sortByWeek, addProject } from "./populateDom";
import info from './images/Info.png';
import deleteButton from './images/delete.png';

export {cardContent, cardArea, content, Aufgaben}

//GET DOM ELEMENTS
    const prioField = document.getElementById("prio");
    const cardDiv = document.getElementById("card");
    const cardContent = document.getElementsByClassName("contentCards");
    const cardArea = document.getElementById("cardArea");
    const taskToday = document.getElementById("taskToday");
    const allTasks = document.getElementById("taskAll");
    const taskWeek = document.getElementById("taskWeek");
    const newProject = document.getElementById("newProject");
    const createProject = document.getElementById("createProject");
    const defaultProject = document.getElementById("defaultProject");
    //get Input-Fields (AddToDo)
    const favDialog = document.getElementById("dialog");
    const confirmBtn = favDialog.querySelector("#confirmBtn");
    const titleInput = favDialog.querySelector("#titleInput");
    const descriptionInput = favDialog.querySelector("#descriptionInput");
    const dateInput = favDialog.querySelector("#dateInput");
    const notesnInput = favDialog.querySelector("#descriptionInput");
    const cancelButton= favDialog.querySelector("#cancelBtn");
    //get Input-Fields (AddNewProject)
    const projDialog = document.getElementById("createProject");
    const confirmBtnProject = projDialog.querySelector("#confirmBtnProject");
    const projNameInput = projDialog.querySelector("#projectName");
    const cancelProject = projDialog.querySelector("#cancelBtnProject");
    //get Input-Fields (editProject)
    const editDialog = document.querySelector("#dialogBox");
    const cancelEdit = editDialog.querySelector("#closeDialogButton");
    //create IMG-Containers(InfoButton)
    const newImg = document.createElement('img');
    newImg.src = info;
    newImg.id = "info";
    prioField.insertAdjacentElement("afterend",newImg);
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
    const selectedProject = projects.find(project => project.selected === true);
    selectedProject.addToDo(titleInput.value, descriptionInput.value, dateInput.value, prioInput.value, notesnInput.value);
    cardArea.innerHTML = "";
    generateAllCards();
})

//cancelAddToDoWindow

cancelButton.addEventListener("click", () => {
favDialog.close();
})

//cancelEditWindow
cancelEdit.addEventListener("click", () => {
    editDialog.close();
})
//cancelNewProjectWindow
cancelProject.addEventListener("click", () => {
projDialog.close();
})
//add new Projects to Array

addProject.addEventListener("click", () => {
    createProject.showModal();
})

confirmBtnProject.addEventListener("click", (event) => {
const newProjectTitle = new Project(projNameInput.value);
projects.push(newProjectTitle);
const newProjectContainer = document.createElement("div");
newProjectContainer.id="defaultProject";
newProjectContainer.classList.add("toggleProjClicked");
newProjectContainer.textContent = projNameInput.value;
newProject.parentNode.insertBefore(newProjectContainer, newProject);
const toggleSidebarProjElements = document.getElementsByClassName("toggleProjClicked");
newProjectContainer.addEventListener("click", (event) => {
        for(let j=0;j<toggleSidebarProjElements.length;j++) {
            toggleSidebarProjElements[j].classList.remove("active");
            event.target.classList.add("active");
        }
        const toggleProjectsOff = projects.find(project => project.selected === true);
        toggleProjectsOff.toggleSelected();
        newProjectTitle.toggleSelected();
        cardArea.innerHTML = "";
        const selectedProject = projects.find(project => project.selected === true);
        if(selectedProject.toDos.length!=0) {
            generateAllCards();
        } else {
            addContainer();
        }
    })
})


// For Sidebar default Project to pop up
defaultProject.addEventListener("click", () => {
    const toggleProjectsOff = projects.find(project => project.selected === true);
    toggleProjectsOff.toggleSelected();
    Aufgaben.toggleSelected();
    cardArea.innerHTML = "";
    const selectedProject = projects.find(project => project.selected === true);
    console.log(selectedProject.toDos.length);
    if(selectedProject.toDos.length!=0) {
        generateAllCards();
    } else {
        addContainer();
    }
})

// toggle clicked dateElements on sideBar
const toggleSidebarElements = document.getElementsByClassName("toggleClicked");
for (let i=0; i<toggleSidebarElements.length;i++) {
    console.log("test");
    toggleSidebarElements[i].addEventListener("click", (event) => {
        for(let j=0;j<toggleSidebarElements.length;j++) {
            toggleSidebarElements[j].classList.remove("active");
            event.target.classList.add("active");
        }
    });
}

// toggle clicked projectElements on sideBar
const toggleSidebarProjElements = document.getElementsByClassName("toggleProjClicked")[0];
toggleSidebarProjElements.addEventListener("click", (event) => {
    const toggleSidebarProjElements = document.getElementsByClassName("toggleProjClicked")
        for(let j=0;j<toggleSidebarProjElements.length;j++) {
            toggleSidebarProjElements[j].classList.remove("active");
            console.log("tessdfsdt");
            event.target.classList.add("active");
        }
    });




