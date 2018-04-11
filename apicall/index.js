const request = require('request');

module.exports = (params, query, callback) => {
  const options = {  
    url: 'https://www.googleapis.com/customsearch/v1',
    method: 'GET',
    qs: {
      q: params,
      start: query,
      searchType: 'image',
      cx: process.env.CX,
      key: process.env.API_KEY
    }
  };
  request(options, (err, res, body) => {
    if (err) {
      console.log(err);
    }
    const b = JSON.parse(body);
    if (b.error) {
      return callback('Search limit for today has been reached, try again tomorrow');
    }
    const result = b.items.map(item => {
      return {
        url: item.link,
        snippet: item.snippet,
        thumbnail: item.image.thumbnailLink,
        context: item.image.contextLink
      }
    });
    callback(result)
  });
}
// http://stackabuse.com/the-node-js-request-module/