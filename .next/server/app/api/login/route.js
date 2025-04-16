/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/login/route";
exports.ids = ["app/api/login/route"];
exports.modules = {

/***/ "(rsc)/./app/api/login/route.ts":
/*!********************************!*\
  !*** ./app/api/login/route.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_userModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/models/userModel */ \"(rsc)/./models/userModel.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _utils_asyncHelpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/asyncHelpers */ \"(rsc)/./utils/asyncHelpers.ts\");\n\n\n\n\n\nconst JWT_SECRET = \"privatesecretjwtkey\";\nasync function POST(request) {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__.connectToDatabase)();\n        const { email, password } = await request.json();\n        // Basic input validation\n        if (!email || !password) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Email and password are required.\"\n            }, {\n                status: 400\n            });\n        }\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__.connectToDatabase)();\n        const user = await _models_userModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"].collection.findOne({\n            email\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"User not found.\"\n            }, {\n                status: 404\n            });\n        }\n        const isPasswordValid = await (0,_utils_asyncHelpers__WEBPACK_IMPORTED_MODULE_4__.comparePassword)(password, user.password);\n        if (!isPasswordValid) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Invalid password.\"\n            }, {\n                status: 401\n            });\n        }\n        const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().sign({\n            userId: user._id,\n            email: user.email,\n            name: user.firstname\n        }, JWT_SECRET, {\n            expiresIn: \"1h\"\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            isSuccess: true,\n            token,\n            user\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Login error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Error logging in\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xvZ2luL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBd0Q7QUFDTjtBQUNaO0FBRVA7QUFDd0I7QUFFdkQsTUFBTUssYUFBYUMscUJBQWtDO0FBRTlDLGVBQWVHLEtBQUtDLE9BQW9CO0lBQzdDLElBQUk7UUFDRixNQUFNVCwrREFBaUJBO1FBQ3ZCLE1BQU0sRUFBRVUsS0FBSyxFQUFFQyxRQUFRLEVBQUUsR0FBRyxNQUFNRixRQUFRRyxJQUFJO1FBRTlDLHlCQUF5QjtRQUN6QixJQUFJLENBQUNGLFNBQVMsQ0FBQ0MsVUFBVTtZQUN2QixPQUFPWixxREFBWUEsQ0FBQ2EsSUFBSSxDQUN0QjtnQkFBRUMsU0FBUztZQUFtQyxHQUM5QztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsTUFBTWQsK0RBQWlCQTtRQUN2QixNQUFNZSxPQUFPLE1BQU1kLHlEQUFJQSxDQUFDZSxVQUFVLENBQUNDLE9BQU8sQ0FBQztZQUFFUDtRQUFNO1FBRW5ELElBQUksQ0FBQ0ssTUFBTTtZQUNULE9BQU9oQixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQWtCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUN6RTtRQUVBLE1BQU1JLGtCQUFrQixNQUFNZixvRUFBZUEsQ0FBQ1EsVUFBVUksS0FBS0osUUFBUTtRQUNyRSxJQUFJLENBQUNPLGlCQUFpQjtZQUNwQixPQUFPbkIscURBQVlBLENBQUNhLElBQUksQ0FDdEI7Z0JBQUVDLFNBQVM7WUFBb0IsR0FDL0I7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU1LLFFBQVFqQix3REFBUSxDQUNwQjtZQUFFbUIsUUFBUU4sS0FBS08sR0FBRztZQUFFWixPQUFPSyxLQUFLTCxLQUFLO1lBQUVhLE1BQU1SLEtBQUtTLFNBQVM7UUFBQyxHQUM1RHBCLFlBQ0E7WUFBRXFCLFdBQVc7UUFBSztRQUdwQixPQUFPMUIscURBQVlBLENBQUNhLElBQUksQ0FBQztZQUFFYyxXQUFXO1lBQU1QO1lBQU9KO1FBQUssR0FBRztZQUFFRCxRQUFRO1FBQUk7SUFDM0UsRUFBRSxPQUFPYSxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxnQkFBZ0JBO1FBQzlCLE9BQU81QixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO1lBQUVDLFNBQVM7UUFBbUIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDMUU7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxBU1VTIFRVRlxcRGVza3RvcFxccmVwb3NcXGVjb21tZXJjZVxcYXBwXFxhcGlcXGxvZ2luXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IGNvbm5lY3RUb0RhdGFiYXNlIH0gZnJvbSBcIkAvbGliL21vbmdvZGJcIjtcclxuaW1wb3J0IFVzZXIgZnJvbSBcIkAvbW9kZWxzL3VzZXJNb2RlbFwiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuaW1wb3J0IHsgY29tcGFyZVBhc3N3b3JkIH0gZnJvbSBcIkAvdXRpbHMvYXN5bmNIZWxwZXJzXCI7XHJcblxyXG5jb25zdCBKV1RfU0VDUkVUID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfSldUX1NFQ1JFVCBhcyBzdHJpbmc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBjb25uZWN0VG9EYXRhYmFzZSgpO1xyXG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG5cclxuICAgIC8vIEJhc2ljIGlucHV0IHZhbGlkYXRpb25cclxuICAgIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IG1lc3NhZ2U6IFwiRW1haWwgYW5kIHBhc3N3b3JkIGFyZSByZXF1aXJlZC5cIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IGNvbm5lY3RUb0RhdGFiYXNlKCk7XHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5jb2xsZWN0aW9uLmZpbmRPbmUoeyBlbWFpbCB9KTtcclxuXHJcbiAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJVc2VyIG5vdCBmb3VuZC5cIiB9LCB7IHN0YXR1czogNDA0IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IGNvbXBhcmVQYXNzd29yZChwYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcbiAgICBpZiAoIWlzUGFzc3dvcmRWYWxpZCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBtZXNzYWdlOiBcIkludmFsaWQgcGFzc3dvcmQuXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAxIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKFxyXG4gICAgICB7IHVzZXJJZDogdXNlci5faWQsIGVtYWlsOiB1c2VyLmVtYWlsLCBuYW1lOiB1c2VyLmZpcnN0bmFtZSB9LFxyXG4gICAgICBKV1RfU0VDUkVULFxyXG4gICAgICB7IGV4cGlyZXNJbjogXCIxaFwiIH1cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgaXNTdWNjZXNzOiB0cnVlLCB0b2tlbiwgdXNlciB9LCB7IHN0YXR1czogMjAwIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiTG9naW4gZXJyb3I6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiRXJyb3IgbG9nZ2luZyBpblwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJjb25uZWN0VG9EYXRhYmFzZSIsIlVzZXIiLCJqd3QiLCJjb21wYXJlUGFzc3dvcmQiLCJKV1RfU0VDUkVUIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0pXVF9TRUNSRVQiLCJQT1NUIiwicmVxdWVzdCIsImVtYWlsIiwicGFzc3dvcmQiLCJqc29uIiwibWVzc2FnZSIsInN0YXR1cyIsInVzZXIiLCJjb2xsZWN0aW9uIiwiZmluZE9uZSIsImlzUGFzc3dvcmRWYWxpZCIsInRva2VuIiwic2lnbiIsInVzZXJJZCIsIl9pZCIsIm5hbWUiLCJmaXJzdG5hbWUiLCJleHBpcmVzSW4iLCJpc1N1Y2Nlc3MiLCJlcnJvciIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/login/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/cloudinaryConfig.ts":
/*!*********************************!*\
  !*** ./lib/cloudinaryConfig.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cloudinary */ \"(rsc)/./node_modules/cloudinary/cloudinary.js\");\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cloudinary__WEBPACK_IMPORTED_MODULE_0__);\n\n// Configure Cloudinary\ncloudinary__WEBPACK_IMPORTED_MODULE_0___default().v2.config({\n    cloud_name: \"dk48tmihd\",\n    api_key: \"625816897424924\",\n    api_secret: \"2CzfaFcCIYxdPZrIUoD6sLK7TVs\"\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((cloudinary__WEBPACK_IMPORTED_MODULE_0___default()));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvY2xvdWRpbmFyeUNvbmZpZy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBb0M7QUFFcEMsdUJBQXVCO0FBQ3ZCQSxvREFBYSxDQUFDRSxNQUFNLENBQUM7SUFDbkJDLFlBQVlDLFdBQWtDO0lBQzlDRyxTQUFTSCxpQkFBcUM7SUFDOUNLLFlBQVlMLDZCQUF3QztBQUN0RDtBQUVBLGlFQUFlSixtREFBVUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxBU1VTIFRVRlxcRGVza3RvcFxccmVwb3NcXGVjb21tZXJjZVxcbGliXFxjbG91ZGluYXJ5Q29uZmlnLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjbG91ZGluYXJ5IGZyb20gXCJjbG91ZGluYXJ5XCI7XHJcblxyXG4vLyBDb25maWd1cmUgQ2xvdWRpbmFyeVxyXG5jbG91ZGluYXJ5LnYyLmNvbmZpZyh7XHJcbiAgY2xvdWRfbmFtZTogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQ0xPVURfTkFNRSxcclxuICBhcGlfa2V5OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19DTE9VRF9BUElfS0VZLFxyXG4gIGFwaV9zZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0NMT1VEX0FQSV9TRUNSRVQsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xvdWRpbmFyeTtcclxuIl0sIm5hbWVzIjpbImNsb3VkaW5hcnkiLCJ2MiIsImNvbmZpZyIsImNsb3VkX25hbWUiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQ0xPVURfTkFNRSIsImFwaV9rZXkiLCJORVhUX1BVQkxJQ19DTE9VRF9BUElfS0VZIiwiYXBpX3NlY3JldCIsIk5FWFRfUFVCTElDX0NMT1VEX0FQSV9TRUNSRVQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/cloudinaryConfig.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDatabase: () => (/* binding */ connectToDatabase)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = \"mongodb+srv://test:Test123@cluster0.y3kde2g.mongodb.net/ecommerce_db?retryWrites=true&w=majority\";\n// if (!MONGODB_URI) {\n//   throw new Error(\n//     \"Please define the ATLAS_DB_LINK environment variable in .env.local\"\n//   );\n// }\n// Ensure global object exists for caching (important for Next.js and serverless)\n// @ts-ignore\nglobal.mongoose = global.mongoose || {\n    conn: null,\n    promise: null\n};\nasync function connectToDatabase() {\n    // @ts-ignore\n    if (global.mongoose.conn) {\n        console.log(\"Using existing MongoDB connection\");\n        // @ts-ignore\n        return global.mongoose.conn;\n    }\n    // @ts-ignore\n    if (!global.mongoose.promise) {\n        console.log(\"Establishing new MongoDB connection...\");\n        // @ts-ignore\n        global.mongoose.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, {\n            useNewUrlParser: true,\n            useUnifiedTopology: true,\n            serverSelectionTimeoutMS: 30000,\n            connectTimeoutMS: 30000\n        }).then((mongoose)=>{\n            console.log(\"MongoDB connected successfully ✅\");\n            return mongoose;\n        }).catch((error)=>{\n            console.error(\"MongoDB connection error:\", error);\n            throw new Error(\"Failed to connect to MongoDB.\");\n        });\n    }\n    // @ts-ignore\n    global.mongoose.conn = await global.mongoose.promise;\n    // @ts-ignore\n    return global.mongoose.conn;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsY0FBY0Msa0dBQXFDO0FBRXpELHNCQUFzQjtBQUN0QixxQkFBcUI7QUFDckIsMkVBQTJFO0FBQzNFLE9BQU87QUFDUCxJQUFJO0FBRUosaUZBQWlGO0FBQ2pGLGFBQWE7QUFDYkcsT0FBT0wsUUFBUSxHQUFHSyxPQUFPTCxRQUFRLElBQUk7SUFBRU0sTUFBTTtJQUFNQyxTQUFTO0FBQUs7QUFFMUQsZUFBZUM7SUFDcEIsYUFBYTtJQUNiLElBQUlILE9BQU9MLFFBQVEsQ0FBQ00sSUFBSSxFQUFFO1FBQ3hCRyxRQUFRQyxHQUFHLENBQUM7UUFDWixhQUFhO1FBQ2IsT0FBT0wsT0FBT0wsUUFBUSxDQUFDTSxJQUFJO0lBQzdCO0lBRUEsYUFBYTtJQUNiLElBQUksQ0FBQ0QsT0FBT0wsUUFBUSxDQUFDTyxPQUFPLEVBQUU7UUFDNUJFLFFBQVFDLEdBQUcsQ0FBQztRQUNaLGFBQWE7UUFDYkwsT0FBT0wsUUFBUSxDQUFDTyxPQUFPLEdBQUdQLHVEQUVoQixDQUFDQyxhQUFhO1lBQ3BCVyxpQkFBaUI7WUFDakJDLG9CQUFvQjtZQUNwQkMsMEJBQTBCO1lBQzFCQyxrQkFBa0I7UUFDcEIsR0FDQ0MsSUFBSSxDQUFDLENBQUNoQjtZQUNMUyxRQUFRQyxHQUFHLENBQUM7WUFDWixPQUFPVjtRQUNULEdBQ0NpQixLQUFLLENBQUMsQ0FBQ0M7WUFDTlQsUUFBUVMsS0FBSyxDQUFDLDZCQUE2QkE7WUFDM0MsTUFBTSxJQUFJQyxNQUFNO1FBQ2xCO0lBQ0o7SUFFQSxhQUFhO0lBQ2JkLE9BQU9MLFFBQVEsQ0FBQ00sSUFBSSxHQUFHLE1BQU1ELE9BQU9MLFFBQVEsQ0FBQ08sT0FBTztJQUNwRCxhQUFhO0lBQ2IsT0FBT0YsT0FBT0wsUUFBUSxDQUFDTSxJQUFJO0FBQzdCIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEFTVVMgVFVGXFxEZXNrdG9wXFxyZXBvc1xcZWNvbW1lcmNlXFxsaWJcXG1vbmdvZGIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuY29uc3QgTU9OR09EQl9VUkkgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BVExBU19EQl9MSU5LO1xyXG5cclxuLy8gaWYgKCFNT05HT0RCX1VSSSkge1xyXG4vLyAgIHRocm93IG5ldyBFcnJvcihcclxuLy8gICAgIFwiUGxlYXNlIGRlZmluZSB0aGUgQVRMQVNfREJfTElOSyBlbnZpcm9ubWVudCB2YXJpYWJsZSBpbiAuZW52LmxvY2FsXCJcclxuLy8gICApO1xyXG4vLyB9XHJcblxyXG4vLyBFbnN1cmUgZ2xvYmFsIG9iamVjdCBleGlzdHMgZm9yIGNhY2hpbmcgKGltcG9ydGFudCBmb3IgTmV4dC5qcyBhbmQgc2VydmVybGVzcylcclxuLy8gQHRzLWlnbm9yZVxyXG5nbG9iYWwubW9uZ29vc2UgPSBnbG9iYWwubW9uZ29vc2UgfHwgeyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29ubmVjdFRvRGF0YWJhc2UoKSB7XHJcbiAgLy8gQHRzLWlnbm9yZVxyXG4gIGlmIChnbG9iYWwubW9uZ29vc2UuY29ubikge1xyXG4gICAgY29uc29sZS5sb2coXCJVc2luZyBleGlzdGluZyBNb25nb0RCIGNvbm5lY3Rpb25cIik7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICByZXR1cm4gZ2xvYmFsLm1vbmdvb3NlLmNvbm47XHJcbiAgfVxyXG5cclxuICAvLyBAdHMtaWdub3JlXHJcbiAgaWYgKCFnbG9iYWwubW9uZ29vc2UucHJvbWlzZSkge1xyXG4gICAgY29uc29sZS5sb2coXCJFc3RhYmxpc2hpbmcgbmV3IE1vbmdvREIgY29ubmVjdGlvbi4uLlwiKTtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGdsb2JhbC5tb25nb29zZS5wcm9taXNlID0gbW9uZ29vc2VcclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAuY29ubmVjdChNT05HT0RCX1VSSSwge1xyXG4gICAgICAgIHVzZU5ld1VybFBhcnNlcjogdHJ1ZSxcclxuICAgICAgICB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUsXHJcbiAgICAgICAgc2VydmVyU2VsZWN0aW9uVGltZW91dE1TOiAzMDAwMCwgLy8gMzAgc2Vjb25kc1xyXG4gICAgICAgIGNvbm5lY3RUaW1lb3V0TVM6IDMwMDAwLCAvLyAzMCBzZWNvbmRzXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChtb25nb29zZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uZ29EQiBjb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5IOKchVwiKTtcclxuICAgICAgICByZXR1cm4gbW9uZ29vc2U7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9uZ29EQiBjb25uZWN0aW9uIGVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGNvbm5lY3QgdG8gTW9uZ29EQi5cIik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gQHRzLWlnbm9yZVxyXG4gIGdsb2JhbC5tb25nb29zZS5jb25uID0gYXdhaXQgZ2xvYmFsLm1vbmdvb3NlLnByb21pc2U7XHJcbiAgLy8gQHRzLWlnbm9yZVxyXG4gIHJldHVybiBnbG9iYWwubW9uZ29vc2UuY29ubjtcclxufVxyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19BVExBU19EQl9MSU5LIiwiZ2xvYmFsIiwiY29ubiIsInByb21pc2UiLCJjb25uZWN0VG9EYXRhYmFzZSIsImNvbnNvbGUiLCJsb2ciLCJjb25uZWN0IiwidXNlTmV3VXJsUGFyc2VyIiwidXNlVW5pZmllZFRvcG9sb2d5Iiwic2VydmVyU2VsZWN0aW9uVGltZW91dE1TIiwiY29ubmVjdFRpbWVvdXRNUyIsInRoZW4iLCJjYXRjaCIsImVycm9yIiwiRXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./models/userModel.ts":
/*!*****************************!*\
  !*** ./models/userModel.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    email: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    firstname: {\n        type: String,\n        required: true\n    },\n    middlename: {\n        type: String,\n        required: true\n    },\n    lastname: {\n        type: String,\n        required: true\n    },\n    password: {\n        type: String,\n        required: true\n    }\n}, {\n    timestamps: true\n});\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvdXNlck1vZGVsLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFnQztBQVVoQyxNQUFNQyxhQUFhLElBQUlELHdEQUFlLENBQ3BDO0lBQ0VHLE9BQU87UUFBRUMsTUFBTUM7UUFBUUMsVUFBVTtRQUFNQyxRQUFRO0lBQUs7SUFDcERDLFdBQVc7UUFBRUosTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQzFDRyxZQUFZO1FBQUVMLE1BQU1DO1FBQVFDLFVBQVU7SUFBSztJQUMzQ0ksVUFBVTtRQUFFTixNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDekNLLFVBQVU7UUFBRVAsTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0FBQzNDLEdBQ0E7SUFBRU0sWUFBWTtBQUFLO0FBR3JCLE1BQU1DLE9BQU9iLHdEQUFlLENBQUNhLElBQUksSUFBSWIscURBQWMsQ0FBUSxRQUFRQztBQUNuRSxpRUFBZVksSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxBU1VTIFRVRlxcRGVza3RvcFxccmVwb3NcXGVjb21tZXJjZVxcbW9kZWxzXFx1c2VyTW9kZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuaW50ZXJmYWNlIElVc2VyIHtcclxuICBlbWFpbDogc3RyaW5nO1xyXG4gIGZpcnN0bmFtZTogc3RyaW5nO1xyXG4gIG1pZGRsZW5hbWU6IHN0cmluZztcclxuICBsYXN0bmFtZTogc3RyaW5nO1xyXG4gIHBhc3N3b3JkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IFVzZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hPElVc2VyPihcclxuICB7XHJcbiAgICBlbWFpbDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCB1bmlxdWU6IHRydWUgfSxcclxuICAgIGZpcnN0bmFtZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICBtaWRkbGVuYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgIGxhc3RuYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgIHBhc3N3b3JkOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5jb25zdCBVc2VyID0gbW9uZ29vc2UubW9kZWxzLlVzZXIgfHwgbW9uZ29vc2UubW9kZWw8SVVzZXI+KFwiVXNlclwiLCBVc2VyU2NoZW1hKTtcclxuZXhwb3J0IGRlZmF1bHQgVXNlcjtcclxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiVXNlclNjaGVtYSIsIlNjaGVtYSIsImVtYWlsIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidW5pcXVlIiwiZmlyc3RuYW1lIiwibWlkZGxlbmFtZSIsImxhc3RuYW1lIiwicGFzc3dvcmQiLCJ0aW1lc3RhbXBzIiwiVXNlciIsIm1vZGVscyIsIm1vZGVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./models/userModel.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5CASUS%20TUF%5CDesktop%5Crepos%5Cecommerce%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CASUS%20TUF%5CDesktop%5Crepos%5Cecommerce&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5CASUS%20TUF%5CDesktop%5Crepos%5Cecommerce%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CASUS%20TUF%5CDesktop%5Crepos%5Cecommerce&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ASUS_TUF_Desktop_repos_ecommerce_app_api_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/login/route.ts */ \"(rsc)/./app/api/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/login/route\",\n        pathname: \"/api/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/login/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ASUS TUF\\\\Desktop\\\\repos\\\\ecommerce\\\\app\\\\api\\\\login\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ASUS_TUF_Desktop_repos_ecommerce_app_api_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsb2dpbiUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbG9naW4lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBU1VTJTIwVFVGJTVDRGVza3RvcCU1Q3JlcG9zJTVDZWNvbW1lcmNlJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNBU1VTJTIwVFVGJTVDRGVza3RvcCU1Q3JlcG9zJTVDZWNvbW1lcmNlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN5QjtBQUN0RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcQVNVUyBUVUZcXFxcRGVza3RvcFxcXFxyZXBvc1xcXFxlY29tbWVyY2VcXFxcYXBwXFxcXGFwaVxcXFxsb2dpblxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbG9naW4vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9sb2dpblwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbG9naW4vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxBU1VTIFRVRlxcXFxEZXNrdG9wXFxcXHJlcG9zXFxcXGVjb21tZXJjZVxcXFxhcHBcXFxcYXBpXFxcXGxvZ2luXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5CASUS%20TUF%5CDesktop%5Crepos%5Cecommerce%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CASUS%20TUF%5CDesktop%5Crepos%5Cecommerce&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-action-entry-loader.js?actions=%5B%5B%22C%3A%5C%5CUsers%5C%5CASUS%20TUF%5C%5CDesktop%5C%5Crepos%5C%5Cecommerce%5C%5Cutils%5C%5CasyncHelpers.ts%22%2C%5B%7B%22id%22%3A%227f0d882a34a73dcc239af62723c4839f9d017567e4%22%2C%22exportedName%22%3A%22deleteCloudinaryImage%22%7D%2C%7B%22id%22%3A%227f0e4d342508087bbfa9fefcf150fcaff221578e20%22%2C%22exportedName%22%3A%22comparePassword%22%7D%2C%7B%22id%22%3A%227f53e7dd406bb2947db66444f7469aa19a44827a1f%22%2C%22exportedName%22%3A%22replaceNewImagefromCurrentImage%22%7D%2C%7B%22id%22%3A%227fcb900ea0df8eb0f50601043ee0a0424e47e93011%22%2C%22exportedName%22%3A%22hashPassword%22%7D%5D%5D%5D&__client_imported__=!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-action-entry-loader.js?actions=%5B%5B%22C%3A%5C%5CUsers%5C%5CASUS%20TUF%5C%5CDesktop%5C%5Crepos%5C%5Cecommerce%5C%5Cutils%5C%5CasyncHelpers.ts%22%2C%5B%7B%22id%22%3A%227f0d882a34a73dcc239af62723c4839f9d017567e4%22%2C%22exportedName%22%3A%22deleteCloudinaryImage%22%7D%2C%7B%22id%22%3A%227f0e4d342508087bbfa9fefcf150fcaff221578e20%22%2C%22exportedName%22%3A%22comparePassword%22%7D%2C%7B%22id%22%3A%227f53e7dd406bb2947db66444f7469aa19a44827a1f%22%2C%22exportedName%22%3A%22replaceNewImagefromCurrentImage%22%7D%2C%7B%22id%22%3A%227fcb900ea0df8eb0f50601043ee0a0424e47e93011%22%2C%22exportedName%22%3A%22hashPassword%22%7D%5D%5D%5D&__client_imported__=! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"7f0d882a34a73dcc239af62723c4839f9d017567e4\": () => (/* reexport safe */ C_Users_ASUS_TUF_Desktop_repos_ecommerce_utils_asyncHelpers_ts__WEBPACK_IMPORTED_MODULE_0__.deleteCloudinaryImage),\n/* harmony export */   \"7f0e4d342508087bbfa9fefcf150fcaff221578e20\": () => (/* reexport safe */ C_Users_ASUS_TUF_Desktop_repos_ecommerce_utils_asyncHelpers_ts__WEBPACK_IMPORTED_MODULE_0__.comparePassword),\n/* harmony export */   \"7f53e7dd406bb2947db66444f7469aa19a44827a1f\": () => (/* reexport safe */ C_Users_ASUS_TUF_Desktop_repos_ecommerce_utils_asyncHelpers_ts__WEBPACK_IMPORTED_MODULE_0__.replaceNewImagefromCurrentImage),\n/* harmony export */   \"7fcb900ea0df8eb0f50601043ee0a0424e47e93011\": () => (/* reexport safe */ C_Users_ASUS_TUF_Desktop_repos_ecommerce_utils_asyncHelpers_ts__WEBPACK_IMPORTED_MODULE_0__.hashPassword)\n/* harmony export */ });\n/* harmony import */ var C_Users_ASUS_TUF_Desktop_repos_ecommerce_utils_asyncHelpers_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/asyncHelpers.ts */ \"(rsc)/./utils/asyncHelpers.ts\");\n\n\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWZsaWdodC1hY3Rpb24tZW50cnktbG9hZGVyLmpzP2FjdGlvbnM9JTVCJTVCJTIyQyUzQSU1QyU1Q1VzZXJzJTVDJTVDQVNVUyUyMFRVRiU1QyU1Q0Rlc2t0b3AlNUMlNUNyZXBvcyU1QyU1Q2Vjb21tZXJjZSU1QyU1Q3V0aWxzJTVDJTVDYXN5bmNIZWxwZXJzLnRzJTIyJTJDJTVCJTdCJTIyaWQlMjIlM0ElMjI3ZjBkODgyYTM0YTczZGNjMjM5YWY2MjcyM2M0ODM5ZjlkMDE3NTY3ZTQlMjIlMkMlMjJleHBvcnRlZE5hbWUlMjIlM0ElMjJkZWxldGVDbG91ZGluYXJ5SW1hZ2UlMjIlN0QlMkMlN0IlMjJpZCUyMiUzQSUyMjdmMGU0ZDM0MjUwODA4N2JiZmE5ZmVmY2YxNTBmY2FmZjIyMTU3OGUyMCUyMiUyQyUyMmV4cG9ydGVkTmFtZSUyMiUzQSUyMmNvbXBhcmVQYXNzd29yZCUyMiU3RCUyQyU3QiUyMmlkJTIyJTNBJTIyN2Y1M2U3ZGQ0MDZiYjI5NDdkYjY2NDQ0Zjc0NjlhYTE5YTQ0ODI3YTFmJTIyJTJDJTIyZXhwb3J0ZWROYW1lJTIyJTNBJTIycmVwbGFjZU5ld0ltYWdlZnJvbUN1cnJlbnRJbWFnZSUyMiU3RCUyQyU3QiUyMmlkJTIyJTNBJTIyN2ZjYjkwMGVhMGRmOGViMGY1MDYwMTA0M2VlMGEwNDI0ZTQ3ZTkzMDExJTIyJTJDJTIyZXhwb3J0ZWROYW1lJTIyJTNBJTIyaGFzaFBhc3N3b3JkJTIyJTdEJTVEJTVEJTVEJl9fY2xpZW50X2ltcG9ydGVkX189ISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDOEo7QUFDTjtBQUNnQjtBQUNuQiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IHsgZGVsZXRlQ2xvdWRpbmFyeUltYWdlIGFzIFwiN2YwZDg4MmEzNGE3M2RjYzIzOWFmNjI3MjNjNDgzOWY5ZDAxNzU2N2U0XCIgfSBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcQVNVUyBUVUZcXFxcRGVza3RvcFxcXFxyZXBvc1xcXFxlY29tbWVyY2VcXFxcdXRpbHNcXFxcYXN5bmNIZWxwZXJzLnRzXCJcbmV4cG9ydCB7IGNvbXBhcmVQYXNzd29yZCBhcyBcIjdmMGU0ZDM0MjUwODA4N2JiZmE5ZmVmY2YxNTBmY2FmZjIyMTU3OGUyMFwiIH0gZnJvbSBcIkM6XFxcXFVzZXJzXFxcXEFTVVMgVFVGXFxcXERlc2t0b3BcXFxccmVwb3NcXFxcZWNvbW1lcmNlXFxcXHV0aWxzXFxcXGFzeW5jSGVscGVycy50c1wiXG5leHBvcnQgeyByZXBsYWNlTmV3SW1hZ2Vmcm9tQ3VycmVudEltYWdlIGFzIFwiN2Y1M2U3ZGQ0MDZiYjI5NDdkYjY2NDQ0Zjc0NjlhYTE5YTQ0ODI3YTFmXCIgfSBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcQVNVUyBUVUZcXFxcRGVza3RvcFxcXFxyZXBvc1xcXFxlY29tbWVyY2VcXFxcdXRpbHNcXFxcYXN5bmNIZWxwZXJzLnRzXCJcbmV4cG9ydCB7IGhhc2hQYXNzd29yZCBhcyBcIjdmY2I5MDBlYTBkZjhlYjBmNTA2MDEwNDNlZTBhMDQyNGU0N2U5MzAxMVwiIH0gZnJvbSBcIkM6XFxcXFVzZXJzXFxcXEFTVVMgVFVGXFxcXERlc2t0b3BcXFxccmVwb3NcXFxcZWNvbW1lcmNlXFxcXHV0aWxzXFxcXGFzeW5jSGVscGVycy50c1wiXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-action-entry-loader.js?actions=%5B%5B%22C%3A%5C%5CUsers%5C%5CASUS%20TUF%5C%5CDesktop%5C%5Crepos%5C%5Cecommerce%5C%5Cutils%5C%5CasyncHelpers.ts%22%2C%5B%7B%22id%22%3A%227f0d882a34a73dcc239af62723c4839f9d017567e4%22%2C%22exportedName%22%3A%22deleteCloudinaryImage%22%7D%2C%7B%22id%22%3A%227f0e4d342508087bbfa9fefcf150fcaff221578e20%22%2C%22exportedName%22%3A%22comparePassword%22%7D%2C%7B%22id%22%3A%227f53e7dd406bb2947db66444f7469aa19a44827a1f%22%2C%22exportedName%22%3A%22replaceNewImagefromCurrentImage%22%7D%2C%7B%22id%22%3A%227fcb900ea0df8eb0f50601043ee0a0424e47e93011%22%2C%22exportedName%22%3A%22hashPassword%22%7D%5D%5D%5D&__client_imported__=!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./utils/asyncHelpers.ts":
/*!*******************************!*\
  !*** ./utils/asyncHelpers.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   comparePassword: () => (/* binding */ comparePassword),\n/* harmony export */   deleteCloudinaryImage: () => (/* binding */ deleteCloudinaryImage),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   replaceNewImagefromCurrentImage: () => (/* binding */ replaceNewImagefromCurrentImage)\n/* harmony export */ });\n/* harmony import */ var private_next_rsc_server_reference__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! private-next-rsc-server-reference */ \"(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js\");\n/* harmony import */ var private_next_rsc_action_encryption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! private-next-rsc-action-encryption */ \"(rsc)/./node_modules/next/dist/server/app-render/encryption.js\");\n/* harmony import */ var private_next_rsc_action_encryption__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(private_next_rsc_action_encryption__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_cloudinaryConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/cloudinaryConfig */ \"(rsc)/./lib/cloudinaryConfig.ts\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constant */ \"(rsc)/./utils/constant.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var _nonAsyncHelpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./nonAsyncHelpers */ \"(rsc)/./utils/nonAsyncHelpers.ts\");\n/* harmony import */ var private_next_rsc_action_validate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! private-next-rsc-action-validate */ \"(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js\");\n/* __next_internal_action_entry_do_not_use__ {\"7f0d882a34a73dcc239af62723c4839f9d017567e4\":\"deleteCloudinaryImage\",\"7f0e4d342508087bbfa9fefcf150fcaff221578e20\":\"comparePassword\",\"7f53e7dd406bb2947db66444f7469aa19a44827a1f\":\"replaceNewImagefromCurrentImage\",\"7fcb900ea0df8eb0f50601043ee0a0424e47e93011\":\"hashPassword\"} */ \n\n\n\n\n\n\nconst deleteCloudinaryImage = async (publicId)=>{\n    if (!publicId) return null;\n    try {\n        const result = await _lib_cloudinaryConfig__WEBPACK_IMPORTED_MODULE_2__[\"default\"].v2.uploader.destroy(publicId);\n        return result;\n    } catch (error) {\n        console.error(\"Error deleting from Cloudinary:\", error);\n        throw error;\n    }\n};\nconst replaceNewImagefromCurrentImage = async (collection, id)=>{\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_3__.connectToDatabase)();\n        const res = await collection.findById(id); // Use findById instead of find\n        if (res) {\n            const publicId = (0,_nonAsyncHelpers__WEBPACK_IMPORTED_MODULE_6__.getCloudinaryPublicId)(res.image_url);\n            if (publicId) {\n                await deleteCloudinaryImage(publicId);\n            }\n        }\n    } catch (error) {\n        console.log(error);\n    }\n};\nconst hashPassword = async (password)=>{\n    return await bcryptjs__WEBPACK_IMPORTED_MODULE_5__[\"default\"].hash(password, _constant__WEBPACK_IMPORTED_MODULE_4__.SALT_ROUNDS);\n};\nconst comparePassword = async (password, hashedPassword)=>{\n    return await bcryptjs__WEBPACK_IMPORTED_MODULE_5__[\"default\"].compare(password, hashedPassword);\n};\n\n(0,private_next_rsc_action_validate__WEBPACK_IMPORTED_MODULE_7__.ensureServerEntryExports)([\n    deleteCloudinaryImage,\n    replaceNewImagefromCurrentImage,\n    hashPassword,\n    comparePassword\n]);\n(0,private_next_rsc_server_reference__WEBPACK_IMPORTED_MODULE_0__.registerServerReference)(deleteCloudinaryImage, \"7f0d882a34a73dcc239af62723c4839f9d017567e4\", null);\n(0,private_next_rsc_server_reference__WEBPACK_IMPORTED_MODULE_0__.registerServerReference)(replaceNewImagefromCurrentImage, \"7f53e7dd406bb2947db66444f7469aa19a44827a1f\", null);\n(0,private_next_rsc_server_reference__WEBPACK_IMPORTED_MODULE_0__.registerServerReference)(hashPassword, \"7fcb900ea0df8eb0f50601043ee0a0424e47e93011\", null);\n(0,private_next_rsc_server_reference__WEBPACK_IMPORTED_MODULE_0__.registerServerReference)(comparePassword, \"7f0e4d342508087bbfa9fefcf150fcaff221578e20\", null);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi91dGlscy9hc3luY0hlbHBlcnMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ2dEO0FBQ0U7QUFFVDtBQUNYO0FBQzRCO0FBRW5ELE1BQU1LLHdCQUF3QixPQUFPQztJQUMxQyxJQUFJLENBQUNBLFVBQVUsT0FBTztJQUV0QixJQUFJO1FBQ0YsTUFBTUMsU0FBUyxNQUFNUCw2REFBVUEsQ0FBQ1EsRUFBRSxDQUFDQyxRQUFRLENBQUNDLE9BQU8sQ0FBQ0o7UUFDcEQsT0FBT0M7SUFDVCxFQUFFLE9BQU9JLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLG1DQUFtQ0E7UUFDakQsTUFBTUE7SUFDUjtBQUNGLEVBQUU7QUFFSyxNQUFNRSxrQ0FBa0MsT0FDN0NDLFlBQ0FDO0lBRUEsSUFBSTtRQUNGLE1BQU1kLCtEQUFpQkE7UUFDdkIsTUFBTWUsTUFBTSxNQUFNRixXQUFXRyxRQUFRLENBQUNGLEtBQUssK0JBQStCO1FBRTFFLElBQUlDLEtBQUs7WUFDUCxNQUFNVixXQUFXRix1RUFBcUJBLENBQUNZLElBQUlFLFNBQVM7WUFDcEQsSUFBSVosVUFBVTtnQkFDWixNQUFNRCxzQkFBc0JDO1lBQzlCO1FBQ0Y7SUFDRixFQUFFLE9BQU9LLE9BQU87UUFDZEMsUUFBUU8sR0FBRyxDQUFDUjtJQUNkO0FBQ0YsRUFBRTtBQUVLLE1BQU1TLGVBQWUsT0FBT0M7SUFDakMsT0FBTyxNQUFNbEIscURBQVcsQ0FBQ2tCLFVBQVVuQixrREFBV0E7QUFDaEQsRUFBRTtBQUVLLE1BQU1xQixrQkFBa0IsT0FDN0JGLFVBQ0FHO0lBRUEsT0FBTyxNQUFNckIsd0RBQWMsQ0FBQ2tCLFVBQVVHO0FBQ3hDLEVBQUU7OztJQXhDV25CO0lBWUFRO0lBbUJBTztJQUlBRzs7QUFuQ0FsQiwwRkFBQUEsQ0FBQUE7QUFZQVEsMEZBQUFBLENBQUFBO0FBbUJBTywwRkFBQUEsQ0FBQUE7QUFJQUcsMEZBQUFBLENBQUFBIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEFTVVMgVFVGXFxEZXNrdG9wXFxyZXBvc1xcZWNvbW1lcmNlXFx1dGlsc1xcYXN5bmNIZWxwZXJzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xyXG5pbXBvcnQgY2xvdWRpbmFyeSBmcm9tIFwiQC9saWIvY2xvdWRpbmFyeUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0VG9EYXRhYmFzZSB9IGZyb20gXCJAL2xpYi9tb25nb2RiXCI7XHJcblxyXG5pbXBvcnQgeyBTQUxUX1JPVU5EUyB9IGZyb20gXCIuL2NvbnN0YW50XCI7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XHJcbmltcG9ydCB7IGdldENsb3VkaW5hcnlQdWJsaWNJZCB9IGZyb20gXCIuL25vbkFzeW5jSGVscGVyc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNsb3VkaW5hcnlJbWFnZSA9IGFzeW5jIChwdWJsaWNJZDogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCFwdWJsaWNJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbG91ZGluYXJ5LnYyLnVwbG9hZGVyLmRlc3Ryb3kocHVibGljSWQpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGZyb20gQ2xvdWRpbmFyeTpcIiwgZXJyb3IpO1xyXG4gICAgdGhyb3cgZXJyb3I7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlcGxhY2VOZXdJbWFnZWZyb21DdXJyZW50SW1hZ2UgPSBhc3luYyAoXHJcbiAgY29sbGVjdGlvbjogYW55LFxyXG4gIGlkOiBzdHJpbmdcclxuKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGNvbm5lY3RUb0RhdGFiYXNlKCk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBjb2xsZWN0aW9uLmZpbmRCeUlkKGlkKTsgLy8gVXNlIGZpbmRCeUlkIGluc3RlYWQgb2YgZmluZFxyXG5cclxuICAgIGlmIChyZXMpIHtcclxuICAgICAgY29uc3QgcHVibGljSWQgPSBnZXRDbG91ZGluYXJ5UHVibGljSWQocmVzLmltYWdlX3VybCk7XHJcbiAgICAgIGlmIChwdWJsaWNJZCkge1xyXG4gICAgICAgIGF3YWl0IGRlbGV0ZUNsb3VkaW5hcnlJbWFnZShwdWJsaWNJZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYXNoUGFzc3dvcmQgPSBhc3luYyAocGFzc3dvcmQ6IHN0cmluZykgPT4ge1xyXG4gIHJldHVybiBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgU0FMVF9ST1VORFMpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbXBhcmVQYXNzd29yZCA9IGFzeW5jIChcclxuICBwYXNzd29yZDogc3RyaW5nLFxyXG4gIGhhc2hlZFBhc3N3b3JkOiBzdHJpbmdcclxuKSA9PiB7XHJcbiAgcmV0dXJuIGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCBoYXNoZWRQYXNzd29yZCk7XHJcbn07XHJcbiJdLCJuYW1lcyI6WyJjbG91ZGluYXJ5IiwiY29ubmVjdFRvRGF0YWJhc2UiLCJTQUxUX1JPVU5EUyIsImJjcnlwdCIsImdldENsb3VkaW5hcnlQdWJsaWNJZCIsImRlbGV0ZUNsb3VkaW5hcnlJbWFnZSIsInB1YmxpY0lkIiwicmVzdWx0IiwidjIiLCJ1cGxvYWRlciIsImRlc3Ryb3kiLCJlcnJvciIsImNvbnNvbGUiLCJyZXBsYWNlTmV3SW1hZ2Vmcm9tQ3VycmVudEltYWdlIiwiY29sbGVjdGlvbiIsImlkIiwicmVzIiwiZmluZEJ5SWQiLCJpbWFnZV91cmwiLCJsb2ciLCJoYXNoUGFzc3dvcmQiLCJwYXNzd29yZCIsImhhc2giLCJjb21wYXJlUGFzc3dvcmQiLCJoYXNoZWRQYXNzd29yZCIsImNvbXBhcmUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./utils/asyncHelpers.ts\n");

