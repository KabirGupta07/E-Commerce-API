const path = require('path');

const NODE_ENV = process.env.NODE_ENV || "development";
console.log("NODE_ENV: ", NODE_ENV);

let config = {
    target:"node",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    mode: NODE_ENV
}

module.exports = config