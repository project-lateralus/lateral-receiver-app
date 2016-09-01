# lateral-receiver-app

### Development

1) Install [jdk8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and [android studio](https://developer.android.com/studio/install.html?pkg=tools).

2) Install packages using android studio for all required platforms version you want.

3) Add `sdk/platform-tools` and `sdk/tools` to your path:

    export PATH=${PATH}:path/to/android/sdk/platform-tools:path/to/android/sdk/tools

4) Add info needed to your config.js using [config.example.js](config.example.js) file as template.

4) Install needed packages:

    npm install -g cordova ionic bower

    npm install
    bower install

    ionic state restore

    ionic serve       # run on local browser
    gulp watch        # in a different shell
    ionic run android # run on connected android phone
