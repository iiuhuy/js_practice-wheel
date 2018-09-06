var Mustache = require('mustache');
var result = Mustache.render("Hi, {{first}} {{last}}!", {
    first:  "Alvinmi",
    last: "Cage"
});
console.log(result);
