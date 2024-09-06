const table = document.createElement('table');

const headerRow = table.insertRow();
const header1 = headerRow.insertCell();
const header2 = headerRow.insertCell();
const header3 = headerRow.insertCell();
const header4 = headerRow.insertCell();
const header5 = headerRow.insertCell();
const header6 = headerRow.insertCell();
header1.textContent = '';
header2.textContent = '8:00 AM - 10:00 AM';
header3.textContent = '10:00 AM - 12:00 PM';
header4.textContent = '12:00 PM - 2:00 PM';
header5.textContent = '2:00 PM - 4:00 PM';
header6.textContent = '4:00 PM  - 6:00 PM';


const dataRow = table.insertRow();
const cell1 = dataRow.insertCell();
const cell2 = dataRow.insertCell();
const cell3 = dataRow.insertCell();
const cell4 = dataRow.insertCell();
const cell5 = dataRow.insertCell();
const cell6 = dataRow.insertCell();
cell1.textContent = 'Row 1, Cell 1';
cell2.textContent = 'Row 1, Cell 2';
cell3.textContent = 'Row 1, Cell 3';
cell4.textContent = 'Row 1, Cell 4';
cell5.textContent = 'Row 1, Cell 5';
cell6.textContent = 'Row 1, Cell 6';

document.getElementById('table-container').appendChild(table);
