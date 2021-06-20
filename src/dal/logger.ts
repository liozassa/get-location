import { Log } from "../models/logger.model";

export class LoggerRepository {
    createLogRecord(service_name: string, date: number, level: number, message: string) {
        const logger = new Log({
            service_name,
            date,
            level,
            message
        });
        logger.save();
    }
}