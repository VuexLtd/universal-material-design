# Preact Material Design
A set of UI components that follow the [Material Design Guidelines](https://material.io/guidelines/)

## Install
```sh
yarn add @material-design/preact
```
_or_
```sh
npm i -S @material-design/preact
```

## Usage

(More details coming soon)

### Code
To use any given component, simply import it,
and then use it like any other preact component/
```jsx
import { Button } from '@material-design/preact';

() => <Button>Primary Button</Button>
```

### Styles
You must also include the css for the component which you can do per component,
or simply include the full stylesheet.
```html
<link rel="stylesheet" href="node_modules/@material-design/preact/styles.css">
```

If using sass, you can import the sass directly from the src folder.
```scss
@import '~@material-design/preact/styles';
```

## Theming

See the [theming guide](https://github.com/VuexLtd/universal-material-design/wiki/Theming)
