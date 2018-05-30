
$(document).ready(function(){
	
	$('input[type="text"], input[type="email"], textarea').each(function() {
		$(this).val( $(this).attr('placeholder') );
    });
	
});