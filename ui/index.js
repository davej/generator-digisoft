'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var fs = require('fs');

var DigisoftGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the Digisoft UI component generator!'
    ));

    var digisoftUIPath = [ 'ui', 'digisoft', 'ui'].join('/');
    var parentPackageChoices = fs.readdirSync(digisoftUIPath).filter(function(el) {
      var fullPath = [digisoftUIPath, el].join('/');
      return fs.statSync(fullPath).isDirectory();
    });

    var prompts = [{
      type: 'list',
      name: 'parentPackage',
      message: 'Choose the parent package',
      choices: parentPackageChoices
    }, {
      name: 'componentName',
      message: 'What is the name of your Component? (e.g. `MyComponent`)?'
    }, {
      type: 'confirm',
      name: 'hasHtml',
      message: 'Does this component need a HTML template?',
      default: true
    }, {
      type: 'confirm',
      name: 'hasLess',
      message: 'Does this component need Less styles?',
      default: true
    }, {
      type: 'confirm',
      name: 'hasImages',
      message: 'Does this component need images?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.parentPackage = props.parentPackage;
      this.componentName = props.componentName;

      this.destPath = [   digisoftUIPath,
                          this.parentPackage,
                          this.componentName ].join('/');

      this.has = {
        html: props.hasHtml,
        less: props.hasLess,
        images: props.hasImages
      };

      done();
    }.bind(this));
  },
  writing: {
    createFolders: function () {
      this.dest.mkdir(this.destPath);

      if (this.has.html)   { this.dest.mkdir(this.destPath + '/templates'); }
      if (this.has.less)   { this.dest.mkdir(this.destPath + '/styles'); }
      if (this.has.images) { this.dest.mkdir(this.destPath + '/images'); }
    },

    copyFiles: function() {
      var context = {
        hasHtml: this.hasHtml,
        componentName: this.componentName
      };

      var paths = {
        presenter: [this.destPath, (this.componentName + 'Presenter.js')].join('/'),
        view: [this.destPath, (this.componentName + 'View.js')].join('/'),
        html: [this.destPath, 'templates', (this.componentName + '.html')].join('/'),
        less: [this.destPath, 'styles', (this.componentName + '.less')].join('/')
      };

      this.src.copy('presenter.js', paths.presenter);
      this.template('view.js', paths.view, context);
      if (this.has.html) { this.src.copy('template.html', paths.html); }
      if (this.has.less) { this.template('template.less', paths.less, context); }

    },

    addWiring: function() {
      var mainLessPath = ['ui', 'settingsBase', 'styles', 'main.less'].join('/'),
          mainLessfile = this.readFileAsString(mainLessPath);

      var lessImport = "\n" +
          "@import '../../" + this.destPath.replace('ui/digisoft', 'digisoft') + "/styles/" + this.componentName + "';\n" +
          ".m-ds-" + this.componentName + "(w-" + this.componentName + ");\n";

      this.log('Adding the ' + this.componentName + ' less file import to the main config file.');
      this.log('Appending to this file will cause a conflict, please confirm if this is ok.');
      this.write(mainLessPath, mainLessfile + lessImport);
    }
  },
});

module.exports = DigisoftGenerator;
