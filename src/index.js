import "./styles.css";
import { ToDo, Project, projects, saveProjectsToStorage } from "./objects.js";
import { addContainer, generateAllCards, sortByToday, sortByWeek, addProject } from "./populateDom";
import info from './images/Info.png';
import deleteButton from './images/delete.png';

export {cardContent, cardArea, content, saveProjectsToStorage}

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
    const deleteProjBut = document.getElementById("deleteProjBut");
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
    if(!titleInput.value) {
        alert("Enter the title of the To-Do!");
        return;
    };
    if(!prioInput) {
        alert("Enter a priority value for the To-Do!");
        return;
    };
    if(!dateInput.value) {
        alert("Enter a due date!");
        return;
    };
    selectedProject.addToDo(titleInput.value, descriptionInput.value, dateInput.value, prioInput.value, notesnInput.value);
    saveProjectsToStorage();
    cardArea.innerHTML = "";
    favDialog.querySelector("form").reset();
    generateAllCards();
    favDialog.close();
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
    if(!projNameInput.value) {
        alert("Enter the title of the project!");
        return;
    }
    const newProjectTitle = new Project(projNameInput.value);
    projects.push(newProjectTitle);
    const storageProjects = JSON.parse(localStorage.getItem("projects")) || [];
    localStorage.removeItem("projects");
    storageProjects.push(newProjectTitle.toJSON());
    localStorage.setItem("projects", JSON.stringify(storageProjects));
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

//build project Divs//
function buildProjectDivs() {

    for (let i =0; i < projects.length; i++) {
    const newProjectContainer = document.createElement("div");
    newProjectContainer.id="defaultProject";
    newProjectContainer.classList.add("toggleProjClicked");
    newProjectContainer.textContent = projects[i].name;
    newProject.parentNode.insertBefore(newProjectContainer, newProject);
    const toggleSidebarProjElements = document.getElementsByClassName("toggleProjClicked");
    newProjectContainer.addEventListener("click", (event) => {
            for(let j=0;j<toggleSidebarProjElements.length;j++) {
                toggleSidebarProjElements[j].classList.remove("active");
                event.target.classList.add("active");
            }
            const toggleProjectsOff = projects.find(project => project.selected === true);
            toggleProjectsOff.toggleSelected();
            const chosenProj = projects[i];
            chosenProj.toggleSelected();
            cardArea.innerHTML = "";
            const selectedProject = projects.find(project => project.selected === true);
            if(selectedProject.toDos.length!=0) {
                generateAllCards();
            } else {
                addContainer();
            }
        })
    }
} 
buildProjectDivs();

// toggle clicked dateElements on sideBar
const toggleSidebarElements = document.getElementsByClassName("toggleClicked");
for (let i=0; i<toggleSidebarElements.length;i++) {
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
    const toggleSidebarProjElements = document.getElementsByClassName("toggleProjClicked");
        for(let j=0;j<toggleSidebarProjElements.length;j++) {
            toggleSidebarProjElements[j].classList.remove("active");
            event.target.classList.add("active");
        }
    });

    //delete Project//

    deleteProjBut.addEventListener("click", () => {
        const projectToDelete = projects.find(project => project.selected === true);
        const indexProjectToDelete =projects.indexOf(projectToDelete);
        projects.splice(indexProjectToDelete, 1);
        console.log(projects);
        projects[0].toggleSelected();
        console.log(projects);
        saveProjectsToStorage();
        generateAllCards();


    })

    console.log(projects);