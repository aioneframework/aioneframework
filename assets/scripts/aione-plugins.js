$.fn.equal = function(){
	this.each(function(){
		var maxHeight = 0;
		var $columns = $(this).children();
		$columns.each( function() {
		    if($(this).height() > maxHeight){
		    	maxHeight = $(this).height();
		    }
		});
		$columns.each( function() {
	    	$(this).css('min-height',maxHeight);
		});
	});
};