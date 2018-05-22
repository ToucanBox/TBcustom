# TBcustom

A customisable colouring sheet for home printing. [See create.toucanbox.com](https://create.toucanbox.com)


## Build

All Jekyll config in `_config.yml`

#### js

Build and compress js app for production `npm run buildc`
Watch js modules for changes `npm run dev`

#### css

Build main.css for production `gulp css`
Watch scss modules for changes `gulp`
gulp watch is editing the main.css file in `_site` directly, getting around the slow Jekyll watch
(watch out for clobbering of your css changes when you edit a file watched by Jekyll, save any scss module again to override with latest changes)

#### html

Build html files and assets for production `bundle exec jekyll build`
(build production js and css, as above, first)
Watch html files for changes `bundle exec jekyll serve`

## Deploy

Unfortunately Github pages doesn't support the translation plugin, so deployment is a bit convoluted. After making a build with latest changes follow these steps to push to the serving branch:

1. cd `_site`
2. `touch .nojekyll`, this file tells gh-pages that there is no need to build
3. `git init` init the repository
4. `git remote add origin https://github.com/ToucanBox/TBcustom.git`
5. `git checkout -b gh-pages`
6. `git add -A`
7. `git commit -m "jekyll deploy"` commit your site code
8. `git push origin gh-pages`

Jekyll build will overwrite the `_site` directory on each build so you need to do these steps on each deploy :/

## Translations

Translation files in `_i18n` directory
