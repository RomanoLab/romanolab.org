const nunjucks = require("nunjucks");

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
    eleventyConfig.addPassthroughCopy("src/themes/romanolab-retro/assets")

    // Watch targets for SCSS/CSS changes (include the theme's CSS)
    eleventyConfig.addWatchTarget("src/assets/css");
    eleventyConfig.addWatchTarget("src/themes/romanolab-retro/assets/css");

    // Custom collections
    // eleventyConfig.addCollection("posts", function(collectionApi) {
    //     return collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
    // });

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
        markdownTemplateEngine: "njk"
    };
};
