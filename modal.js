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


// add function to add buttonts to the modal
for (let i = 0; i < colors.length; i++) {
    const usedColors = JSON.parse(localStorage.getItem('usedColors'));
    let hex = null;
    let colorAlreadyUsed = false;
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
        console.log('The color chosen is ' + colors[i].label);
        colorSelected = colors[i]   
        });
        buttonContainerElement.append(buttonElement);
    }
    hex = null;
    console.log(hex);
}

// add event listener to submit button
cancelButton.addEventListener('click', function () {
    modalElement.classList.add('hidden');
})

submitButton.addEventListener('click', function () {
    console.log('Submit button was pressed.')

    console.log(nameInputElement.value);
    if (!nameInputElement.value || !numberInputElement.value || !emailInputElement.value || !colorSelected) {
        if (!document.getElementById ('error-message')) {
            const errorElement = document.createElement('p');
            errorElement.textContent = 'All fields need to be completed.';
            rightColumnElement.append(errorElement);
            // errorElement.classList.add('error-message');
            errorElement.id = 'error-message';
            console.log(errorElement);
        } 
        return;
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
    // updateTable();
    buttonElement = document.querySelectorAll([`[data-index='${cellData.time + cellData.taskIndex}']`])[0];
    buttonElement.textContent = cellData.name;
    buttonElement.style.backgroundColor = cellData.color;
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
    console.log(colorButton);
    colorButton.remove();
})

function openModal (time, taskIndex, event) {
    currentTime = JSON.stringify(time);
    currentTaskIndex = JSON.stringify(taskIndex);
    event.target.dataset.index = currentTime + currentTaskIndex;
    modalElement.classList.remove('hidden');
    updateInputIfDataForSelectedCell(time, taskIndex);
}

function updateInputIfDataForSelectedCell(time, taskIndex) {
    const modalData = getTaskTimeDataFromLocalStorage(time, taskIndex);
    console.log(modalData);
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

function getTaskTimeDataFromLocalStorage(time, taskIndex) {
    const key = JSON.stringify(time) + taskIndex ;
    const data = JSON.parse(localStorage.getItem(key));
    return(data);
}

function setTaskTimeDataToLocalStorage() {
    const key = cellData.time + cellData.taskIndex;
    localStorage.setItem(key, JSON.stringify(cellData));
}

function getTasks() {
// get tasks from local storage and parse them into an array of strings
    const key = 'tasks';
    let tasks = {}
    const localStorageTasks = JSON.parse(localStorage.getItem(key))
    if (localStorageTasks) {
        tasks = localStorageTasks
    }
    return(tasks)
}
function addOrUpdateNewTask(key, task) {
// get current tasks, append new task, stringify, and then set to local storage
    let tasks = getTasks();
    // if (!tasks[key]) {
    //     tasks[key] = task
    // }
    tasks[key] = task;
    console.log(tasks);
    const stringifyTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', stringifyTasks);
}

function deleteTaskAndRowData(columns, taskIndex) {
    for (let i = 0; i < columns; i++) {
        const key = JSON.stringify(i) + taskIndex;
        const usedColors = JSON.parse(localStorage.getItem('usedColors'));
        let usedColor = usedColors[key];
        console.log(usedColor);
        console.log(key);
        if (usedColor) {
            const colorButtonElement = document.createElement('button');
            colorButtonElement.dataset.color = usedColor.hex;
            colorButtonElement.style.backgroundColor = usedColor.hex;
            colorButtonElement.classList.add('button-style')
            colorButtonElement.textContent = usedColor.label;
            colorButtonElement.addEventListener('click', function () {
                console.log('The color chosen is ' + usedColor.label);
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

function remapTasksObject(tasks) {
    const orderedTasks = {};
    let index = 0;
    for (const key in tasks) {
        orderedTasks[index] = tasks[key];
        index++;
    }
    return orderedTasks;
}
// needto create a delete function for local storage








// we need a function that dynamically renders the individual person button for each cell
// create a function that displays the modal that displays already existing information for the person button
// create an event listener for each cell in the table which calls the function get data for person, if person exists, and render the data.



// create a delete button and function that deletes the Task if needed.

// Add Styling
// delete button for row and local storage
// replace the html with an updated version
