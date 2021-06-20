import { ILocation, Location } from "../models/location.model";

export class LocationRepository {
    async getUserLocations(user_id: string): Promise<ILocation[] | null> {
        try {
            return await Location.find({
                user_id
            }).sort({date: -1});
        } catch (error) {
            throw error;
        } 
    }

    async saveLocation(user_id: string, date: number, data: ILocation) {
        try {
            const location = new Location({
                user_id,
                date,
                request_id: data.request_id,
                lat: data.lat,
                lon: data.lon,
                water: data.water
            });
            return await location.save();
        } catch (error) {
            throw error;
        }
    }
}