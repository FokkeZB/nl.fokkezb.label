var args = arguments[0] || {},
    props = ['font', 'text', 'ellipsize', 'html', 'textAlign', 'verticalAlign', 'textId', 'wordWrap', 'color', 'autoLink'];

applyProperties(args);

function applyProperties(properties) {
    properties = _.omit(properties, 'id', '__parentSymbol', '__itemTemplate', '$model');

    if (properties.textid) { // https://jira.appcelerator.org/browse/TC-2363
        properties.text = L(properties.textid);
        delete properties.textid;
    }

    var labelProperties;

    if (OS_ANDROID || OS_BLACKBERRY) {
        var wrapperProperties = _.omit(properties, props);
        labelProperties = _.pick(properties, props);
        var shadowProperties = _.omit(labelProperties, 'color', 'autoLink');

        if (properties.shadowColor) {
            var shadowOffset = _.defaults(properties.shadowOffset || {}, {
                x: 0,
                y: -1
            });

            shadowProperties.top = shadowOffset.y;
            shadowProperties.left = shadowOffset.x;
            shadowProperties.color = properties.shadowColor;

        } else {
            shadowProperties.visible = false;
        }

        $.wrapper.applyProperties(wrapperProperties);
        $.shadow.applyProperties(shadowProperties);

    } else {
        labelProperties = properties;
    }

    $.label.applyProperties(labelProperties);

    return;
}

if (OS_ANDROID || OS_BLACKBERRY) {

    exports.setText = function(text) {
        $.shadow.text = text;
        $.label.text = text;
    };

    exports.animate = function(_args, _callback) {
        $.shadow.animate(_args);
        $.label.animate(_args, _callback);
    };

} else {
    exports.setText = $.label.setText;
    exports.animate = $.label.animate;
}

exports.applyProperties = applyProperties;
exports.getText = $.label.getText;

Object.defineProperty($, "text", {
    get: exports.getText,
    set: exports.setText
});

Object.defineProperty($, "color", {
    get: $.label.getColor,
    set: $.label.setColor
});