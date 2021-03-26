import { HttpException } from '@nestjs/common';
import { Error as MongooseError } from 'mongoose';
import { StringIdType } from './types/stringIdType';
export declare const internalServerError: (error: any) => HttpException;
export declare const noAccessOrDoesNotExistError: () => HttpException;
export declare const mongooseValidationError: (err: MongooseError.ValidationError) => HttpException;
export declare const invalidValuesError: () => HttpException;
export declare const handleHttpRequestError: (err: any) => HttpException;
export declare const validateObjectId: (id: StringIdType) => void;
