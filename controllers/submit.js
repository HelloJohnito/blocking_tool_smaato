var SUBMIT_BUTTON = document.getElementById("submit_button").addEventListener("click", submit);
var CLEAR_ALL = document.getElementById("clear_all_button").addEventListener("click", clearAll);
var FINAL_CALL_BACK_COUNT;


function clearAll(e){
  e.stopPropagation();
  FINAL_CALL_BACK_COUNT = 0;
  ErrorCheckConnection();
  ErrorCheckMissingApplicationId();

  handleLoader(3, "loader", "");
  var adspace_ids_in_application = parseDataForAdspace();
  var lineitems_in_application = selectLineItemsWithAdspace(adspace_ids_in_application);

  lineitems_in_application.forEach(function(lineitem){
    lineitem.smxSettings.categories = null;
    lineitem.smxSettings.domains = null;
    performTask = function(){
      FINAL_CALL_BACK_COUNT++;
      finalCallBack(FINAL_CALL_BACK_COUNT, lineitems_in_application.size, 3);
      console.log("Successfully cleared all blocking for " + lineitem.name);
    };
    putLineItem(lineitem, performTask);
  });
}


function finalCallBack(current_count, lineitem_count, num){
  if(current_count === lineitem_count){
    handleLoader(num, "success_note", "Success");
  }
}


function insertBlocks(categories, domains, lineitems){
  for(var i = 0; i < lineitems.length; i++){
    var lineitem = lineitems[i];
    if(categories.length !== 0 && lineitem.smxSettings.categories === null){
      lineitem.smxSettings.categories = [];
    }
    if(domains.length !== 0 && lineitem.smxSettings.domains === null){
      lineitem.smxSettings.domains = [];
    }

    for(var i = 0; i < categories.length; i++){
      lineitem.smxSettings.categories.push(categories[i]);
    }
    for(var j = 0; j < domains.length; j++){
      lineitem.smxSettings.domains.push(domains[j]);
    }
  }
  return;
}


function parseDataForAdspace(){
  var application_id = parseInt(APPLICATION_ID.innerHTML);
  var adspace;
  var adspace_ids = [];
  for(var i = 0; i < SPX_DATA["adspaces"].length; i++){
    adspace = SPX_DATA["adspaces"][i];
    if(adspace.applicationId === application_id){
      adspace_ids.push(adspace.id);
    }
  }
  return adspace_ids;
}


function parseIABCode(category){
  var iabCode = "";
  var startIndex = category.indexOf("(");
  for(var i = startIndex + 1; i < category.length - 1; i++){
    iabCode += category[i];
  }
  return iabCode;
}


function selectLineItemsWithAdspace(adspace_ids){
  var lineitems_with_adspace = new Set;
  for(var i = 0; i < SPX_DATA["lineitems"].length; i++){
    var lineitem = SPX_DATA["lineitems"][i];
    if(lineitem.targeting.inventoryTargeting === null || lineitem.targeting.inventoryTargeting.adspaces === null){
      continue;
    }
    for(var j = 0; j < lineitem.targeting.inventoryTargeting.adspaces.length; j++){
      if(adspace_ids.indexOf(lineitem.targeting.inventoryTargeting.adspaces[j]) !== -1){
        lineitems_with_adspace.add(lineitem);
      }
    }
  }
  return lineitems_with_adspace;
}


function setDomainValues(){
  var result = [];
  var domain_values = DOMAIN_BOX.value.split("\n");
  for(var i = 0; i < domain_values.length; i++){
    if(domain_values[i]){
      result.push(domain_values[i].trim());
    }
  }
  return result;
}


function setCategoryValues(){
  var category_values = [];
  var parent;
  for(var i = 0; i < PARENT_CATEGORIES.length; i++){
    parent = CATEGORY_STATE[PARENT_CATEGORIES[i]];
    if(parent.left_box){
      for(sub_cat in parent.sub_categories){
        if(!parent.sub_categories[sub_cat]){
          category_values.push(parseIABCode(sub_cat));
        }
      }
    }
    else {
      category_values.push(parseIABCode(PARENT_CATEGORIES[i]));
    }
  }
  return category_values;
}


function submit(e){
  e.stopPropagation();
  FINAL_CALL_BACK_COUNT = 0;
  ErrorCheckConnection();
  ErrorCheckMissingApplicationId();
  handleLoader(2, "loader", "");
  var category_values = setCategoryValues();
  var domain_values = setDomainValues();
  var adspace_ids_in_application = parseDataForAdspace();
  var lineitems_in_application = selectLineItemsWithAdspace(adspace_ids_in_application);
  insertBlocks(category_values, domain_values, lineitems_in_application);

  lineitems_in_application.forEach(function(lineitem){
    performTask = function(){
      FINAL_CALL_BACK_COUNT++;
      finalCallBack(FINAL_CALL_BACK_COUNT, lineitems_in_application.size, 2);
      console.log("Success added in blocking for " + lineitem.name);
    };
    putLineItem(lineitem, performTask);
  });
  return;
}
