var APPLICATION_NAME = document.getElementById("application_name");
var APPLICATION_OS = document.getElementById("application_os");
var FIND_BUTTON = document.getElementById("application_find_button").addEventListener("click", findApplicationId);
var APPLICATION_ID = document.getElementById("application_id");

var DROPDOWN = document.querySelector(".dropdown");
var DROPDOWN_CONTENT = document.querySelector(".dropdown-content");

APPLICATION_NAME.addEventListener("input", autoCompleteInput);
APPLICATION_NAME.addEventListener("keyup", autoCompleteKey);

function autoCompleteInput(e){
  ErrorCheckConnection()
  // AUTOCOMPLETE_SETTING.currentKeyIndex = -1;
  if(CHARSET.includes(e.data)) {
    var subStack = pushAutoCompleteStack(e.data);
    AutoCompleteStack.push(subStack);
    handleAutoCompleteItems();
  }
  else if (e.inputType === "deleteContentBackward" && e.data === null){
    popAutoCompleteStack();
    handleAutoCompleteItems();
  }
}


function autoCompleteKey(e){
  if(DROPDOWN_CONTENT.firstChild){
    switch (e.keyCode) {
      case 38:
        if(AUTOCOMPLETE_SETTING.currentKeyIndex <= 0) {
          return;
        }
        AUTOCOMPLETE_SETTING.currentKeyIndex -= 1;
        AUTOCOMPLETE_SETTING.currentAppName = highLightAutoCompleteItem(DROPDOWN_CONTENT.childNodes, AUTOCOMPLETE_SETTING.currentKeyIndex, true);
        break;
      case 40:
        if(AUTOCOMPLETE_SETTING.currentKeyIndex === DROPDOWN_CONTENT.childNodes.length - 1){
          return;
        }
        AUTOCOMPLETE_SETTING.currentKeyIndex += 1;
        AUTOCOMPLETE_SETTING.currentAppName = highLightAutoCompleteItem(DROPDOWN_CONTENT.childNodes, AUTOCOMPLETE_SETTING.currentKeyIndex, false);
        break;
      case 8:
        AUTOCOMPLETE_SETTING.currentKeyIndex = -1;
        break;
      case 13:
        if(AUTOCOMPLETE_SETTING.currentKeyIndex === -1){
          return;
        }
        APPLICATION_NAME.value = AUTOCOMPLETE_SETTING.currentAppName.innerHTML;
        toggleAutoCompleteItemOnDisplay(false);
        AUTOCOMPLETE_SETTING.currentKeyIndex = -1;
        insertIntoStackFromEnter();
        break;
      case 27:
        if(AUTOCOMPLETE_SETTING.currentKeyIndex === -1){
          return;
        }
        toggleAutoCompleteItemOnDisplay(false);
        AUTOCOMPLETE_SETTING.currentKeyIndex = -1;
        break;
      default:
        return;
    }
  }
}


function insertIntoStackFromEnter(){
  for(var i = AutoCompleteStack.length - 1; i < APPLICATION_NAME.value.length; i++){
    AutoCompleteStack.push(pushAutoCompleteStack(APPLICATION_NAME.value[i]));
  }
  return;
}


function handleAutoCompleteItems(){
  deleteAutoCompleteItemsFromDisplay();
  var currentStackLength = AutoCompleteStack[AutoCompleteStack.length - 1].length;
  if(AutoCompleteStack.length > 1 && currentStackLength != 0){
    appendAutoCompleteItemToDisplay();
    toggleAutoCompleteItemOnDisplay(true);
  }
  else if(AutoCompleteStack.length === 1 || currentStackLength === 0){
    toggleAutoCompleteItemOnDisplay(false);
  }
}


function appendAutoCompleteItemToDisplay(){
  var currentStack = AutoCompleteStack[AutoCompleteStack.length - 1];
  for(var i = 0; i < currentStack.length; i++){
    var dropDownItem = document.createElement("p");
    dropDownItem.classList.add("dropdown-content-li");
    dropDownItem.innerHTML = currentStack[i];
    DROPDOWN_CONTENT.appendChild(dropDownItem);
  }
  return;
}


function deleteAutoCompleteItemsFromDisplay(){
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


function highLightAutoCompleteItem(autoCompleteElements, index, directionUp){
  var currentElement = autoCompleteElements[index];
  var previousElement = directionUp ? autoCompleteElements[index + 1] : autoCompleteElements[index - 1];
  currentElement.classList.add("dropdown_selected");

  if(index === 0){
    if(directionUp){
      previousElement.classList.remove("dropdown_selected");
    }
    return currentElement;
  }

  previousElement.classList.remove("dropdown_selected");
  return currentElement;
}



function popAutoCompleteStack(){
  while(APPLICATION_NAME.value.length !== (AutoCompleteStack.length - 1)){
    AutoCompleteStack.pop();
  }
}


function pushAutoCompleteStack(inputKey){
  var inputKeyCap = inputKey.toUpperCase();
  var subStack = [];
  var currentPointer = AutoCompleteStack.length - 1;
  var currentStack = AutoCompleteStack[currentPointer];
  for(var i = 0; i < currentStack.length; i++){
    if(currentStack[i][currentPointer] && currentStack[i][currentPointer].toUpperCase() === inputKeyCap){
      subStack.push(currentStack[i]);
    }
  }
  return subStack;
}


function findApplicationId(){
  ErrorCheckConnection();
  ErrorCheckMissingApplicationInput();
  APPLICATION_ID.innerHTML = "";
  var applicationName = APPLICATION_NAME.value.toUpperCase();
  var applicationType = APPLICATION_OS.value.toUpperCase();
  for(var i = 0; i < SPX_DATA.applications.length; i++){
    if(applicationName === SPX_DATA.applications[i].name.toUpperCase() && applicationType === SPX_DATA.applications[i].type.toUpperCase()){
      APPLICATION_ID.innerHTML = SPX_DATA.applications[i].id;
      return;
    }
  }
  ErrorCheckMissingApplicationId()
  return;
}
