// Requires
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const mongoose   = require('mongoose');
const config     = require('./config/config.js');

// Routes
const userRoutes         = require('./api/routes/user-routes');
const adminRoutes        = require('./api/routes/admin-routes');
const companyAdminRoutes = require('./api/routes/company-admin-routes');
const employeeRoutes     = require('./api/routes/employee-routes');
const instructorRoutes   = require('./api/routes/instructor-routes');
const metricRoutes       = require('./api/routes/metric-routes');
const companyRoutes      = require('./api/routes/company-routes');
const projectRoutes      = require('./api/routes/project-routes');

// Base URL route
const adminBaseRoute        = '/api/admin';
const companyAdminBaseRoute = '/api/administrator';
const instructorBaseRoute   = '/api/instructor';
const employeeBaseRoute     = '/api/employee';
const metricBaseRoute       = '/api/metrics';
const companyBaseRoute      = '/api/company';
const projectBaseRoute      = '/api/project';

app.all('*', function (req, res, next) {
  var origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

if (!config.isTest){
  dbUser    = 'dream';
  dbPass    = 'dream';
  dbCluster = 'spectra';
  DB        = 'spectra';
} else {
  dbUser    = 'dream';
  dbPass    = 'dream';
  dbCluster = 'spectra';
  DB        = 'spectra';
}

mongoose.set('useFindAndModify', false);

// mongodb://127.0.0.1:27017/tugodb
mongoose.connect(`mongodb://127.0.0.1:27017/usersdb`, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log(`Conected to database: ${DB}`);
}).catch(error => {
    console.log(error);
});
mongoose.Promise = global.Promise;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {

  console.log("request arrived for URL", req.url);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS, PUT'
  );
  next();
});


/// ROUTES

// Users Routes
//app.use(`${userBaseRoute}`, userRoutes);

// Admin Routes
app.use(`${adminBaseRoute}`, adminRoutes);

// CompanyAdmin Routes
app.use(`${companyAdminBaseRoute}`, companyAdminRoutes);

// Instructor Rutes
app.use(`${instructorBaseRoute}`, instructorRoutes);

// Employee Routes
app.use(`${employeeBaseRoute}`, employeeRoutes);

// Metric Routes
app.use(`${metricBaseRoute}`, metricRoutes);

// Company Routes
app.use(`${companyBaseRoute}`, companyRoutes);

// Project Routes
app.use(`${projectBaseRoute}`, projectRoutes);

/// ERROR HANDLING

//Some basic error handling
app.use((req, res, next) => {
    const error = new Error('Path Not Found');
    error.status = 404;
    next(error);
});

// Error handling for last unkown instance.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log("ERROR:", err);
    res.json({
        error: {
            status: err.status,
            error: "Error en el servidor",
            debug: "Ultima validacion de error"
        }
    });
});

// Export app
module.exports = app;
