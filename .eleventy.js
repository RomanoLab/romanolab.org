const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    })

    eleventyConfig.addPassthroughCopy('src/assets')
    
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