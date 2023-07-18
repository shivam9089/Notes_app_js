//controller (i/o) + Events + Talk to Service

import {noteOperations} from '../services/note-service.js'
window.addEventListener('load',init);
function init(){
   showCounts();
   bindEvents();
   disableButton();
}
const enableButton= ()=>{
    document.querySelector('#delete').disabled=false;
   
}
const disableButton= ()=>{
    document.querySelector('#delete').disabled=true;
    
}
function bindEvents(){
    document.querySelector('#add').addEventListener('click',addNote);
    document.querySelector('#delete').addEventListener('click',deleteMarked);
    document.querySelector('#selectbox').addEventListener('click',sortIt);
    document.querySelector('#search').addEventListener('click',searchIt);
    document.querySelector('#clr').addEventListener('click',clearAll);
    document.querySelector('#update').addEventListener('click',updateSelected);
    document.querySelector('#save').addEventListener('click',save);
    document.querySelector('#load').addEventListener('click',load);

}
function clearAll(){
    noteOperations.delAll();
    document.getElementById('id').value = "";
    document.getElementById('title').value = "";
    document.getElementById('desc').value = "";
    document.getElementById('cdate').value = "";
    document.getElementById('importance').value = "";
    
    printNotes(noteOperations.getNotes());
    
}
function updateSelected(){
    addNote();
    
}
function showCounts(){
    noteOperations.markTotal()>0?enableButton():disableButton();
    document.querySelector('#total').innerText = noteOperations.total();
    document.querySelector('#marktotal').innerText = noteOperations.markTotal();
    document.querySelector('#unmarktotal').innerText = noteOperations.unmarkTotal();
}
function deleteMarked(){
 noteOperations.remove();
 printNotes(noteOperations.getNotes());
}
function searchIt(){
    noteOperations.search(document.getElementById('inp').value);
    printNotes(noteOperations.getNotes());
}
function sortIt(){
    
    noteOperations.sort(document.querySelector('#selectbox').value);
    printNotes(noteOperations.getNotes());
}
function save() {
    if (window.localStorage) {
      const alltask = noteOperations.getNotes();
      localStorage.notes = JSON.stringify(alltask);
      alert("Data Stored");
    } else {
      alert("Outdated Browser No Support of local storage");
    }
  }
  function load() {
    if (window.localStorage) {
      const alltask = localStorage.notes;
      noteOperations.setNotes(JSON.parse(alltask));
      printNotes(noteOperations.getNotes());
      
    } else {
      alert("Outdated Browser No Support of local storage");
    }
  }
function addNote(){
    //read id title desc date of competion

    const fields = ['id','title','desc','cdate','importance'];
    const noteObject = {}; //Object Literal
    for(let field of fields){
        noteObject[field] = document.querySelector(`#${field}`).value.trim();
    }
    noteOperations.add(noteObject);
    printNote(noteObject);
    showCounts();
    //const id = document.querySelector('#id').value;
   // const title = document.querySelector('#title').value;
}
 function printIcon(myClassName='trash',fn,id){
    
    const iTag = document.createElement('i');
    
    iTag.className = `fa-solid fa-${myClassName} me-5 hand`;
    
   iTag.addEventListener('click',fn)
   iTag.setAttribute('note-id',id);
    return iTag;
 }

 
 function toggleMark(){
           //console.log('Toggle...', this);
           const icon = this;
           const id = this.getAttribute('note-id');
           noteOperations.toggleMark(id);
           const tr = icon.parentNode.parentNode;
          // tr.className = 'table-danger';
          tr.classList.toggle('table-danger');
          showCounts();
 }
 function edit(){
    const icon = this;
    const id = this.getAttribute('note-id');
   
    
    const tr = icon.parentNode.parentNode;
   
    document.getElementById('id').value = tr.cells[0].innerHTML;
    document.getElementById('title').value = tr.cells[1].innerHTML;
    document.getElementById('desc').value = tr.cells[2].innerHTML;
    document.getElementById('cdate').value = tr.cells[3].innerHTML;
    document.getElementById('importance').value = tr.cells[4].innerHTML;
    
    noteOperations.toggleMark(id);
    noteOperations.remove();
    printNotes(noteOperations.getNotes());
    
   showCounts();
 }
 export function printNotes(notes){
    const tbody = document.querySelector('#notes');
    tbody.innerHTML = '';
 notes.forEach(note=>printNote(note)); 
 showCounts();
 }
 function printNote(noteObject){
    const tbody = document.querySelector('#notes');
    const row = tbody.insertRow(); //<tr>
    for(let key in noteObject){
        if(key === 'isMarked'){
          continue;
        }
    const td = row.insertCell();
    if(key === 'importance'){
      var col = noteObject[key];
      td.style.backgroundColor = col;
    }
    else
    td.innerText = noteObject[key];
    }
    const td = row.insertCell();
    td.appendChild(printIcon('trash',toggleMark,noteObject.id));
    td.appendChild(printIcon('user-pen',edit, noteObject.id));
    
 }