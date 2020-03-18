
document.querySelector('.arrow').addEventListener('click', ()=>{
	window.location.href = "index.html"; 
}); 
class Note{
	constructor(note){
		this.note = note; 
	}
}

class UI{
	static displayNotes(){
		// window.location.href = 'index.html'; 
		let notes; 
		notes = Store.getNotes();
		let ul = document.createElement('ul'); 
		ul.className = 'created'; 
		notes.forEach(function(note){
			let p = document.createElement('p');
			let li = document.createElement('li');
			li.className = 'noteDiv';
			let text = note.note; 
			p.textContent = text.trim();
			li.append(p); 
			let btn = document.createElement('button'); 
			btn.textContent = 'delete'; 
			btn.className = 'del';
			li.appendChild(btn);   
			ul.appendChild(li);	
		});
		console.log(ul);
		document.querySelector('body').appendChild(ul); 

	}

	static showAlerts(message, className){
		let div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.textContent = message; 
		const body = document.querySelector('body'); 
		const main2 = document.querySelector('center'); 
		body.insertBefore(div, main2);
		
		//Set Time Out 
		setTimeout(()=>document.querySelector(`.alert-${className}`).remove(), 2000); 

	}
	static clearField(){
		document.querySelector('#note').value = "";  
		// window.location.href = "index.html";
	}

	static deleteNote(el){
		if(el.classList.contains('.del')){
			let d = el.target.parentElement.parentElement.remove();
			console.log(d);
		}
	}
}

//Store books 
class Store{
	static getNotes(){
		let notes; 
		if(localStorage.getItem('notes') === null){
			let notes = [];
			return notes; 
		}else{
			 notes = JSON.parse(localStorage.getItem('notes'));			 
			 return notes;
		}

	};

	static storeBook(note){
		const notes = Store.getNotes();
		notes.push(note);
		localStorage.setItem('notes', JSON.stringify(notes));	
	};
 


	static removeNote(note){
		const notes = Store.getNotes(); 
		notes.forEach(function(note, index){
			if(note === note.note){
				note.splice(index, 1); 
			}
		}); 
		localStorage.setItem('notes', JSON.stringify(notes));
		let newNote = Store.getNotes();
		UI.displayNotes();
	}

}
// document.querySelector('DOMContentLoaded', UI.displayNotes());

//Event: Display Books

document.querySelector('.saveIcon').addEventListener('click', (e)=>{
	e.preventDefault();
	let note = document.querySelector('#note').value; 
	if(note === ''){
		let message = 'Please fill text area'; 
		UI.showAlerts(message, 'danger'); 
	}else{
		let noteBook = new Note(note);
		// Save into Local storage
		Store.storeBook(noteBook); 
	
		// show successful alert
		UI.showAlerts('SUCCESSFUL', 'success'); 
		//Clear Text Field
		UI.clearField();
		window.location.href = "index.html"; 
	} 
});

// let created = document.querySelector('ul');
// created.addEventListener('click', (e)=>{
// 	console.log(e.target.parentElement);
// 	UI.deleteNote(e.target);
// 	UI.showAlerts('Book Deleted', 'success');	
// }); 

