var rp = require('request-promise');
const WindowsToaster = require('node-notifier').WindowsToaster;
const path = require('path');
const isDev = require('electron-is-dev');
var intervalSeted = "";

/**
 * Notificador // Con TOAST
 * @param {*} data 
 */
function notifier(data) {
    new WindowsToaster().notify(
        {
            appName: nameApp(),
            title: 'Chuck Norris is your boss', 
            message: data.value, 
            icon: path.join(pathDirectoryRootEnvironment(), 'assets' ,'images', 'chuck_norris.png'),
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

function pathDirectoryRootEnvironment(){
    var directory = __dirname;

    if (!isDev) {
        directory = process.resourcesPath;
    }

    return directory;
}

function nameApp(){
    var nameApp = "";

    if (!isDev) {
        nameApp = "chuck_norris_id";
    }

    return nameApp;
}

function startCallsToYourBoss(){
    requestApiChuck();
}

exports.startCallsToYourBoss = (timeOnMiliseconds) => {
    clearInterval(intervalSeted);
    intervalSeted = setInterval(function () { startCallsToYourBoss() }, timeOnMiliseconds);
}