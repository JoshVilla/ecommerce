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

/***/ "(app-pages-browser)/./app/page.tsx":
/*!**********************!*\
  !*** ./app/page.tsx ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_showcase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/showcase */ \"(app-pages-browser)/./components/showcase.tsx\");\n/* harmony import */ var _utils_nonAsyncHelpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/nonAsyncHelpers */ \"(app-pages-browser)/./utils/nonAsyncHelpers.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction Home() {\n    _s();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)({\n        \"Home.useEffect\": ()=>{\n            const token = localStorage.getItem(\"token\");\n            if (token) {\n                console.log((0,_utils_nonAsyncHelpers__WEBPACK_IMPORTED_MODULE_2__.verifyToken)(token), token, \"privatesecretjwtkey\");\n            }\n        }\n    }[\"Home.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"w-full\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-sky-500 text-white py-2 px-4 font-bold text-lg\",\n                children: \"Milktea\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ASUS TUF\\\\Desktop\\\\repos\\\\ecommerce\\\\app\\\\page.tsx\",\n                lineNumber: 22,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_showcase__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ASUS TUF\\\\Desktop\\\\repos\\\\ecommerce\\\\app\\\\page.tsx\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\ASUS TUF\\\\Desktop\\\\repos\\\\ecommerce\\\\app\\\\page.tsx\",\n        lineNumber: 21,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"OD7bBpZva5O2jO+Puf00hKivP7c=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUU2QztBQUNTO0FBRXBCO0FBRW5CLFNBQVNHOztJQUN0QkQsZ0RBQVNBOzBCQUFDO1lBQ1IsTUFBTUUsUUFBUUMsYUFBYUMsT0FBTyxDQUFDO1lBQ25DLElBQUlGLE9BQU87Z0JBQ1RHLFFBQVFDLEdBQUcsQ0FDVFAsbUVBQVdBLENBQUNHLFFBQ1pBLE9BQ0FLLHFCQUFrQztZQUV0QztRQUNGO3lCQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ0c7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNEO2dCQUFJQyxXQUFVOzBCQUFvRDs7Ozs7OzBCQUduRSw4REFBQ2IsNERBQVFBOzs7Ozs7Ozs7OztBQUdmO0dBcEJ3Qkc7S0FBQUEiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQVNVUyBUVUZcXERlc2t0b3BcXHJlcG9zXFxlY29tbWVyY2VcXGFwcFxccGFnZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcblxyXG5pbXBvcnQgU2hvd2Nhc2UgZnJvbSBcIkAvY29tcG9uZW50cy9zaG93Y2FzZVwiO1xyXG5pbXBvcnQgeyB2ZXJpZnlUb2tlbiB9IGZyb20gXCJAL3V0aWxzL25vbkFzeW5jSGVscGVyc1wiO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcclxuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIik7XHJcbiAgICBpZiAodG9rZW4pIHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgdmVyaWZ5VG9rZW4odG9rZW4pLFxyXG4gICAgICAgIHRva2VuLFxyXG4gICAgICAgIHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0pXVF9TRUNSRVRcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNreS01MDAgdGV4dC13aGl0ZSBweS0yIHB4LTQgZm9udC1ib2xkIHRleHQtbGdcIj5cclxuICAgICAgICBNaWxrdGVhXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8U2hvd2Nhc2UgLz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIlNob3djYXNlIiwidmVyaWZ5VG9rZW4iLCJ1c2VFZmZlY3QiLCJIb21lIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY29uc29sZSIsImxvZyIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19KV1RfU0VDUkVUIiwiZGl2IiwiY2xhc3NOYW1lIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/page.tsx\n"));

/***/ })

});