
//This is form validation for the contact.html and sign-in.html form
//This validation code is NOT dependent on jQuery.

var _$ = function(val) { return document.getElementById(val); }; //jquery-like shortcut function

var signinform = document.getElementById('sign-in-form'),
	contactform = document.getElementById('contact-form');

function isValueNull(object) {
	// alert('isnull called');
	return (object.value === null ? true : false);
}

function isValueBlank(object) {
	// alert('isblank called');
	return (object.value === "" ? true : false);
}

function checkContactForm() {
	console.log('checkContactForm');

	//vars with an _ are the non-mandatory ones
	var fname = 				document.getElementById('firstname'),
		lname = 				document.getElementById('lastname'),
		_zipcode = 				document.getElementById('zipcode'),
		phonenumber = 			document.getElementById('phonenumber'),
		email = 				document.getElementById('email'),
		requestnature = 		document.getElementById('requestnature'),
		requestnatureother = 	document.getElementById('requestnatureother'),
		_alreadychaged = 		document.getElementById('alreadychaged'),
		_isasuspect = 			document.getElementById('isasuspect'),
		details = 				document.getElementById('details'),
		// _days = document.getElementByName('days'),
		agedeclaration = 		document.getElementById('agedeclaration');

	var mandatory = [fname, lname, phonenumber, email, requestnature, requestnatureother, details, agedeclaration],
		optional = [_zipcode, _alreadychaged, _isasuspect];

	for (var i = 0; i < mandatory.length; i++) {
		var thingie = mandatory[i];

		if (isValueNull(thingie) || isValueBlank(thingie)) {

			if (thingie == fname) 				{ alert("First name is emtpy"); 				thingie.focus(); return false;  }
			if (thingie == lname) 				{ alert("Last name is emtpy"); 					thingie.focus(); return false;  }
			if (thingie == phonenumber) 		{ alert("Phone number name is emtpy"); 			thingie.focus(); return false;  }
			if (thingie == email) 				{ alert("E-mail name is emtpy"); 				thingie.focus(); return false;  }
			if (thingie == requestnature) 		{ alert("Request nature is emtpy"); 			thingie.focus(); return false;  }
			if (thingie == requestnatureother) 	{ 
				if (requestnature.value == "other") {
					alert("Request Nature is 'Other. Please enter something in text box next to it: (Request nature (other) is emtpy!)"); 	
					thingie.focus(); 
					return false;  
				}
			}
			if (thingie == details) 			{ alert("Details is emtpy"); 					thingie.focus(); return false;  }
			if (thingie == agedeclaration) 		{ alert("Age delcaration is emtpy"); 			thingie.focus(); return false;  }

		} 
	}

	_$('info-msg-confirm').innerHTML = "Thanks for your submission, " + fname.value + " " + lname.value;

	document.getElementById('contact-form').reset();

	// /returning true is disabled for this form. to check when data actually gets passed onclick, check the signin-form
	return false;
}

function checkSigninForm() {
	var clientid = _$('clientid').value,
		clientpass = _$('clientpass').value;

	var blankclientid = (clientid === ""),
		blankclientpass = (clientpass === "");

	var nullclientid = (clientid === null),
		nullclientpass = (clientpass === null);

	var blankvalues = (blankclientid && blankclientpass),
		nullvalues = (nullclientid && nullclientpass);

	if (nullvalues || blankvalues) {

		alert("Client ID and password are blank!");
		return false;

	} else if (blankclientid || nullclientid) {

		alert("Client ID field is blank!");
		return false;

	} else if (blankclientpass || nullclientpass) {

		alert("Client password field is blank!");
		return false;

	} else if (!blankvalues && !nullvalues) {
		window.console.log("submitting...");

		signinform.reset();
		return true;
	}
}


/** All this code allows for the .drop-down divs to appear and fade out. Dependent on jQuery */

var topNav = ' #top-navigation',
 	leftNav = ' #left-navigation';

var topNavLink1Dropdown = ' #about-us-dropdown',
	topNavLink2Dropdown = ' #news-dropdown',
	topNavLink3Dropdown = ' #contact-us-dropdown',
	signInSignOutDropdown = ' #sign-in-sign-out-dropdown';

var topNavHomeLink = ' #top-nav-home-link',
	topNavLink1 = ' #top-nav-link1',
	topNavLink2 = ' #top-nav-link2',
	topNavLink3 = ' #top-nav-link3',
	signInSignOutLink = ' span.sign-in-sign-out-link';

var allDropdowns = topNavLink1Dropdown + ',' + topNavLink2Dropdown + ',' + topNavLink3Dropdown + ',' + signInSignOutDropdown;
var allHoverlinks = topNavHomeLink + ',' + topNavLink1 + ',' + topNavLink2 + ',' + topNavLink3 + ',' + signInSignOutLink;
var allHoverlinksAndDropdowns = allDropdowns + ',' + allHoverlinks;

var header = ' header ',
	footer = ' footer ';

$(document).ready(function() {
	$('#top-navigation, #left-navigation, .drop-down').waypoint('sticky', {
		wrapper: '<div class="sticky-wrapper" />',
	});

	$('article').click(function() {
		$(allDropdowns).fadeOut(300);
	});

	$(topNavHomeLink).hover(
		function() { $(allDropdowns).fadeOut(300); },
		function() {  }
	);

	$(topNavLink1).hover(
		function() {
			$(topNavLink2Dropdown + ',' + topNavLink3Dropdown + ',' + signInSignOutDropdown).hide();
			$(topNavLink1Dropdown).hover(
				function() { 
					$(this).show(); 
					$(header).hover(
						function() { $(topNavLink1Dropdown).fadeOut(300); }, 
						function() {  }
					);
				},
				function() {
					$(this).fadeOut(300);
				}
			).show();
		},
		function() {  }
	);

	$(topNavLink2).hover(
		function() {
			$(topNavLink1Dropdown + ',' + topNavLink3Dropdown + ',' + signInSignOutDropdown).hide();
			$(topNavLink2Dropdown).hover(
				function() { 
					$(this).show(); 
					$(header).hover(
						function() { $(topNavLink2Dropdown).fadeOut(300); }, 
						function() {  }
					);
				},
				function() { $(this).fadeOut(300); }
			).show();
		},
		function() { }
	);

	$(topNavLink3).hover(
		function() {
			$(topNavLink1Dropdown + ',' + topNavLink2Dropdown + ',' + signInSignOutDropdown).hide();
			$(topNavLink3Dropdown).hover(
				function() { 
					$(this).show(); 
					$(header).hover(
						function() { $(topNavLink3Dropdown).fadeOut(300); }, 
						function() {  }
					);
				},
				function() { $(this).fadeOut(300); }
			).show();
		},
		function() { }
	);

	$(signInSignOutLink).hover(
		function() {
			$(topNavLink1Dropdown + ',' + topNavLink2Dropdown + ',' + topNavLink3Dropdown).hide();
			$(signInSignOutDropdown).hover(
				function() { 
					$(this).show(); 
				},
				function() { $(this).fadeOut(300); }
			).show();
		},
		function() { }
	);
});