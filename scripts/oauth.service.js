define([], function() {
    return function($q, $http, configRequestDataFactory) {
        var url;
        var accessToken;
        var refreshToken;
        var expireTime;
        var lastRequest;

        var sendRequest = function(type) {
            return $http.post(url, configRequestDataFactory.getRequestData(type, refreshToken));
        };

        var extractAccessToken = function(data) {
            lastRequest = new Date();
            accessToken = data.data.access_token;
            refreshToken = data.data.refresh_token;
            expireTime = data.data.expires_in;
            return accessToken;
        };

        this.getToken = function() {
            if (!accessToken) {
                return sendRequest("password").then(extractAccessToken);
            } else if (lastRequest && ((Date() - lastRequest) / 1000 > expireTime)) {
                return sendRequest("refresh_token").then(extractAccessToken);
            }
            return $q.when(accessToken);
        };

        this.setUrl = function(newUrl) {
            url = newUrl;
        };
    };
});
