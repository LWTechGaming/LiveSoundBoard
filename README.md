# Live Sound Board

A soundboard application I created for my school for use in a Christmas play.

## Backstory

This application was developed for use by my senior year group at Lovisa Gymnasium for our modern adaptation of the Christmas Gospel. We needed an application that provided oversight and possibility to cleanly organize sound effects in the order they appeared in the script.

No previously created program I knew of did this, so I set about creating this one. It provides a clean user interface, backed by Google's Material design, and a live logging output in the application itself.

## Technologies

The application itself is backed by [Electron](https://electronjs.org/), the cross-platform desktop application framework. The frontend uses the [Materialize](http://materializecss.com) CSS framework.

The audio systems are accomplished with plain HTML WebAudio, but the sound check system uses Node.js components. These are namely [audio-loader](https://github.com/audiojs/audio-loader) and [audio-play](https://github.com/audiojs/audio-play) from the audio.js team.

[Lokijs](http://lokijs.org) is used for storage of sound data, used mainly when removing elements.
