var APPLICATION_NAME = document.getElementById("application_name");
var APPLICATION_OS = document.getElementById("application_os");
var FIND_BUTTON = document.getElementById("application_find_button").addEventListener("click", findApplicationId);
var APPLICATION_ID = document.getElementById("application_id");

var DROPDOWN = document.querySelector(".dropdown");
var DROPDOWN_CONTENT = document.querySelector(".dropdown-content");

APPLICATION_NAME.addEventListener("input", listAutoCompleteNames);
APPLICATION_NAME.addEventListener("keyup", moveThroughAutoCompleteNames);

function extractApplicationName(){
  for(var i = 0; i < SPX_DATA.applications.length; i++){
    AUTOCOMPLETE_APPLICATION_NAMES.push(SPX_DATA.applications[i].name);
  }
  return;
}


function listAutoCompleteNames(e){
  var inputValue = APPLICATION_NAME.value;
  var currentList = [];
  for(var i = 0; i < AUTOCOMPLETE_APPLICATION_NAMES.length; i++){
    if(inputValue.length != 0 && AUTOCOMPLETE_APPLICATION_NAMES[i].substring(0, inputValue.length).toUpperCase() === inputValue.toUpperCase()){
      currentList.push(AUTOCOMPLETE_APPLICATION_NAMES[i]);
    }
  }

  removeAutoCompleteElements();
  if(currentList.length === 0){
    toggleAutoCompleteItemOnDisplay(false);
    return;
  }
  toggleAutoCompleteItemOnDisplay(true);
  createAutoCompleteElements(currentList);
}


function moveThroughAutoCompleteNames(e){
  switch(e.keyCode){
    case 38:
      console.log("up");
      break;
    case 40:
      console.log("down");
      break;
    default:
      break;
  }
}


function createAutoCompleteElements(list){
  for(var i = 0; i < list.length; i++){
    var dropDownItem = document.createElement("p");
    dropDownItem.classList.add("dropdown-content-li");
    dropDownItem.innerHTML = list[i];
    DROPDOWN_CONTENT.appendChild(dropDownItem);
  }
  return;
}

function removeAutoCompleteElements(){
  while(DROPDOWN_CONTENT.firstChild){
    DROPDOWN_CONTENT.removeChild(DROPDOWN_CONTENT.firstChild);
  }
}

function toggleAutoCompleteItemOnDisplay(display){
  if(display){
    if(!DROPDOWN_CONTENT.classList.contains("dropdown_display")){
      DROPDOWN_CONTENT.classList.add("dropdown_display");
    }
  }
  else {
    if(DROPDOWN_CONTENT.classList.contains("dropdown_display")){
      DROPDOWN_CONTENT.classList.remove("dropdown_display");
    }
  }
}


function findApplicationId(){
  console.log("clicked find");
}
