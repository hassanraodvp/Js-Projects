// Get references to DOM elements
let noteContain = document.querySelector('.notes-contain');
let button = document.querySelector('.btn');

// Function to load notes from localStorage
function showNotes() {
    let savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        noteContain.innerHTML = savedNotes;
    }
}
showNotes();

// Function to update localStorage with current notes
function updateStorage() {
    localStorage.setItem('notes', noteContain.innerHTML);
}

// Event listener for adding a new note
button.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = 'input-box';
    inputBox.setAttribute('contenteditable', 'true');
    img.src = 'img/dlt.png';
    img.className = 'dlt-img';
    noteContain.appendChild(inputBox).appendChild(img);
    updateStorage(); // Update localStorage after adding a new note
});

// Event listener for deleting a note or editing notes
noteContain.addEventListener('click', (e) => {
    if (e.target.className === 'dlt-img') {
        e.target.parentElement.remove();
        updateStorage(); // Update localStorage after deleting a note
    } else if (e.target.tagName === 'P') {
        notes = document.querySelectorAll('.input-box');
        notes.forEach(nt => {
            nt.onkeyup = () => {
                updateStorage(); // Update localStorage after editing a note
            }
        })
    }
});
