import './style.css';

const projects = [];

const container = document.querySelector("#container");
const addProjectBtn = document.getElementById("add-project");
const projectModal = document.getElementById("project-modal");
const closeBtn = document.getElementsByClassName("close")[0];

class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority
    }
}

class Project {
    constructor(title) {
        this.title = title;
    }
}

function render() {
    // container.innerHTML = `<p>HELLO</p>`;
    addProjectBtn.addEventListener('click', () => {
        projectModal.style.display = "block";
    });

    closeBtn.addEventListener('click', () => {
        projectModal.style.display = "none";
    })
}

render();