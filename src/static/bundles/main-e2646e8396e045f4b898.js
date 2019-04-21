/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./static/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static/js/app.js":
/*!**************************!*\
  !*** ./static/js/app.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/takashiminagawa/dev/tonestock/src/static/js/app.js: Unexpected token, expected \\\",\\\" (758:30)\\n\\n\\u001b[0m \\u001b[90m 756 | \\u001b[39m                \\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mcomments\\u001b[33m.\\u001b[39mpush({\\u001b[0m\\n\\u001b[0m \\u001b[90m 757 | \\u001b[39m                    username\\u001b[33m:\\u001b[39m \\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mcurrentUsername\\u001b[33m,\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 758 | \\u001b[39m                    text\\u001b[33m:\\u001b[39m text\\u001b[33m:\\u001b[39m \\u001b[32m''\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m     | \\u001b[39m                              \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 759 | \\u001b[39m                })\\u001b[0m\\n\\u001b[0m \\u001b[90m 760 | \\u001b[39m                \\u001b[36mvar\\u001b[39m csrfToken \\u001b[33m=\\u001b[39m $(\\u001b[32m\\\"[name=csrfmiddlewaretoken]\\\"\\u001b[39m)\\u001b[33m.\\u001b[39mval()\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 761 | \\u001b[39m                axios\\u001b[33m.\\u001b[39mpost(\\u001b[32m'/tones/comment/'\\u001b[39m\\u001b[33m,\\u001b[39m\\u001b[0m\\n    at Parser.raise (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:3851:17)\\n    at Parser.unexpected (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5167:16)\\n    at Parser.expect (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5153:28)\\n    at Parser.parseObj (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:6637:14)\\n    at Parser.parseExprAtom (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:6274:21)\\n    at Parser.parseExprSubscripts (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5914:23)\\n    at Parser.parseMaybeUnary (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5894:21)\\n    at Parser.parseExprOps (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5781:23)\\n    at Parser.parseMaybeConditional (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5754:23)\\n    at Parser.parseMaybeAssign (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5701:21)\\n    at Parser.parseExprListItem (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:6977:18)\\n    at Parser.parseCallExpressionArguments (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:6121:22)\\n    at Parser.parseSubscript (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:6016:29)\\n    at Parser.parseSubscripts (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5935:19)\\n    at Parser.parseExprSubscripts (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5924:17)\\n    at Parser.parseMaybeUnary (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5894:21)\\n    at Parser.parseExprOps (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5781:23)\\n    at Parser.parseMaybeConditional (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5754:23)\\n    at Parser.parseMaybeAssign (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5701:21)\\n    at Parser.parseExpression (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:5649:23)\\n    at Parser.parseStatementContent (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:7420:23)\\n    at Parser.parseStatement (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:7291:17)\\n    at Parser.parseBlockOrModuleBlockBody (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:7868:25)\\n    at Parser.parseBlockBody (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:7855:10)\\n    at Parser.parseBlock (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:7839:10)\\n    at Parser.parseFunctionBody (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:6909:24)\\n    at Parser.parseFunctionBodyAndFinish (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:6879:10)\\n    at withTopicForbiddingContext (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:8006:12)\\n    at Parser.withTopicForbiddingContext (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:7185:14)\\n    at Parser.parseFunction (/Users/takashiminagawa/dev/tonestock/src/node_modules/@babel/parser/lib/index.js:8005:10)\");\n\n//# sourceURL=webpack:///./static/js/app.js?");

/***/ })

/******/ });