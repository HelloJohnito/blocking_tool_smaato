
function ErrorCheckConnection(){
  if(!ACCESS_TOKEN){
    alert("ERROR: Connect to an account using the client id and client secret.");
    throw new Error("ERROR: Connect to an account using the client id and client secret.");
  }
  else if(!SPX_DATA["applications"] || !SPX_DATA["adspaces"] || !SPX_DATA["lineitems"]){
    alert("ERROR: There are no applications, adspaces, and/or line items for this account. If there are, reconnect to the account and try again.");
    throw new Error("ERROR: There are no applications, adspaces, and/or line items for this account. If there are, reconnecting to the account and try again.");
  }
}


function ErrorCheckMissingClientInput(){
  if(!CLIENT_ID_LABEL.value || !CLIENT_SECRET_LABEL.value){
    alert("ERROR: Input Client Id and Client Secret");
    throw new Error("ERROR: Missing client id and client secret.");
  }
  return;
}


function ErrorCheckMissingApplicationInput(){
  if(!APPLICATION_NAME.value || !APPLICATION_OS.value){
    alert("ERROR: Missing application inputs");
    throw new Error("ERROR: Missing Application Name or OS type");
  }
}


function ErrorCheckMissingApplicationId(){
  if(!APPLICATION_ID.innerHTML){
    alert("ERROR: No Application found");
    throw new Error("ERROR: No Application found");
  }
  return;
}
