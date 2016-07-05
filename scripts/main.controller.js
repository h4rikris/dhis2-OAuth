define(['angular'], function(angular) {
    return function($http, $q, configRequestDataFactory, oAuthService) {
        this.value = "No token";
        this.username = "";
        var self = this;
        this.login = function() {
            configRequestDataFactory.setUserCredentials(this.username, this.password);
            var setAccessToken = function(access_token) {
                self.value = access_token;
            };
            oAuthService.setUrl(this.url);
            return oAuthService.getToken().then(setAccessToken);
        };
    };
});
