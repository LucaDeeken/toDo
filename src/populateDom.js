import { Project, projects, ToDo } from "./objects.js";
import { cardContent, cardArea, content, saveProjectsToStorage } from "./index.js";
import { isToday, parse, isWithinInterval, addDays } from "date-fns";
import plusIMG from "./images/plus.png";
export { generateAllCards, sortByToday, sortByWeek, addContainer, addProject };

//Create IMG Containers(PlusButton)


//FUNCTION-LIBRARY

//generating Cards

function generateCard(i, j, h) {
    
    const selectedProject = projects.find(project => project.selected === true);
    const newDiv = document.createElement("div");
    newDiv.id = "card";
    newDiv.classList.add("card");
    newDiv.innerHTML = content;
    cardArea.appendChild(newDiv);
    newDiv.setAttribute("data-index", [i]);
    const toDoKeys = selectedProject.toDos[i];
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
        if (!selectedProject.toDos[i]) {
            console.error(`No ToDo found at index ${i}`);
            return;
        }


    //change backgroundcolor depending on priority
    const prioBackgroundColor = newDiv.querySelector("#prioBackground");
    switch(selectedProject.toDos[i].priority) {
        case "high":
            prioBackgroundColor.classList.remove("prioBackgroundColorGreen");
            prioBackgroundColor.classList.add("prioBackgroundColorRed");
            break;
        case "medium":
            prioBackgroundColor.classList.remove("prioBackgroundColorGreen");
            prioBackgroundColor.classList.add("prioBackgroundColorYellow");
            break;
        case "low":
            break;
    }

    //add EventListener for deleteButton
    const deleteButton = newDiv.querySelector("#deleteBtn");
    deleteButton.addEventListener("click", () => {
        selectedProject.deleteToDo(i);
        cardArea.innerHTML = "";
        saveProjectsToStorage();
        generateAllCards();
    });
    //add EventListener for checkBox
    checkBoxIndex.addEventListener("click", () => {
        selectedProject.toDos[i].setDone();
        saveProjectsToStorage();
    });
    //add EventListener for editButton
    const newImg = newDiv.querySelector("#info");
    const editDialog = newDiv.querySelector('#dialogBox');
    newImg.addEventListener("click", () => {
        editDialog.showModal(); // Open the dialog
        const cancelEdit = editDialog.querySelector("#closeDialogButton");
        cancelEdit.addEventListener("click", () => {
            editDialog.close();
        });
        //HIER//
        let h=0;
        const inputEditFields = editDialog.getElementsByClassName("editInputFields");
        for(let key in toDoKeys) {    
            console.log(h);
            if (h===2) {
                let dateString = toDoKeys[key];
                let [day, month, year] = dateString.split("-");
                let formattedDate = `${year}-${month}-${day}`;
                const editDate = new Date(formattedDate);
                inputEditFields[h].value= editDate.toISOString().split("T")[0];
            } else if (h===3) {
                console.log(toDoKeys[key]);
                switch (toDoKeys[key]) {
                    case "high":
                        const checkedPrioHigh = editDialog.querySelector("#prioEditHigh");
                        console.log(checkedPrioHigh);
                        checkedPrioHigh.checked = true;
                        console.log("high");
                        break;
                    case "medium":
                        const checkedPrioMedium = editDialog.querySelector("#prioEditMedium");
                        checkedPrioMedium.checked = true;
                        break;
                    case "low":
                        const checkedPrioLow = editDialog.querySelector("#prioEditLow");
                        checkedPrioLow.checked = true;
                        break;
                }
            } else {
                inputEditFields[h].value= `${toDoKeys[key]}`;
            }
            h++;
        }
    const editButton = editDialog.querySelector("#editDialogButton");
    editButton.addEventListener("click", (event) => {
        event.preventDefault();
        for (let k =0; k<inputEditFields.length; k++) {
            inputEditFields[k].removeAttribute("readonly");
        };
        const checkBoxEdit = editDialog.querySelectorAll(".checkBoxEdit");
        for (let l=0; l<checkBoxEdit.length; l++) {
            checkBoxEdit[l].removeAttribute("disabled");
        };
        editButton.textContent = "Apply";
        editButton.addEventListener("click", () => {
            const newEditTitle = editDialog.querySelector("#titleEdit");
            selectedProject.toDos[i].setTitle(newEditTitle.value);

            const newEditDescription = editDialog.querySelector("#descriptionEdit");
            selectedProject.toDos[i].setDescription(newEditDescription.value);

            const newEditNotes = editDialog.querySelector("#dueNotesEdit");
            selectedProject.toDos[i].setNotes(newEditNotes.value);

            const newEditDate = editDialog.querySelector("#dueDateEdit");
            selectedProject.toDos[i].setDate(newEditDate.value);

            const newEditPrio = editDialog.querySelector('input[name="prioEdit"]:checked');
            selectedProject.toDos[i].setPriority(newEditPrio.value);

            cardArea.innerHTML = "";  
            generateAllCards();
            saveProjectsToStorage();
            editDialog.close();
        });

              


    })        
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
addDiv.addEventListener("click", () => {
    dialog.showModal();
})
}

// generate add Projects Icon

const addProject = document.createElement("img");
addProject.id= "plusProject";
const newContainer = document.getElementById("newProject");
newContainer.appendChild(addProject);
addProject.src= plusIMG;

//generate all Cards based of the Object Arrays
function generateAllCards() {
    let j=0;
    const selectedProject = projects.find(project => project.selected === true);
    selectedProject.sortToDosByDate();
    for(let i=0; i<selectedProject.toDos.length;i++) {
        j=generateCard(i, j);
    };
    
        // add "add"-Container at the last spot
    addContainer();
}

//generate all Cards dated today
function sortByToday() {
    cardArea.innerHTML = "";
    let j=0;
    const selectedProject = projects.find(project => project.selected === true);    
    for (let i=0; i<selectedProject.toDos.length;i++) {

        if ((isToday(parse(selectedProject.toDos[i].dueDate, 'dd-MM-yyyy', new Date()))) === true) {
            j=generateCard(i, j);
        }
    }
    addContainer();
}
//generate all Cards dated for the next seven days, today included
function sortByWeek() {
    cardArea.innerHTML = "";
    let j=0;
    const selectedProject = projects.find(project => project.selected === true);
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const sevenDaysLater = addDays(today, 7);
        for (let i=0; i<selectedProject.toDos.length;i++) {
            const isInNextSevenDays = isWithinInterval((parse(selectedProject.toDos[i].dueDate, 'dd-MM-yyyy', new Date())), { start: today, end: sevenDaysLater });
            if (isInNextSevenDays === true) {
                j=generateCard(i, j);
            }
    }
    addContainer();
}

//check for chosen project
const selectedProject = projects.find(project => project.selected === true);