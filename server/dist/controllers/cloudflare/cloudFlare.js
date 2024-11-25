"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresignedUrl = getPresignedUrl;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const uuid_1 = require("uuid");
const S3 = new client_s3_1.S3Client({
    endpoint: "https://d1e63a97bd9bdf37484760e242740173.r2.cloudflarestorage.com/",
    credentials: {
        accessKeyId: "1343dcde52f9ced06a783ea586cdcced",
        secretAccessKey: "628f18ebe6af0f7680c0abfc5fc9b455fc777254015a039593b50feee80a9b35",
    },
    region: "auto",
});
function getPresignedUrl() {
    return __awaiter(this, void 0, void 0, function* () {
        const id = (0, uuid_1.v4)();
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(S3, new client_s3_1.PutObjectCommand({ Bucket: "pet", Key: id }), { expiresIn: 60 * 60 });
        return {
            uploadUrl: url,
            accessUrls: "https://pub-050e63764f9e43f3af6873e3befa1b28.r2.dev/" + id,
        };
    });
}
