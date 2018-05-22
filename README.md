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

1. `cp CNAME ./_site/` to ensure we have a cname record in the route of the site
2. `cd _site`
3. `touch .nojekyll`, this file tells gh-pages that there is no need to build
4. `git init` init the repository
5. `git remote add origin https://github.com/ToucanBox/TBcustom.git`
6. `git checkout -b gh-pages`
7. `git add .`
8. `git commit -m "jekyll deploy"` commit your site code
9. `git push origin gh-pages`

Jekyll build will overwrite the `_site` directory on each build so you need to do these steps on each deploy :/
You can omit steps 4 - 6 if git is still active in the `_site` directory

## Translations

Translation files in `_i18n` directory
