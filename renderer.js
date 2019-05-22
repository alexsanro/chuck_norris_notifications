var rp = require('request-promise');
const WindowsToaster = require('node-notifier').WindowsToaster;
const path = require('path');

var options = {
    uri: 'https://api.chucknorris.io/jokes/random',
    json: true
}

rp(options).then(function (data) {
    var notifier = new WindowsToaster({
        withFallback: false, // Fallback to Growl or Balloons?
        customPath: void 0 // Relative/Absolute path if you want to use your fork of SnoreToast.exe
    });

    notifier.notify(
        {
            //appName: "chuck_norris_id",
            title: 'Chuck Norris is your boss', // String. Required
            message: data.value, // String. Required if remove is not defined
            icon: path.join(__dirname, 'icons/icono.ico'), // String. Absolute path to Icon
            sound: true, // Bool | String (as defined by http://msdn.microsoft.com/en-us/library/windows/apps/hh761492.aspx)
            wait: false, // Bool. Wait for User Action against Notification or times out
            remove: void 0, // Number. Refer to previously created notification to close.
            install: void 0 // String (path, application, app id).  Creates a shortcut <path> in the start menu which point to the executable <application>, appID used for the notifications.
        },
        function (error, response) {
            console.log(response);
        }
    );
})
