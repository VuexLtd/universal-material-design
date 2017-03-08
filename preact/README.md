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
There is very limited theming support right now,
and the situation will improve as this module develops.

For now, you should be able to override the sass variables before importing the styles.

E.g.
```scss
$umd-color-primary: #FF5722;

@import '~@material-design/preact/styles';
```