/***/ }),

/***/ "(rsc)/./utils/constant.ts":
/*!***************************!*\
  !*** ./utils/constant.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SALT_ROUNDS: () => (/* binding */ SALT_ROUNDS)\n/* harmony export */ });\nconst SALT_ROUNDS = 10;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi91dGlscy9jb25zdGFudC50cyIsIm1hcHBpbmdzIjoiOzs7O0FBQU8sTUFBTUEsY0FBYyxHQUFHIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEFTVVMgVFVGXFxEZXNrdG9wXFxyZXBvc1xcZWNvbW1lcmNlXFx1dGlsc1xcY29uc3RhbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFNBTFRfUk9VTkRTID0gMTA7XHJcbiJdLCJuYW1lcyI6WyJTQUxUX1JPVU5EUyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./utils/constant.ts\n");

/***/ }),

/***/ "(rsc)/./utils/nonAsyncHelpers.ts":
/*!**********************************!*\
  !*** ./utils/nonAsyncHelpers.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formattedDate: () => (/* binding */ formattedDate),\n/* harmony export */   getCloudinaryPublicId: () => (/* binding */ getCloudinaryPublicId),\n/* harmony export */   getDecodedToken: () => (/* binding */ getDecodedToken),\n/* harmony export */   getMetadata: () => (/* binding */ getMetadata),\n/* harmony export */   passwordValidation: () => (/* binding */ passwordValidation),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var _barrel_optimize_names_format_date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! __barrel_optimize__?names=format!=!date-fns */ \"(rsc)/./node_modules/date-fns/format.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst getCloudinaryPublicId = (url)=>{\n    if (!url) return null;\n    try {\n        const urlParts = url.split(\"/\");\n        const filenameWithExtension = urlParts.pop();\n        const folder = urlParts.pop();\n        if (!folder || !filenameWithExtension) return null;\n        const filename = filenameWithExtension.split(\".\")[0];\n        return `${folder}/${filename}`;\n    } catch (error) {\n        console.error(\"Error parsing Cloudinary URL:\", error);\n        return null;\n    }\n};\nconst passwordValidation = (isValidFormat, isPasswordMatch)=>{\n    return isValidFormat && isPasswordMatch ? true : false;\n};\nconst formattedDate = (date)=>{\n    return (0,_barrel_optimize_names_format_date_fns__WEBPACK_IMPORTED_MODULE_1__.format)(new Date(date), \"MM/dd/yyyy\");\n};\nconst getMetadata = (title, description)=>{\n    return {\n        title: `${title || \"Blogify\"}`,\n        description: description || \"Be updated on what is happening\"\n    };\n};\nconst verifyToken = (token)=>{\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, \"privatesecretjwtkey\");\n    } catch (err) {\n        return null;\n    }\n};\nconst getDecodedToken = ()=>{\n    const token = localStorage.getItem(\"token\");\n    if (!token) return null;\n    try {\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().decode(token);\n        return decoded;\n    } catch (err) {\n        console.error(\"Error decoding token\", err);\n        return null;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi91dGlscy9ub25Bc3luY0hlbHBlcnMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQWtDO0FBRWE7QUFDeEMsTUFBTUUsd0JBQXdCLENBQUNDO0lBQ3BDLElBQUksQ0FBQ0EsS0FBSyxPQUFPO0lBRWpCLElBQUk7UUFDRixNQUFNQyxXQUFXRCxJQUFJRSxLQUFLLENBQUM7UUFDM0IsTUFBTUMsd0JBQXdCRixTQUFTRyxHQUFHO1FBQzFDLE1BQU1DLFNBQVNKLFNBQVNHLEdBQUc7UUFFM0IsSUFBSSxDQUFDQyxVQUFVLENBQUNGLHVCQUF1QixPQUFPO1FBRTlDLE1BQU1HLFdBQVdILHNCQUFzQkQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3BELE9BQU8sR0FBR0csT0FBTyxDQUFDLEVBQUVDLFVBQVU7SUFDaEMsRUFBRSxPQUFPQyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxpQ0FBaUNBO1FBQy9DLE9BQU87SUFDVDtBQUNGLEVBQUU7QUFFSyxNQUFNRSxxQkFBcUIsQ0FDaENDLGVBQ0FDO0lBRUEsT0FBT0QsaUJBQWlCQyxrQkFBa0IsT0FBTztBQUNuRCxFQUFFO0FBRUssTUFBTUMsZ0JBQWdCLENBQUNDO0lBQzVCLE9BQU9oQiw4RUFBTUEsQ0FBQyxJQUFJaUIsS0FBS0QsT0FBTztBQUNoQyxFQUFFO0FBRUssTUFBTUUsY0FBYyxDQUFDQyxPQUFlQztJQUN6QyxPQUFPO1FBQ0xELE9BQU8sR0FBR0EsU0FBUyxXQUFXO1FBQzlCQyxhQUFhQSxlQUFlO0lBQzlCO0FBQ0YsRUFBRTtBQUVLLE1BQU1DLGNBQWMsQ0FBQ0M7SUFDMUIsSUFBSTtRQUNGLE9BQU9yQiwwREFBVSxDQUFDcUIsT0FBT0UscUJBQWtDO0lBQzdELEVBQUUsT0FBT0csS0FBSztRQUNaLE9BQU87SUFDVDtBQUNGLEVBQUU7QUFFSyxNQUFNQyxrQkFBa0I7SUFDN0IsTUFBTU4sUUFBUU8sYUFBYUMsT0FBTyxDQUFDO0lBQ25DLElBQUksQ0FBQ1IsT0FBTyxPQUFPO0lBRW5CLElBQUk7UUFDRixNQUFNUyxVQUFVOUIsMERBQVUsQ0FBQ3FCO1FBQzNCLE9BQU9TO0lBQ1QsRUFBRSxPQUFPSixLQUFLO1FBQ1poQixRQUFRRCxLQUFLLENBQUMsd0JBQXdCaUI7UUFDdEMsT0FBTztJQUNUO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxBU1VTIFRVRlxcRGVza3RvcFxccmVwb3NcXGVjb21tZXJjZVxcdXRpbHNcXG5vbkFzeW5jSGVscGVycy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmb3JtYXQgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcclxuaW1wb3J0IHR5cGUgeyBNZXRhZGF0YSB9IGZyb20gXCJuZXh0XCI7XHJcbmltcG9ydCBqd3QsIHsgSnd0UGF5bG9hZCB9IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuZXhwb3J0IGNvbnN0IGdldENsb3VkaW5hcnlQdWJsaWNJZCA9ICh1cmw6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdXJsKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVybFBhcnRzID0gdXJsLnNwbGl0KFwiL1wiKTtcclxuICAgIGNvbnN0IGZpbGVuYW1lV2l0aEV4dGVuc2lvbiA9IHVybFBhcnRzLnBvcCgpO1xyXG4gICAgY29uc3QgZm9sZGVyID0gdXJsUGFydHMucG9wKCk7XHJcblxyXG4gICAgaWYgKCFmb2xkZXIgfHwgIWZpbGVuYW1lV2l0aEV4dGVuc2lvbikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgY29uc3QgZmlsZW5hbWUgPSBmaWxlbmFtZVdpdGhFeHRlbnNpb24uc3BsaXQoXCIuXCIpWzBdO1xyXG4gICAgcmV0dXJuIGAke2ZvbGRlcn0vJHtmaWxlbmFtZX1gO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBDbG91ZGluYXJ5IFVSTDpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHBhc3N3b3JkVmFsaWRhdGlvbiA9IChcclxuICBpc1ZhbGlkRm9ybWF0OiBib29sZWFuLFxyXG4gIGlzUGFzc3dvcmRNYXRjaDogYm9vbGVhblxyXG4pID0+IHtcclxuICByZXR1cm4gaXNWYWxpZEZvcm1hdCAmJiBpc1Bhc3N3b3JkTWF0Y2ggPyB0cnVlIDogZmFsc2U7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IChkYXRlOiBzdHJpbmcpID0+IHtcclxuICByZXR1cm4gZm9ybWF0KG5ldyBEYXRlKGRhdGUpLCBcIk1NL2RkL3l5eXlcIik7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0TWV0YWRhdGEgPSAodGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb24/OiBzdHJpbmcpOiBNZXRhZGF0YSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHRpdGxlOiBgJHt0aXRsZSB8fCBcIkJsb2dpZnlcIn1gLFxyXG4gICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IFwiQmUgdXBkYXRlZCBvbiB3aGF0IGlzIGhhcHBlbmluZ1wiLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdmVyaWZ5VG9rZW4gPSAodG9rZW46IHN0cmluZykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfSldUX1NFQ1JFVCBhcyBzdHJpbmcpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldERlY29kZWRUb2tlbiA9ICgpOiBKd3RQYXlsb2FkIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpO1xyXG4gIGlmICghdG9rZW4pIHJldHVybiBudWxsO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgZGVjb2RlZCA9IGp3dC5kZWNvZGUodG9rZW4pO1xyXG4gICAgcmV0dXJuIGRlY29kZWQgYXMgSnd0UGF5bG9hZDtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWNvZGluZyB0b2tlblwiLCBlcnIpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG4iXSwibmFtZXMiOlsiZm9ybWF0Iiwiand0IiwiZ2V0Q2xvdWRpbmFyeVB1YmxpY0lkIiwidXJsIiwidXJsUGFydHMiLCJzcGxpdCIsImZpbGVuYW1lV2l0aEV4dGVuc2lvbiIsInBvcCIsImZvbGRlciIsImZpbGVuYW1lIiwiZXJyb3IiLCJjb25zb2xlIiwicGFzc3dvcmRWYWxpZGF0aW9uIiwiaXNWYWxpZEZvcm1hdCIsImlzUGFzc3dvcmRNYXRjaCIsImZvcm1hdHRlZERhdGUiLCJkYXRlIiwiRGF0ZSIsImdldE1ldGFkYXRhIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInZlcmlmeVRva2VuIiwidG9rZW4iLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfSldUX1NFQ1JFVCIsImVyciIsImdldERlY29kZWRUb2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJkZWNvZGVkIiwiZGVjb2RlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./utils/nonAsyncHelpers.ts\n");

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/date-fns","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time","vendor-chunks/lodash","vendor-chunks/cloudinary","vendor-chunks/bcryptjs","vendor-chunks/q"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5CASUS%20TUF%5CDesktop%5Crepos%5Cecommerce%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CASUS%20TUF%5CDesktop%5Crepos%5Cecommerce&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();