(function($) {

	var widget_count = 0;
	
	// This HTML will be used to dynamically add "widgets" to the page
	var widget_html = '<div data-widget-test/>';


	// This is a widget definition. The first argument is the widget name,
	// which is matched with data-attributes. This example, "widget.test"
	// matches elements with a data-widget-test attribute. It doesn't matter if
	// the attribute has a value or not.
	// The second argument is a callback function which is called for every
	// matched element. The $elt argument contains a jQuery object with the
	// matched element.
	$.instawidget('widget.test', function($elt) {
		widget_count++;
		var s = 'I am widget ' + widget_count;

		// You can do anything you want with $elt in here to initialize the
		// widget.

		// You can add elements,
		$elt.html('<h3>' + s + '. Click me.</h3>');

		// change styles,
		$elt.css({background:'green'});

		// add event handers, etc.
		$elt.on('click', function() {
			alert(s);
		});
	});


	// These functions are used to dynamically add new widgets to the page
	function applyMethodToTarget(method) {
		var $target = $('#' + method + '-target');
		$target[method](widget_html);
		$target.parent().data('method', method);
	}


	function applyTargetToMethod(method) {
		var $target = $('#' + method + '-target');
		$(widget_html)[method]($target);
		$target.parent().data('method', method);
	}


	$('h2').on('click', function() {
		var method = $(this).parent().data('method');
		if (method) {
			if (method.indexOf('insert') === 0) {
				applyTargetToMethod(method);
			} else {
				applyMethodToTarget(method);
			}
		}
	});


	// Tests for $(target).methodName(subject);
	$.each(['after', 'before', 'append', 'html', 'prepend'], function(i, method) {
		applyMethodToTarget(method);
	});


	// Tests for $(subject).methodName(target);
	$.each(['insertBefore', 'insertAfter'], function(i, method) {
		applyTargetToMethod(method);
	});


})(jQuery);
