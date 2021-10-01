console.log('Note App is started..');
showNotes();

let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function (e) {

    let addTitle = document.getElementById('addTitle');
    let addText = document.getElementById('addText');
    let notes = localStorage.getItem('notes');


    if (notes == null) {                                       // If Note is empty then,
        notesObj = [];                                         // notesObj's element is filled in Empty-Array!
    }
    else {                                                     // Elements inside noteObj behaves like STRING,
        notesObj = JSON.parse(notes);                          // so, "JSON.parse" covert those into ARRAYS!
    }

    let Obj = {
        title: addTitle.value,
        text: addText.value
    }

    notesObj.push(Obj);                                  //Add all Arrays(notesObj) from Textarea
    localStorage.setItem('notes', JSON.stringify(notesObj));       //Saved in LocalStorage [Stringify convert
    //             Array(notesObj) into String]
    addText.value = '';
    addTitle.value = '';
    // console.log(notesObj);  //For Debugging 
    showNotes();                                                   //From SHOW ALL NOTES Function 
});


// "SHOW ALL NOTES" FUNCTION BELOW:----------- 

function showNotes() {

    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = '';
    notesObj.forEach(function (element, index) {

        if (element.title.length === 0) {

            html += `
            <div class="noteCard card mx-4 my-4" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title smartyFont">Note ${index + 1}</h5>
                        <p class="card-text">${element.text}</p>
                        <button id= "${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
                        </div>
                        </div>
                        `
        }

        else {
            html += `
                        <div class="noteCard card mx-4 my-4" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.text}</p>
                            <button id= "${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
                        </div>
                        </div>
                    `

        }

    });


    let noteselement = document.getElementById('notes');
    if (notesObj.length != 0) {
        noteselement.innerHTML = html;

    }
    else {
        noteselement.innerHTML = `Nothing to show! Add some Notes to see.`;
    }
};

// DELETE "NOTE" FUNCTION BELOW:-----------

function deleteNote(index) {
    // console.log('Deleting Notes', index);

    let notes = localStorage.getItem('notes');


    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
};

// SEARCH FUNCTION BELOW:---------------

let search = document.getElementById("searchText");

search.addEventListener("input", function () {

    let inputvalue = search.value.toLowerCase();
    // console.log('Input......', inputvalue);

    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {
        let cardText = element.getElementsByTagName("p")[0].innerText;
        if (cardText.includes(inputvalue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});