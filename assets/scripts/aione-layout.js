$(window).resize(function(){
	$('.equal').equal();
});
$(document).ready(function() {


	/** Initialize Sliders ***************************************************/
	init_sliders();

	/** Equalize Columns ***************************************************/
	$('.equal').equal();

	/** Detect Browser ***************************************************/
	$('body').addClass("ua-"+$.browser.name);
	$('body').addClass("ua-version-"+$.browser.versionNumber);
	


	/*****************************************************
	/*  Aione Toggle
	/*****************************************************/
	$( ".aione-toggle" ).click(function(e) {
		e.preventDefault();
		var data = $(this).data();
		var current_text = $(this).text();
		$(this).toggleClass(data.class);
		$(this).text(data.text);
		$(this).data('text',current_text);
	});

    /*****************************************************
	/*  Aione Templates
	/*****************************************************/
	try{
		$(".load-template").each(function() {
			var template_file = $(this).attr("data-src");
			if(template_file != undefined){
				$(this).load(teplate_file);
			} else {
				var template_file = $(this).attr("id");
				if(template_file != undefined){
					$(this).load('template/'+template_file+'.html');
				}
			}
	    });
	}catch(e){

	}

	/*****************************************************
	/*  Lazy Load Images
	/*****************************************************/

	try{
		$("img").unveil();
	}catch(e){

	}
	/*****************************************************
	/*  Copy to Clipboard
	/*****************************************************/
	try{
		var clipboard = new Clipboard('.clipboard');
		clipboard.on('success', function(e) {
    		console.info('Action:', e.action);
    		console.info('Trigger:', e.trigger);
		    console.log("Copied '" + e.text + "' to clipboard");
		    e.clearSelection();
		});
		clipboard.on('error', function(e) {
			console.error('Action:', e.action);
			console.error('Trigger:', e.trigger);
		});
	}catch(e){
		console.log("Filed to copy to clipboard");
	}



	/*****************************************************
	/*  wow ja animate on scroll
	/*****************************************************/
	try{
		wow = new WOW({
			boxClass:     'animate',      // default
			animateClass: 'animated', // default
			offset:       0,          // default
			mobile:       true,       // default
			live:         true        // default
  		})
    	wow.init();
	}catch(e){

	}

	/*****************************************************
	/*  Animate on Hover 
	/*****************************************************/

	$(".animate-hover").hover(
		function(){ $(this).addClass( "animated infinite" ); }, 
		function(){ $(this).delay(200).removeClass( "animated infinite" );
	});

	/*****************************************************
	/*  Aione Search
	/*****************************************************/

	var aione_search_ids = new Array();
	$(".aione-search").each(function() {
		var aione_search_id = $(this).attr("id");
		if(aione_search_id != undefined){
			aione_search_ids.push(aione_search_id);
		} else {
			var aione_search_id = 'search_id_'+Math.floor(Math.random()*100000000);
			$(this).attr("id", aione_search_id);
			aione_search_ids.push(aione_search_id);
		}
    });

    $.each(aione_search_ids, function( index, aione_search ) {
    	var searchable = $('#'+aione_search).find('.aione-search-input').attr('data-search');
    	if(searchable == undefined || searchable == ""){
			var search_items = ['aione-search-item'];
		} else {
			var search_items = searchable.split(' ');
		}
		console.log("=======");
		console.log(search_items);

    	var options = {
			valueNames: search_items,
			searchClass: 'aione-search-input',
			sortClass: 'aione-sort-button',
			listClass: 'aione-search-list'
		};
		var search = new List(aione_search, options);
    });

	/*****************************************************
	/*  Aione Collapsible
	/*****************************************************/
	$('.aione-collapsible .aione-item-header').click(function(e){
		e.preventDefault();
		$(this).parent().toggleClass('active'); 
	})

	/*****************************************************
	/*  Aione Collapsible
	/*****************************************************/
	$('.aione-accordion .aione-item-header').click(function(e){
		e.preventDefault();
		$(this).parent().toggleClass('active').siblings().removeClass('active'); 
	})

	/*****************************************************
	/*  Aione Collapsible
	/*****************************************************/

	$('.aione-more-toggle').click(function(e){
		e.preventDefault();
		$(this).parent().toggleClass('active');
		if($(this).parent().hasClass('active')){
			$(this).html('Show Less');
		} else {
			$(this).html('Show More');
		} 
	});

	




	/*****************************************************
	/*  Hide Menu
	/*****************************************************/
	$(document).click(function(e) {
		e.stopPropagation();
		//console.log(e.target);
		if (!$(e.target).is('#aione_header_right *')) {
	        $('#aione_header_right .aione-header-item').removeClass('active');
	    }
	    if (!$(e.target).is('.aione-breadcrumbs *')) {
	        $('.aione-breadcrumbs li').removeClass('active');
	    }
	    
	});

	/*****************************************************
	/*  Header Right Menu Toggles
	/*****************************************************/
	$('body').on('click','#aione_header_right .aione-header-item > a',function(e){
		e.preventDefault();
		$(this).parent().toggleClass('active').siblings().removeClass('active');
	});
	
	/*****************************************************
	/*  Navigation Layout Toggle Switch Header
	/*****************************************************/
	$('body').on('click','.aione-header .aione-nav-toggle .nav-toggle',function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('.aione-main').toggleClass('sidebar-small');
		var sidebar_status = ($(this).hasClass('active'))?1:0;
		console.log(sidebar_status);
	});
	
	/*****************************************************
	/*  Navigation Item Click Show Hide Child Menu
	/*****************************************************/
	$('body').on('click','.aione-nav > ul > li.has-children > a',function(e){
		//e.preventDefault();
		var nav_item = $(this).parent();
		nav_item.toggleClass('nav-item-selected').siblings().removeClass('nav-item-selected');
	});


	
	/*****************************************************
	/*  Navigation fixed on complete scroll
	/*****************************************************/
	
	/*if($('#aione_sidebar').height() > $(window).height()){
		$(window).scroll(function(){
			var scrollOffset = $('#aione_sidebar li:last').offset();
			if(scrollOffset.top >= 215){
				$('#aione_sidebar').addClass('fixed-sidebar');
			}else{
				$('#aione_sidebar').removeClass('fixed-sidebar');
			}
		});
	}*/
	/*****************************************************
	/*  Breadcrumbs(Page Header) Show Hide Sub Menu
	/*****************************************************/
	$('body').on('click','.aione-breadcrumbs > li > a',function(e){
		e.preventDefault();
	}); 
	
	$('body').on('click','.aione-breadcrumbs > li',function(e){
		$(this).toggleClass('active').siblings().removeClass('active');
	});
	
	/*****************************************************
	/*  Aione progress bar on Projects page
	/*****************************************************/
	$('body').on('click','.aione-progress-bar',function(e){
		e.preventDefault();
		$(this).toggleClass('active');
	});


	
	/*****************************************************
	/*  Aione Form Selct 2
	/*****************************************************/
	$(document).on('click','.aione-delete-confirmation',function(e){
        e.preventDefault();
        var href = $(this).attr("href");
        swal({   
            title: "Are you sure?",   
            text: "Are you sure you want to delete",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Delete",   
            closeOnConfirm: false 
        }, 
        function(){
           window.location = href;
           swal("Deleted!", "Your widget has been deleted.", "success"); 
       }); 
    })

	


	/*****************************************************
	/*  Scroll to top
	/*****************************************************/
	try{
	    $(window).scroll(function() {
			var scroltop = $(this).scrollTop();
			if (scroltop > 100) {
				$('.scrolltop').addClass('active');
			} else {
				$('.scrolltop').removeClass('active');
			}
	    });
    }catch(e){

	}
	/*****************************************************
	/*  Sticky Header
	/*****************************************************/
	try{
		var sticky = $('.aione-header.sticky');
		var offset = sticky.offset().top;
	    $(window).scroll(function() {
			var scrolltop = $(this).scrollTop();

			console.log('scrolltop = '+scrolltop);
			console.log('offset = '+offset);
			if (scrolltop >= offset) {
				sticky.addClass('fixed');
			} else {
				sticky.removeClass('fixed');
			}
	    });
    }catch(e){

	}

	/*****************************************************
	/*  Smooth Scroll
	/*****************************************************/

	// Select all links with hashes
	$('a[href*="#"]')
	  // Remove links that don't actually link to anything
	  .not('[href="#"]')
	  .not('[href="#0"]')
	  .click(function(event) {
	    // On-page links
	    if (
	      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
	      && 
	      location.hostname == this.hostname
	    ) {
	      // Figure out element to scroll to
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	      // Does a scroll target exist?
	      if (target.length) {
	        // Only prevent default if animation is actually gonna happen
	        event.preventDefault();
	        $('html, body').animate({
	          scrollTop: target.offset().top
	        }, 1000, function() {
	          // Callback after animation
	          // Must change focus!
	          var $target = $(target);
	          $target.focus();
	          if ($target.is(":focus")) { // Checking if the target was focused
	            return false;
	          } else {
	            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
	            $target.focus(); // Set focus again
	          };
	        });
	      }
	    }
	  });


	
});