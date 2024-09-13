const modal = document.querySelector(".modal-hidden");
const overlay = document.querySelector(".overlay");
const buttonContainerElement = document.getElementById("button-container");
const submitButton = document.getElementById("submit-button");
const cancelButton = document.getElementById('cancel-button');
const rightColumnElement = document.getElementById("right-column");
const modalElement = document.getElementById("modal");
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
        hex: '#87421F',
        label: 'Brown'
    },
    {
        hex: '#800020',
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
        hex: '#B57EDC',
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
        hex: '#C32148C',
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
        hex: '#FF0000',
        label: 'Red'
    },
    {
        hex: '#9C2542',
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
        hex: '#FFAA1D',
        label: 'Yellow'
    },
    {
        hex: '#B284BE',
        label: 'Violet'
    },
]
let colorSelected = null;
let currentTime = null;
let currentTask = null;
let cellData = null;


// add function to add buttonts to the modal
for (let i = 0; i < colors.length; i++) {
    const buttonElement = document.createElement('button');
    buttonElement.style.backgroundColor = colors[i].hex;
    buttonElement.textContent = colors[i].label;
    buttonElement.addEventListener('click', function () {
        console.log('The color chosen is ' + colors[i].label);
        colorSelected = colors[i]   
    });
    buttonContainerElement.append(buttonElement);
}

// add event listener to submit button
cancelButton.addEventListener('click', function () {
    modalElement.classList.add('hidden');
})

submitButton.addEventListener('click', function () {
    console.log('Submit button was pressed.')
    let nameInputElement = document.getElementById('name');
    let numberInputElement = document.getElementById('number');
    let emailInputElement = document.getElementById('email');
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
        time: currentTime,
        task: currentTask
    }
    nameInputElement.value = "";
    numberInputElement.value = "";
    emailInputElement.value = "";
    colorSelected = null;
    modalElement.classList.add('hidden');
    setTaskTimeDataToLocalStorage();

})

function openModal (time, task) {
    currentTime = time;
    currentTask = task;
    modalElement.classList.remove('hidden')
}

function getTaskTimeDataFromLocalStorage (time, task) {
    const key = time + task;
    const data = JSON.parse(key);
    return(data);
}

function setTaskTimeDataToLocalStorage () {
    const key = cellData.time + cellData.task;
    localStorage.setItem(key, JSON.stringify(cellData));
}
//we need to save this ^^ info to local storage


// we need a function that dynamically renders the individual person button for each cell



// create a function that displays the modal for a new person button


// create a function that sets a persons data in local storage

// create a function that retreives a persons data from local storage

// creat a funciton to dynamically create a table - chris should have done this









// create a function that displays the modal that displays already existing information for the person button
// create an event listener for each cell in the table which calls the function get data for person, if person exists, and render the data.

// create a function that is attached to "add new task button" that auto saves the information 

// create a delete button and function that deletes the Task if needed.
