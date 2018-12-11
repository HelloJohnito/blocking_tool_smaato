var BODY = document.getElementById("body");
BODY.addEventListener("click", function(e){
  AUTOCOMPLETE_SETTING.index = -1;
  DROPDOWN_CONTENT.scrollTop = 0;
  toggleAutoCompleteItemOnDisplay(false);
});

var APPLICATION_NAME = document.getElementById("application_name");
var APPLICATION_OS = document.getElementById("application_os");
var FIND_BUTTON = document.getElementById("application_find_button").addEventListener("click", findApplicationId);
var APPLICATION_ID = document.getElementById("application_id");

var DROPDOWN = document.querySelector(".dropdown");
var DROPDOWN_CONTENT = document.querySelector(".dropdown-content");

APPLICATION_NAME.addEventListener("input", listAutoCompleteNames);
APPLICATION_NAME.addEventListener("keyup", moveThroughAutoCompleteNames);
APPLICATION_NAME.addEventListener("click", function(e){
  e.stopPropagation();
});
APPLICATION_OS.addEventListener("click", function(e){
  e.stopPropagation();
});


function extractApplicationName(){
  for(var i = 0; i < SPX_DATA.applications.length; i++){
    AUTOCOMPLETE_SETTING.names.push(SPX_DATA.applications[i].name);
  }
  return;
}


function listAutoCompleteNames(){
  var inputValue = APPLICATION_NAME.value;
  var currentList = [];
  for(var i = 0; i < AUTOCOMPLETE_SETTING.names.length; i++){
    if(inputValue.length != 0 && AUTOCOMPLETE_SETTING.names[i].substring(0, inputValue.length).toUpperCase() === inputValue.toUpperCase()){
      currentList.push(AUTOCOMPLETE_SETTING.names[i]);
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
      // up
      if(AUTOCOMPLETE_SETTING.index <= 0){
        return;
      }
      AUTOCOMPLETE_SETTING.index -= 1;
      moveCursor(AUTOCOMPLETE_SETTING.index);
      DROPDOWN_CONTENT.scrollTop -= 34;
      break;
    case 40:
      // down
      if(AUTOCOMPLETE_SETTING.index === DROPDOWN_CONTENT.children.length - 1){
        return;
      }
      AUTOCOMPLETE_SETTING.index += 1;
      moveCursor(AUTOCOMPLETE_SETTING.index);
      DROPDOWN_CONTENT.scrollTop += 34;
      break;
    case 8:
      // delete
      AUTOCOMPLETE_SETTING.index = -1;
      DROPDOWN_CONTENT.scrollTop = 0;
      break;
    case 27:
      // esc
      AUTOCOMPLETE_SETTING.index = -1;
      DROPDOWN_CONTENT.scrollTop = 0;
      toggleAutoCompleteItemOnDisplay(false);
      break;
    case 13:
      // enter
      if(AUTOCOMPLETE_SETTING.index < 0){
        return;
      }
      APPLICATION_NAME.value = DROPDOWN_CONTENT.children[AUTOCOMPLETE_SETTING.index].innerHTML;
      listAutoCompleteNames();
      if(DROPDOWN_CONTENT.children.length === 1){
        DROPDOWN_CONTENT.scrollTop = 0;
        toggleAutoCompleteItemOnDisplay(false);
      }
      DROPDOWN_CONTENT.scrollTop = 0;
      AUTOCOMPLETE_SETTING.index = -1;
      break;
    default:
      break;
  }
  return;
}


function moveCursor(currentPosition){
  for(var i = 0; i < DROPDOWN_CONTENT.children.length; i++){
    DROPDOWN_CONTENT.children[i].classList.remove("dropdown_selected");
  }
  DROPDOWN_CONTENT.children[currentPosition].classList.add("dropdown_selected");
}


function createAutoCompleteElements(list){
  for(var i = 0; i < list.length; i++){
    var dropDownItem = document.createElement("p");
    dropDownItem.classList.add("dropdown-content-li");
    dropDownItem.innerHTML = list[i];
    dropDownItem.addEventListener("click", function(e){
      e.stopPropagation();
      APPLICATION_NAME.value = this.innerHTML;
      AUTOCOMPLETE_SETTING.index = -1;
      DROPDOWN_CONTENT.scrollTop = 0;
      toggleAutoCompleteItemOnDisplay(false);
    });
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


function findApplicationId(e){
  e.stopPropagation();
  console.log("clicked find");
}
