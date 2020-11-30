# lyricly
<img src="app-pics/1.gif">

## Lyricly is voice search songs service.
#### Which allows you to search any song of your choice by singing little bit of the song lyrics and the app gives you back the song associated with that lyrics in audio/music format.

<img src="app-pics/1.1.gif">

## Searching songs from thier lyrics
<img src="app-pics/2.gif">
<img src="app-pics/3.gif">

## How it works?
Lyricly client uses the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API "Web Speech API") for the voice recognition and after getting the user speech input it asks the user to verify wheter the speech is correct or not, and if the user fails to speak anything it prompts the retry option.

Next, If the user marks his speech correct the app/client initiate a get request to the **lyricly-api** which I have made available open source on my github **[here](https://github.com/iamrobins/lyricly-api "here")** as well.

After the request the api finds the song associated with the lyrics and sends back a JSON response containg the song properties.
- Unique Id
- Title
- Cover
- Duration

Lastly, the app reads the JSON response and set its properties to its custom Music Player and then the Player makes a request to the **lyricly-api** on the route ***/play/UniqueId*** to stream the requested song.

I will be happy to have your contributions on lyricly-client :smile: and also checkout the [lyricly-api](https://github.com/iamrobins/lyricly-api "lyricly-api")
