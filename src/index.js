import "./styles.css";
import { ToDo, Project } from "./objects.js";
import { sortDOM } from "./populateDom";




const Aufgaben = new Project("Aufgaben");
Aufgaben.addToDo("fussi", "Muss treten", "1.10.2025", "hoch", "keine AHnung");
Aufgaben.addToDo("Baskisddf", "Muss tretenlol", "2.11.2025", "hoch", "keine AHnung");
Aufgaben.addToDo("Baskasdi", "Muss tretenlol", "1.03.2023", "hoch", "keine AHnung");
Aufgaben.addToDo("Baskisddf", "Muss tretenlol", "2.11.2015", "hoch", "keine AHnung");
Aufgaben.addToDo("Baskasdi", "Muss tretenlol", "1.03.2029", "hoch", "keine AHnung");
Aufgaben.addToDo("Baskisddf", "Muss tretenlol", "2.11.2000", "hoch", "keine AHnung");
Aufgaben.addToDo("Baskasdi", "Muss tretenlol", "1.03.2090", "hoch", "keine AHnung");

// Aufgaben.editName("Tortellini");

// Aufgaben.deleteToDo(0);
// console.log(Aufgaben);

// Aufgaben.toDos[0].setDone();
// console.log(Aufgaben);

// Aufgaben.sortToDosByDate();
// console.log(Aufgaben);
