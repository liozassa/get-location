import { env } from "process";
import { LocationRepository } from "../dal/location";
import { ILocation } from "../models/location.model";
import { fetchGet } from "../utils/fetch";

export class LocationService {

    private locationRepository: LocationRepository;

    constructor() {
        this.locationRepository = new LocationRepository();
    }

    async getOnWaterLocation(lat: number, lon: number) {
        const query = `?access_token=${env.ONWATER_APP_ID}`;
        return await fetchGet(`${env.ONWATER_URL}results/${lat},${lon}${query}`, {});
    }

    async getOpenCageCoordinates(address: string) {
        const query = `?key=${env.OPENCAGE_APP_ID}&q=${address}`;
        //console.log('url', `${env.OPENCAGE_URL}json${query}`);
        return await fetchGet(`${env.OPENCAGE_URL}json${query}`, {});
    }

    async saveLocation(user_id: string, data: ILocation) {
        const date = new Date().getTime();
        return await this.locationRepository.saveLocation(user_id, date, data);
    }

    async getUserLocations(user_id: string): Promise<ILocation[] | null> {
        const date = new Date().getTime();
        return this.locationRepository.getUserLocations(user_id);
    }

    async addNewLocation(user_id: string, lat: number, lon: number, address?: string) {
        if (address) {
            const coordinates = await this.getOpenCageCoordinates(address);
            lat = parseFloat((coordinates.results[0].annotations.DMS.lat).split(' ')[2]);
            lon = parseFloat((coordinates.results[0].annotations.DMS.lng).split(' ')[2]);
        }
        let location = await this.getOnWaterLocation(lat, lon);
        const current_location = await this.saveLocation(user_id, location);
        const user_locations: ILocation[] = await this.getUserLocations(user_id) || [];
        const land_locations: ILocation[] = user_locations.filter(l => !l.water);
        const percent_land = (user_locations.length / land_locations.length) || 0;
        return {
            current_location,
            last_location: this.calcCrow(user_locations[1].lat, user_locations[1].lon, lat, lon),
            percent_land: percent_land + '%'
        }
    }

    calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371; // Radius of the earth in km.
        const dLat = this.toRad(lat2-lat1);
        const dLon = this.toRad(lon2-lon1);
        const _lat1 = this.toRad(lat1);
        const _lat2 = this.toRad(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(_lat1) * Math.cos(_lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    private toRad(value: number) 
    {
        return value * Math.PI / 180;
    }
}