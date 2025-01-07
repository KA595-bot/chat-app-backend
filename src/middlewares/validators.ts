import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";

export const validateDTO = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const dtoObject = plainToInstance(dtoClass, req.body);

        const errors = await validate(dtoObject);
        if (errors.length > 0) {
            res.status(400).json({
                message: 'Validation failed',
                errors: errors.map((err) => ({
                    property: err.property,
                    constraints: err.constraints,
                })),
            });
            return; // Stop further execution
        }

        next(); // Proceed to the next middleware or controller
    };
};
