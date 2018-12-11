// Blocking Logic

// Category
var CATEGORY_BOX_LEFT = document.getElementById("category_box_left");
var CATEGORY_BOX_RIGHT = document.getElementById("category_box_right");
var ADD_CATEGORY_BUTTON = document.getElementById("add_category_button").addEventListener("click", function(e){
  e.stopPropagation();
  categoryArrowButtonPressed("add")});
var SUBTRACT_CATEGORY_BUTTON = document.getElementById("subtract_category_button").addEventListener("click", function(e){
  e.stopPropagation();
  categoryArrowButtonPressed("subtract")});
var RESET_CATEGORY_BUTTON = document.getElementById("reset_category_button").addEventListener("click", resetCategoryBoxes);

CATEGORY_BOX_LEFT.addEventListener("click", function(e){
  e.stopPropagation();
});

CATEGORY_BOX_RIGHT.addEventListener("click", function(e){
  e.stopPropagation();
});

// Domain
var DOMAIN_BOX = document.getElementById("domain_box");
DOMAIN_BOX.addEventListener("click", function(e){
  e.stopPropagation();
});

function categoryArrowButtonPressed(operation){
  var selected_item = operation === "add" ? CATEGORY_BOX_LEFT.options[CATEGORY_BOX_LEFT.selectedIndex].text : CATEGORY_BOX_RIGHT.options[CATEGORY_BOX_RIGHT.selectedIndex].text;
  changeCategoryState(selected_item);
  renderCategoryBoxes();
  return;
}


function changeCategoryState(category){
  var sub_categories;
  if(PARENT_CATEGORIES.indexOf(category) !== -1){
    CATEGORY_STATE[category].left_box = !CATEGORY_STATE[category].left_box;
    sub_categories = CATEGORY_STATE[category].sub_categories;
    for(sub_cat in sub_categories){
      sub_categories[sub_cat] = CATEGORY_STATE[category].left_box;
    }
  }
  else {
    for(var i = 0; i < PARENT_CATEGORIES.length; i++){
      sub_categories = CATEGORY_STATE[PARENT_CATEGORIES[i]].sub_categories;
      if(sub_categories.hasOwnProperty(category)){
        sub_categories[category] = !sub_categories[category];
        break;
      }
    }
  }
  return;
}


function createOptionElement(category, parent){
  var option = document.createElement("option");
  option.text = category;
  if(parent) option.style = "color:#ff8c00; font-weight: bold;";
  return option;
}


function destroyCategorySelectItems(){
  destroyCategorySelectItem(CATEGORY_BOX_LEFT);
  destroyCategorySelectItem(CATEGORY_BOX_RIGHT);
  return;
}


function destroyCategorySelectItem(box){
  var length = box.options.length - 1;
  for(i = length; i >= 0; i--){
    box.options[i] = null;
  }
  return;
}


function renderCategoryBoxes(){
  destroyCategorySelectItems();
  var option;
  for(var i = 0; i < PARENT_CATEGORIES.length; i++){
    option = createOptionElement(PARENT_CATEGORIES[i], true);
    CATEGORY_STATE[PARENT_CATEGORIES[i]].left_box === true ? CATEGORY_BOX_LEFT.add(option) : CATEGORY_BOX_RIGHT.add(option);
    var sub_categories = CATEGORY_STATE[PARENT_CATEGORIES[i]].sub_categories;
    for(var sub_cat in sub_categories){
      option = createOptionElement(sub_cat, false);
      sub_categories[sub_cat] === true ? CATEGORY_BOX_LEFT.add(option) : CATEGORY_BOX_RIGHT.add(option);
    }
  }
  return;
}


function resetCategoryBoxes(e){
  e.stopPropagation();
  destroyCategorySelectItems();
  resetCategoryState();
  renderCategoryBoxes();
}


function resetCategoryState(){
  for(var i = 0; i < PARENT_CATEGORIES.length; i++){
    CATEGORY_STATE[PARENT_CATEGORIES[i]].left_box = true;
    var sub_categories = CATEGORY_STATE[PARENT_CATEGORIES[i]].sub_categories;
    for(var sub_cat in sub_categories){
      sub_categories[sub_cat] = true;
    }
  }
  return;
}
