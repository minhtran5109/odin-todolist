import './style.css';

const projects = [];

const container = document.querySelector("#container");
const addProjectBtn = document.getElementById("add-project");
const projectModal = document.getElementById("project-modal");
const closeBtn = document.getElementsByClassName("close")[0];
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
    constructor(title) {
        this.title = title;
    }
}

function addProject() {
    let projectTitle = document.getElementById("project-title").value;
    let newProject = new Project(projectTitle);
    projects.push(newProject);
}

function render() {
    // container.innerHTML = `<p>HELLO</p>`;
    projects.forEach((project, index) => {
        let card = document.createElement('div');
        card.classList.add("card");

        let title = document.createTextNode(project.title);
        card.appendChild(title);
        card.appendChild(document.createElement('br'));

        let addTodoBtn = document.createElement('button');
        addTodoBtn.textContent = "Add Task";
        card.appendChild(addTodoBtn);

        container.appendChild(card);
    })
}

addProjectBtn.addEventListener('click', () => {
    projectModal.style.display = "block";
});

closeBtn.addEventListener('click', () => {
    projectModal.style.display = "none";
})

submitProject.addEventListener('click', (e) => {
    e.preventDefault();
    addProject();
    console.log(projects);
    projectModal.style.display = "none";
    render();
})

render();