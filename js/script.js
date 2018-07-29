var addPlan = document.getElementById('plan');
var addBtn = document.getElementById('btn');
var itemBox = document.querySelector('.item-box');
var items = itemBox.getElementsByClassName('item');

var box = document.querySelector('.box');
var switchBtn = document.querySelector('.switch-box');
var colorStatus = 'day';
var reset = document.querySelector('.reset-btn');
var editThemeArr = [switchBtn, box, addBtn, reset];

//----------------------
//localStorage
//----------------------
function getItem(){
  if (localStorage.itemList!==undefined){
    itemBox.innerHTML = localStorage.getItem('itemList');
    colorStatus = localStorage.getItem('colorStatus');
    if (colorStatus=='night'){
      editThemeArr.forEach(function(item){
        item.classList.add('night')
      })
      Array.prototype.forEach.call(items, item => {
        item.classList.add('night');
      });
    }
  }
}
getItem();

function save(){
  localStorage.setItem('itemList', itemBox.innerHTML);
  localStorage.setItem('colorStatus', colorStatus);
}
// console.log(window.localStorage);

reset.onclick = function(){
  if (confirm('Do you want to reset the whole list?')){
    localStorage.clear();
    window.location.reload();
  }
}

//----------------------
//switch theme
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
//add list
//----------------------
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
  countNum();
  save();
}

//----------------------
//add function btn
//----------------------
Array.prototype.forEach.call(items, item=>{
  modify(item);
})

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
      item.classList.add("finished");
    }
    isCheck = !isCheck;
    countNum();
    save();
  }

  //delete box
  var deleted = document.createElement('span');
  deleted.className = "deleted";
  deleted.innerHTML = "x";
  item.appendChild(deleted);

  deleted.onclick = function(){
    let text = item.innerText.substr(0,item.innerText.length-2);
    if (confirm(`Do you want to delete "${text}"?`)){
      itemBox.removeChild(item)
    }
    countNum();
    save();
  }
}

//----------------------
//completed counter
//----------------------
function countNum(){
  items = itemBox.getElementsByClassName('item');
  let finished = itemBox.getElementsByClassName('finished');
  let count = document.querySelector('.itemCount').getElementsByTagName('span')[0];
  let num = items.length - finished.length;
  count.innerHTML = num;
}
countNum();

