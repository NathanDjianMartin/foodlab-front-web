const express = require('express');
const app = express();
app.use(express.static(`./dist/foodlab-front-web`));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/foodlab-front-web/'});
});
app.listen(process.env.PORT || 8080);
