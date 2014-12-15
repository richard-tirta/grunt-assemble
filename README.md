# Grunt Assemble Boilerplate

This is a boilerplate framework using Grunt and Assemble. [Assemble](http://assemble.io/) is a static site generator featuring templates, partials and localization (i18n). Can be customized using Handlebars helpers.

### Prerequisites

- [Node](http://nodejs.org/download/)
- [Grunt](http://gruntjs.com/getting-started)

### Stacks

- Assemble
- Sass
- Autoprefixer
- cssmin
- concat
- uglify
- copy
- imagemin
- svgmin

### Running localhost

```
$ grunt server
```

### Making build

```
$ grunt
```

### Localization (i18n)
Assemble allow to do localization and provides the copy in each language YAML file.

##### To edit list of supported languages

Go to Gruntfile.js and edit array variable ```locales = ['en']```.

For each language, add a folder with the exact language variable name under ```src/locales``` and inside the directory put exactly ```data.yml``` to repesent the language.