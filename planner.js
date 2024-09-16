
let tableElement = document.querySelector('#table');
let newRowButtonElement = document.querySelector('#newRowBtn');
let tasks = getTasks();
let taskIndex = Object.keys(tasks).length;
let darkMode = false;

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
                    button.style.backgroundColor = buttonData.color
                } else {
                    button.textContent = `button ${i}`;
                }
                button.addEventListener ('click', (event) => openModal(i, JSON.parse(row.dataset.index), event));
                buttonCell.appendChild(button);
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
            const buttonCell = document.createElement('td')
            const button = document.createElement('button');
            button.classList.add('time-button')
            button.addEventListener ('click', (event) => openModal(i, JSON.parse(row.dataset.index), event));
            button.textContent = `button ${i}`;
            buttonCell.appendChild(button);
            row.appendChild(buttonCell);
        }
    }
    tableElement.appendChild(row)
    taskIndex++
}

// needto create a delete function for the row that will be deleted
newRowButtonElement.addEventListener('click', () => newTask(taskIndex))








