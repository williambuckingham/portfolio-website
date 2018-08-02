import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './home.html';
import './splash.html';
import './about.html';
import './resume.html';
import './contact.html';
import './work.html';
import './about-text.html';

//
//
//ROUTING
//
//

Router.configure({
	LayoutTemplate:'ApplicationLayout'
});

Router.route('/', function() {
	this.render('splash', {to:"main"})
});

Router.route('/home', function() {
	this.render('home', {to:"main"})
});

Router.route('/home/about', function() {
	this.render('about', {to:"main"})
});

Router.route('/home/contact', function() {
	this.render('contact', {to:"main"})
});

Router.route('/home/work', function() {
	this.render('work', {to:"main"})
});

var type_home_position=0;
var type_splash_position=0;
var turn = 1000;

var home_text ="";
var splash_text ="";

var type_interval=70;
var cursor_interval = 600;

var menu_index=0;
var menu_items = ['Work', 'About', 'Contact', 'Resume', 'Github'];
var intro_text_1 = "Hi. "
var intro_text = "Hi. I'm Will. I'm a product design and computer science student at Stanford Univeristy. Welcome to my portfolio! I am excited about UI/UX design and software development. I love designing and building websites, like this one as well as mobile apps and VR apps. Check out my work!"

//
//
//TEMPLATE HELPER FUNCTIONS
//
//

Template.splash.helpers({
	setBackgroundColor() {
		document.body.style.background = "#002fa7";
	},
	typeSplash() {
		type_splash_position=0;
		splash_text = intro_text;
		$("#text").empty();
		$(document).ready(function() {
			//typeSplashPage();
		})
		setTimeout(typeSplashPage, 1000);
		setInterval(cursorAnimation, cursor_interval);
	}
});


Template.home.helpers( {
	setBackgroundColor() {
		document.body.style.background = "#002fa7";
	},
	typeHome() {
		type_home_position=0;
		menu_index=0;
		home_text = " Work_About_Contact_Resume_Github_";
		$("#str").empty();
		typeHomePage();
		setInterval(cursorAnimation, cursor_interval);
	}
});

Template.about.helpers( {
	setBackgroundColor() {
		console.log("background color set!!!!");
		setTimeout(backgroundFade, 200);
	},
	loadContent() {
		setTimeout(loadText, 2000);
	}
});

Template.contact.helpers({
	setBackgroundColor() {
		console.log("background color set!!!!");
		setTimeout(backgroundFade, 200);
	},
	loadContent() {
		setTimeout(loadContactText, 2000);
	}
})

Template.work.helpers({
	setBackgroundColor() {
		console.log("background color set!!!!");
		setTimeout(backgroundFade, 200);
	},
	loadContent() {
		setTimeout(loadWorkText, 2000);
	}
})


function deleteSplashPage() {
	if(type_splash_position > turn - 3) {
		var new_text = $("#text").html();
		console.log(new_text);
		var deletedText = new_text.substring(0, type_splash_position);
		$("#text").html(deletedText);
		type_splash_position--;
		setTimeout(deleteSplashPage, type_interval);
	} else {
		turn += 10;
		setTimeout(typeSplashPage, type_interval);
	}

	
	
}


//This function creates a typewriter effect by animating the text as it is added to the DOM
function typeSplashPage() {
	if(type_splash_position < turn) {
		var new_text = $("#text").html();
		if(typeof new_text == 'undefined') {
			new_text = "";
		}
		new_text += splash_text.charAt(type_splash_position);

		if(type_interval == 500) {
			type_interval = 70;
		}
		if(splash_text.charAt(type_splash_position) === '.' 
			|| splash_text.charAt(type_splash_position) === '!') {
			type_interval = 500;
		}
		
		//if at the end of text, update enter with HTML link tags
		if(type_splash_position == splash_text.length - 1) {
			var linked_text = new_text.replace('Check out my work!', '<a class="caption-link underline" href="/home">Check out my work!</a>');
			new_text = linked_text;
		}

		$("#text").html(new_text);	
		type_splash_position++;
		setTimeout(typeSplashPage, type_interval);		
	} else if (type_splash_position < splash_text.length) {
		//setTimeout(deleteSplashPage, type_interval);
	}
}

function typeHomePage() {
	if(type_home_position < home_text.length) {
		var new_home_text = $("#str").html()
		
		//__ is used to mark the end of a word, the word is then replaced by itself
		//but with a tags around it and a line break tag
		if(home_text.charAt(type_home_position) === '_') {
			
			//check the menu item is not the last one before adding line break tag
			if(menu_index != menu_items.length - 1) {
				new_home_text += "<br/>";
			}
			
			//Add a tags to the menu item just printed
			var last_word = menu_items[menu_index];
			var link;
			if(last_word === 'Resume') {
				link = '<a class="menu-link" href="/William Buckingham Resume Id copy.pdf" target="_blank">Resume</a>';
			} else if(last_word === 'Github') {
				link = '<a class="menu-link" href="https://github.com/williambuckingham" target="_blank">Github</a>';
			} else {
			var link = '<a class="menu-link" href="/home/' + last_word + '">' + last_word + '</a>'
			}
			var linked_text = new_home_text.replace(last_word, link);
			new_home_text = linked_text;
			menu_index++;
		} else {
			new_home_text += home_text.charAt(type_home_position);
		}
	
		$("#str").html(new_home_text);
		type_home_position++;
		setTimeout(typeHomePage, type_interval);	
	}
}

//This function animates the cursor
function cursorAnimation() {
    $('#cursor').animate({
        opacity: 0
    }, cursor_interval).animate({
        opacity: 1
    }, cursor_interval);
}

function backgroundFade() {
	console.log("background fade called!");
	$("body").animate({backgroundColor: "#ffffff"}, 2000);
}

function loadText() {
	$("#about-text").html("<h1>About</h1>");
	$("#about-text").append("<p> I am a Product Design and Computer Science student at Stanford Univeristy</p>");
	$("#about-text").append("<p>As a product designer I </p>");
}

function loadContactText() {
	$("#about-text").html("<h1>Contact</h1>");
	$("#about-text").append("<p> If you have any questions or inquiries about my work feel free to contact me by email or connect with me on LinkedIn!</p>")
	$("#about-text").append("<p>Email - <a href='mailto:wbucking@stanford.edu?Subject=Hi!'>wbucking@stanford.edu</a> <br/></p>");
	$("#about-text").append("<p>LinkedIn - <a href='https://www.linkedin.com/in/william-buckingham/'>William Buckingham</a> <br/></p>");
}

function loadWorkText() {
	$("#work-text").html("<h1>Work</h1>");
	$("#work-text").append("<p>Projects</p>");
}







