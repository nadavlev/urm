(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div class=\"page\">\n  <div class=\"header\">\n    <h1>\n      Welcome to {{ title }}!\n    </h1>\n  </div>\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/connection/connection-test-dialog.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/connection/connection-test-dialog.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-dialog-content>\r\n  Connection was {{data.ok ? 'Successful': 'Unsuccessful'}}\r\n  <div *ngIf=\"!data.ok && data.err\">{{data.err}}</div>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button mat-dialog-close>Cancel</button>\r\n  <button *ngIf=\"data.ok\" mat-button [mat-dialog-close]=\"true\" cdkFocusInitial>Save details</button>\r\n</mat-dialog-actions>\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/connection/connection.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/connection/connection.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"connection-form\">\n    <mat-form-field appearance=\"fill\" class=\"connection-form-item\">\n      <mat-label>User Name:</mat-label>\n      <input type=\"text\" matInput [(ngModel)]=\"connectionDetails.user\">\n    </mat-form-field>\n    <mat-form-field appearance=\"fill\" class=\"connection-form-item\">\n      <mat-label>Password:</mat-label>\n      <input type=\"text\" matInput [(ngModel)]=\"connectionDetails.password\">\n    </mat-form-field>\n    <mat-form-field appearance=\"fill\" class=\"connection-form-item\">\n      <mat-label>Port:</mat-label>\n      <input type=\"number\" matInput [(ngModel)]=\"connectionDetails.port\">\n    </mat-form-field>\n    <mat-form-field appearance=\"fill\" class=\"connection-form-item\">\n      <mat-label>Server Ip:</mat-label>\n      <input type=\"text\" matInput [(ngModel)]=\"connectionDetails.server\">\n    </mat-form-field>\n    <mat-form-field appearance=\"fill\" class=\"connection-form-item\">\n      <mat-label>Database:</mat-label>\n      <input type=\"text\" matInput [(ngModel)]=\"connectionDetails.database\">\n    </mat-form-field>\n    <button mat-button color=\"primary\" class=\"mat-raised-button\" (click)=\"testConnection()\">Test</button>\n  </div>\n</div>\n<div class=\"container\" *ngIf=\"isShowSpinner\">\n  <mat-spinner></mat-spinner>\n</div>\n"

/***/ }),

/***/ "./src/app/ace-connection.service.ts":
/*!*******************************************!*\
  !*** ./src/app/ace-connection.service.ts ***!
  \*******************************************/
/*! exports provided: AceConnectionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AceConnectionService", function() { return AceConnectionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var API_TEST_CONNECTION = 'api/connect';
var AceConnectionService = /** @class */ (function () {
    function AceConnectionService(http) {
        this.http = http;
    }
    AceConnectionService.prototype.setConnectionDetails = function (details) {
        this.connectionDetails = details;
    };
    AceConnectionService.prototype.testConnection = function (details) {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
        this.setConnectionDetails(details);
        return this.http.post('http://localhost:3000/api/ace/testConnection', details, httpOptions);
    };
    AceConnectionService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    AceConnectionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], AceConnectionService);
    return AceConnectionService;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _connection_connection_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./connection/connection.component */ "./src/app/connection/connection.component.ts");




