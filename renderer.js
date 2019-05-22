var rp = require('request-promise');
const WindowsToaster = require('node-notifier').WindowsToaster;
const path = require('path');

/**
 * Notificador // Con TOAST
 * @param {*} data 
 */
function notifier(data) {
    new WindowsToaster().notify(
        {
            appName: "",
            title: 'Chuck Norris is your boss', 
            message: data.value, 
            icon: path.join(__dirname, 'icons/chuck_norris.png'), 
            sound: true, 
            wait: false, 
            remove: void 0, 
            install: void 0
        },
        function (error, response) {
            console.log(response);
            console.log(error)
        }
    );
}

/**
 * Llamada a la API de chuck Norris
 */
function requestApiChuck() {
    var options = {
        uri: 'https://api.chucknorris.io/jokes/random',
        json: true
    }

    rp(options).then(function (data) {
        notifier(data);
    })
}

function startCallsToYourBoss(){
    requestApiChuck();
}

exports.startCallsToYourBoss = () => {
    startCallsToYourBoss();
}