const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    })

    eleventyConfig.addPassthroughCopy('src/assets')

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
            output: "dist"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        passthroughFileCopy: true
    }
};