import './style.css';

const projects = [];
let currentProject = [];
let currentTodo = {};
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
        card.setAttribute('id', `project-${index}`)

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
                let btns = document.createElement('span')
                let expandBtn = document.createElement('button')
                expandBtn.textContent="Expand"
                expandBtn.classList.add("expand-btn")
                expandBtn.addEventListener('click', ()=> expandContent(index))
                todoRow.appendChild(expandBtn);

                let content = document.createElement('div')
                content.classList.add('content');
                content.setAttribute('data-id', `${index}`);
                content.innerHTML = `
                <div>Due: ${todo.dueDate}</div>
                <div>Priority: ${todo.priority}</div>
                <div>
                    <span>Description:</span>
                    <p>${todo.description}</p>
                </div>
                `
                let editBtn = document.createElement('button')
                editBtn.textContent="Edit"
                editBtn.classList.add('edit-todo-btn');
                editBtn.addEventListener("click", () => editTodo(index))

                let deleteBtn = document.createElement('button');
                deleteBtn.textContent="Delete";
                deleteBtn.addEventListener("click", () => deleteTodo(index))
                
                btns.appendChild(editBtn);
                btns.appendChild(deleteBtn);
                content.appendChild(btns);
                todoRow.appendChild(content);

                todosElement.appendChild(todoRow);
            })
        }
        defaultSection.appendChild(todosElement);
    }

}

//Project
let projectForm = document.getElementById('project-form');
addProjectBtn.addEventListener('click', () => {
    projectModal.style.display = "block";
});

function closeModal(currentModal) {
    todoForm.reset();
    projectForm.reset();
    // editTodoForm.reset();
    currentModal.style.display = "none";
}

projectCloseBtn.addEventListener('click', () => closeModal(projectModal));

submitProject.addEventListener('click', (e) => {
    e.preventDefault();
    addProject();
    closeModal(projectModal);
    render();
})

function setCurrentProject(project) {
    currentProject = project;
}

// Create Todo
let todoModal = document.getElementById("todo-modal");
let todoForm = document.getElementById('todo-form');
function openTodoModal(project) {
    setCurrentProject(project);
    todoModal.style.display = "block";
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

    todoForm.reset();
}

const submitTodo = document.getElementById("submit-todo");
submitTodo.addEventListener('click', (e) => {
    e.preventDefault();
    addTodo();
    closeModal(todoModal);
    render();
    console.log(currentProject);
})

// Edit Todo
const editTodoModal = document.getElementById("todo-edit-modal");
const saveEditTodoBtn = document.getElementById("submit-todo-edit");
const editTodoForm = document.getElementById("todo-edit-form");
let todoTitle = document.getElementById("todo-edit-title");
let todoDescription = document.getElementById("todo-edit-description");
let todoDueDate = document.getElementById("todo-edit-date");
let todoPriority = document.getElementById("todo-edit-priority");
const editTodoCloseBtn = closeBtns[2];
editTodoCloseBtn.addEventListener('click', () => closeModal(editTodoModal));

let currentIndex = 0;
function editTodo(index) {
    currentIndex = index;
    console.log("From outside: " + index);
    currentTodo = currentProject.todos[index]
    editTodoModal.style.display = "block";

    todoTitle.value = currentTodo.title;
    todoDescription.value = currentTodo.description;
    todoDueDate.value = currentTodo.dueDate;
    todoPriority.value = currentTodo.priority;
}

saveEditTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currentProject.todos[currentIndex].title = todoTitle.value;
    currentProject.todos[currentIndex].description = todoDescription.value;
    currentProject.todos[currentIndex].dueDate = todoDueDate.value;
    currentProject.todos[currentIndex].priority = todoPriority.value;
    closeModal(editTodoModal);
    console.log(currentProject);
    render();
})

// Delete Todo
function deleteTodo(index) {
    currentProject.todos.splice(index, 1);
    render();
    console.log(currentProject);
}

//Expand Todo in details
function expandContent(index) {
    currentIndex = index;
    let content = document.querySelector(`.content[data-id="${index}"]`);
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

render();