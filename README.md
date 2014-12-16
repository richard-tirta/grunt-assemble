# Grunt Assemble Boilerplate

This is a boilerplate framework using Grunt and Assemble. [Assemble](http://assemble.io/) is a static site generator featuring templates, partials and localization (i18n). Can be customized using Handlebars helpers.

### Prerequisites

- [Node](http://nodejs.org/download/)
- [Grunt](http://gruntjs.com/getting-started)

### Stacks

- [Assemble](http://assemble.io/) (Static Template Engine Generator)
- [Sass](http://sass-lang.com/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- cssmin (Minify CSS)
- concat (Concatenate JS)
- uglify (Minify JS)
- copy
- imagemin (Minify Images)
- svgmin (Minify SVG)
- Express (as production deployment server).

### Running localhost

```
$ grunt server
```

### Making build

```
$ grunt
```

### Production deployment to Heroku
Deployment setup is already included, just follow the documentation below for how to deploy.

[Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)

### Localization (i18n)
Assemble allow to do localization and provides the copy in each language YAML file.

##### To edit list of supported languages

Go to Gruntfile.js and edit array variable ```locales = ['en']```.

For each language, add a folder with the exact language variable name under ```src/locales``` and inside the directory put exactly ```data.yml``` to repesent the language.

Index.html at root level provides redirect to `en` directory by default. Feel free to change/ customize this.