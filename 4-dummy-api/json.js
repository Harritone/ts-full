"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var url = 'https://dummyjson.com/users';
var HttpClientModel = /** @class */ (function () {
    function HttpClientModel() {
    }
    HttpClientModel.prototype.get = function (parameters) {
        return new Promise(function (resolve, reject) {
            var url = parameters.url;
            var options = {
                headers: {}
            };
            axios_1["default"]
                .get(url, options)
                .then(function (response) {
                resolve(response.data);
            })["catch"](function (response) {
                console.info('-->rejecting<--');
                reject(response);
            });
        });
    };
    return HttpClientModel;
}());
var HttpClient = new HttpClientModel();
var UsersApiClientModel = /** @class */ (function () {
    function UsersApiClientModel(urls) {
        this.urls = urls;
    }
    UsersApiClientModel.prototype.fetchUsers = function () {
        var params = {
            url: this.urls.fetchUsers
        };
        return HttpClient.get(params);
    };
    return UsersApiClientModel;
}());
var UsersApiClient = new UsersApiClientModel({ fetchUsers: url });
UsersApiClient.fetchUsers()
    .then(function (data) {
    var users = data.users;
    users.forEach(function (user) {
        console.info("username: ".concat(user.username));
        console.info("email: ".concat(user.email));
        console.info("domain: ".concat(user.domain));
        console.info('---');
    });
})["catch"](function (error) {
    console.error(error.message);
});
