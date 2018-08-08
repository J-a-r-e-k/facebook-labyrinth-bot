/*
    Show static page with privacy policy
 */

const path = require("path");

module.exports = (req, res) => {
    res.status(200).sendFile(path.join(__dirname + '/../../public/index.html'));
};