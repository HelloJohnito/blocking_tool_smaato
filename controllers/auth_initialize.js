var CLIENT_ID_LABEL = document.getElementById("client_id");
var CLIENT_SECRET_LABEL = document.getElementById("client_secret");
var CONNECT_BUTTON = document.getElementById("connect_button").addEventListener("click", submitConnectAccount);

CLIENT_ID_LABEL.focus();

function addElement(parent_id, element_class, innerContent){
  var parent = document.getElementById(parent_id);
  var newElement = document.createElement("div");
  newElement.innerHTML = innerContent;
  newElement.classList.add(element_class);
  parent.appendChild(newElement);
  return;
}


function clearLoadSuccessContainer(element_id){
  var container = document.getElementById(element_id);
  if(container.children.length){
    var i = container.children.length;
    while(i){
      removeElement(container.children[0]);
      i--;
    }
  }
  return;
}


function ErrorHandleCheckConnection(){
  if(!ACCESS_TOKEN){
    alert("ERROR: Connect to an account using the client id and client secret.");
    throw new Error("Connect to an account using the client id and client secret.");
  }
  else if(!SPX_DATA["applications"] || !SPX_DATA["adspaces"] || !SPX_DATA["lineitems"]){
    alert("ERROR: There are no applications, adspaces, and/or line items for this account. If there are, reconnect to the account and try again.");
    throw new Error("There are no applications, adspaces, and/or line items for this account. If there are, reconnecting to the account and try again.");
  }
}


function ErrorHandleCheckInput(){
  if(!CLIENT_ID_LABEL.value || !CLIENT_SECRET_LABEL.value){
    alert("ERROR: Input Client Id and Client Secret");
    throw new Error ("Missing client id and client secret.");
  }
  return;
}


function extractApplicationName(){
  var subStack = [];
  for(var i = 0 ; i < SPX_DATA.applications.length; i++){
    subStack.push(SPX_DATA.applications[i].name);
  }
  AutoCompleteStack.push(subStack);
  console.log("Success");
  return;
}


function handleLoader(num, type, innerContent){
  clearLoadSuccessContainer("loader_success_container_" + num.toString());
  addElement("loader_success_container_" + num.toString(), type, innerContent);
}


function removeElement(element){
  element.parentNode.removeChild(element);
}


function submitConnectAccount(){
  ErrorHandleCheckInput();
  handleLoader(1, "loader", "");
  getAuthToken(CLIENT_ID_LABEL.value, CLIENT_SECRET_LABEL.value, getAllApplications);
}
