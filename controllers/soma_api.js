// SOMA API
var START_POSITION_LINE_ITEMS = 0;


// AUTH
function getAuthToken(client_id, client_secret, performTask){
  var request_object = {
    "headers" : [["Content-type", "application/x-www-form-urlencoded"]],
    "url" : 'https://auth.smaato.com/v2/auth/token/',
    "params" : "client_id=" + client_id + "&client_secret=" + client_secret + "&grant_type=client_credentials",
    "requestType" : "POST"
  };
  var callback = function() {
    if(this.readyState == 4 && this.status == 200) {
      ACCESS_TOKEN = JSON.parse(this.responseText).access_token;
      performTask(getAllAdspaces);
    }
  }
  requestSoma(request_object, callback);
  return;
}

// APPLICATION
function getAllApplications(performTask){
  var request_object = {
    "headers": [["Authorization", "Bearer " + ACCESS_TOKEN]],
    "url" : 'https://spx.smaato.com/publisherportal/api/inventory/v1/applications',
    "params": null,
    "requestType" : "GET"
  };

  var callback = function(){
    if(this.readyState == 4 && this.status == 200){
      SPX_DATA.applications = JSON.parse(this.responseText);
      console.log(SPX_DATA.applications);
      performTask(getAllLineItems); 
    }
  }
  requestSoma(request_object, callback);
}


// ADSPACE
function getAllAdspaces(performTask){
 var request_object = {
   "headers": [["Authorization", "Bearer " + ACCESS_TOKEN]],
   "url" : 'https://spx.smaato.com/publisherportal/api/inventory/v1/adspaces',
   "params": null,
   "requestType" : "GET"
 };
 var callback = function(){
   if(this.readyState == 4 && this.status == 200){
     SPX_DATA.adspaces = JSON.parse(this.responseText);
     console.log(SPX_DATA.adspaces);
     performTask();
   }
 }
 requestSoma(request_object, callback);
 return;
}


// LINE ITEM
function getAllLineItems(performTask){
 var request_object = {
   "headers": [["Authorization", "Bearer " + ACCESS_TOKEN]],
   "url" : 'https://spx.smaato.com/publisherportal/api/smx/v1/line-items?max-result=1000&start-position=' + START_POSITION_LINE_ITEMS.toString(),
   "params": null,
   "requestType" : "GET"
 };
 var callback = function(){
   if(this.readyState == 4 && this.status == 200){
     var lineitems_result = JSON.parse(this.responseText);
     SPX_DATA.lineitems = SPX_DATA.lineitems.concat(lineitems_result);
     console.log(SPX_DATA.lineitems);
     if(lineitems_result.length === 1000){
       START_POSITION_LINE_ITEMS += 1000;
       getAllLineItems();
       return;
     }
     else {
       clearLoadSuccessContainer("loader_success_container_1");
       addElement("loader_success_container_1", "success_note", "Success");
       extractApplicationName();
     }
   }
 }
 requestSoma(request_object, callback);
 return;
}


function putLineItem(line_item, performTask){
 var request_object = {
   "headers": [["Authorization", "Bearer " + ACCESS_TOKEN], ["Content-Type", "application/json;charset=UTF-8"]],
   "url" : "https://spx.smaato.com/publisherportal/api/smx/v1/line-items/" + line_item.id.toString(),
   "params": JSON.stringify(line_item),
   "requestType" : "PUT"
 };
 var callback = function(){
   if(this.readyState === 4 && this.status === 200){
     performTask();
     // console.log(JSON.parse(this.responseText));
   }
 }
 requestSoma(request_object, callback);
}


function requestSoma(request_object, callback){
 HTTP = new XMLHttpRequest();
 HTTP.open(request_object.requestType, request_object.url, true);
 //Set header
 for(var i = 0; i < request_object.headers.length; i++){
   HTTP.setRequestHeader(request_object.headers[i][0], request_object.headers[i][1]);
 }
 HTTP.onerror = function(){
   alert("ERROR: An error occurred during the transaction **");
   console.log("** An error occurred during the transaction");
 };

 HTTP.onreadystatechange = callback
 HTTP.send(request_object.params);
 return;
}
