var CLIENT_ID_LABEL = document.getElementById("client_id");
var CLIENT_SECRET_LABEL = document.getElementById("client_secret");
var CONNECT_BUTTON = document.getElementById("connect_button").addEventListener("click", submitConnectAccount);


function ErrorHandleCheckInput(){
  if(!CLIENT_ID_LABEL.value || !CLIENT_SECRET_LABEL.value){
    alert("ERROR: Input Client Id and Client Secret");
    throw new Error ("Missing client id and client secret.");
  }
  return;
}


function submitConnectAccount(){
  clearLoadSuccessContainer("loader_success_container_1");
  ErrorHandleCheckInput();
  addElement("loader_success_container_1", "loader", "");
  getAuthToken(CLIENT_ID_LABEL.value, CLIENT_SECRET_LABEL.value, getAllAdspaces);
  // getAllAdspaces(getAllLineItems);
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


function addElement(parent_id, element_class, innerContent){
  var parent = document.getElementById(parent_id);
  var newElement = document.createElement("div");
  newElement.innerHTML = innerContent;
  newElement.classList.add(element_class);
  parent.appendChild(newElement);
  return;
}

function removeElement(element){
  element.parentNode.removeChild(element);
}
