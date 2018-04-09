module.exports = (app, dbs) => {
  app.get('/', (req, res) => res.json('hello world'))
  
  return app;
}