var routes = [
    { path: 'connection', component: _connection_connection_component__WEBPACK_IMPORTED_MODULE_3__["ConnectionComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'User Rights Manager';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _connection_connection_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./connection/connection.component */ "./src/app/connection/connection.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./material.module */ "./src/app/material.module.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _connection_connection_component__WEBPACK_IMPORTED_MODULE_5__["ConnectionComponent"],
                _connection_connection_component__WEBPACK_IMPORTED_MODULE_5__["ConnectionTestDialog"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _material_module__WEBPACK_IMPORTED_MODULE_8__["MaterialModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
            entryComponents: [
                _connection_connection_component__WEBPACK_IMPORTED_MODULE_5__["ConnectionTestDialog"]
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/connection/connection.component.scss":
/*!******************************************************!*\
  !*** ./src/app/connection/connection.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".connection-form {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  align-content: stretch;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n.connection-form .connection-form-item {\n  margin: 0 15px 0 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29ubmVjdGlvbi9jOlxcZGV2XFxyZXNlYXJjaFxcdXJtXFx1cm0tY2xpZW50L3NyY1xcYXBwXFxjb25uZWN0aW9uXFxjb25uZWN0aW9uLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtFQUFBLDZCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0FDQ0Y7QURBRTtFQUNFLHFCQUFBO0FDRUoiLCJmaWxlIjoic3JjL2FwcC9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29ubmVjdGlvbi1mb3JtIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgYWxpZ24tY29udGVudDogc3RyZXRjaDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgLmNvbm5lY3Rpb24tZm9ybS1pdGVtIHtcclxuICAgIG1hcmdpbjogMCAxNXB4IDAgMTVweDtcclxuICB9XHJcbn1cclxuIiwiLmNvbm5lY3Rpb24tZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBhbGlnbi1jb250ZW50OiBzdHJldGNoO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG4uY29ubmVjdGlvbi1mb3JtIC5jb25uZWN0aW9uLWZvcm0taXRlbSB7XG4gIG1hcmdpbjogMCAxNXB4IDAgMTVweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/connection/connection.component.ts":
/*!****************************************************!*\
  !*** ./src/app/connection/connection.component.ts ***!
  \****************************************************/
/*! exports provided: ConnectionComponent, ConnectionTestDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionComponent", function() { return ConnectionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionTestDialog", function() { return ConnectionTestDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ace_connection_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ace-connection.service */ "./src/app/ace-connection.service.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");




var ConnectionComponent = /** @class */ (function () {
    function ConnectionComponent(connectionService, dialog) {
        this.connectionService = connectionService;
        this.dialog = dialog;
        this.isShowSpinner = false;
        if (!this.connectionDetails) {
            this.connectionDetails = { user: 'dbs', password: 'dbssql', server: '10.164.58.40', port: 5000, database: 'admin' };
        }
    }
    ConnectionComponent.prototype.ngOnInit = function () {
    };
    ConnectionComponent.prototype.testConnection = function () {
        var _this = this;
        this.isShowSpinner = true;
        this.connectionService.testConnection(this.connectionDetails).subscribe(function (response) {
            if (response.err) {
                console.error(response.err);
            }
            else {
                _this.openDialog(response);
            }
            _this.isShowSpinner = false;
        });
    };
    ConnectionComponent.prototype.openDialog = function (data) {
        var dialogRef = this.dialog.open(ConnectionTestDialog, {
            data: data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
        });
    };
    ConnectionComponent.ctorParameters = function () { return [
        { type: _ace_connection_service__WEBPACK_IMPORTED_MODULE_2__["AceConnectionService"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] }
    ]; };
    ConnectionComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-connection',
            template: __webpack_require__(/*! raw-loader!./connection.component.html */ "./node_modules/raw-loader/index.js!./src/app/connection/connection.component.html"),
            styles: [__webpack_require__(/*! ./connection.component.scss */ "./src/app/connection/connection.component.scss")]
        })
    ], ConnectionComponent);
    return ConnectionComponent;
}());

var ConnectionTestDialog = /** @class */ (function () {
    function ConnectionTestDialog(data) {
        this.data = data;
    }
    ConnectionTestDialog.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
    ]; };
    ConnectionTestDialog = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'connection-test-dialog',
            template: __webpack_require__(/*! raw-loader!./connection-test-dialog.html */ "./node_modules/raw-loader/index.js!./src/app/connection/connection-test-dialog.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]))
    ], ConnectionTestDialog);
    return ConnectionTestDialog;
}());



/***/ }),

/***/ "./src/app/material.module.ts":
/*!************************************!*\
  !*** ./src/app/material.module.ts ***!
  \************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");







var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
            exports: [
                _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_5__["MatProgressSpinnerModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"]
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! c:\dev\research\urm\urm-client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es5.js.map