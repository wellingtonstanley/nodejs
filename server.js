const app = require('./src/app');
//const hostname = '127.0.0.1';
const port = normalizaPort(process.env.PORT || '8080');
function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
if (port >= 0) {
    console.log('porta maior');
        return port;
    }
return false;
}
app.listen(port, function () {
    console.log(`Server running at ${port}/`)
})