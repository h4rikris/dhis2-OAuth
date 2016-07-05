define([], function() {
    return function() {
        var authHeader = "";

        var setAuthHeader = function(clientId, clientSecret) {
            authHeader = "Basic " + btoa(clientId + ":" + clientSecret);
        };

        var getRequestHeaders = function() {
            var headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": authHeader,
                "Accept": "application/json"
            };
            return headers;
        };

        return {
            "setAuthHeader": setAuthHeader,
            "getRequestHeaders": getRequestHeaders
        };
    };
});