import { isAfter, isBefore } from 'date-fns';
import { format, isToday, parse } from "date-fns";
export { ToDo, Project, Aufgaben, projects};

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
}

//Default Project//
const Aufgaben = new Project("Survival");
projects.push(Aufgaben);
Aufgaben.toggleSelected();
Aufgaben.addToDo("Drink 8 glasses of water", "for preventing dehydration", "12.30.2024", "high", "Otherwise I'll get headaches");
Aufgaben.addToDo("Exercise", "2 hours of climbing!", "01.04.2025", "medium", "Need to register me first at the urban apes club");
Aufgaben.addToDo("Read a chapter of a book", "Moby Dick needs to get finished", "01.22.2025", "low", "I really need to get this done");