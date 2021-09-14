# House-Party
**This application is designed to allow multiple people to control the current song playing on any device using spotify. It was created using React.js and Django.**
<br>
![alt text](https://github.com/lfdeleon98/house-party/blob/main/img/hero.png)
<br>
<br>
It works by one person being the host of the music room (this person must have a Spotify Premium account in order for this to work). The host can customize the room's settings, such as granting permission for guests to play/pause the music and by choosing the minimum number of votes to have in order to skip the current song.
<br>
![alt text](https://github.com/lfdeleon98/house-party/blob/main/img/create_room.png)
<br>
<br>
Before the room is actually created, the host will be asked to sign into their Spotify account. This allows the House-Party application access to the song/artist information, and actual controls to play/pause the music on Spotify, and to skip the song.
<br>
![alt text](https://github.com/lfdeleon98/house-party/blob/main/img/chrome_mk7uRVTQ6X.png)
<br>
<br>
Once the user has signed into their account, they will enter the music room. The host's view of the room will display the room code for guests to join, the current song information, the skip and play/pause buttons, song duration, and a feature to change the room's settings. If the host closes the room and decides later to create a new, different room, the host will not be asked to sign into their Spotify account again because the application will remember their session key.
<br>
![alt text](https://github.com/lfdeleon98/house-party/blob/main/img/joined_room.png)
<br>
![alt text](https://github.com/lfdeleon98/house-party/blob/main/img/update.png)
<br>
<br>
For guests, they will enter the room by entering the correct room code.
<br>
![alt text](https://github.com/lfdeleon98/house-party/blob/main/img/enter_room_code.png)
<br>
<br>
Once guests join the room, their view of the room is almost identical to the host's, but they don't have a settings button at the bottom.
<br>
![alt text](https://github.com/lfdeleon98/house-party/blob/main/img/host_page.png)
<br>
<br>
And that's it! Now everyone has control of the music :)
<br>
I plan to host this application in the future on an application like Heroku. For now it works locally.


