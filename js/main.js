// Kevin O'Toole
// VFW 1303
// Project 3

// Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){

	// getElementById Function
	function $(x){
		var elementId = document.getElementById(x);
		return elementId;
	}

	// Create select field element and populate with options (optionGroup)
	function recipeCategory(){
		var recipeFormTag = document.getElementsByTagName("form"); //formTag is an array of all the form tags
		var selectLiRecipeType =$("selectType");
		var makeRecipeTypeSelect = document.createElement("select");
		makeRecipeTypeSelect.setAttribute("id", "types");
		for(var i=0, j=recipeType.length; i<j; i++){
			var makeRecipeTypeOption = document.createElement("option");
			var recipeOptText = recipeType[i];
			makeRecipeTypeOption.setAttribute("value", recipeOptText);
			makeRecipeTypeOption.innerHTML = recipeOptText;
			makeRecipeTypeSelect.appendChild(makeRecipeTypeOption);
		}
		selectLiRecipeType.appendChild(makeRecipeTypeSelect);
	}
	
	//Find value of selected radio button.
	function getSelectedRadio(){
		var relatedRadios = document.forms[0].relative;
		for(var i=0; i < relatedRadios.length; i++){
			if(relatedRadios[i].checked){
				relatedValue = relatedRadios[i].value;
			}
		}
	}
	
	//Get checkbox values.
	function getCheckboxValues(){
		whenCookedValue = [];
		var checkboxes = document.forms[0].when;
		for(var i=0; i < checkboxes.length; i++){
			if(checkboxes[i].checked){
				whenCookedValue.push(checkboxes[i].value);
			}
		}
	}


	// Old get check boxes function, got shorter for loop function to work 	
	/*function getCheckboxValues(){
		whenCookedValue = [];
		if($("valentines").checked){
			var valentine = $("valentines").value;
			whenCookedValue.push(valentine);
		}
		if($("easter").checked){
			var east = $("easter").value;
			whenCookedValue.push(east);
		}
		if($("halloween").checked){
			var hall= $("halloween").value;
			whenCookedValue.push(hall);
		}
		if($("thanksgiving").checked){
			var thanks = $("thanksgiving").value;
			whenCookedValue.push(thanks);
		}
		if($("christmas").checked){
			var christ = $("christmas").value;
			whenCookedValue.push(christ);
		}
		if($("birthdays").checked){
			var birth = $("birthdays").value;
			whenCookedValue.push(birth);
		}
		if($("other").checked){
			var oth = $("other").value + ": " + $("specify").value ;
			whenCookedValue.push(oth);
		}
	}*/
	
	function toggleControls(n){
		switch(n){
			case "on":
				$("addRecipe").style.display = "none";
				$("clear").style.display = "inline";
				$("display").style.display = "none";
				$("addNewRecipe").style.display = "inline";
				break;
			case "off":
				$("addRecipe").style.display = "block";
				$("clear").style.display = "inline";
				$("display").style.dipslay = "inline";
				$("addNewRecipe").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	// Store data to local storage with unique Id of random number
	function storeNewRecipe(){
		var uniqueId 			= Math.floor(Math.random()*1000001);
		//Gather up all our form field values and store in an object.
		//Object properties contain array with the form label and input values.
		getSelectedRadio();
		getCheckboxValues();
		var item 				={};
			item.fname 			= ["First Name:", $("fname").value];
			item.lname 			= ["Last Name:", $("lname").value];
			item.todaysDate 	= ["Date Added:", $("todaysDate").value];
/*radio*/	item.family 		= ["Related", relatedValue];
			item.email 			= ["Email:", $("email").value];
			item.group 			= ["Group", $("types").value];
			item.range 			= ["Difficulty:", $("range").value];
/*chk box*/	item.whenCooked		= ["When You Cook This:", whenCookedValue];
			//item.specify		= ["Other Time:", $("specify").value];
			item.time 			= ["Cooking Time:", $("time").value];
			item.temperature 	= ["Cooking Temperature:", $("temperature").value];
			item.directions 	= ["Cooking Directions:", $("directions").value];
		//Save data into local storage: Use Stringify to convert our object to a sting.
		localStorage.setItem(uniqueId, JSON.stringify(item));
		alert("Recipe Has Been Saved!");
	}
	
	function refreshWindow(){
		window.location.reload();
	}
	
	function getRecipes(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There are no recipes in your local storage.");
		}
		//Write Data from Local Storage to the browser.
		var makeNewDiv = document.createElement("div"); 			// Create new div tag
		makeNewDiv.setAttribute("id", "items"); 					// Sets the attribute of the new div tag
		var makeNewList = document.createElement("ul"); 			// Creates ad new ul 
		makeNewDiv.appendChild(makeNewList); 						// Appends the new ul in the new div tag
		document.body.appendChild(makeNewDiv); 						// Appends the new div tag to the body tag of the doument
		$("items").style.display = "block";							// Safety just to be sure that the items display
		for(var i=0, len=localStorage.length; i<len; i++){ 			// Creates loop of local storage
			var makeNewli = document.createElement("li"); 			// Create a new li
			var dataLinksLi = document.createElement("li");			// Creates a link for the display data
			makeNewList.appendChild(makeNewli);  					// Appends the new li to the ul tag
			var key = localStorage.key(i); 							// Sets the key value from local storage
			var value = localStorage.getItem(key); 					// Sets the value from the key from the local storage
			var newObj = JSON.parse(value); 						//Convert the string from local storage value back to an object by using JSON.parse
			var makeNewSubList = document.createElement("ul"); 		// Creates a new sub list to display the objects of the list
			makeNewli.appendChild(makeNewSubList); 					// Appends the new ul to the li tag
			for(var n in newObj){ 									// creates a for in loop of the object data
				var makeNewSubli = document.createElement("li"); 	// Creates a new li item to display the objects in the group
				makeNewSubList.appendChild(makeNewSubli); 			// Appends the new li to the new ul tag
				var optNewSubText = newObj[n][0] + " " + newObj[n][1]; // 
				makeNewSubli.innerHTML = optNewSubText;
				makeNewSubList.appendChild(dataLinksLi);
			}
			makeDisplayItemLinks(localStorage.key(i), dataLinksLi); // create our edit and delete buttons/link for local storage.
		}
	}
	
	// Make Item Links Function. Creating the edit and delete links for each stored item when displayed.
	function makeDisplayItemLinks(key, dataLinksLi){
		// add edit single item link
		var editDataLink = document.createElement("a");
		editDataLink.href = "#";
		editDataLink.key = key;
		var editDataLinkText = "Edit Recipe Information";
		editDataLink.addEventListener("click", editRecipe);
		editDataLink.innerHTML = editDataLinkText;
		dataLinksLi.appendChild(editDataLink);
		
		// add line break
		var lineBreakTag = document.createElement("br");
		dataLinksLi.appendChild(lineBreakTag);
	
		// add delete single item link
		var deleteDataLink = document.createElement("a");
		deleteDataLink.href = "#";
		deleteDataLink.key = key;
		var deleteDataLinkText = "Delete Recipe";
		//deleteDataLink.addEventListener("click", deleteRecipe);
		deleteDataLink.innerHTML = deleteDataLinkText;
		dataLinksLi.appendChild(deleteDataLink);
	}
	
	function editRecipe(){
		//Grab the data from our item from local storage.
		var getRecipeValue = localStorage.getItem(this.key);
		var item = JSON.parse(getRecipeValue);
		
		// Shows the form again
		toggleControls("off");
		
		// populates the form fields with current local storage values.
		$("fname").value = item.fname[1];
		$("lname").value = item.lname[1];
		$("todaysDate").value = item.todaysDate[1];
		var relatedRadios = document.forms[0].relative;
		for(var i=0; i<relatedRadios.length; i++){
			if(relatedRadios[i].value == "Yes" && item.family[1] == "Yes"){
				relatedRadios[i].setAttribute("checked", "checked");
			}else if(relatedRadios[i].value == "No" && item.family[1] == "No"){
				relatedRadios[i].setAttribute("checked", "checked");
			}
		}
		$("email").value = item.email[1];
		$("types").value = item.group[1];
		$("range").value = item.range[1];
		/*var cooked = document.forms[0].when;
		for(var i=0; i<cooked.lenght; i++){		
			if(item.whenCooked[i] == "Valentines"){
				$("valentines").setAttribute("checked", "checked");
			}	
			if(item.whenCooked[i] == "Easter"){
				$("easter").setAttribute("checked", "checked");
			}
		}	
		f(item.whenCooked[1] == "Halloween"){
			$("halloween").setAttribute("checked", "checked");
		}
		if(item.whenCooked[1] == "Thanksgiving"){
			$("thanksgiving").setAttribute("checked", "checked");
		}
		if(item.whenCooked[1] == "Christmas"){
			$("christmas").setAttribute("checked", "checked");
		}
		if(item.whenCooked[1] == "Birthdays"){
			$("birthdays").setAttribute("checked", "checked");
		}
		if(item.whenCooked[1] == "other"){
			$("other").setAttribute("checked", "checked");
		}*/
		$("time").value = item.time[1];
		$("temperature").value = item.temperature[1];
		$("directions").value = item.directions[1];
	}
	
	function deleteLocalRecipes(){
		if(localStorage.length === 0){
			alert("There are no recipes in your local storage.")
		}else{
			localStorage.clear()
			alert("Your recipes have been deleted.");
			window.location.reload();
			return false;
		}
	}
	
	// Variable defaults
	var recipeType = [" --Choose A Type Of Recipe-- ", "Breakfast", "Lunch", "Dinner", "Appetizer", "Dessert", "Drink"];
	var	relatedValue;
	var	whenCookedValue = "No specific time when you would cook this.";
	
	recipeCategory();

	//Set Link & Submit Click Events
	var displayRecipes = $("display");
	displayRecipes.addEventListener("click", getRecipes);
	var clearRecipes =$("clear");
	clearRecipes.addEventListener("click", deleteLocalRecipes);
	var saveNewRecipe = $("saveRecipe");
	saveNewRecipe.addEventListener("click", storeNewRecipe);
	saveNewRecipe.addEventListener("click", refreshWindow);
});