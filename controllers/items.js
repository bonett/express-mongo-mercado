require('dotenv').config();
const Request = require('request');
const API_URL = `${process.env.API}sites/MLA/`

module.exports = {

    index: async (req, res) => {
        /* const queryString = res.query.q; */
        const queryString = 'ihpone';
        Request.get(`${API_URL}search?q=${queryString}`, (error, response, body) => {
            try {
                res.status(200).json({
                    result: JSON.parse(body)
                });
            } catch (err) {
                res.status(500).json({
                    message: err.message
                });
            }
        });
    }
}