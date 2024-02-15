import './style.css';

const projects = [];

const container = document.querySelector("#container");
const addProjectBtn = document.getElementById("add-project");
const projectModal = document.getElementById("project-modal");

// there are probably better way to target these
const closeBtns = document.getElementsByClassName("close")
const projectCloseBtn = closeBtns[0];

const submitProject = document.getElementById("submit-project");

class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority
    }
}

class Project {
    constructor(title, todos) {
        this.title = title;
        this.todo = todos;
    }
}

function addProject() {
    let projectTitle = document.getElementById("project-title").value;
    //change this later?
    let newProject = new Project(projectTitle, []);
    projects.push(newProject);
}

function render() {
    // container.innerHTML = `<p>HELLO</p>`;
    container.innerHTML="";
    projects.forEach((project, index) => {
        let card = document.createElement('div');
        card.classList.add("card");

        let title = document.createTextNode(project.title);
        card.appendChild(title);
        card.appendChild(document.createElement('br'));

        let addTodoBtn = document.createElement('button');
        addTodoBtn.textContent = "Add Task";
        addTodoBtn.classList.add("add-todo");
        addTodoBtn.addEventListener('click', openTodoModal);
        card.appendChild(addTodoBtn);

        container.appendChild(card);
    })
}

addProjectBtn.addEventListener('click', () => {
    projectModal.style.display = "block";
});

function closeModal(currentModal) {
    currentModal.style.display = "none";
}

projectCloseBtn.addEventListener('click', () => closeModal(projectModal));

submitProject.addEventListener('click', (e) => {
    e.preventDefault();
    addProject();
    console.log(projects);
    projectModal.style.display = "none";
    render();
})

let todoModal = document.getElementById("todo-modal");

function openTodoModal() {
    todoModal.style.display = "block";
}

const modalCloseBtn = closeBtns[1];
modalCloseBtn.addEventListener('click', () => closeModal(todoModal));

render();