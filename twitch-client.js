const request = require('request');

const twitch = {
    clientID: '...',
    clientSecret: '...',
    getToken: function() {
        return new Promise(function(resolve, reject) {
            request.post({
                url: 'https://id.twitch.tv/oauth2/token',
                form: {
                    client_id: twitch.clientID,
                    client_secret: twitch.clientSecret,
                    grant_type: 'client_credentials'
                }
            }, function(err, res, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(body).access_token);
                }
            });
        });
    },
    getUserId: function (channel, token) {
        return new Promise(function (resolve, reject) {
            request({
                url: 'https://api.twitch.tv/helix/users?login=' + channel,
                headers: {
                    'Client-ID': twitch.clientID,
                    'Authorization': 'Bearer ' + token
                }
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                } else {

                    resolve(JSON.parse(body).data[0].id);
                }
            });
        });
    },
    getLastFollower: function(channel) {
       return new Promise(function(resolve, reject) {
            twitch.getToken().then(function (token) {
                twitch.getUserId(channel, token).then(function (userId) {
                    request({
                        url: 'https://api.twitch.tv/helix/users/follows?to_id=' + userId,
                        headers: {
                            'Client-ID': twitch.clientID,
                            'Authorization': 'Bearer ' + token
                        }
                    }, function(error, response, body) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(JSON.parse(body).data[0].from_name);
                        }
                    });
       })})});
    }
};

module.exports = twitch;