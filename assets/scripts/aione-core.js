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