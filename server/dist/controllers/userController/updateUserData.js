"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserData = void 0;
const userModel_1 = require("../../src/database/models/userModel");
const updateUserData = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const { username, firstName, email, lastName, phoneNumber } = req.body;
    try {
      yield userModel_1.UserModel.findOneAndUpdate(
        { authId: id },
        {
          firstName,
          lastName,
          username,
          email,
          phoneNumber,
        }
      );
      res.send({ message: "Update successfully" }).status(201);
    } catch (error) {
      res.send("error").status(400);
    }
  });
exports.updateUserData = updateUserData;
