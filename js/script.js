var addPlan = document.getElementById('plan');
var addBtn = document.getElementById('btn');
var itemBox = document.querySelector('.item-box');
var items = itemBox.getElementsByClassName('item');
var list = [
  {todo: 'buy shoes', done: false}, 
  {todo: 'do the laundry', done: false}, 
  {todo: 'wash dishes', done: false}
];
//for switch-button
var box = document.querySelector('.box');
var switchBtn = document.querySelector('.switch-box');
var colorStatus = 'day';
var reset = document.querySelector('.reset-btn');
var editThemeArr = [switchBtn, box, addBtn, reset];

//----------------------
// localStorage
//----------------------
function getItem(){
  if (localStorage.itemList!==undefined){
    list = JSON.parse(localStorage.getItem('itemList'));
    colorStatus = localStorage.getItem('colorStatus');
    if (colorStatus=='night'){
      editThemeArr.forEach(function(item){
        item.classList.add('night')
      })
    }
  }
}
getItem();

function save(){
  localStorage.setItem('itemList', JSON.stringify(list));
  localStorage.setItem('colorStatus', colorStatus);
}

reset.onclick = function(){
  if (confirm('Do you want to reset the whole list?')){
    localStorage.clear();
    window.location.reload();
  }
}

//----------------------
// switch theme
//----------------------
switchBtn.onclick = function(){
  if (colorStatus=='day'){
    editThemeArr.forEach(function(item){
      item.classList.add('night')
    })
    for (let i=0; i<items.length; i++){
      items[i].classList.add('night');
    }
    colorStatus = 'night';
  } else {
    editThemeArr.forEach(function(item){
      item.classList.remove('night')
    })
    for (let i=0; i<items.length; i++){
      items[i].classList.remove('night');
    }
    colorStatus = 'day';
  }
  save();
}

//----------------------
// set list
//----------------------
list.forEach(function(item){
  var div = document.createElement('div');
  div.classList.add('item');
  if (colorStatus=='night'){
    div.classList.add('night')
  }
  div.innerHTML = item.todo;
  itemBox.appendChild(div);
  modify(div, item);
})

//----------------------
// add list
//----------------------
addPlan.onkeydown = function(event) {
  if (event.keyCode === 13) {
    addBtn.onclick()
  }
}
addBtn.onclick = function(){
  var newPlan = document.createElement('div');
  if (addPlan.value !== ""){
    let temp = {todo: addPlan.value, done: false};
    list.push(temp);
    colorStatus=='day'? newPlan.className="item":newPlan.className="item night";
    newPlan.innerHTML = addPlan.value;
    itemBox.appendChild(newPlan);
    modify(newPlan, temp);
    countNum();
    save();
    addPlan.value = '';
  }
}

//----------------------
// add function btn
//----------------------
function modify(itemDiv, listItem){
  //check box
  var check = document.createElement('span');
  check.className = "check";
  check.innerHTML = "v";
  itemDiv.appendChild(check);
  if (listItem.done){
    itemDiv.classList.add('finished')
  }

  check.onclick = function(){
    itemDiv.classList.toggle("finished");
    list[list.indexOf(listItem)].done = !list[list.indexOf(listItem)].done;
    countNum();
    save();
  }

  //delete box
  var deleted = document.createElement('span');
  deleted.className = "deleted";
  deleted.innerHTML = "x";
  itemDiv.appendChild(deleted);

  deleted.onclick = function(){
    let text = itemDiv.innerText.substr(0,itemDiv.innerText.length-4);
    if (confirm(`Do you want to delete "${text}"?`)){
      itemBox.removeChild(itemDiv);
      list.splice(list.indexOf(listItem),1);
      countNum();
      save();
    }
  }
}

//----------------------
// completed counter
//----------------------
function countNum(){
  items = itemBox.getElementsByClassName('item');
  let finished = itemBox.getElementsByClassName('finished');
  let count = document.querySelector('.itemCount').getElementsByTagName('span')[0];
  let num = items.length - finished.length;
  count.innerHTML = num;
}
countNum();

