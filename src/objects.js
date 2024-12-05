import { isAfter, isBefore } from 'date-fns';
import { format, isToday, parse } from "date-fns";
export { ToDo, Project, Aufgaben};

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
        this.dueDate = new Date(dueDate);
    }

    setPriority (priority) {
        this.priority = priority;
    }

    setDate (notes) {
        this.notes = notes;
    }
}

//project constructeur, which includes toDo Cards
class Project {
    
    constructor(name) {
        this.name = name;
        this.toDos = [];
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

}



//Default Project//

const Aufgaben = new Project("Aufgaben");
Aufgaben.addToDo("Bad putzen", "Das Badezimmer muss sauber gemacht werden", "12.08.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Fenster putzen", "Fenster müssen gereinigt werden", "12.30.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Flur saugen", "Hier liegen zu viele Krümel", "01.03.2025", "hoch", "keine AHnung");
Aufgaben.addToDo("Flur saugen", "Hier liegen zu viele Krümel", "12.05.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Hilfe", "Hier liegen zu viele Krümel", "12.05.2024", "hoch", "keine AHnung");
Aufgaben.addToDo("Fenster putzen", "Fenster müssen gereinigt werden", "12.07.2024", "hoch", "keine AHnung");