
function ErrorHandleCheckConnection(){
  if(!ACCESS_TOKEN){
    alert("ERROR: Connect to an account using the client id and client secret.");
    console.log("ERROR: Connect to an account using the client id and client secret.");
  }
  else if(!SPX_DATA["applications"] || !SPX_DATA["adspaces"] || !SPX_DATA["lineitems"]){
    alert("ERROR: There are no applications, adspaces, and/or line items for this account. If there are, reconnect to the account and try again.");
    console.log("ERROR: There are no applications, adspaces, and/or line items for this account. If there are, reconnecting to the account and try again.");
  }
}


function ErrorHandleCheckInput(){
  if(!CLIENT_ID_LABEL.value || !CLIENT_SECRET_LABEL.value){
    alert("ERROR: Input Client Id and Client Secret");
    console.log("ERROR: Missing client id and client secret.");
  }
  return;
}


function ErrorHandleMissingApplication(){
  if(!APPLICATION_ID.innerHTML){
    alert("ERROR: Missing application Id");
    console.log("ERROR: Missing Application Id");
  }
  return;
}
