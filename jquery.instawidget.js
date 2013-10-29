(function($, undefined) {

	var _widget_setup = {};
	var _counter = 0;
	var _original_html = [];
	var $doc = $(document);


	/*
		jQuery.instawidget(name, callback) calls callback() for every element on the page
		that has name as a data-attribute. The convention is like this:
		<div data-my-widget-name> ---> $.instawidget('my.widget.name', function() {});

		This only has to be called once. It will then be called for every matching element,
		even elements that are added dynamically.
	*/
	$.instawidget = function(name, callback) {
		var identifier = 'instawidget' + (_counter++);
		var parts = name.split('.').join('-');
		var selector = '[data-' + parts + '], [' + parts + ']';

		function setup() {
			var $elt = $(this);

			// Don't re-initialize widgets
			if ($elt.data(identifier)) {
				return;
			}
			$elt.data(identifier, true);

			var options = {};

			// Find option overrides on element and ancestors
			var $parents = $elt.parents().addBack();
			$parents.each(function(index, item) {
				var $parent = $(item);
				var overrides = $parent.data(parts + '-overrides') || {};
				$.each(overrides, function(name, value) {
					options[name] = value;
				});
			});

			// merge option overrides with JSON object in data-* attribute
			var data = $elt.data(parts);
			if ($.isPlainObject(data)) {
				options = $.extend(options, data);
			}

			// initialize
			var original_html = $elt[0].outerHTML;
			var $root = callback($elt, options, data) || $elt;
			$root.addClass('instawidget-root');
		}

		_widget_setup[selector] = setup;
	};


	/*
		jQuery(selector).instawidget(name, options) will set configuration options
		for all elements matching selector.
	*/
	$.fn.instawidget = function(name, overrides) {
		var parts = name.split('.').join('-');
		this.data(parts + '-overrides', overrides);
		return this;
	};


	function rescan($added) {
		$.each(_widget_setup, function(selector, setup) {
			$added.filter(selector).each(setup);
			$added.find(selector).each(setup);
		});
	}


	var old_before = $.fn.before;
	$.fn.before = function() {
		var result = old_before.apply(this, arguments);
		rescan(this.prevAll());
		return result;
	};


	var old_after = $.fn.after;
	$.fn.after = function() {
		var result = old_after.apply(this, arguments);
		rescan(this.nextAll());
		return result;
	};


	$.each(['append', 'prepend', 'html'], function(i, method) {
		var oldMethod = $.fn[method];
		$.fn[method] = function() {
			var result = oldMethod.apply(this, arguments);
			rescan(this);
			return result;
		};
	});


	$(function() {
		rescan($doc);
	});

})(jQuery);
