const nunjucks = require("nunjucks");
const faviconsPlugin = require("eleventy-plugin-gen-favicons");

module.exports = function(eleventyConfig) {
    let nunjucksEnvironment = new nunjucks.Environment(
        new nunjucks.FileSystemLoader([
            "src/_includes",
            "src/themes/romanolab-retro/_includes"
        ])
    );
    
    // Nunjucks as templating engine
    eleventyConfig.setLibrary("njk", nunjucksEnvironment);

    // Passthrough copy for static assets
    eleventyConfig.addPassthroughCopy("src/assets");

    // Watch targets for SCSS/CSS changes (include the theme's CSS)
    eleventyConfig.addWatchTarget("src/assets/css");

    // Custom collections
    // eleventyConfig.addCollection("posts", function(collectionApi) {
    //     return collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
    // });

    eleventyConfig.addPlugin(faviconsPlugin, {
        'outputDir': 'docs'
    });

    // Eleventy configuration
    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
        templateFormats: ["njk", "md", "html"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        passthroughFileCopy: true
    };
};
