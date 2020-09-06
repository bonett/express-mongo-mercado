require("dotenv").config();
const _ = require("lodash");

const Request = require("request");
const API_URL = `${process.env.API}sites/MLA/`;

module.exports = {
  index: async (req, res) => {
    /* const queryString = res.query.q; */
    const queryString = "apple";
    Request.get(
      `${API_URL}search?q=${queryString}`,
      (error, response, body) => {
        try {
          const data = JSON.parse(body);
          let filters = [];
          let paths = [];
          let categories = [];

          if (data.filters.length !== 0) {
            filters = data.filters && data.filters[0];
            paths = filters.values && filters.values[0];
            categories = _.map(paths.path_from_root, (path) => {
              return path.name;
            });
          } else {
            categories.push(queryString)
          }

          const items = _.map(data.results, (item) => {
            return {
              id: item.id,
              title: item.title,
              price: {
                currency: item.currency_id,
                amount: item.price,
                decimals: item.installments.currency_id,
              },
              picture: item.thumbnail,
              condition: item.condition,
              free_shipping: item.free_shipping,
            };
          });
          const response = {
            author: {
              name: "Wilfrido",
              lastname: "Bonett",
            },
            categories,
            items,
          };
          res.status(200).json(response);
        } catch (err) {
          res.status(500).json({
            message: err.message,
          });
        }
      }
    );
  },
};
