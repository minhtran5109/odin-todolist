import './style.css';

const projects = [];
let currentProject = [];

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
        this.todos = todos;
    }
}

Project.prototype.addTask = function(todo) {
    this.todos.push(todo);
}

function addProject() {
    let projectTitle = document.getElementById("project-title").value;
    //change this later?
    let newProject = new Project(projectTitle, []);
    projects.push(newProject);
    setCurrentProject(newProject)
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
        addTodoBtn.addEventListener('click', () => openTodoModal(project));
        card.appendChild(addTodoBtn);

        container.appendChild(card);
    })

    const defaultSection = document.getElementById("default-section");
    defaultSection.innerHTML = "";
    if (projects.length) {
        // console.log('HEY');
        let title = document.createElement('h2')
        title.textContent= currentProject.title;
        defaultSection.appendChild(title);
        
        let todosElement = document.createElement('ul');
        let todos = currentProject.todos;
        if (todos.length) {
            todos.forEach((todo, index) => {
                let todoRow = document.createElement('li');
                todoRow.innerHTML = `
                <input type="checkbox" id="todo-${index}" name="todo-${index}"/>
                <label for="todo-${index}" class="strikethrough">${todo.title}</label>
                `
                todosElement.appendChild(todoRow);
            })
        }
        defaultSection.appendChild(todosElement);
    }

}

//Project
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
    closeModal(projectModal);
    render();
})

function setCurrentProject(project) {
    currentProject = project;
}

// Todo
let todoModal = document.getElementById("todo-modal");

function openTodoModal(project) {
    setCurrentProject(project);
    todoModal.style.display = "block";
    // console.log(currentProject);
    // console.log("This is project " + project.title)
}

const modalCloseBtn = closeBtns[1];
modalCloseBtn.addEventListener('click', () => closeModal(todoModal));

function addTodo() {
    let todoTitle = document.getElementById("todo-title").value;
    let todoDescription = document.getElementById("todo-description").value;
    let todoDueDate = document.getElementById("todo-date").value;
    let todoPriority = document.getElementById("todo-priority").value;

    let newTodo = new TodoItem(todoTitle, todoDescription, todoDueDate, todoPriority);
    currentProject.addTask(newTodo);
}

const submitTodo = document.getElementById("submit-todo");
submitTodo.addEventListener('click', (e) => {
    e.preventDefault();
    addTodo();
    closeModal(todoModal);
    render();
    console.log(currentProject);
})


render();