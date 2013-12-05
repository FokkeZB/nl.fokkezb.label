var args = arguments[0] || {},
    props = ['font', 'text', 'ellipsize', 'html', 'textAlign', 'verticalAlign', 'textId', 'wordWrap', 'color', 'autoLink', 'touchEnabled'];

applyProperties(args);

function applyProperties(properties) {
    properties = _.omit(properties, 'id', '__parentSymbol', '__itemTemplate', '$model');

    if (properties.textid) { // https://jira.appcelerator.org/browse/TC-2363
        properties.text = L(properties.textid);
        delete properties.textid;
    }

    var labelProperties;

    if (OS_ANDROID || OS_BLACKBERRY) {
        var wrapperProperties = _.omit(properties, _.omit(props, 'touchEnabled'));
        labelProperties = _.pick(properties, props);
        var shadowProperties = _.omit(labelProperties, 'color', 'autoLink');

        // Normally, if left+right is given, we want the view to fill
        if (properties.left && properties.right && !properties.width) {
            wrapperProperties.width = Ti.UI.FILL;

            // We cannot but set these to fill as well or the shadow will not align
            labelProperties.width = Ti.UI.FILL;
            shadowProperties.width = Ti.UI.FILL;
        }

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
    get: function () {
        return $.label.color;
    },
    set: function (color) {
        $.label.setColor(color);
    }
});