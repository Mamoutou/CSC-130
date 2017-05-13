$(document).ready(function() {
  $("#add-note").click(function(){
   addNote(); 
  });
  
  $("#remove-all").click(function(){
    removeNotes()
  });
  
 loadNotes();
 
})

/*
 Creates a new note and adds it to the sticky-notes div
*/


function addNote(text) {

  var note = $("<div class =\"note\"></div>")
  var textArea = $("<textarea class=\"textArea\"></textarea>");
  var closeIcon = $("<i class= \"fa fa-times\" aria-hidden=\"true\"> </i>")
  closeIcon.click(function(){
    note.remove();
    saveNotes();
  });
   if (text !== undefined){
    textArea.val(text);
   }
  textArea.blur(function(){
    saveNotes();
  });
  
  closeIcon.appendTo(note);
  textArea.appendTo(note);
  note.appendTo($("#sticky-notes"))  
  saveNotes(); 
}


/*
 Removes all the notes from the sticky-notes div
*/

function removeNotes() {
  $("#sticky-notes").empty();  
  saveNotes();
} 

/*
  Saves all the notes in the browser local storage
*/
function saveNotes() {
  var array = [];
  $("textarea").each(function(){
    var myText = $(this).val();
    array.push(myText); 
  });
  var myJSON = JSON.stringify(array);
  localStorage.setItem("notes",myJSON);
}

/* 
  Loads the notes previously saved in the local storage, if any, and adds them to the sticky-notes div
*/
function loadNotes() {
  if (localStorage.notes == undefined) return;
  
  var notes = JSON.parse(localStorage.getItem("notes"));
  for ( var i of notes) {
    addNote(i); 
  }
}