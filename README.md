# Model Viewer for [md-docs](https://github.com/synionnl/md-docs-cli)

HTML5 web component which renders every JSON-schema object into a human-readable and -understandable form.

## Installation

`npm install --save @synion/model-viewer`

## Usage

- Add `model-viewer.js` to the webpage
- Add the model JSON to the global object `window.modelViewer `.
- Add the `<model-viewer></model-viewer>` to the page

## Attributes

### id

The id attribute identifies the property within the `window.modelViewer`. 

### title

The title attribute is a human-readable title fallback. Only used when the model doesn't provide a title.

### data-json

An html escaped version of the JSON-schema model.

### model

The json-schema model, must be set via JavaScript.

## Examples

### HTMl

```html
<model-viewer 
    id="trainset"
    title="a title"
    data-json="{ &quot;key &quot;: &quot;value &quot; }" />
```

### HTML and JavaScript

```html
<model-viewer 
    id="trainset"
    title="a title"
    data-json="{ &quot;key &quot;: &quot;value &quot; }" />

<script>
	document.getElementById('trainset').model = {
    	...
    }
<script>
```