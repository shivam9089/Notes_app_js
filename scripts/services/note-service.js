//crud
import Note from '../models/note.js'
import {printNotes} from '../controllers/notes-controller.js'
export const noteOperations ={
    notes:[],
    add(noteObject){
          const note = new Note(noteObject);
          this.notes.push(note);
    },
    searchById(id){
      return this.notes.find(note=>note.id===id);
    },
    toggleMark(id){
      this.searchById(id).toggleMark();
     //const noteObject = this.searchById(id);
     //noteObject.isMarked = !noteObject.isMarked;
    },
    total(){
      return this.notes.length;
    },
    getNotes(){
        return this.notes;
    },
    setNotes(newNotes){
     this.notes = this.notes.concat(newNotes);
    },
    remove(){
         this.notes = this.notes.filter(note=>!note.isMarked)
    },
    
    search(bid){
      const searchele = this.notes.filter(note=>note.id == bid);
      this.notes = searchele;
    
   },
  
    sort(value){
      if (value === 'id')
         this.notes = this.notes.sort((a,b)=> a.id-b.id);
      else if (value === 'title'){
        this.notes = this.notes.sort((a,b)=>a.title.localeCompare(b.title));
      }
      else if (value === 'date'){
        this.notes = this.notes.sort((a,b)=>new Date(a.cdate) - new Date(b.cdate));
      }
      else{
        this.notes = this.notes;
      }
    },
    markTotal(){
       return this.notes.filter(note=>note.isMarked).length;
    },
    unmarkTotal(){
       return this.total() - this.markTotal();
    },
    delAll(){
          this.notes = this.notes.filter(note=>false);
    },
    /*printArr(){
      const tbody = document.querySelector('#notes');
  tbody.innerHTML = '';
      if(!this.notes.length ==0){
          for (const key of this.notes ) {
              printNotes(key);
           }
      }
  },*/
}