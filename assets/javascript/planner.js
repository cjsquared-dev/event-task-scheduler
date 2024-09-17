
let tableElement = document.querySelector('#table');
let newRowButtonElement = document.querySelector('#newRowBtn');
let tasks = getTasks();
let taskIndex = Object.keys(tasks).length;
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let toggleButton = document.getElementById('toggleButton');
let body = document.body;

// populate the data for the tasks
generateTableHtml(tableElement);

function generateTableHtml(targetTableElement) {
    let index = 0;
    for (const key in tasks) {
        console.log(`${key}: ${tasks[key]}`);
        const row = document.createElement('tr');
        const firstCell = document.createElement('td');
        const input = document.createElement('input');
        row.dataset.index = index;
        input.type = 'text';
        input.value = tasks[key];
        input.placeholder = "task name ";
        input.addEventListener('keydown', function(event) {
            addOrUpdateNewTask(key, event.target.value)
            console.log(event.target.value, taskIndex);
        })
        firstCell.appendChild(input);
        row.appendChild(firstCell);
        for (let i = 0; i < 6; i++) {
            console.log(i)
            if (i === 5) {
                const deleteIcon = document.createElement('span');
                deleteIcon.addEventListener('click', () => deleteTaskAndRowData(6, row.dataset.index))
                deleteIcon.classList.add('material-symbols-outlined');
                deleteIcon.textContent = 'delete';
                const deleteIconCell = document.createElement('td')
                deleteIconCell.appendChild(deleteIcon);
                row.appendChild(deleteIconCell)
                targetTableElement.appendChild(row)
            } else {
                const buttonData = getTaskTimeDataFromLocalStorage(i, row.dataset.index);
                console.log(buttonData);
                const buttonCell = document.createElement('td')
                const button = document.createElement('button');
                button.classList.add('time-button')
                if (buttonData) {
                    console.log(buttonData.name)
                    button.dataset.index = JSON.stringify(i) + row.dataset.index;
                    button.textContent = buttonData.name
                    buttonCell.appendChild(button);
                    button.parentElement.style.backgroundColor = buttonData.color
                } else {
                    buttonCell.appendChild(button);
                    button.textContent = `button ${i}`;
                }
                buttonCell.classList.add('button-cell');
                button.addEventListener ('click', (event) => openModal(i, JSON.parse(row.dataset.index), event));

                row.appendChild(buttonCell)
                targetTableElement.appendChild(row)
            }
        }
        index++;
    }
}

//Function to create a new row upon clicking  and input new tasks with clickable buttons inside cells
function newTask(index) {
    const row = document.createElement('tr');
    row.dataset.index = taskIndex;
    const firstCell = document.createElement('td')
    const input = document.createElement('input')
    input.dataset.row = index;
    input.type = 'text';
    input.placeholder = "task name ";
    input.addEventListener('keydown', function(event) {
        addOrUpdateNewTask(row.dataset.index, event.target.value)
        console.log(event.target.value, index);
    })
    firstCell.appendChild(input);
    row.appendChild(firstCell);
    for (let i = 0; i < 6; i++) {
        const buttonCell = document.createElement('td')
        if (i === 5) {
            const deleteIcon = document.createElement('span');
            deleteIcon.addEventListener('click', () => deleteTaskAndRowData(6, row.dataset.index))
            deleteIcon.classList.add('material-symbols-outlined');
            deleteIcon.textContent = 'delete';
            const deleteIconCell = document.createElement('td')
            deleteIconCell.appendChild(deleteIcon);
            row.appendChild(deleteIconCell)
            tableElement.appendChild(row)
        } else {
            const button = document.createElement('button');
            button.classList.add('time-button')
            button.addEventListener ('click', (event) => openModal(i, JSON.parse(row.dataset.index), event));
            button.textContent = `button ${i}`;
            buttonCell.appendChild(button);
            row.appendChild(buttonCell);
        }
        buttonCell.classList.add('button-cell');
    }
    tableElement.appendChild(row)
    taskIndex++
}

// needto create a delete function for the row that will be deleted
newRowButtonElement.addEventListener('click', () => newTask(taskIndex))

//light/dark mode styles for the planner

if (isDarkMode) {
    enableDarkMode();
  }

toggleButton.addEventListener('click', function () {
if (body.classList.contains('dark')) {
    enableLightMode();
} else {
    enableDarkMode();
}

});

function enableDarkMode() {
    body.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
}

function enableLightMode() {
    body.classList.remove('dark')
    localStorage.setItem('darkMode', 'false');

}

