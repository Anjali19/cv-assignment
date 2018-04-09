const express = require('express');
const app = express();
const routes = require('./routes');
const errorHandlers = require('./tweets/errorHandlers');

app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'ejs');

app.use('/', routes);
app.use(errorHandlers.notFound);
app.use(errorHandlers.devErrors);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
