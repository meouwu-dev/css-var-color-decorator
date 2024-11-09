# css-var-color-decorator README

## **View and edit css variables with color decorators (HSL and HSLA only)**

## Usages

### `add color decorator to css variable`
<!-- ![color decorator](https://raw.githubusercontent.com/meouwu-dev/css-var-color-decorator/master/assets/feature-color-decorator.gif) -->
<img 
  alt="color decorator"
  src="https://raw.githubusercontent.com/meouwu-dev/css-var-color-decorator/master/assets/feature-color-decorator.gif"
  width="640"
 />

### `convert hex to hsl`
<!-- ![hex2Hsl](https://raw.githubusercontent.com/meouwu-dev/css-var-color-decorator/master/assets/feature-hex2hsl.gif) -->
<img
  alt="hex2Hsl"
  src="https://raw.githubusercontent.com/meouwu-dev/css-var-color-decorator/master/assets/feature-hex2hsl.gif"
  width="640"
/>


## Features

When using tailwindcss css variables, 
we must exclude the color space function or opacity modifiers won't work 
[(ref)](https://tailwindcss.com/docs/customizing-colors#using-css-variables). 
However, this makes it difficult to see what color a variable is set to. 

- This extension adds color decorators to those variables, so you can see and edit them easily.

- Convert hex to hsl with command `color.hex2Hsl`

# Settings

### `cssVarColorDecorator.supportedLanguages`

Use this setting to add support for other languages. Default value is `["css", "scss", "tailwindcss"]`

Example: 

#### add support for html
```json
"cssVarColorDecorator.supportedLanguages": ["css", "scss", "tailwindcss", "html"]
```

## Limitations

- only works with HSL and HSLA (need to figure out how to find the format of the variable, and covert it back after picking a color in the decorator)

## TODO

[ ] add support for other color formats

## Extension Settings

TODO

## Known Issues


## Release Notes

### 1.0.0

Initial release

added color decorator to css variables

### 1.1.0

added command `color.hex2Hsl`

### 1.2.0

added configuration `cssVarColorDecorator.supportedLanguages`

### 1.3.0

added color previews for colors written with commas
(
[#4](https://github.com/meouwu-dev/css-var-color-decorator/pull/4) 
by [SergeyBazhanov](https://github.com/SergeyBazhanov))

---

**Enjoy!**
