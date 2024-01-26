document.querySelector('.specialButton').addEventListener('click', () =>{
  document.querySelectorAll('.notes').forEach(note =>{
    note.remove();
    localStorage.clear();
  })
})


document.querySelector('.createButton').addEventListener('click', () =>{
   
  let uniqueID = 'note' + Math.floor(Math.random()* 1000);
  let note = {
    title : document.querySelector('.titleName').value,
    textContent : document.querySelector('.textContent').value
  } 
  console.log(note);
  
  addNoteToLocalStorage(note, uniqueID)
  insertContent(note, uniqueID);

})

let allNotes = document.querySelector('.notes');

function insertContent(note, uniqueID){

  

  let noteDiv = document.createElement('div');

  noteDiv.classList.add('note', uniqueID);

  let noteTitle = document.createElement('h4');
  let noteContent = document.createElement('p');
  let noteDelButton = document.createElement('button');

  noteTitle.innerText = note.title;
  noteContent.innerText = note.textContent;
  noteDelButton.innerText = 'Delete Node';

  noteDiv.appendChild(noteTitle);
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(noteDelButton);
  allNotes.appendChild(noteDiv);

  document.querySelector('.titleName').value = '' 
  document.querySelector('.textContent').value =''
   
  noteDelButton.addEventListener('click', () =>{
    removeElementFromNotesList(uniqueID)   
  })

  

}

let savenotes = []

function addElementsToScreen(){
  if(localStorage.getItem('savenotes')) {
    savenotes = JSON.parse(localStorage.getItem('savenotes'))
    savenotes.forEach (note=>{
      insertContent(note, note.uniqueID)
    })
  }
}

function addNoteToLocalStorage(note, uniqueID) { 
  note = {...note, uniqueID}
  savenotes.push(note)
  localStorage.setItem('savenotes', JSON.stringify(savenotes))
}

function removeElementFromNotesList(id){
  document.querySelector('.' + id).remove();

  savenotes = JSON.parse(localStorage.getItem('savenotes'))

  let index = savenotes.findIndex(note => note.uniqueID == id)
  savenotes.splice(index, 1)

  localStorage.setItem('savenotes', JSON.stringify(savenotes))
}
addElementsToScreen()