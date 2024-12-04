import { isAfter, isBefore } from 'date-fns';
import { format } from "date-fns";
export { ToDo, Project};


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
        this.toDos.sort((a, b) => a.dueDate - b.dueDate);
    }

}

// Sort by day/week/priority/unchecked
const sortDOM = {

    sortByDate(Projekt) {

    }
}