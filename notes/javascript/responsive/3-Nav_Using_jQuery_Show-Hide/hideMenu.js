// #showPhoneNav is ID for button to toggle on/off for navigation menu
// #myNav is ID for ul element

$(document).ready(function() {
	$('#showPhoneNav').click(function() {
    	$("#myNav").slideToggle('normal',function(){ //Shows Nav area
    		if ($('#myNav').is(':visible')) {
    			$('#showPhoneNav').text('Hide Navigation');
    		} else {
    			$('#showPhoneNav').text('Show Navigation');
			}
		});
  	});
});