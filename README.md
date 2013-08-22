# Alloy (Shadow) Label Widget
This is a widget for the [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) MVC framework of [Appcelerator](http://www.appcelerator.com)'s [Titanium](http://www.appcelerator.com/platform) platform.

The widget provides a replacement for `<Label />` to support text shadows on Android & BlackBerry. on iOS and MobileWeb it will return a regular `Ti.UI.Label`. On Android & BlackBerry it will provide an auto-size `Ti.UI.View` wrapping two `Ti.UI.Label`'s. One for the text and another for it's shadow.

## Quick Start
* [Download the latest version](https://github.com/FokkeZB/nl.fokkezb.label/releases) of the widget.
* Unzip the folder to your project under `app/widgets/nl.fokkezb.label`.
* Add the widget as a dependency to your `app/config.json` file:

    ```javascript
    "dependencies": {
    	"nl.fokkezb.label":"1.0.1"
    }
    ```

* Use the widget like you would use a normal `<Label />`.

    **Before:** *Only showing a shadow on iOS and MobileWeb*

    ```xml
    <Alloy>
        <Window>
        	<Label shadowColor="#000" />
        </Window>
    </Alloy>
    ```
    
    **After:** *Showing a shadow on all platforms*


    ```xml
    <Alloy>
        <Window>
        	<Widget src="nl.fokkezb.label" shadowColor="#000" />
        </Window>
    </Alloy>
    ```

## Public properties

* `text`: Set and get the text of the `Label`(s)
* `color`: Set and get the color of the `Label`

## Public methods

* `setText()`/`getText()`: Set and get the text of the `Label`(s)
* `applyProperties()`: Apply properties to the `Label`(s and `View`)
* `animate()`: Animate the `Label` ( or `View`)

## Changelog
* 1.1:
    * Fix for non autosizing labels
    * Fix for callbacks on Android
    * Handling `touchEnabled`
* 1.0: Initial version

## License

<pre>
Copyright 2013 Fokke Zandbergen

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>
