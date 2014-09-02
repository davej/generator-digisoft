# generator-digisoft

> [Yeoman](http://yeoman.io) generator for quickly scaffolding out new ui and service components.


## Usage

To install generator-digisoft from npm, run:

```bash
npm install -g generator-digisoft
```

### Scaffold a UI componant

Currently `digisoft-generator` only supports UI components. Make sure you execute this command from the root project directory:

```bash
yo digisoft:ui
```

This will create the view and presenter for the component, it will also optionally create the Less style, HTML template and images directory. It will also import and init the component's Less file inside of the main less file.

Currently, it will not wire up the file using `wire.js`, you will have to do this manually.
