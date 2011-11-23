// general functionality

jQuery(function($){
	
//textarea and input clear default text on focus	
	$("textarea, input").focus(function() {
    	if (this.value == this.defaultValue){ this.value = ''; }
	});

	$("textarea, input").blur(function() {
    	if ($.trim(this.value) == ''){ this.value = (this.defaultValue ? this.defaultValue : ''); }
	});
	
//form elements add/remove focus class
	$("textarea, input, select").focus(function(){
		$(this).addClass("focus");
	});
	$("textarea, input, select").blur(function(){
		$(this).removeClass("focus");
	});
	

	$("input:not(#tags_submit), textarea, select, button").uniform();
		
	$(".panel").click(function(){ $(".panel").css({"z-index":"10000 !important"});	$(this).css({"z-index":"10001 !important"}); });
			
	$( ".draggable" ).draggable({ handle: ".panel_content", containment: "body", scroll: false});
	
	$("#tags_input").hover(function(){
		$(this).stop().animate({color:"#626262"},1000);
	},
	function(){
		$(this).stop().animate({color:"#c8c8c8"},300);
	});
	
	
	$(".menu li").hover(function(){
		$(this).stop().animate({"background-color":"#53b8ff", "color":"#d5edff"},300);
	},
	function(){
		$(this).stop().animate({"background-color":"#389eff", "color":"#fff"},300);
	});
	
	
//toggle panels	
	$(".panel_close").click(function(){	$(this).parents(".panel").hide().removeClass("first second").addClass("hidden").removeClass("active"); });
	
	$(".menu li").click(function(){
		
		var target = $(this).attr("class");		
		if(!$("#" + target).hasClass("hidden")){
			$("#" + target).removeClass("first second");	
		} else {
			var hidden = $(".panel.hidden").length;	
			/*
			if(active == 1){
				if($(".panel.active").hasClass("first")){ $("#" + target).addClass("second"); } else {$("#" + target).addClass("first");} 
				} else if( active == 2) {
					$("#" + target).addClass("first");
					}*/
			
			
			switch (hidden) {
				case 1: if($(".panel.active").hasClass("first")){ $("#" + target).addClass("second");break; } else {$("#" + target).addClass("first");break;} 
				case 2: $("#" + target).addClass("first"); break;
				default: break;
			}
							
		}	
		$("#" + target).toggleClass("hidden active").toggle();		
	});
		
	
//tag cloud tooltip
	$(".panel .tag_cloud span").each( function(){	
	$(this).hover( function(){		
		if($(this).find($("#cloud_tooltip")).length == 0){				
		var tooltip = $("#cloud_tooltip").get();		
		$("#cloud_tooltip").remove();	
		$(this).append(tooltip).find("#cloud_tooltip").delay(100).fadeTo(150, 1);		
		}
	},
	function(){		
				$(this).find("div#cloud_tooltip").appendTo("body").hide();				
			});	
	});	

//tag cloud remove word	
	$(".remove_word").live("click", function(){	
		var tooltip = $("#cloud_tooltip").get();			
		$(this).parents(".cloud_word").remove();		
		$("body").append(tooltip).find("#cloud_tooltip").hide();		
	});
	
//remove background image

	$(".remove_bg_img .button").click(function(){
		$("body").css({"background-image":"none"});	
	})
	
//background image repeat	
	$("#bg_repeat").change(function(){
		var rep = $(this).val();	
		switch (rep) {
			case "Off": $("body").css({"background-repeat":"no-repeat"}); break;
			case "On": $("body").css({"background-repeat":"repeat"}); break;
			default: break;
		}

	});
	

//font change
	$("#font").change(function(){
		var font = $(this).val();	
		switch (font) {
			case "Arial": $("#cloud").css({"font-family":"Arial, Helvetica, sans-serif"}); break;
			case "Courier New": $("#cloud").css({"font-family":"'Courier New', Courier, monospace"}); break;
			case "Comic Sans MS": $("#cloud").css({"font-family":"'Comic Sans MS', cursive"}); break;
			case "Georgia": $("#cloud").css({"font-family":"Georgia, 'Times New Roman', Times, serif"}); break;
			case "Impact": $("#cloud").css({"font-family":"Impact, Charcoal, sans-serif"}); break;
			case "Lucida Console": $("#cloud").css({"font-family":"'Lucida Console', Monaco, monospace"}); break;
			case "Lucida Sans Unicode": $("#cloud").css({"font-family":"'Lucida Sans Unicode', 'Lucida Grande', sans-serif"}); break;
			case "MS Serif": $("#cloud").css({"font-family":"'MS Serif', 'New York', serif"}); break;
			case "Palatino Linotype": $("#cloud").css({"font-family":"'Palatino Linotype', 'Book Antiqua', Palatino, serif"}); break;
			case "Verdana": $("#cloud").css({"font-family":"Verdana, Geneva, sans-serif"}); break;
			case "Tahoma": $("#cloud").css({"font-family":"Tahoma, Geneva, sans-serif"}); break;
			case "Times New Roman": $("#cloud").css({"font-family":"'Times New Roman', Times, serif"}); break;
			case "Trebuchet": $("#cloud").css({"font-family":"'Trebuchet MS', Arial, Helvetica, sans-serif"}); break;
			default: break;
		}

	});
	
	
// font size slider 

		$( "#font_slider" ).slider({
			value:0, min: -2, max: 2, step: 1,
			slide: function( event, ui ) {
				var font = ui.value;
				switch (font) {
					case -2: $("#cloud").css({"font-size":"10px"}); break;
					case -1: $("#cloud").css({"font-size":"11px"}); break;
					case 0: $("#cloud").css({"font-size":"12px"}); break;
					case 1: $("#cloud").css({"font-size":"13px"}); break;
					case 2: $("#cloud").css({"font-size":"14px"}); break;
					default: break;
				}
			}
		});
		
	
	
	
// randomly append a new word in the cloud

/*
$(function(){
	
    $("#getit").click(function() {
    
        var numLow = $("#lownumber").val();
        var numHigh = $("#highnumber").val();
        
        var adjustedHigh = (parseFloat(numHigh) - parseFloat(numLow)) + 1;
        
        var numRand = Math.floor(Math.random()*adjustedHigh) + parseFloat(numLow);
        
        if ((IsNumeric(numLow)) && (IsNumeric(numHigh)) && (parseFloat(numLow) <= parseFloat(numHigh)) && (numLow != '') && (numHigh != '')) {
            $("#randomnumber").text(numRand);
        } else {
            $("#randomnumber").text("Careful now...");
        }
        
        return false;
    });
    
    $("input[type=text]").each(function(){
        $(this).data("first-click", true);
    });
    
    $("input[type=text]").focus(function(){
       
        if ($(this).data("first-click")) {
            $(this).val("");
            $(this).data("first-click", false);
            $(this).css("color", "black");
        }
        
    });
	
});
	
*/
	
		

// organic tabs	
	
    $.organicTabs = function(el, options) {    
        var base = this;
        base.$el = $(el);
        base.$nav = base.$el.find(".nav");
                
        base.init = function() {        
            base.options = $.extend({},$.organicTabs.defaultOptions, options);            
             $(".tab_content.hidden").css({  "position": "relative", "top": 0, "left": 0, "display": "none" });          
            base.$nav.delegate("li > a", "click", function() {            
                var curList = base.$el.find("li.current a").attr("href").substring(1),                
                    $newList = $(this).parent(),                    
                    listID = $newList.find("a").attr("href").substring(1),
                    $allListWrap = base.$el.find(".list-wrap"),
                    curListHeight = $allListWrap.height();
                $allListWrap.height(curListHeight);
                                        
                if ((listID != curList) && ( base.$el.find(":animated").length == 0)) {
                    base.$el.find("#"+curList).fadeOut(base.options.speed, function() {
                        base.$el.find("#"+listID).fadeIn(base.options.speed);
                        var newHeight = base.$el.find("#"+listID).height();
                        $allListWrap.animate({height: newHeight });
                        base.$el.find(".nav li").removeClass("current");
                        $newList.addClass("current");                            
                    });                    
                }   
                return false;
            });            
        };
        base.init();
    };
    
    $.organicTabs.defaultOptions = {
        "speed": 200
    };
    
    $.fn.organicTabs = function(options) {
        return this.each(function() {
            (new $.organicTabs(this, options));
        });
    };
	

	$(".tabs").organicTabs();
	

	

}); //end jQuery