import { format, isToday, parse } from "date-fns";
export { ToDo, Project, projects, saveProjectsToStorage};

//Array for project Objects
const projects = [];

//class constructeur for toDo Cards
class ToDo {

    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = format(new Date(dueDate), "dd-MM-yyyy");
        this.priority = priority;
        this.notes = notes;
        this.checklist = false;
    }
    setDone() {
        this.checklist = !this.checklist;
    }
    setTitle(title) {
        this.title = title;
    }
    setDescription(description) {
        this.description = description;
    }
    setDate (dueDate) {
        this.dueDate = format(new Date(dueDate), "dd-MM-yyyy");
    }
    setPriority (priority) {
        this.priority = priority;
    }
    setNotes (notes) {
        this.notes = notes;
    }
}

//project constructeur, which includes toDo Cards
class Project {
    
    constructor(name) {
        this.name = name;
        this.toDos = [];
        this.selected = false;
    }
    editName(name) {
        this.name = name;
    }
    addToDo(title, description, dueDate, priority, notes) {
        const newToDo = new ToDo(title, description, dueDate, priority, notes);
        this.toDos.push(newToDo);
    }
    deleteToDo(num) {
        this.toDos.splice(num,1);
    }
    sortToDosByDate() {
        this.toDos.sort((a, b) => {
            const dateA = parse(a.dueDate, 'dd-MM-yyyy', new Date());
            const dateB = parse(b.dueDate, 'dd-MM-yyyy', new Date());
            return dateA - dateB;
        });
    }
    toggleSelected() {
        if(this.selected===false) {
            this.selected=true;
        } else {
            this.selected=false;
        }
    }
    toJSON() {
        return {
            name: this.name,
            toDos: this.toDos.map(todo => ({
                title: todo.title,
                description: todo.description,
                dueDate: todo.dueDate,
                priority: todo.priority,
                notes: todo.notes,
                checklist: todo.checklist
            })), // Speichert alle ToDos als flache Objekte
            selected: this.selected
        };
    }
    static fromJSON(json) {
        const project = new Project(json.name);
        project.toDos = json.toDos.map(todo => {
            const dueDateParsed = parse(todo.dueDate, "dd-MM-yyyy", new Date());
            return new ToDo(todo.title, todo.description, dueDateParsed, todo.priority, todo.notes);
        });
        project.selected = json.selected;
        return project;
    }
}

// Initialisiere Standardprojekt nur, wenn localStorage leer ist
function initializeDefaultProject() {
    const storageData = JSON.parse(localStorage.getItem("projects"));
    if (!storageData || storageData.length === 0) {
        const Aufgaben = new Project("Survival");
        projects.push(Aufgaben);
        Aufgaben.toggleSelected();
        Aufgaben.addToDo("Drink 8 glasses of water", "for preventing dehydration", "01.03.2025", "high", "Otherwise I'll get headaches");
        Aufgaben.addToDo("Exercise", "2 hours of climbing!", "01.06.2025", "medium", "Need to register me first at the urban apes club");
        Aufgaben.addToDo("Read a chapter of a book", "Moby Dick needs to get finished", "01.22.2025", "low", "I really need to get this done");
        saveProjectsToStorage();
    } else {
        getDatafromStorage();
    }
}
initializeDefaultProject();

//get Projects from storage //
function getDatafromStorage() {
    const storageData = JSON.parse(localStorage.getItem("projects"));
    if (storageData!=null) {
        for (let i=0; i < storageData.length; i++) {
            const getClass = Project.fromJSON(storageData[i]);
            projects.push(getClass);
        }
    }
};

//save Projects to Storage//
function saveProjectsToStorage() {
    const storageProjects = projects.map(project => project.toJSON()); // Alle Projekte, einschließlich ihrer toDos
    localStorage.setItem("projects", JSON.stringify(storageProjects));
}