let addButton = document.getElementsByClassName("addBtn")[0]
addButton.addEventListener("click", newElement)

// loading the localstorage on page load
if(localStorage.getItem("todo") !== null){
  todo_ = JSON.parse(localStorage.getItem("todo"));
  for(let i of todo_)
    newRow(i, true)
}

if(localStorage.getItem("done") !== null){
  todo_ = JSON.parse(localStorage.getItem("done"));
  for(let i of todo_)
    newRow(i, true, "done")
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    // div.style.display = "none";
    if(this.parentElement.className === "checked"){
      item = this.parentNode.firstChild.textContent
      done_ = JSON.parse(localStorage.getItem("done"));
      index = todo_.indexOf(item)
      done_.splice(index, 1);
      localStorage.setItem("done", JSON.stringify(done_))
      this.parentNode.remove()
    }
    else if(this.parentElement.className === ""){
      item = this.parentNode.firstChild.textContent
      todo_ = JSON.parse(localStorage.getItem("todo"));
      index = todo_.indexOf(item)
      todo_.splice(index, 1);
      localStorage.setItem("todo", JSON.stringify(todo_))
      this.parentNode.remove()
    }
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelectorAll('ul');
list[0].addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    console.log("HERE ");

    console.log(ev.target.firstChild.textContent);
    console.log(ev.className);
    if(ev.target.className === ''){
      item = ev.target.firstChild.textContent
      todo_ = JSON.parse(localStorage.getItem("todo"));
      index = todo_.indexOf(item)
      todo_.splice(index, 1);
      localStorage.setItem("todo", JSON.stringify(todo_))

      done_ = JSON.parse(localStorage.getItem("done"));
      done_.push(item)
      localStorage.setItem("done", JSON.stringify(done_))

      ev.target.classList.toggle('checked');
      document.getElementById('done_todo').appendChild(ev.target)
    }
  }
}, false);

list[1].addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    console.log("WWWW");
    // this.target.style.display='none';

    console.log(ev.target);
    console.log(ev.className);
    if(ev.target.className === 'checked'){
      item = ev.target.firstChild.textContent
      done_ = JSON.parse(localStorage.getItem("done"));
      index = todo_.indexOf(item)
      done_.splice(index, 1);
      localStorage.setItem("done", JSON.stringify(done_))

      todo_ = JSON.parse(localStorage.getItem("todo"));
      todo_.push(item)
      localStorage.setItem("todo", JSON.stringify(todo_))

      ev.target.classList.toggle('checked');
      document.getElementById('todo').appendChild(ev.target)
    }
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement(){
  var inputValue = document.getElementById("myInput").value;
  newRow(inputValue)
  document.getElementById("myInput").value = "";
}



function newRow(inputValue, loaded=false, type="todo") {
  var li = document.createElement("li");

  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Add a task!");
    return;
  } else {
    if(type === "done"){
      document.getElementById("done_todo").appendChild(li);
    }
    else
      document.getElementById("todo").appendChild(li);
  }
  if(localStorage.getItem("todo") === null)
    localStorage.setItem("todo", JSON.stringify([inputValue]));
  else{
    if(!loaded){
      todo_ = JSON.parse(localStorage.getItem("todo"));
      todo_.push(inputValue)
      localStorage.setItem("todo", JSON.stringify(todo_));  
    }
  }
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);

  if(type==="done")
    li.className = "checked"
  li.appendChild(span);


  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
} 


