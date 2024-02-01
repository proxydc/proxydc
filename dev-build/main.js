/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./db.js":
/*!***************!*\
  !*** ./db.js ***!
  \***************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Pool = (__webpack_require__(/*! pg */ \"pg\").Pool);\nconst pool = new Pool({\n  host: 'localhost',\n  port: 5432,\n  database: 'postgres',\n  user: 'postgres',\n  password: 'Proxiad2024*!'\n});\nmodule.exports = pool;\n\n//# sourceURL=webpack://nodebackend/./db.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst accountRoutes = __webpack_require__(/*! ./src/account/routes */ \"./src/account/routes.js\");\nconst app = express();\nconst PORT = 3000;\napp.use(express.json());\napp.get(\"/\", (req, res) => {\n  res.send(\"Hello Proxiad Backend!\");\n});\napp.use(\"/api/v1/accounts\", accountRoutes);\napp.listen(PORT, function check(err) {\n  if (err) console.log(\"error\");else console.log(\"started on port \" + PORT);\n});\n\n//# sourceURL=webpack://nodebackend/./server.js?");

/***/ }),

/***/ "./src/account/controller.js":
/*!***********************************!*\
  !*** ./src/account/controller.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const pool = __webpack_require__(/*! ../../db */ \"./db.js\");\nconst queries = __webpack_require__(/*! ./queries */ \"./src/account/queries.js\");\nconst getAuthentification = (req, res) => {\n  const {\n    login_name,\n    pass_word\n  } = req.body;\n  pool.query(queries.getAuthentification, [login_name, pass_word], (error, results) => {\n    if (error) throw error;\n    const noAccountFound = !results.rows.length;\n    if (noAccountFound) {\n      res.send(\"Login failed\");\n    }\n    res.status(200).send(\"Login success!\");\n  });\n};\nconst getAccounts = (req, res) => {\n  pool.query(queries.getAccounts, (error, results) => {\n    if (error) throw error;\n    res.status(200).json(results.rows);\n  });\n};\nconst getAccountById = (req, res) => {\n  const id = parseInt(req.params.id);\n  pool.query(queries.getAccountById, [id], (error, results) => {\n    if (error) throw error;\n    res.status(200).json(results.rows);\n  });\n};\nconst addAccount = (req, res) => {\n  const {\n    login_name,\n    diplay_name,\n    pass_word\n  } = req.body;\n\n  //check if login name exists\n  pool.query(queries.checkLoginExists, [login_name], (error, results) => {\n    if (results.rows.length) {\n      res.send(\"Login already exists.\");\n    }\n    //add account to db\n    pool.query(queries.addAccount, [login_name, diplay_name, pass_word], (error, results) => {\n      if (error) throw error;\n      res.status(201).send(\"Account created Successfully!\");\n      //console.log(\"Account created\");\n    });\n  });\n};\nconst deleteAccountById = (req, res) => {\n  const id = parseInt(req.params.id);\n  pool.query(queries.getAccountById, [id], (error, results) => {\n    const noAccountFound = !results.rows.length;\n    if (noAccountFound) {\n      res.send(\"Account does not exist in the database\");\n    }\n    pool.query(queries.deleteAccountById, [id], (error, results) => {\n      if (error) throw error;\n      res.status(200).send(\"Account deleted Successfully!\");\n    });\n  });\n};\nconst updateAccount = (req, res) => {\n  const id = parseInt(req.params.id);\n  const {\n    diplay_name,\n    pass_word\n  } = req.body;\n  pool.query(queries.getAccountById, [id], (error, results) => {\n    const noAccountFound = !results.rows.length;\n    if (noAccountFound) {\n      res.send(\"Account does not exist in the database\");\n    }\n    pool.query(queries.updateAccount, [id, diplay_name, pass_word], (error, results) => {\n      if (error) throw error;\n      res.status(200).send(\"Account updated Successfully!\");\n    });\n  });\n};\nmodule.exports = {\n  getAuthentification,\n  getAccounts,\n  getAccountById,\n  addAccount,\n  deleteAccountById,\n  updateAccount\n};\n\n//# sourceURL=webpack://nodebackend/./src/account/controller.js?");

/***/ }),

/***/ "./src/account/queries.js":
/*!********************************!*\
  !*** ./src/account/queries.js ***!
  \********************************/
/***/ ((module) => {

eval("const getAccounts = \"select * from account\";\nconst getAccountById = \"select * from account where id = $1\";\nconst checkLoginExists = \"select a from account a where a.login_name = $1\";\nconst addAccount = \"insert into account(login_name, diplay_name, pass_word) values ($1, $2, $3)\";\nconst updateAccount = \"update account set diplay_name = $2, pass_word = $3 where id = $1\";\nconst deleteAccountById = \"delete from account where id = $1\";\nconst getAuthentification = \"select a from account a where a.login_name = $1 and a.pass_word = $2\";\nmodule.exports = {\n  getAuthentification,\n  getAccounts,\n  getAccountById,\n  checkLoginExists,\n  addAccount,\n  updateAccount,\n  deleteAccountById\n};\n\n//# sourceURL=webpack://nodebackend/./src/account/queries.js?");

/***/ }),

/***/ "./src/account/routes.js":
/*!*******************************!*\
  !*** ./src/account/routes.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  Router\n} = __webpack_require__(/*! express */ \"express\");\nconst controller = __webpack_require__(/*! ./controller */ \"./src/account/controller.js\");\nconst router = Router();\nrouter.post(\"/\", controller.getAuthentification);\nrouter.get(\"/\", controller.getAccounts);\nrouter.post(\"/\", controller.addAccount);\nrouter.get(\"/:id\", controller.getAccountById);\nrouter.put(\"/:id\", controller.updateAccount);\nrouter.delete(\"/:id\", controller.deleteAccountById);\nmodule.exports = router;\n\n//# sourceURL=webpack://nodebackend/./src/account/routes.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("pg");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server.js");
/******/ 	
/******/ })()
;