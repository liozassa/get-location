import { Request, Response, Router } from 'express';
import { env } from 'process';

export class HealthController {
    public path: string;
    public router: Router;

    constructor() {
        this.path = '';
        this.router = Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(['/', '/health'], async (req: Request, res: Response): Promise<void> => {

            res.status(200).json({
                status: 'Healthy',
                appName: env.SERVICE_NAME
            });
        });
    }
}