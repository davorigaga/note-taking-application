function GenerateRandom(){
	let random = Math.floor(Math.random() * 255); 
	return random;
}
function colorGenerator(){
	let color = "rgb("+ GenerateRandom() + ", "+ GenerateRandom() + ", " + GenerateRandom() + ")";
	document.querySelector(".displayArea").style.backgroundColor = color; 
}; 

document.querySelector('.add').addEventListener('click', ()=>{
	window.location.href = "landing.html";
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
			btn.addEventListener('click',e => {
				let newNotes = Store.getNotes().filter( n => n.note != note.note);
				ul.removeChild(li);		
				localStorage.setItem('notes', JSON.stringify(newNotes));					
				UI.showAlerts(`Note '${note.note}' has been deleted`, 'success');
			});
			li.appendChild(btn);   
			ul.appendChild(li);	
		});
		console.log(ul);
		document.querySelector('.display').appendChild(ul); 
	}

	static showAlerts(message, className){
		let div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.textContent = message; 
		const body = document.querySelector('body'); 
		const main2 = document.querySelector('center'); 
		body.insertBefore(div, main2);
		
		//Set Time Out 
		setTimeout(()=>document.querySelector(`.alert-${className}`).remove(), 5000); 

	}
	static clearField(){
		document.querySelector('#note').value = "";  
		// window.location.href = "index.html";
	}

	static deleteNote(el){
		if(el.classList.contains('.del')){
			el.target.parentElement.remove();
			Store.removeNote();
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
 


	static removeNote(){
		const notes = Store.getNotes(); 
		console.log(notes);
		notes.forEach(function(note, index){
			if(note === note.note){
				note.splice(index, 1); 
			}
		}); 
		localStorage.setItem('notes', JSON.stringify(notes));
	}

}
let load = document.querySelector('.display');
load.onload = UI.displayNotes();

//Event: Display Books
// let created = document.querySelector('ul');
// created.addEventListener('click', (e)=>{
// 	// console.log(e.target.parentElement);
// 	UI.deleteNote(e.target);
// 	UI.showAlerts('Book Deleted', 'success');
// }); 

