const modal = document.querySelector(".modal-hidden");
const overlay = document.querySelector(".overlay");
const buttonContainerElement = document.getElementById("button-container");
const submitButton = document.getElementById("submit-button");
const cancelButton = document.getElementById('cancel-button');
const rightColumnElement = document.getElementById("right-column");
const modalElement = document.getElementById("modal");
const nameInputElement = document.getElementById('name');
const numberInputElement = document.getElementById('number');
const emailInputElement = document.getElementById('email');
const colors = [
    {
        hex: '#FBCEB1',
        label: 'Apricot'
    },
    {
        hex: '#00FFFF',
        label: 'Aqua'
    },
    {
        hex: '#7FFFD4',
        label: 'Aquamarine'
    },
    {
        hex: '#89CFF0',
        label: 'Baby Blue'
    },
    {
        hex: '#0000FF',
        label: 'Blue'
    },
    {
        hex: '#DE5D83',
        label: 'Blush'
    },
    {
        hex: '#964B00',
        label: 'Brown'
    },
    {
        hex: '#73001D',
        label: 'Burgundy'
    },
    {
        hex: '#FF7F50',
        label: 'Coral'
    },
    {
        hex: '#1E90FF',
        label: 'Dodger Blue'
    },
    {
        hex: '#50C878',
        label: 'Emerald'
    },
    {
        hex: '#004225',
        label: 'Forest Green'
    },
    {
        hex: '#B2BEB5',
        label: 'Gray'
    },
    {
        hex: '#006B3C',
        label: 'Green'
    },
    {
        hex: '#ED2939',
        label: 'Imperial Red'
    },
    {
        hex: '#6A5DFF',
        label: 'Indigo'
    },
    {
        hex: '#D891EF',
        label: 'Lavender'
    },
    {
        hex: '#FFF44F',
        label: 'Lemon'
    },
    {
        hex: '#D0FF14',
        label: 'Lime'
    },
    {
        hex: '#FF1DCE',
        label: 'Magenta'
    },
    {
        hex: '#C32148',
        label: 'Maroon'
    },
    {
        hex: '#ED9121',
        label: 'Orange'
    },
    {
        hex: '#FF91AF',
        label: 'Pink'
    },
    {
        hex: '#6A0DAD',
        label: 'Purple'
    },
    {
        hex: '#CE4676',
        label: 'Raspberry'
    },
    {
        hex: '#E30B5D',
        label: 'Ruby'
    },
    {
        hex: '#CC5500',
        label: 'Rust'
    },
    {
        hex: '#E9967A',
        label: 'Salmon'
    },
    {
        hex: '#B2FFFF',
        label: 'Sky Blue'
    },
    {
        hex: '#915F6D',
        label: 'Taupe'
    },
    {
        hex: '#FDEE00',
        label: 'Yellow'
    },
    {
        hex: '#B284BE',
        label: 'Violet'
    },
]
let colorSelected = null;
let currentTime = null;
let currentTaskIndex = null;
let cellData = null;
let currentColorSelected = null;


// this function adds the color buttons to the modal by storing the array of objects in code, to append to the modal.

for (let i = 0; i < colors.length; i++) {
    const usedColors = JSON.parse(localStorage.getItem('usedColors'));
    let hex = null;
    let colorAlreadyUsed = false;

// checks to see if color is already used, and if not, then it will add the color button to the button container in the modal

    for (let usedColorKey in usedColors) {
        if (usedColors[usedColorKey]) {
            hex = usedColors[usedColorKey].hex;
        }
        if (hex === colors[i].hex) {
            colorAlreadyUsed = true;
        }
    }
    if (!colorAlreadyUsed) {
    const buttonElement = document.createElement('button');
    buttonElement.dataset.color = colors[i].hex;
    buttonElement.style.backgroundColor = colors[i].hex;
    buttonElement.classList.add('button-style')
    buttonElement.textContent = colors[i].label;
    buttonElement.addEventListener('click', function () {
        colorSelected = colors[i]   
        });
        buttonContainerElement.append(buttonElement);
    }
    hex = null;
}

// adds an event listener to the cancel button, if clicked, closes the modal

cancelButton.addEventListener('click', function () {
    modalElement.classList.add('hidden');
})

// adds an event listener to the submit button, when clicked, it checks to make sure that data is input in all fields, if not, it displays an error message

