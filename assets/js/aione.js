$(document).ready(function() {

	/*****************************************************
	/*  Aione Templates
	/*****************************************************/
	try{
		$(".load-template").each(function() {
			var teplate_file = $(this).attr("data-src");
			if(teplate_file != undefined){
				$(this).load(teplate_file);
			} else {
				var teplate_file = $(this).attr("id");
				if(teplate_file != undefined){
					$(this).load('template/'+teplate_file+'.html');
				}
			}
	    });
	}catch(e){

	}

	/*****************************************************
	/*  Aione Slider
	/*****************************************************/
	try{
        var DataJson = $('.aione-slider').data();
        $(".aione-slider").owlCarousel(DataJson);
		$(".aione-slider").owlCarousel({
			
		    items:1,
		    loop:true,
		    autoplay:true,
		    autoplayTimeout:2000,
		    autoplayHoverPause:true,
		    nav:true,
		    autoHeight:true,
		    //animateOut: 'slideOutDown',
    		//animateIn: 'flipInX',
		    navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
		});
	}catch(e){

	}
	try{
		$(".aione-carousel").owlCarousel({
			
		    items:3,
		    loop:true,
		    autoplay:true,
		    autoplayTimeout:2000,
		    autoplayHoverPause:true,
		    nav:true,
		    navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
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
		    console.log("Copied '" + e.text + "' to clipboard");
		    e.clearSelection();
		});
	}catch(e){

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
	/*  Hide Form Fields with conditions
	/*****************************************************/
	$('.field-wrapper').each(function(e){
		if($(this).attr('data-conditions') == 1){
			$(this).hide();
		}
	});


	/*****************************************************
	/*  Show Form Fields when conditions are true
	/*****************************************************/
	try{
		$('.aione-form-wrapper').click(function(e){
			var conditions = JSON.parse($(this).find('.form_conditions').val());
			var form_id = $(this).attr('id');
			$('#'+form_id+' .field-wrapper').each(function(ev){
				
				if($(this).attr('data-conditions') == 1){
					var field_id = $(this).attr('id').replace("field_","");
					var field_type = $(this).attr('data-field-type');
					var field_conditions = conditions[field_id]['field_conditions'];

					var show = [];

					$(field_conditions).each(function(index, value){
						var field_elem = $('#field_'+value.condition_column);

						switch(field_elem.attr('data-field-type')){
							case'checkbox':
							case'switch':
								if(field_elem.find('input').is(':checked')){
									show.push('true');
								}else{
									show.push('false');
								}
							break;

							case'text':
								var condition = '"'+field_elem.find('input').val()+'" '+value.condition_operator+' "'+value.condition_value+'"';
								if(eval(condition)){
									show.push('true');
								}else{
									show.push('false');
								}
							break;
							case'radio':
								var condition = '"'+field_elem.find('input:checked').val()+'" '+value.condition_operator+' "'+value.condition_value+'"';
								if(eval(condition)){
									show.push('true');
								}else{
									show.push('false');
								}
							break;

							case'select':
								var condition = '"'+field_elem.find('select').val()+'" '+value.condition_operator+' "'+value.condition_value+'"';
								//console.log(condition);
								if(eval(condition)){
									show.push('true');
								}else{
									show.push('false');
								}
							break;
						}
					});
					if($.inArray('false',show) !== -1){
						$(this).hide();
					}else{
						$(this).show();
					}

					/*console.log("=== FIELD Conditions");
					console.log(field_conditions);
					console.log("===================");*/

				}
			});
		});
	}catch(e){

	}

	/*****************************************************
	/*  On Start Show Form Fields where conditions are true
	/*****************************************************/
	$('.aione-form-wrapper').click();




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
	/*  Aione tabs
	/*****************************************************/

	$('.aione-tabs-wrapper .aione-tabs > .aione-tab > a').click(function(e){
		e.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
		var selected_tab = $(this).attr('href');
		$(selected_tab).addClass('active').siblings().removeClass('active');
	})

	/*****************************************************
	/*  Aione FORM Section Accordion
	/*****************************************************/

	$('.aione-accordion .aione-form-section-header').click(function(e){
		e.preventDefault();
		$(this).parent().parent().toggleClass('active').siblings().removeClass('active');
	})
	/*****************************************************
	/*  Aione FORM Section Collapsible
	/*****************************************************/

	$('.aione-collapsible .aione-form-section-header').click(function(e){
		e.preventDefault();
		$(this).parent().parent().toggleClass('active'); 
	})
	/*****************************************************
	/*  Aione FORM Section Tabs
	/*****************************************************/

	$('.aione-tabs-horizontal .aione-form-section-header').click(function(e){
		e.preventDefault();
		$(this).parent().parent().toggleClass('active').siblings().removeClass('active'); 
	})
	$('.aione-tabs-vertical .aione-form-section-header').click(function(e){
		e.preventDefault();
		$(this).parent().parent().toggleClass('active').siblings().removeClass('active'); 
	})

	/*****************************************************
	/*  Aione Form Validations
	/*****************************************************/
	try{
		$.validate();
	}catch(e){

	}

	/*****************************************************
	/*  Aione Form Selct 2
	/*****************************************************/
	/*
	$('.non-repeater .field-type-multi_select select').select2({
	  theme: "aione",
	  width: '100%'
	});
	*/
	$('.non-repeater .field-type-multi_select select option[value=""]').remove();

	$('.aione-form-multiselect-all').click(function(e){
		e.preventDefault();
		$(this).parent().parent().find('select > option').prop("selected","selected");
    	$(this).parent().parent().find('select').trigger("change");;
	})
	$('.aione-form-multiselect-none').click(function(e){
		e.preventDefault();
		$(this).parent().parent().find('select > option').prop("selected",false);
    	$(this).parent().parent().find('select').trigger("change");;
	})

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
	/*  Aione Form Validations
	/*****************************************************/
	/*
	$(".dashboard-widgets .aione-widgets").gridster({
		widget_selector: "div",
		widget_margins: [10, 10],
		widget_base_dimensions: [140, 140],
		extra_rows: 0,
		extra_cols: 0,
		max_cols: null,
		min_cols: 1,
		min_rows: 1,
		autogenerate_stylesheet: true,
		avoid_overlapped_widgets: true

		
		serialize_params: function($w, wgd){},
		draggable.start: function(event, ui){},
		draggable.drag: function(event, ui){},
		draggable.stop: function(event, ui){},
		resize.enabled: false,
		resize.axes: ['both'],
		resize.handle_class: 'gs-resize-handle',
		resize.handle_append_to: '',
		resize.max_size: [Infinity, Infinity],
		resize.start: function(e, ui, $widget) {},
		resize.resize: function(e, ui, $widget) {},
		resize.stop: function(e, ui, $widget) {},
		collision.on_overlap_start: function(collider_data) { },
		collision.on_overlap: function(collider_data) { },
		collision.on_overlap_stop: function(collider_data) { },
		

	});
	*/
	
	/*****************************************************
	/*  Materialize Date Picker
	/*****************************************************/
	try{
		$('.timepicker').pickatime({
			default: 'now', // Set default time
			fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
			twelvehour: false, // Use AM/PM or 24-hour format
			donetext: 'OK', // text for done-button
			cleartext: 'Clear', // text for clear-button
			canceltext: 'Cancel', // Text for cancel-button
			autoclose: false, // automatic close timepicker
			ampmclickable: true, // make AM PM clickable
			aftershow: function(){} //Function for after opening timepicker  
		});
	}catch(e){

	}
	

	/*****************************************************
	/*  Materialize Date Picker
	/*****************************************************/
	try{
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15 // Creates a dropdown of 15 years to control year
		});
	}catch(e){

	}
	

	/*****************************************************
	/*  Code Ediror
	/*****************************************************/

	var editors = new Array();

    $(".field.field-type-code > textarea").each(function() {
        editors.push($(this).attr("id"));
    });

    $.each(editors, function( index, value ) {
    	try{
			var editor_wrappper_id = value+'_editor';
			var theme = $('#'+editor_wrappper_id).attr("data-theme");
			var mode = $('#'+editor_wrappper_id).attr("data-mode");

			if(theme == '' || theme == undefined ){
				theme= "ace/theme/monokai";
			} else {
				theme= "ace/theme/"+theme;
			}

			if(mode == '' || mode == undefined ){
				mode= "ace/mode/html";
			} else {
				mode= "ace/mode/"+mode;
			}
			//console.log(" theme = "+theme+" mode = "+mode+" index = "+index + " value = " + value );
			//require.config({paths: { "ace" : "../lib/ace"}});
			//
			try{
				require("ace/ext/emmet");
			}catch(e){

			}
			
			
			var editor = ace.edit(editor_wrappper_id);
			editor.setValue($('#'+value).val()); 
			editor.setTheme(theme);
			editor.getSession().setMode(mode);
			editor.setAutoScrollEditorIntoView(true);
			editor.setShowPrintMargin(false);
			editor.setOption("enableEmmet", true); 
			editor.setOption('enableBasicAutocompletion',true);
			editor.setAutoScrollEditorIntoView(true);
			editor.getSession().on("change", function () {
				$('#'+value).val(editor.getSession().getValue());
			});
		
		}catch(e){

		}
		
	});

	/*****************************************************
	/*  Editor Full Screen
	/*****************************************************/
	

	$('body').on('click','.editor-action-fullscreen',function(e){
		e.preventDefault();
		$(this).parent().parent().toggleClass('fullscreen');
	});


	/*****************************************************
	/*  Color Picker
	/*****************************************************/
	try{
		$(".field-type-color input").spectrum({
		    // color: "#168dc5",
		    flat: false,
		    showInput: true,
		    showInitial: true,
		    allowEmpty: true,
		    showAlpha: true,
		    disabled: false,
		    localStorageKey: "save-color",
		    showPalette: true,
		    showPaletteOnly: false,
		    togglePaletteOnly: true,
		    showSelectionPalette: true,
		    clickoutFiresChange: true,
		    cancelText: "Cancel",
		    chooseText: "Select",
		    togglePaletteMoreText: "more",
		    togglePaletteLessText: "less",
		    containerClassName: "Class1",
		    replacerClassName: "Class2",
		    preferredFormat: "Class3",
		    maxSelectionSize: 5,
		    preferredFormat: "rgb",
		    //selectionPalette: ['#168dc5'],
		    palette: [
						["#ffebee","#ffcdd2","#ef9a9a","#e57373","#ef5350","#f44336","#e53935","#d32f2f","#c62828","#b71c1c"],
						["#fce4ec","#f8bbd0","#f48fb1","#f06292","#ec407a","#e91e63","#d81b60","#c2185b","#ad1457","#880e4f"],
						["#f3e5f5","#e1bee7","#ce93d8","#ba68c8","#ab47bc","#9c27b0","#8e24aa","#7b1fa2","#6a1b9a","#4a148c"],
						["#ede7f6","#d1c4e9","#b39ddb","#9575cd","#7e57c2","#673ab7","#5e35b1","#512da8","#4527a0","#311b92"],
						["#e8eaf6","#c5cae9","#9fa8da","#7986cb","#5c6bc0","#3f51b5","#3949ab","#303f9f","#283593","#1a237e"],
						["#e3f2fd","#bbdefb","#90caf9","#64b5f6","#42a5f5","#2196f3","#1e88e5","#1976d2","#1565c0","#0d47a1"],
						["#e1f5fe","#b3e5fc","#81d4fa","#4fc3f7","#29b6f6","#03a9f4","#039be5","#0288d1","#0277bd","#01579b"],
						["#e0f7fa","#b2ebf2","#80deea","#4dd0e1","#26c6da","#00bcd4","#00acc1","#0097a7","#00838f","#006064"],
						["#e0f2f1","#b2dfdb","#80cbc4","#4db6ac","#26a69a","#009688","#00897b","#00796b","#00695c","#004d40"],
						["#e8f5e9","#c8e6c9","#a5d6a7","#81c784","#66bb6a","#4caf50","#43a047","#388e3c","#2e7d32","#1b5e20"],
						["#f1f8e9","#dcedc8","#c5e1a5","#aed581","#9ccc65","#8bc34a","#7cb342","#689f38","#558b2f","#33691e"],
						["#f9fbe7","#f0f4c3","#e6ee9c","#dce775","#d4e157","#cddc39","#c0ca33","#afb42b","#9e9d24","#827717"],
						["#fffde7","#fff9c4","#fff59d","#fff176","#ffee58","#ffeb3b","#fdd835","#fbc02d","#f9a825","#f57f17"],
						["#fff8e1","#ffecb3","#ffe082","#ffd54f","#ffca28","#ffc107","#ffb300","#ffa000","#ff8f00","#ff6f00"],
						["#fff3e0","#ffe0b2","#ffcc80","#ffb74d","#ffa726","#ff9800","#fb8c00","#f57c00","#ef6c00","#e65100"],
						["#fbe9e7","#ffccbc","#ffab91","#ff8a65","#ff7043","#ff5722","#f4511e","#e64a19","#d84315","#bf360c"],
						["#efebe9","#d7ccc8","#bcaaa4","#a1887f","#8d6e63","#795548","#6d4c41","#5d4037","#4e342e","#3e2723"],
						["#fafafa","#f5f5f5","#eeeeee","#e0e0e0","#bdbdbd","#9e9e9e","#757575","#616161","#424242","#212121"], 
						["#eceff1","#cfd8dc","#b0bec5","#90a4ae","#78909c","#607d8b","#546e7a","#455a64","#37474f","#263238"], 
		        ]
		});
	}catch(e){

	}
});