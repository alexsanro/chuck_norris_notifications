var rp = require('request-promise');
const WindowsToaster = require('node-notifier').WindowsToaster;
const path = require('path');
const isDev = require('electron-is-dev');

/**
 * Notificador // Con TOAST
 * @param {*} data 
 */
function notifier(data) {
    var directory = __dirname;
    var nameApp = "";

    if (!isDev) {
        directory = process.resourcesPath;
        nameApp = "chuck_norris_id";
    }

    new WindowsToaster().notify(
        {
            appName: nameApp,
            title: 'Chuck Norris is your boss', 
            message: data.value, 
            icon: path.join(directory, 'assets' ,'images', 'chuck_norris.png'),
            sound: true, 
            wait: false, 
            remove: void 0, 
            install: void 0,
            timeout: 5,
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
    intervalSeted = setInterval(function () { startCallsToYourBoss() }, 60000);
}