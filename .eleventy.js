const CleanCSS = require("clean-css");
const eleventySass = require("eleventy-sass");

module.exports = function(eleventyConfig) {
    // eleventyConfig.addFilter("cssmin", function(code) {
    //     return new CleanCSS({}).minify(code).styles;
    // })

    eleventyConfig.addPlugin(eleventySass);
    eleventyConfig.addWatchTarget("./src/_includes/")

    eleventyConfig.addPassthroughCopy('./src/_includes/stylesheets/')

    // enable CORS
    eleventyConfig.setBrowserSyncConfig({
        middleware: function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
        }
    });
    
    return {
        templateFormats: ["html", "njk", "md", "js"],
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "docs"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        passthroughFileCopy: true
    }
};