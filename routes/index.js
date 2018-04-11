const apiCall = require('../apicall');

module.exports = (app, dbs) => {
  app.get('/', (req, res) => {
    res.send('Search images by typing words after sign /')
  })
  
  app.get('/:id', (req, res) => {
    const params = req.params.id;
    const query = req.query.offset * 10 + 1 || 1;
    apiCall(params, query, (data) => {
      res.send(data)
    })
  })
  
  return app;
}