const apiCall = require('../apicall');

module.exports = (app, dbs) => {
  app.get('/', (req, res) => {
    res.send('Search images by typing words after sign /')
  })
  
  app.get('/latest', (err, res) => {
    dbs.collection('image-search-params')
      .find({})
      .sort({ _id: -1 })
      .limit(10)
      .toArray((err, result) => {
        const val = result.map(v => {
          return {
            therm: v.params,
            when: v._id.getTimestamp()
          }
        });
        res.send(val);
      })
  })
  
  app.get('/search/:id', (req, res) => {
    const params = req.params.id;
    if (params === 'favicon.ico' || params === 'robots.txt') {
      return
    } 
    const query = req.query.offset * 10 + 1 || 1;
    apiCall(params, query, (data) => {
      res.send(data)
      dbs.collection('image-search-params').insert({params});
    })
  })
  
  return app;
}