/*****************************************************
/*  Aione Tabs
/*****************************************************/
$(document).on('click', '.aione-tabs > .nav > *', function(e) {
	e.preventDefault();
	$(this).addClass("active").siblings().removeClass('active');
	var target = $(this).attr("data-target");
	if (target != undefined) {
		$(target).addClass("active").siblings().removeClass('active');
	}
});

$(document).on('mouseover', '.aione-tabs.hover > .nav > *', function(e) {
	e.preventDefault();
	$(this).trigger("click");
});

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

$(document).ready(function() {
	$('.equal').equal();
});

$(window).resize(function(){
	$('.equal').equal();
});

