var APPLICATION_NAME = document.getElementById("application_name");
var APPLICATION_OS = document.getElementById("application_os");
var FIND_BUTTON = document.getElementById("application_find_button").addEventListener("click", findApplicationId);
var APPLICATION_ID = document.getElementById("application_id");

var DROPDOWN = document.querySelector(".dropdown");
var DROPDOWN_CONTENT = document.querySelector(".dropdown-content");

APPLICATION_NAME.addEventListener("input", autocomplete);

function autocomplete(e){
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
  console.log(inputKeyCap)
  for(var i = 0; i < currentStack.length; i++){
    if(currentStack[i][currentPointer] && currentStack[i][currentPointer].toUpperCase() === inputKeyCap){
      subStack.push(currentStack[i]);
    }
  }
  return subStack;
}


function findApplicationId(){
  ErrorHandleCheckConnection();
  APPLICATION_ID.innerHTML = "";

  if(!APPLICATION_NAME.value || !APPLICATION_OS.value){
    // create ERROR
    alert("ERROR: Missing application inputs");
    console.log("ERROR: Missing Application Name or OS type");
  }

  var applicationName = APPLICATION_NAME.value.toUpperCase();
  var applicationType = APPLICATION_OS.value.toUpperCase();
  for(var i = 0; i < SPX_DATA.applications.length; i++){
    if(applicationName === SPX_DATA.applications[i].name.toUpperCase() && applicationType === SPX_DATA.applications[i].type.toUpperCase()){
      APPLICATION_ID.innerHTML = SPX_DATA.applications[i].id;
      return;
    }
  }

  // create ERROR
  alert("ERROR: No Application with the name of " + APPLICATION_NAME.value + " and of type " + APPLICATION_OS.value);
  console.log("ERROR: No Application with the name of " + APPLICATION_NAME.value + " and mobile type of " + APPLICATION_OS.value);
  return;
}
