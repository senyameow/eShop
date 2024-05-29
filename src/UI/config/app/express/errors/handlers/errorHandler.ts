import { BaseError } from "../../../../../../core/common/errors/BaseError";
import { UIError } from "../../../../../common/config/errors/UIError";
import { Application, NextFunction, Request, Response } from 'express';
import { ErrorResponse } from "../responses/ErrorResponse";
import { CoreError } from "../../../../../../core/common/errors/CoreError";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
    switch (err.constructor) {
        case UIError:
            res
                .status((err as UIError).status)
                .json(new ErrorResponse(err.code, err.message))
            break;

        case CoreError:
            res
                .status(StatusCodes.UNPROCESSABLE_ENTITY)
                .json(new ErrorResponse(err.code, err.message))

        default:
            res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR.toString(), err.message))

            break;
    }
}