/* Horoscop Widget Javascript Class */

jQuery(document).ready(function(){
	var widget = jQuery('.horoscope_feeder_reader');
	var widgetpanel = jQuery('#horoscopul-zilnic-widget');
	var widgetfootercolor = null;
	if(widgetpanel) {
		widgettitle = jQuery('.widget-title');
		widgettitle.each(function(){
			color = jQuery(this).css('color');
			if(typeof color != "undefined") {
				widgetfootercolor = color;
			}
		});
		widgetpanel.append("<span style='color:"+widgetfootercolor+"!important;'><a style='color:"+widgetfootercolor+"!important; font-weight:bolder!important; text-decoration:none!important;' href='http://www.horoscop.ro/'>Horoscopul zilnic</a> oferit de <a style='color:"+widgetfootercolor+"!important; text-decoration:none!important;' href='http://www.horoscop.ro/'>horoscop</a>.ro</span>");
	}
	if(widget) {
		widget.find('.horoscope-reader-wrap').hide();
		widget.find('.horoscope-reader-wrap:first').show();
		
		jQuery('.horoscope-reader-vticker').each(function(){
			var visible = jQuery(this).attr('data-visible');
			var interval = jQuery(this).attr('data-speed');
			var obj = jQuery(this);
			obj.easyTicker({
				'visible': visible,
				'interval': interval
			});
		});
	}
});

/* 
 * jQuery - Easy Ticker plugin - v1.0
 * http://www.aakashweb.com/
 * Copyright 2012, Aakash Chakravarthy
 * Released under the MIT License.
 */

(function($){
	$.fn.easyTicker = function(options) {
	
	var defaults = {
		direction: 'up',
   		easing: 'swing',
		speed: 'slow',
		interval: 2000,
		height: 'auto',
		visible: 0,
		mousePause: 1,
		controls:{
			up: '',
			down: '',
			toggle: ''
		}
	};
	
	var options = $.extend(defaults, options), 
		timer = 0,
		tClass = 'et-run',
		winFocus = 0,
		vBody = $('body'),
		cUp = $(options.controls.up),
		cDown = $(options.controls.down),
		cToggle = $(options.controls.toggle);
	
	var init = function(obj, target){
		
		target.children().css('margin', 0).children().css('margin-top', 3);
		
		obj.css({
			position : 'relative',
			height : (options.height == 'auto') ? objHeight(obj, target) : options.height,
			overflow : 'hidden'
		});
		
		target.css({
			'position' : 'absolute',
			'margin' : 0
		}).children().css('margin', 0);
		
		if(options.visible != 0 && options.height == 'auto'){
			adjHeight(obj, target);
		}

		// Set the class to the "toggle" control and set the timer.
		cToggle.addClass(tClass);
		setTimer(obj, target);
	}
	
	var move = function(obj, target, type){
		
		if(!obj.is(':visible')) return;
		
		if(type == 'up'){
			var sel = ':first-child',
				eq = '-=',
				appType = 'appendTo';
		}else{
			var sel = ':last-child',
				eq = '+=',
				appType = 'prependTo';
		}
	
		var selChild = $(target).children(sel);
		var height = selChild.outerHeight();
	
		$(target).stop(true, true).animate({
			'top': eq + height + "px"
		}, options.speed, options.easing, function(){
			selChild.hide()[appType](target).fadeIn();
			$(target).css('top', 0);
			if(options.visible != 0 && options.height == 'auto'){
				adjHeight(obj, target);
			}
		});
	}
	
	var setTimer = function(obj, target){
		if(cToggle.length == 0 || cToggle.hasClass(tClass)){
			timer = setInterval(function(){
				if (vBody.attr('data-focus') != 1){ return; }
				move(obj, target, options.direction);
			}, options.interval);
		}
	}
	
	var stopTimer = function(obj){
		clearInterval(timer);
	}
	
	var adjHeight = function(obj, target){
		var wrapHeight = 0;
		$(target).children(':lt(' + options.visible + ')').each(function(){
			wrapHeight += $(this).outerHeight();
		});
		
		obj.stop(true, true).animate({height: wrapHeight}, options.speed);
	}
	
	var objHeight = function(obj, target){
		var height = 0;
		
		var tempDisp = obj.css('display');
		obj.css('display', 'block');
				
		$(target).children().each(function(){
			height += $(this).outerHeight();
		});
		
		obj.css('display', tempDisp);
		return height;
	}
	
	function onBlur(){ vBody.attr('data-focus', 0); };
	function onFocus(){ vBody.attr('data-focus', 1); };
	
	if (/*@cc_on!@*/false) { // check for Internet Explorer
		document.onfocusin = onFocus;
		document.onfocusout = onBlur;
	}else{
		$(window).bind('focus mouseover', onFocus);
		$(window).bind('blur', onBlur);
	}

	return this.each(function(){
		var obj = $(this);
		var tar = obj.children(':first-child');
		
		init(obj, tar);
		
		if(options.mousePause == 1){
			obj.mouseover(function(){
				stopTimer(obj);
			}).mouseleave(function(){
				setTimer(obj, tar);
			});
		}
		
		cToggle.live('click', function(){
			if($(this).hasClass(tClass)){
				stopTimer(obj);
				$(this).removeClass(tClass);
			}else{
				$(this).addClass(tClass);
				setTimer(obj, tar);
			}
		});
		
		cUp.live('click', function(){
			move(obj, tar, 'up');
		});
		
		cDown.live('click', function(){
			move(obj, tar, 'down');
		});
		
	});
};
})(jQuery);