require("dotenv").config();
const _ = require("lodash");

const Request = require("request");
const API_URL = `${process.env.API}`;
const author = {
  name: "Wilfrido",
  lastname: "Bonett",
};

module.exports = {
  index: async (req, res) => {
    /* const queryString = res.query.q; */
    const queryString = "apple ipod";
    Request.get(
      `${API_URL}sites/MLA/search?q=${queryString}`,
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
            categories.push(queryString);
          }

          const items = _.map(data.results, (item) => {
            return {
              id: item.id,
              title: item.title,
              price: {
                currency: item.currency_id,
                amount: item.price,
                decimals: 00,
              },
              picture: item.thumbnail,
              condition: (item.condition === 'new') ? 'Nuevo' : 'Usado',
              free_shipping: item.shipping.free_shipping,
              address: item.address.state_name,
            };
          });
          const response = {
            author,
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

  showById: async (req, res) => {
    const { id } = req.params;
    Request.get(`${API_URL}items/${id}`, (error, response, body) => {
      try {
        const resultPerId = JSON.parse(body);
        Request.get(
          `${API_URL}items/${id}/description`,
          (error, response, body) => {
            try {
              const description = JSON.parse(body);
              const mergeResponses = {
                author,
                item: {
                  id: resultPerId.id,
                  title: resultPerId.title,
                  price: {
                    currency: resultPerId.currency_id,
                    amount: resultPerId.price,
                    decimals: 00,
                  },
                  picture: resultPerId.thumbnail,
                  condition: resultPerId.condition,
                  free_shipping: resultPerId.shipping.free_shipping,
                  sold_quantity: resultPerId.sold_quantity,
                  description: description.plain_text,
                },
              };
              res.status(200).json(mergeResponses);
            } catch (error) {}
          }
        );
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
    });
  },
};
