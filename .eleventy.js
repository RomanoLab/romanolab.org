const CleanCSS = require("clean-css");
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    eleventyConfig.addWatchTarget("./src/_includes/");

    // eleventyConfig.addPassthroughCopy('./src/_includes/stylesheets/')

    eleventyConfig.addPassthroughCopy('./src/mystyle.css');

    // enable CORS
    eleventyConfig.setBrowserSyncConfig({
        middleware: function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
        }
    });

    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.addFilter("asPostDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });

    eleventyConfig.addFilter("limit", function(array, limit) {
        return array.slice(0, limit);
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