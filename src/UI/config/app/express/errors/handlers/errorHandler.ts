import { BaseError } from "../../../../../../core/common/errors/BaseError";
import { UIError } from "../../../../../common/config/errors/UIError";
import { Application, NextFunction, Request, Response } from 'express';
import { ErrorResponse } from "../responses/ErrorResponse";
import { CoreError } from "../../../../../../core/common/errors/CoreError";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (app: Application) => app.use((err: BaseError, req: Request, res: Response, next: NextFunction) => {
    next()
    switch (err.constructor) {
        case UIError:
            console.log(err)
            res
                .status(err.code)
                .json(new ErrorResponse(err.code, err.name))
            break;

        case CoreError:
            res
                .status(StatusCodes.UNPROCESSABLE_ENTITY)
                .json(new ErrorResponse(err.code, err.name))
            break

        case BaseError:
            res
                .status(err.code)
                .json(new ErrorResponse(err.code, err.name))
            break
        default:
            console.log(err)
            res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message))

            break;
    }
})