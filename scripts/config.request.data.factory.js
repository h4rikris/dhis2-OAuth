define([], function() {
    return function($httpParamSerializerJQLike) {
        this.username = "";
        this.password = "";
        var setUserCredentials = function(username, password) {
            this.username = username;
            this.password = password;
        };

        var getRequestData = function(grant_type, refreshToken) {
            var data = {
                "grant_type": grant_type,
            };
            if (grant_type == "password") {
                data.username = this.username;
                data.password = this.password;
            } else if (grant_type == "refresh_token") {
                data.refresh_token = refreshToken;
            };
            return $httpParamSerializerJQLike(data);
        };
        return {
            "setUserCredentials": setUserCredentials,
            "getRequestData": getRequestData
        };
    };
});
