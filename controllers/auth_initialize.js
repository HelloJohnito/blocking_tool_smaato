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


function handleLoader(num, type, innerContent){
  clearLoadSuccessContainer("loader_success_container_" + num.toString());
  addElement("loader_success_container_" + num.toString(), type, innerContent);
}


function removeElement(element){
  element.parentNode.removeChild(element);
}


function submitConnectAccount(){
  ErrorCheckMissingClientInput()
  handleLoader(1, "loader", "");
  getAuthToken(CLIENT_ID_LABEL.value, CLIENT_SECRET_LABEL.value, getAllApplications);
}
