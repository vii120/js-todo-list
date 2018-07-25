var addPlan = document.getElementById('plan');
var addBtn = document.getElementById('btn');
var itemBox = document.querySelector('.item-box');
var items = itemBox.getElementsByClassName('item');

var box = document.getElementsByClassName('box')[0];
var switchBtn = document.getElementsByClassName('switch-box')[0];
var colorStatus = 'day';

switchBtn.onclick = function(){
  let editItem = [switchBtn, box, addBtn];
  if (colorStatus=='day'){
    editItem.forEach(function(item){
      item.classList.add('night')
    })
    for (let i=0; i<items.length; i++){
      items[i].classList.add('night');
    }
    colorStatus = 'night';
  } else {
    editItem.forEach(function(item){
      item.classList.remove('night')
    })
    for (let i=0; i<items.length; i++){
      items[i].classList.remove('night');
    }
    colorStatus = 'day';
  }
}

addPlan.onkeydown = function(event) {
  if (event.keyCode === 13) {
    addBtn.onclick();
  }
}

addBtn.onclick = function(){
  var newPlan = document.createElement('div');
  if (addPlan.value !== ""){
    colorStatus=='day'? newPlan.className="item":newPlan.className="item night";
    newPlan.innerHTML = addPlan.value;
    itemBox.appendChild(newPlan);
    addPlan.value = '';
    modify(newPlan);
  }
}

for (var i=0; i<items.length; i++){
  modify(items[i]);
}

function modify(item){
  //check box
  var check = document.createElement('span');
  check.className = "check";
  check.innerHTML = "v";
  item.appendChild(check);
  
  var isCheck = false;
  check.onclick = function(){
    if (isCheck){
      item.classList.remove("finished");
    } else {
      item.className += " finished";
    }
    isCheck = !isCheck;
  }
  
  //delete box
  var deleted = document.createElement('span');
  deleted.className = "deleted";
  deleted.innerHTML = "x";
  item.appendChild(deleted);

  deleted.onclick = function(){
    itemBox.removeChild(item);
  }
}

