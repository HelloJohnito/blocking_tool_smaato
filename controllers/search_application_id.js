var APPLICATION_NAME = document.getElementById("application_name");
var APPLICATION_OS = document.getElementById("application_os");
var FIND_BUTTON = document.getElementById("application_find_button").addEventListener("click", findApplicationId);
var APPLICATION_ID = document.getElementById("application_id");

function ErrorHandleMissingApplication(){
  if(!APPLICATION_ID.innerHTML){
    alert("ERROR: Missing application Id");
    throw new Error("ERROR: Missing Application Id");
  }
  return;
}


function findApplicationId(){
  ErrorHandleCheckConnection();
  APPLICATION_ID.innerHTML = "";

  if(!APPLICATION_NAME.value || !APPLICATION_OS.value){
    alert("ERROR: Missing application inputs");
    throw new Error("ERROR: Missing Application Name or OS type");
  }

  var applicationName = APPLICATION_NAME.value.toUpperCase();
  var applicationType = APPLICATION_OS.value.toUpperCase();
  for(var i = 0; i < SPX_DATA.applications.length; i++){
    if(applicationName === SPX_DATA.applications[i].name.toUpperCase() && applicationType === SPX_DATA.applications[i].type.toUpperCase()){
      APPLICATION_ID.innerHTML = SPX_DATA.applications[i].id;
      return;
    }
  }
  alert("No Application with the name of " + APPLICATION_NAME.value + " and of type " + APPLICATION_OS.value);
  throw new Error("ERROR: No Application with the name of " + APPLICATION_NAME.value + " and mobile type of " + APPLICATION_OS.value);
  return;
}