submitButton.addEventListener('click', function () {
    if (!nameInputElement.value || !numberInputElement.value || !emailInputElement.value || !colorSelected) {
        if (!document.getElementById ('error-message')) {
            const errorElement = document.createElement('p');
            errorElement.textContent = 'All fields need to be completed.';
            rightColumnElement.append(errorElement);
            errorElement.id = 'error-message';
        } 
        return;

// however, if there is information in all inputs, it removes the error message, and stores all of the information in local storage       

    } else { 
        let errorElement = document.getElementById('error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    cellData = {
        name: nameInputElement.value,
        number: numberInputElement.value,
        email: emailInputElement.value,
        color: colorSelected.hex,
        colorLabel: colorSelected.label,
        time: currentTime,
        taskIndex: currentTaskIndex
    }
    nameInputElement.value = "";
    numberInputElement.value = "";
    emailInputElement.value = "";
    colorSelected = null;
    modalElement.classList.add('hidden');
    setTaskTimeDataToLocalStorage();

// It then adds the Name to the button on the Table, and stores the rest of the information in local storage so that if needed, when you click on that button on the table, it will 
// populate all of the information into the given fields. It also removes the color chosen from the list of colors to choose from.  

    buttonElement = document.querySelectorAll([`[data-index='${cellData.time + cellData.taskIndex}']`])[0];
    buttonElement.textContent = cellData.name;
    buttonElement.parentNode.style.backgroundColor = cellData.color;
    const colorButton = document.querySelector(`[data-color='${cellData.color}']`);
    let usedColors = JSON.parse(localStorage.getItem('usedColors'));
    if (!usedColors) {
        usedColors = {};
    }
    usedColors[cellData.time + cellData.taskIndex] = {
        hex: cellData.color,
        label: cellData.colorLabel,
    }
    localStorage.setItem('usedColors', JSON.stringify(usedColors));
    colorButton.remove();
})

// this function opens the modal, and sets the data-index for that given cell, it also removes the 'hidden' class from html and displays the modal, and 
// calls the method updateInputIfDataForSelectedCell

function openModal (time, taskIndex, event) {
    currentTime = JSON.stringify(time);
    currentTaskIndex = JSON.stringify(taskIndex);
    event.target.dataset.index = currentTime + currentTaskIndex;
    modalElement.classList.remove('hidden');
    updateInputIfDataForSelectedCell(time, taskIndex);
}

//it updates inputs and populates the inputs with the data from local storage, based on the x/y of the table

function updateInputIfDataForSelectedCell(time, taskIndex) {
    const modalData = getTaskTimeDataFromLocalStorage(time, taskIndex);
    if (modalData) {
        nameInputElement.value = modalData.name;
        numberInputElement.value = modalData.number;
        emailInputElement.value = modalData.email;
    } else {
        nameInputElement.value = '';
        numberInputElement.value = '';
        emailInputElement.value = '';
    }
}

// this function gets the task and the time data from local storage, 

function getTaskTimeDataFromLocalStorage(time, taskIndex) {
    const key = JSON.stringify(time) + taskIndex ;
    const data = JSON.parse(localStorage.getItem(key));
    return(data);
}

// this function sets the task and time data into local storage

function setTaskTimeDataToLocalStorage() {
    const key = cellData.time + cellData.taskIndex;
    localStorage.setItem(key, JSON.stringify(cellData));
}

// get tasks from local storage and parse them into an array of strings

function getTasks() {
    const key = 'tasks';
    let tasks = {}
    const localStorageTasks = JSON.parse(localStorage.getItem(key))
    if (localStorageTasks) {
        tasks = localStorageTasks
    }
    return(tasks)
}

// get current tasks, append new task, stringify, and then set to local storage

function addOrUpdateNewTask(key, task) {
    let tasks = getTasks();
    tasks[key] = task;
    const stringifyTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', stringifyTasks);
}

// this function deletes the information from the table and from local storage, when the trash can button is clicked

function deleteTaskAndRowData(columns, taskIndex) {
    for (let i = 0; i < columns; i++) {
        const key = JSON.stringify(i) + taskIndex;
        const usedColors = JSON.parse(localStorage.getItem('usedColors'));
        let usedColor = usedColors[key];
        if (usedColor) {
            const colorButtonElement = document.createElement('button');
            colorButtonElement.dataset.color = usedColor.hex;
            colorButtonElement.style.backgroundColor = usedColor.hex;
            colorButtonElement.classList.add('button-style')
            colorButtonElement.textContent = usedColor.label;
            colorButtonElement.addEventListener('click', function () {
                colorSelected = colors[i]   
            });
            buttonContainerElement.append(colorButtonElement);

        }
        delete usedColors[key];
        localStorage.setItem('usedColors', JSON.stringify(usedColors));
        localStorage.removeItem(key);
    }

    let tasks = getTasks();
    delete tasks[taskIndex];
    tasks = remapTasksObject(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    const rowElement = document.querySelector([`[data-index='${taskIndex}']`]);
    rowElement.remove();
}

// this function dynamically changes the key, so that when a task is deleted, it still works properly.

function remapTasksObject(tasks) {
    const orderedTasks = {};
    let index = 0;
    for (const key in tasks) {
        orderedTasks[index] = tasks[key];
        index++;
    }
    return orderedTasks;
}