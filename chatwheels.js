// Set up the phrase selection dialog.
// All of this is done before the page is ready.
var dialog = $('#dialog-scroll-list');
for(var i=0; i<phraseList.length; i++) { //Constructor of dialog-list of all phrases to choose from

if(phraseList[i].name==="Careful!")
	dialog.append("<hr><h2> POSITIONING </h2>"); // Select the topmost phrase in each category and append the heading accordingly during the formation of the list
if(phraseList[i].name==="Help!")
	dialog.append("<hr><h2> STATUS </h2>");
if(phraseList[i].name==="Missing!")
	dialog.append("<hr><h2> ENEMY </h2>");
if(phraseList[i].name==="Split push")
	dialog.append("<hr><h2> LANE </h2>");
if(phraseList[i].name==="We need wards.")
	dialog.append("<hr><h2> ITEMS </h2>");
if(phraseList[i].name==="Stack and pull please")
	dialog.append("<hr><h2> NEUTRALS </h2>");
if(phraseList[i].name==="Okay.")
	dialog.append("<hr><h2> MISC </h2>");
if(phraseList[i].name==="Well played!")
	dialog.append("<hr><h2> FLAVOR </h2>");

$("<div class='dialog-text'>"+phraseList[i].name+"</div>")	 // add the phrases one by one from the phraseList array
.data('phraseindex', i)
.appendTo(dialog);
}

