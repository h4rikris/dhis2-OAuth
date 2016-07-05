requirejs.config({
    baseUrl: "scripts",
    paths: {
        angular: "../bower_components/angular/angular.min"
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    }
});

requirejs(['angular', 'main.controller', 'config.request.factory', 'config.request.data.factory', 'oauth.service', 'properties'], function(angular, mainController, configRequestFactory, configRequestDataFactory, oAuthService, properties) {
    var app = angular.module("OAuth", []);

    app.value("clientSecret", properties.clientSecret);
    app.value("clientId", properties.clientId);

    app.factory("configRequestFactory", configRequestFactory);
    app.factory("configRequestDataFactory", configRequestDataFactory);

    app.service("oAuthService", oAuthService);

    app.controller("mainController", ["$http", "$q", "configRequestDataFactory", "oAuthService", mainController]);

    app.factory('myHttpInterceptor', function(clientId, clientSecret, configRequestFactory) {
        return {
            'request': function(config) {
                configRequestFactory.setAuthHeader(clientId, clientSecret);
                config.headers = configRequestFactory.getRequestHeaders();
                return config;
            }
        };
    });

    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('myHttpInterceptor');
    }]);
});
