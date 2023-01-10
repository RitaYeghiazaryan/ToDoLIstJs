const button = document.getElementById("add-task-btn")
const input = document.getElementById("description-task")
const todosWrapper = document.querySelector(".todos-wrapper")

function date() {
    let data = new Date()
    let day = data.getDate()
    let month = data.getMonth() + 1;
    let year = data.getFullYear()
    let hours = data.getHours()
    let minutes = data.getMinutes();
    let seconds = data.getSeconds()
    let time = String(hours).padStart(2, 0) + ":" + String(minutes).padStart(2, 0) + ":" + String(seconds).padStart(2, 0)
    let fulldate = String(day).padStart(2, 0) + ":" + String(month).padStart(2, 0) + ":" + year
    let dateInfo = {
        fulldate: fulldate,
        time: time
    }
    return dateInfo

}

let tasks;
let timeArr = [];
let dataArr = [];
let todoItemElems = [];

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"))

function Task(description, date) {
    this.description = description;
    this.completed = false;
    this.date = date;

}
const updateLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
let storage = JSON.parse(window.localStorage.getItem("tasks"))
const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    fillHtmlList();
    updateLocal();

}



const createTemplate = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? "checked" : ''}">
            <div class="task-description">
                <div class="description">${task.description}</div>
                <div class="buttons">
                    <input onClick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ?'checked':''}>
                    <button  onClick="deleteteTask(${index})" class="btn-delete">Delete</button>
            </div>
        </div>
            <div class="time">${timeArr[index]}</div> 
            <div class="day">${dataArr[index]}</div> 
     </div>

     `
}



const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false)
    const completedTask = tasks.length && tasks.filter(item => item.completed == true)
    tasks = [...activeTasks, ...completedTask]
}



const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if (tasks.length > 0) {
        filterTasks()
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index)
            let time = document.querySelectorAll(".time")
            let data = document.querySelectorAll(".day")

            time.forEach((time, i) => {
                if (!storage) {
                    let initialTime = date()
                    let rightTime = initialTime.time
                    timeArr.push(rightTime)
                }
                if (time.innerHTML === "undefined") {
                    time.innerHTML = `${tasks[i]["date"]["time"]}`
                }

            })
            data.forEach((day, i) => {
                if (!storage) {
                    let initialData = date()
                    let rightData = initialData.fulldate
                    dataArr.push(rightData)
                }
                if (day.innerHTML === "undefined") {
                    day.innerHTML = `${tasks[i]["date"]["fulldate"]}`
                }
            })
            todoItemElems = document.querySelectorAll(".todo-item")
        })
    }
}
fillHtmlList();

function newTask() {
    let inputValue = input.value.trim()
    console.log(inputValue.length);
    if (!inputValue.length) {
        return
    }
    tasks.push(new Task(inputValue, date()))
    updateLocal()
    fillHtmlList()
    input.value = ""
}

function addTask(...args) {
    args.map(arg => {
        arg.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                newTask()
            }
        })
        arg.addEventListener("click", function () {
            newTask()
        })
    })
}
addTask(input, button)

const deleteteTask = (index) => {
    setTimeout(() => {
        tasks.splice(index, 1)
        updateLocal();
        fillHtmlList();

    }, 500)
}