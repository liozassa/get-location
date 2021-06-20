import { Request, Response, Router } from 'express';
import { LocationService } from '../services/location.service';

export class LocationController {
    public path: string;
    public router: Router;

    private locationService: LocationService;

    constructor() {
        this.path = 'location';
        this.router = Router();
        this.initRoutes();
        this.locationService = new LocationService();
    }

    public initRoutes() {
        this.router.get('/', async (req: Request, res: Response) => {
            try {
                const address = typeof(req.query.address) === 'string' ? req.query.address : undefined;
                const lat = typeof(req.query.lat) === 'string' ? parseInt(req.query.lat) : 0;
                const lon = typeof(req.query.lon) === 'string' ? parseInt(req.query.lon) : 0;
                const user_id = typeof(req.query.user_id) === 'string' ? req.query.user_id : undefined;
                
                if ((!address && (lat === 0 || lon === 0)) || !user_id) {
                    return res.status(401).json({
                        message: "Invalid params"
                    });
                }

                this.locationService.addNewLocation(user_id, lat, lon, address)
                .then((result) => {
                    res.status(200).json({
                        message: "Get location successfully!",
                        data: result
                    });
                })
                .catch(error => {
                    throw error;
                });
            } catch (error) {
                res.status(401).json({
                    message: "Get location failed!",
                    data: null
                });
            }
        });
    }
}