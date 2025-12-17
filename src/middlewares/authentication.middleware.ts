import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { logger } from "src/logs/logger";
import { Logger } from "winston";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        logger.info("Middleware");
        next();
    }
}