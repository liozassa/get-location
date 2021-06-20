import { env } from "process";
import { LoggerRepository } from "../dal/logger";

export class LoggerService {
    private loggerRepository: LoggerRepository

    constructor() {
        this.loggerRepository = new LoggerRepository();
    }

    createLogRecord(date: number, level: number, message: string) {
        const service_name = <string>env.SERVICE_NAME;
        this.loggerRepository.createLogRecord(service_name, date, level, message);
    }
}