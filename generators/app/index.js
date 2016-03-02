'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var askName = require('inquirer-npm-name');
var yosay = require('yosay');
var _ = require('lodash');

function makeLibraryName(name) {
  name = _.kebabCase(name);
  name = name.indexOf('generator-') === 0 ? name : 'generator-' + name;
  return name;
}

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super-excellent ' + chalk.red('generator-avenue') + ' generator!'
    ));

    askName({
      name: 'name',
      message: 'Your lib name',
      default: makeLibraryName(path.basename(process.cwd())),
      filter: makeLibraryName,
      validate: function (str) {
        return str.length > 0;
      }
    }, this, function (name) {
      this.props.name = name;
      done();
    }.bind(this));

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    webpack: function () {
      this.fs.copy(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js')
      );
    },
    indexJs: function () {
      this.fs.copy(
        this.templatePath('index.js'),
        this.destinationPath('src/index.js')
      );
    },
  },

  install: function () {
    this.installDependencies();
  }
});
