(function($) {

	$.instawidget('widget.pub', function($elt) {
	});


	$.instawidget('widget.sub', function($elt) {
		$elt.on('update', function(e, data) {
			$elt.text('new value: ' + data.$publisher.val());
		});

		$elt.on('update2', function(e, data) {
			$elt.text('yeah');
		});
	});

})(jQuery);

