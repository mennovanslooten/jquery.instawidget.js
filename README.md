# jquery.instawidget.js #

*WARNING: EXPERIMENTAL*

This jQuery plugin makes it possible to write self-initializing widgets: widgets that automatically initialize when the page is loaded and when they are added dynamically after the page is done loading. 

This is important so I'll repeat it: you write the widget definition once and you're done. Any widgets that exist in the DOM during load time as well as widgets that are added dynamically through jQuery methods such as `$().html()`, `$().after()`, `$().insertBefore()`, etc will be automatically initialized.

## Example ##

Widgets are identified in the HTML by a `data-*` attribute. This is an example of a minimal widget:

```HTML
<div data-my-widget-name></div>
```

The widget definition is written like this:

```javascript
$.instawidget(
    'my.widget.name',  // This matches data-my-widget-name
    
    function($elt) {   // This function is called once for all elements that match
        /*
        $elt contains a jQuery object with the matching element.
        Here you can do whatever you need with $elt to initialize the widget.
        */
    }
});
```

