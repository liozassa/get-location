import { App } from './app';


import loggerMiddleware from './middleware/logger';
import { HealthController } from './controllers/health.controller';
import express from 'express';
import { LocationController } from './controllers/location.controller';

const app = new App({
    port: parseInt(<string>process.env.PORT) || 80,
    controllers: [
        new HealthController(),
        new LocationController()
    ],
    middleWares: [
        express.json(),
        express.urlencoded({ extended: true }),
        loggerMiddleware
    ]
});

app.listen();