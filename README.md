# wintershell

A proof of concept Alfred/Quicksilver/Spotlight clone built with React Native macOS

![wintershell](https://cloud.githubusercontent.com/assets/447731/21702922/759b08ea-d37c-11e6-9fa5-f96f825becb5.gif)

This implementation is quick and dirty and not at all complete. I decided to build this after seeing some great new launchers based on Electron come out. Resource usage can be a little intensive in Electron apps, and I've been meaning to play with React Native macOS for a while, so I built this.

### Caveats

Since the macos fork of react native doesn't have file system access, the app has to fetch the list of apps from an endpoint that exposes the result of ```fs.readdir('/Applications')```.

Also, although the app certainly works, wintershell is nowhere near feature complete, even for a basic app launcher.

Not implemented:

- [ ] Detect keypress events
- [ ] Open from system-wide hotkey
- [ ] Hide when not in use
- [ ] Search in other paths besides /Applications
- [ ] Exist as a menu bar app

### Results

The application itself uses around 18mb RAM running in Xcode. Granted, the node process also uses its own resources, but proper filesystem access should eliminate this overhead.

### Setup

1. Clone this repo
2. Install dependencies: ```yarn```
3. Start the fs server: ```npm run server```
4. Open ```macos/wintershell.xcodeproj``` in Xcode
5. Press ▶️
