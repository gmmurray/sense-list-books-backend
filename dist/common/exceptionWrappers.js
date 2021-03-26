"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjectId = exports.handleHttpRequestError = exports.invalidValuesError = exports.mongooseValidationError = exports.noAccessOrDoesNotExistError = exports.internalServerError = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const internalServerError = (error) => {
    return new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
};
exports.internalServerError = internalServerError;
const noAccessOrDoesNotExistError = () => {
    return new common_1.HttpException('Resource does not exist or you do not have access to it', common_1.HttpStatus.NOT_FOUND);
};
exports.noAccessOrDoesNotExistError = noAccessOrDoesNotExistError;
const mongooseValidationError = (err) => {
    const error = {
        errors: {},
    };
    Object.keys(err.errors).map((key) => (error.errors[key] = {
        kind: err.errors[key].kind,
    }));
    return new common_1.HttpException({
        message: 'Validation Error',
        status: common_1.HttpStatus.BAD_REQUEST,
        error,
    }, common_1.HttpStatus.BAD_REQUEST);
};
exports.mongooseValidationError = mongooseValidationError;
const invalidValuesError = () => {
    return new common_1.HttpException({
        message: 'Invalid or incorrect values provided',
        status: common_1.HttpStatus.BAD_REQUEST,
    }, common_1.HttpStatus.BAD_REQUEST);
};
exports.invalidValuesError = invalidValuesError;
const handleHttpRequestError = (err) => {
    switch (err.name) {
        case mongoose_1.Error.ValidationError.name:
            throw exports.mongooseValidationError(err);
        case mongoose_1.Error.DocumentNotFoundError.name:
            throw exports.noAccessOrDoesNotExistError();
        case mongoose_1.Error.CastError.name:
            throw exports.invalidValuesError();
        default: {
            if (err.status && err.status === 400) {
                throw new common_1.BadRequestException();
            }
            else {
                throw exports.internalServerError(err);
            }
        }
    }
};
exports.handleHttpRequestError = handleHttpRequestError;
const validateObjectId = (id) => {
    if (!mongoose_1.isValidObjectId(id))
        throw new mongoose_1.Error.CastError(null);
};
exports.validateObjectId = validateObjectId;
//# sourceMappingURL=exceptionWrappers.js.map