var args = arguments[0] || {};

if (OS_ANDROID) {
	
	exports.applyProperties = function (properties) {
		properties = _.omit(properties, 'id', '__parentSymbol', '__itemTemplate', '$model');
		
		if (properties.textid) { // https://jira.appcelerator.org/browse/TC-2363
			properties.text = L(properties.textid);
			delete properties.textid;
		}
		
		if (properties.shadowColor) {
		    var shadowColor = properties.shadowColor,
		    	shadowOffset = _.defaults(properties.shadowOffset || {}, {
		        x: 0,
		        y: -1
		  	});
		  	
		    delete properties.shadowOffset;
		    delete properties.shadowColor;
		    
		    $.outer.applyProperties(_.extend({}, properties, {
		    	color: shadowColor
		    }));
		    
		    $.inner.applyProperties(_.extend({}, properties, {
		    	top: -shadowOffset.y,
		    	left: -shadowOffset.x
		    }));
		    
		} else {
			$.outer.remove($.inner);
			$.inner = null;
			
			$.outer.applyProperties(properties);
		}
	    
	    return;
	};
	
	exports.setText = function (text) {
		$.outer.text = text;
		$.inner.text = text;
	};
	
	exports.getText = $.inner.getText;
	
	exports.animate = function (_args, _callback) {
		$.outer.animate(_args);
		$.inner.animate(_args, _callback);
	};
	
} else {
	exports.applyProperties = function (properties) {
		properties = _.omit(properties, 'id', '__parentSymbol', '__itemTemplate', '$model');
		
		if (properties.textid) { // https://jira.appcelerator.org/browse/TC-2363
			properties.text = L(properties.textid);
			delete properties.textid;
		}
		
		$.outer.applyProperties(properties);
		
		return;
	};
	
	exports.setText = $.outer.setText;
	exports.getText = $.outer.getText;
	
	exports.animate = $.outer.animate;
}

Object.defineProperty($, "text", {
    get: exports.getText,
    set: exports.setText
});

Object.defineProperty($, "color", {
    get: OS_ANDROID ? $.inner.getColor : $.outer.getColor,
    set: OS_ANDROID ? $.inner.setColor : $.outer.setColor
});

exports.applyProperties(args);