
let tableElement = document.querySelector('#table');
let newRowButtonElement = document.querySelector('#newRowBtn')


//Function to create a new row upon clicking  and input new tasks with clickable buttons inside cells
function newTask() {
    const newRow = document.createElement('tr');
    const firstCell = document.createElement('td')
    const input = document.createElement('input')
    input.type = 'text';
    input.placeholder = "task name ";
    firstCell.appendChild(input);
    newRow.appendChild(firstCell);
    for (let i = 0; i < 5; i++) {
        const buttonCell = document.createElement('td')
        const button = document.createElement('button');
        button.addEventListener ('click', () => openModal(i, input.value));
        button.textContent = `button ${i}`;
        buttonCell.appendChild(button);
        newRow.appendChild(buttonCell)
    }
    tableElement.appendChild(newRow)
}
newRowButtonElement.addEventListener('click', newTask)