$(document).ready(function() {

$('.btn').mouseup(function() { this.blur() });	// getting rid of button focus styles: http://stackoverflow.com/a/30119360/6021211

$("#cfg_input_wrapper").hide();	// hide config parser by default
$("#cfg_input_wrapper_toggle").click(function(){	// toggle function
	$("#cfg_input_wrapper").toggle();	// the toggle event itself
	//$("#cfg_input_wrapper").slideToggle(100, function(){	// or you can use this one if you like jQuery.fx
		if( $('#cfg_input_wrapper').is(':hidden') ) 
		{ $("#cfg_input_wrapper_toggle").text('Show Config Parser');  }
		else
		{ $("#cfg_input_wrapper_toggle").text('Hide Config Parser');  } 
	//});	// closing brackets for jQuery.fx toggle event
	//return false
});



var targetBox = null;
var targetIndex = -1;
var targetWheel = -1;
//Holds data for the selected phrases
var selections = []; // two-dim array; [CWPage1.index[cwstring1.gameindex,cwstring2.gameindex .. cwstring8.gameindex]],CWPage2.index[..] ...
var keySelections = [];
var light = false;

var addListeners = function() {	// Handler functions of hovers, element and button clicks and keypresses
	$('.box').click(function(e) {	// show phrase list and shadowbox on click on the string line (box)
		targetBox = $(this);	// get current cw_string element
		//var txt = e.target.className; // txt = "box number000"
		//targetIndex = parseInt(txt.charAt(txt.length-1)); // <number>00_X_ (0-7)
		//targetWheel = parseInt(txt.charAt(txt.length-3)+txt.charAt(txt.length-2)); // <number>_XX_0 (0-97) excl. *8 and *9  /(\d(?![89])){2}/g
		targetIndex = targetBox.data('boxnum');
		targetWheel = targetBox.data('wheelnum');
		$('#dialog').fadeIn(200);
		$('#dialog-overlay').fadeIn(200);
	});

	/* $('.box').mouseenter(function(e) { // rotate the chatwheel div on mouseover; old func
		var txt = e.target.className;
		var num = txt.charAt(txt.length-1);
		var deg = num*45;
		var wheel = $(this).parent().parent().children(".left").children(".wheel");
		wheel.css("transform","rotate("+deg+"deg)");
		wheel.css("-webkit-transform","rotate("+deg+"deg)");
	}); */

	$('.box').mouseenter(function(e) {	 // rotate the chatwheel div on mouseover
	// update target variables
	targetBox = $(this);
	targetIndex = targetBox.data('boxnum');
	targetWheel = targetBox.data('wheelnum'); // //
	// rotate the wheel
	var deg = targetIndex*45;
	var wheel = $(this).parent().parent().children(".left").children(".wheel"); // go up to .container and then down to .wheel	
	wheel.css("transform","rotate("+deg+"deg)");
	wheel.css("-webkit-transform","rotate("+deg+"deg)");
	});
	
	/* $('.box').mouseleave(function(e) { // return the chatwheel back to default position
		var wheel = $(this).parent().parent().children(".left").children(".wheel");
		wheel.css("transform","rotate(0deg)");
		wheel.css("-webkit-transform","rotate(0deg)");
	}); */
	
	$(".key").keypress(function(e){ // do nothing on keypress
		return false;
	});

	$(".key").keydown(function(e){ // record the character and assign a keycode to it from keyMap array
		var charCode = (e.which) ? e.which : event.keyCode;
		var txt = e.target.className;
		var num = parseInt(txt.charAt(txt.length-2)+txt.charAt(txt.length-1));
		//var wheel = $(this).data('wheelnum');
		keySelections[num] = charCode;
		e.target.value = keyMap[charCode].name;
	});

	$(".delete-button").click(function(e) {	// things to do on click of Delete This Wheel button
		var chatWheelContainer = $(this).parent().parent();	// find the .container that contains this exact button
		//var num = $(this).data('wheelnum');	//	get the number of this chatwheel page FROM THE DATA APPENED TO THIS DELETE BUTTON
		var num = chatWheelContainer.find('.box').data('wheelnum');	// get the number of this chatwheel page from the data of the first found .box of this container
		
		// Erase gameindexes and key data of this chatwheel page
		//selections.splice(num, 1); 	//console.log(selections); //for some reason splice breaks shit! because is executed for every subsequent container
		selections[num] = null;			//console.log(selections[num]);	console.log(selections);
		keySelections[num] = null;
		chatWheelContainer.remove();	// and remove the .container
		
		// Filter the arrays to get rid of "null" and/or "undefined" element
		// Using "null" instead of "undefined" because "null" was also used to erase the element earlier
		// If you are really concerned, use: { if(n !== undefined || n !== null) { return n; } }
		selections = selections.filter(function(n){ return n != null });
		keySelections = keySelections.filter(function(n){ return n != null });

		//$('.container').each(function(num) { $(this).attr('id', num); });		// was used for testing purposes
		$('.wnum').each(function(num) {  $(this).text(num) });	// replace each number displayed in () in delete button with a new, proper one

		$('.container').each(function(i,e) {	// for each .container; (i,e) = index (of each element), this element = $(this)
			$(e).find('.box').each(function() {	// and each .box in each .container
				$(this).data('wheelnum', i);	// replace wheelnumber data with the number of each corresponding .container
				console.log('container #'+i+' = wheelnum '+$(this).data('wheelnum'));
			});
			$(e).find('.key').each(function() { //
				$(this).data('wheelnum', i); 
				//console.log('key '+i+' = '+$(this).data('wheelnum'));
			});
			//$(e).find('.delete-button').each(function() { $(this).data('wheelnum', i); console.log('delb '+i+' = '+$(this).data('wheelnum')); });
		});

	});

}

$(".dialog-text").click(function(e) { // onClick: get a phrase from the list and put it into previously selected box
	//var txt = e.target.className;	// txt = "dialog-text num00"
	//var num = parseInt(txt.charAt(txt.length-2)+txt.charAt(txt.length-1));
	var num = $(this).data('phraseindex');
	//selections[targetWheel][targetIndex] = num; //write the num into selections array: [WheelNum[StringNum:<num>]]
	selections[targetWheel][targetIndex] = phraseList[num].gameindex; // there needs to be more (incapsulations) if somwhere else out there is less: see makeConfig() selections
	targetBox.children('.box-text').text($(this).text());
	$('#dialog').fadeOut(200);
	$('#dialog-overlay').fadeOut(200);
	targetBox = null;
	targetIndex = -1;
});

/*$(".add-button").click(function(e) { // make another chatwheel "page" container on "Add" button click
	makeContainer();
	$(window).scrollTop($('div#bottom_buttons').offset().top);
});

$(".add-parse-button").click(function(e) { // make another chatwheel "page" container on "Add" button click
	makeContainerFromInput();
	$(window).scrollTop($('div#bottom_buttons').offset().top);
});

$(".done-button").click(function(e) { // output everything to a text field on "Done" button click
	makeConfig();
	$(window).scrollTop($('div#script-box').offset().top);
});*/



// clicking on the add wheel button
$(".add-button").click(function(e) {
makeContainer();
$('html, body').animate({scrollTop: $(".container:last").offset().top}, 500);
});

// clicking on the done button
$(".done-button").click(function(e) {
makeConfig();
$('html, body').animate({scrollTop: $("#script-box").offset().top}, 500);
});

// clicking outside the chat wheel phrase dialog
$("#dialog-overlay").click(function(e) { // hide phrase list and shadowbox overlay on click elswhere than a phrase
	targetBox = null;
	targetIndex = -1;
	$('#dialog').fadeOut(200);
	$('#dialog-overlay').fadeOut(200);
});

var makeContainer = function(parsedSelections) {	// generate another chatwheel "page" container
	var num = selections.length;	// how many of chatwheel pages there are
	var selectionsSubarray = [];	// buffer array, data later added to selections
	// Spawn a container from template
	$('#wheels').append("<div class='container'><div class='left'><span class='helper'></span><img class='wheel' src='img/wheel.png'></div><div class='right'></div><div class='rightdown'><button type='button' class='btn btn-sm btn-danger delete-button'>Delete This Wheel (<span class='wnum'>"+num+"</span>)</button></div><div style='clear:both'></div></div>");
	
	// For each of 8 phrases do
	for(var i=0; i<8; i++) {
				
		if (parsedSelections == null) {	// Then creates a "placeholder" phrase with data from one the first 8 ids from the list
		selectionsSubarray[selectionsSubarray.length] = phraseList[i].gameindex;	// Phrase's gameindex is added into selectionsSubarray array
		var phrase = phraseList[i].name; }	// Get actual phrase text
		
		if (parsedSelections != null) {	// Then fetches a phrase from array of pre-parsed numbers (data type = string)
		var phrase = "";
		selectionsSubarray[selectionsSubarray.length] = parseInt(parsedSelections[i]);	// Phrase's gameindex is added into selectionsSubarray array
			for(var k=0; k<phraseList.length; k++) {	// Search for gameindex id that corresponds to parsed number
				if (parsedSelections[i] == phraseList[k].gameindex) { phrase = phraseList[k].name; break; }	// If id is found, get actual phrase text and end the loop
			}
		}

		$("<div class=\"box\">\n<div class='box-text'>"+phrase+"</div>\n</div>")// Template of phrase text container (.box)
		.data( {"wheelnum": num, "boxnum": i} )	// attach the .data to a .box		// selections[num][i] = chatwheelPhraseIds[PageNum][PhraseNum] ; phrase id's = the values stored in array
		.appendTo($('.right:last'));	// put the filled .box inside the div.right after all the .box-es (if there are any)
	}
	
	/* $('#'+num).children('.right').children('.box').each(function() {		// debug message in console to check if the numbers are right
		var i = $(this).data('wheelnum');
		var j = $(this).data('boxnum');
	console.log(num+': construct box wn = '+i+': '+j); 	
	}); */
	
	selections[selections.length] = selectionsSubarray;	// 8-element array of phrases' gameindexes is added to selections array
	keySelections[keySelections.length] = 0;	// add a placeholder zero at a current index to array of all the keys for each chatwheel

	// Are these really needed? Look for .delete-button script code above
	//$('.key:last').data('wheelnum', num);	// _duplicate_ the number of this wheel to the corresponding .key element...
	//$('.delete-button:last').data('wheelnum', num);	// and another _copy_ of it is added to .delete-button
	
	// Alternate the color of the container; light = false from the start
	if(light) {	// every even container will be "light", basically
		$('.container:last').css("background-color", "#222");
	}
	light = !light;	// flip the current state of light
	
	addListeners();	// Handler functions of hovers, element and button clicks and keypresses for this container
	//console.log(selections);
}

makeContainer();	// spawn a chatwheel page from the start


var makeConfig = function() { // actual formation of output script

	// Output sting format:
	// alias cwpage_<k> "alias mycw_next cwpage_<k+1>; chat_wheel_phrase_<i> <gameindex>; ...;"

	var script = 'alias +mycw \"+chatwheel; alias mycw_next cwpage_1;\"<br />';
	script += 'alias -mycw \"-chatwheel;\"<br />alias mycw_next \"\";<br />';
	//script += 'alias -mycw \"-chatwheel; cwpage_0; alias mycw_next cwpage_1;\"<br />'		// TODO: this string will reset the page to 0 everytime you close the chatwheel
	for(var k=0; k<selections.length; k++) { // for how much chatwheel pages there are, do
		//if(selections[k] == null || keySelections[k] == null) { continue; }		// isn't needed anymore because of array filtering
		//var key = keyMap[keySelections[k]].scriptname;
		//script += "bind "+key+" \"+chatwheel; chat"+k+"\"<br/>alias chat"+k+" \""
		if(k == selections.length-1)
			{ script += "alias cwpage_"+ k +" \"alias mycw_next cwpage_"+ 0 +"; "; }
		else
			{ script += "alias cwpage_"+ k +" \"alias mycw_next cwpage_"+ parseInt(k+1) +"; "; }

		for(var i=0; i<8; i++)
		//{ script += " chat_wheel_phrase_"+i+" "+phraseList[selections[k][i]].gameindex+";"; }
		{ script += " chat_wheel_phrase_"+i+" "+selections[k][i]+";"; }  // selections[cw_page_num][cw_string_num(0-7)] = <gameindex (!)>

		script += "\"<br />";
	}
	$("#script-box").show();
	$("#script-text").html(script);
	//console.log(selections);
}

$('#cfg_input_area_value').click(function() { // get an existing config from input field and parse it
	var raw_cfg_input = $('#cfg_input_area').val();

	if(raw_cfg_input == '') {
		alert("Input is empty!");
	} else {
		// --- Code that does the parsing ---
		raw_cfg_input = raw_cfg_input.replace(/;/g, ' ');
		raw_cfg_input.split(' ');

		// search for the /([0-9])\w+/g (a word consisting only of symbols from 0 to 9)
		// "|| [ ]" is for the case when no matches found, otherwise omittable
		var strArr = (raw_cfg_input.match(/\b([0-9])\w*\b/g) || []);

		var parsedSelections = []; // container array for batches of 8 elements
		var selLength = strArr.length / 8;			// chatwheel_phrases_num / 8 = chatwheel_pages_num; this number defines the top border of the cycle below

		// chop off elements in strArr in batches of 8 and feed them to makeContainerFromInput :
		for (var i=0; i < selLength; i++) {
		parsedSelections = strArr.slice(0, 8);		// get first 8 elements in strArr
		makeContainer(parsedSelections);			// fill the box (along with "selections" array for script output) with chatwheel phrase numbers
		parsedSelections.length = 0;				// reset the 8-elemnent transfer array
		strArr.splice(0, 8);						// chop off first 8 elements in strArr
		}
	}
});

$('#cfg_input_area_reset').click(function() { // reset the config input field
	$("#cfg_input_area").val('');
});

/* Credits: 
	Valve — DotA 2 and initial phraseList content
	chudooder (github.com/chudooder) — inital chatwheel config builder
	Mackzwellz (github.com/Mackzwellz) — comments, config parser, proper deletion of chatwheel pages, layout system and 2-key-layout (as found somewhere on reddit, would like to give credit)
	Onekone (github.com/Onekone) — initial help with code understanding and motivation (no Kappa)
	stackoverflow.com community for providing thorough answers on googled subjects
*/

//	TODO:

// Need to implement 2 global binds:
//		bind SEMICOLON +mycw //// ChatWheel Key
//		bind ' mycw_next //// NextPage Key (to browse through all chat wheel pages)
// How to use: hold the ChatWheel Key and press the NextPage Key to "scroll" through pages
// + option (tick) to reset the page to 0 everytime you close the chatwheel


// switch between "key-per-chatwheel" and "2-keys-for all wheels layouts"
// option for list of chatwheel strings to start from the top, not from the right ((not-so-)purely visual part)

// make keyboard-friendly ( switch to next delete button on delete + make .boxes focus-able by keyboard + turn the wheel accordingly)

// localisation selection

});