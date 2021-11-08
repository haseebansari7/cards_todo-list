var addBtn = document.getElementById("addBtn");
var addTxt = document.getElementById("addTxt");
const deleteAllBtn = document.querySelector(".footer button");
var saveTaskButton = document.getElementById("save-todo-btn");
// const saveInd = document.getElementById("saveIndex");

	
	// console.log("Check Script file is it run properly");
	showTask();

	// this function create for clilcking  to add button and get item to text area  and store setItem to localStorage.
	// and save value textarea for string and return for parse   

	addBtn.addEventListener("click",function(e){
	let addTxt = document.getElementById("addTxt");
	let notes = localStorage.getItem("notes");

	if(notes == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notes);
	}
// console.log(notesObj);
	
	notesObj.push(addTxt.value);
	localStorage.setItem("notes", JSON.stringify(notesObj));
	addTxt.value = "";
	 showTask(); 	//calling show task;
});	


	// this function is create to get value textarea and store notes to show list item to page  


function showTask(){
	let notes = localStorage.getItem("notes");

	if(notes == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notes);
	}

	const pendingNumb = document.querySelector(".pendingNumb");
	pendingNumb.textContent = notesObj.length;  //passing the length value in pendingNumb

	let html = "";
	notesObj.forEach((element, index) =>{
		html +=
				`<div class="card noteCard my-2 mx-2" style="width: 21rem;">
					<div class="card-body">
						<h5 class="card-title">Note${index +1}</h5>
						<p class="card-text">${element}</p>
						<button class="btn btn-warning" onclick = "deleteNotes(${index})">Delete</button>
						<button class="btn btn-primary" onclick = "edit(${index})">Edit</button>
					</div>
				</div>` 
	});


	let notesElm = document.getElementById("notes");
	if(notesElm != 0){
		notesElm.innerHTML = html;
	}
	else{
		notesElm.innerHTML = `Nothing to show! Add notes to use input textarea`;
	}
}

	// this  function is create for delete to list node

function deleteNotes(index){
// console.log("delete")
	let notes = localStorage.getItem("notes");
	if(notes == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notes);
	}
	
	if(confirm("Are you sure you can delete this Field")){
		notesObj.splice(index,1)
	}
	else{
		return false;
	}

	localStorage.setItem("notes", JSON.stringify(notesObj));
	showTask();
}

	// this function is performe to search todo list item

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
	
	let inputVal = search.value;
	let noteCard = document.getElementsByClassName("noteCard");
	Array.from(noteCard).forEach(function (element){
		let cardTxt = element.getElementsByTagName("p")[0].innerHTML;
		if(cardTxt.includes(inputVal)){
			element.style.display = "block";
		}
		else{
			element.style.display ="none";
		}
	})
})

deleteAllBtn.onclick = ()=>{
	notesObj = []; 	//empty an array
	
	//after delete all task again update the local storage
	localStorage.setItem("notes", JSON.stringify(notesObj));
	showTask();
}

deleteAllBtn.addEventListener("click", function(){
	
	localStorage.setItem("notes", JSON.stringify(notesObj));
	deleteNotes();
});

function edit(index) {
	// saveInd.value = index;
	let notes = localStorage.getItem("notes");
	notesObj = JSON.parse(notes);
	addTxt.value = notesObj[index];
	addBtn.style.display = "block";
 	saveTaskButton.style.display = "none";
}

// saveTaskButton.addEventListener("click", () => {
//  let notes = localStorage.getItem("notes");
//  notesObj = JSON.parse(notes);
//  // let id = saveInd.value;
// addTxt.value.appendChilde(notesObj)
//  addBtn.style.display = "block";
//  saveTaskButton.style.display = "none";
//  addTxt.value = "";
//  localStorage.setItem("notes", JSON.stringify(notesObj));
//  showTask();
// });