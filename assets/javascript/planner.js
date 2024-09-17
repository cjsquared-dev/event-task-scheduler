
let tableElement = document.querySelector('#table');
let newRowButtonElement = document.querySelector('#newRowBtn');
let tasks = getTasks();
let taskIndex = Object.keys(tasks).length;
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let toggleButton = document.getElementById('toggleButton');
let body = document.body;

generateTableHtml(tableElement);

// populate the data for the tasks in the table

function generateTableHtml(targetTableElement) {
    let index = 0;
    for (const key in tasks) {

// creating table elements for each task

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

// appends the input task data into the cells

        firstCell.appendChild(input);
        row.appendChild(firstCell);

        for (let i = 0; i < 6; i++) {

// if index is equal to 5, which is the last column in the table, add a delete icon, instead of a normal cell button.

            if (i === 5) {
                const deleteIcon = document.createElement('span');
                deleteIcon.addEventListener('click', () => deleteTaskAndRowData(6, row.dataset.index))
                deleteIcon.classList.add('material-symbols-outlined');
                deleteIcon.textContent = 'delete';
                const deleteIconCell = document.createElement('td')
                deleteIconCell.appendChild(deleteIcon);
                row.appendChild(deleteIconCell)
                targetTableElement.appendChild(row)

// add a cell button, with an event listener, to open the modal and populate the cell button with data, if the data exists in local storage

            } else {
                const buttonData = getTaskTimeDataFromLocalStorage(i, row.dataset.index);
                const buttonCell = document.createElement('td')
                const button = document.createElement('button');
                button.classList.add('time-button')

// populates cell data, if data exists in local storage

                if (buttonData) {
                    button.dataset.index = JSON.stringify(i) + row.dataset.index;
                    button.textContent = buttonData.name
                    buttonCell.appendChild(button);
                    button.parentElement.style.backgroundColor = buttonData.color
                } else {

// if cell data doesn't exist, populate the button with a label of button + column count

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

// this function creates a new row upon clicking the add new task button

function newTask(index) {
    const row = document.createElement('tr');
    row.dataset.index = taskIndex;
    const firstCell = document.createElement('td')
    const input = document.createElement('input')
    input.dataset.row = index;
    input.type = 'text';
    input.placeholder = "task name ";

// also, adds an event listener that saves the input data upon pressing any key, and then appends it to the table

    input.addEventListener('keydown', function(event) {
        addOrUpdateNewTask(row.dataset.index, event.target.value)
    })
    firstCell.appendChild(input);
    row.appendChild(firstCell);

    
    for (let i = 0; i < 6; i++) {
        const buttonCell = document.createElement('td')

// if index is equal to 5, which is the last column in the table, add a delete icon, instead of a normal cell button

        if (i === 5) {
            const deleteIcon = document.createElement('span');
            deleteIcon.addEventListener('click', () => deleteTaskAndRowData(6, row.dataset.index))
            deleteIcon.classList.add('material-symbols-outlined');
            deleteIcon.textContent = 'delete';
            const deleteIconCell = document.createElement('td')
            deleteIconCell.appendChild(deleteIcon);
            row.appendChild(deleteIconCell)
            tableElement.appendChild(row)

// add a cell button, with an event listener, to open the modal with no pre-existing data from local storage.

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

// appends the new row to the table

    tableElement.appendChild(row)
    taskIndex++
}

// adds an event listener to the add new task button, to call the function of new task.

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

