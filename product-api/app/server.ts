import express from 'express';
import http from 'http';
import apiRoutes from './routes/router';
import config from './util/config';

const router = express();


/**
 * Logging
 */
router.use(function (req, res, next) {
    console.log(`Method: ${req.method} URL: ${req.url}`);

    res.on("finish", () => {
        console.log(`Request complete.`);
        console.log(`Status: ${res.statusCode}`);
    });

    next();
});

/**
 * Parse body
 */
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/**
 * Rules
 */
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // TODO:change for prod
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json();
    }

    next();
});

/**
 * Routes
 */
router.use('/', apiRoutes);

/**
 * Error handling
 */
router.use(function (req, res, next) {
    const error = new Error("Not found");

    return res.status(404).json({
        message: error.message,
        stack: error.stack
    })
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.SERVER_PORT, () => {
    console.log(`Listening on port ${config.server.SERVER_PORT}...`);
});