"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./components/navbar.tsx":
/*!*******************************!*\
  !*** ./components/navbar.tsx ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _utils_nonAsyncHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/nonAsyncHelpers */ \"(app-pages-browser)/./utils/nonAsyncHelpers.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\nconst Navbar = ()=>{\n    _s();\n    const [tokenInfo, setTokenInfo] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true); // 👈\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)({\n        \"Navbar.useEffect\": ()=>{\n            const decoded = (0,_utils_nonAsyncHelpers__WEBPACK_IMPORTED_MODULE_1__.getDecodedToken)();\n            setTokenInfo(decoded);\n            setLoading(false); // 👈 after checking token\n        }\n    }[\"Navbar.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"bg-sky-500 py-2 px-6 flex items-center justify-between\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"text-xl text-white font-semibold\",\n                children: \"Milktea\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ASUS TUF\\\\Desktop\\\\repos\\\\ecommerce\\\\components\\\\navbar.tsx\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"text-white\",\n                children: loading ? null : (tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.name) ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            children: \"Hello, \"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\ASUS TUF\\\\Desktop\\\\repos\\\\ecommerce\\\\components\\\\navbar.tsx\",\n                            lineNumber: 21,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"cursor-pointer hover:underline\",\n                            children: tokenInfo.name\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\ASUS TUF\\\\Desktop\\\\repos\\\\ecommerce\\\\components\\\\navbar.tsx\",\n                            lineNumber: 22,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\ASUS TUF\\\\Desktop\\\\repos\\\\ecommerce\\\\components\\\\navbar.tsx\",\n                    lineNumber: 20,\n                    columnNumber: 11\n                }, undefined) : \"Not logged in\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ASUS TUF\\\\Desktop\\\\repos\\\\ecommerce\\\\components\\\\navbar.tsx\",\n                lineNumber: 18,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\ASUS TUF\\\\Desktop\\\\repos\\\\ecommerce\\\\components\\\\navbar.tsx\",\n        lineNumber: 16,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Navbar, \"EH+MJc3P46WHL/fMG276XXhe2dU=\");\n_c = Navbar;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);\nvar _c;\n$RefreshReg$(_c, \"Navbar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvbmF2YmFyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTBEO0FBRVA7QUFFbkQsTUFBTUksU0FBUzs7SUFDYixNQUFNLENBQUNDLFdBQVdDLGFBQWEsR0FBR0gsK0NBQVFBLENBQW9CO0lBQzlELE1BQU0sQ0FBQ0ksU0FBU0MsV0FBVyxHQUFHTCwrQ0FBUUEsQ0FBQyxPQUFPLEtBQUs7SUFFbkRELGdEQUFTQTs0QkFBQztZQUNSLE1BQU1PLFVBQVVULHVFQUFlQTtZQUMvQk0sYUFBYUc7WUFDYkQsV0FBVyxRQUFRLDBCQUEwQjtRQUMvQzsyQkFBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNFO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDRDtnQkFBSUMsV0FBVTswQkFBbUM7Ozs7OzswQkFDbEQsOERBQUNEO2dCQUFJQyxXQUFVOzBCQUNaSixVQUFVLE9BQU9GLENBQUFBLHNCQUFBQSxnQ0FBQUEsVUFBV08sSUFBSSxrQkFDL0IsOERBQUNGOztzQ0FDQyw4REFBQ0c7c0NBQUs7Ozs7OztzQ0FDTiw4REFBQ0E7NEJBQUtGLFdBQVU7c0NBQ2JOLFVBQVVPLElBQUk7Ozs7Ozs7Ozs7O2dDQUluQjs7Ozs7Ozs7Ozs7O0FBS1Y7R0EzQk1SO0tBQUFBO0FBNkJOLGlFQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEFTVVMgVFVGXFxEZXNrdG9wXFxyZXBvc1xcZWNvbW1lcmNlXFxjb21wb25lbnRzXFxuYXZiYXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldERlY29kZWRUb2tlbiB9IGZyb20gXCJAL3V0aWxzL25vbkFzeW5jSGVscGVyc1wiO1xyXG5pbXBvcnQgeyBKd3RQYXlsb2FkIH0gZnJvbSBcImpzb253ZWJ0b2tlblwiO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuY29uc3QgTmF2YmFyID0gKCkgPT4ge1xyXG4gIGNvbnN0IFt0b2tlbkluZm8sIHNldFRva2VuSW5mb10gPSB1c2VTdGF0ZTxKd3RQYXlsb2FkIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7IC8vIPCfkYhcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGRlY29kZWQgPSBnZXREZWNvZGVkVG9rZW4oKTtcclxuICAgIHNldFRva2VuSW5mbyhkZWNvZGVkKTtcclxuICAgIHNldExvYWRpbmcoZmFsc2UpOyAvLyDwn5GIIGFmdGVyIGNoZWNraW5nIHRva2VuXHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiZy1za3ktNTAwIHB5LTIgcHgtNiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHRleHQtd2hpdGUgZm9udC1zZW1pYm9sZFwiPk1pbGt0ZWE8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+XHJcbiAgICAgICAge2xvYWRpbmcgPyBudWxsIDogdG9rZW5JbmZvPy5uYW1lID8gKFxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPHNwYW4+SGVsbG8sIDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3Vyc29yLXBvaW50ZXIgaG92ZXI6dW5kZXJsaW5lXCI+XHJcbiAgICAgICAgICAgICAge3Rva2VuSW5mby5uYW1lfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgXCJOb3QgbG9nZ2VkIGluXCJcclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7XHJcbiJdLCJuYW1lcyI6WyJnZXREZWNvZGVkVG9rZW4iLCJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiTmF2YmFyIiwidG9rZW5JbmZvIiwic2V0VG9rZW5JbmZvIiwibG9hZGluZyIsInNldExvYWRpbmciLCJkZWNvZGVkIiwiZGl2IiwiY2xhc3NOYW1lIiwibmFtZSIsInNwYW4iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/navbar.tsx\n"));

/***/ })

});