# Scooter
Scooter is a game used at the monthly PEI Developers meetup to help us pick winners of our door prizes. This version is the angular js port of the original dojo version of scooter

Version 0.1 Beta

#Usage
To run the application you need to have the code running on a server. Most IDE's have a server built in that you can run the application from there during development. Others using text editors may choose to use something like the python simple http server.

Here is an example of running the code from the pythin simple http server (assuming python is installed) which will server from port 8000
```
$ cd /home/workspace/Scooter
$ python -m SimpleHTTPServer
```
or for python3 
```
python3 -m http.server
```

#Update Contact List
The list of contacts is stored in the attendees.json file. Modify this file with the list of attendees for your game. Reload the page and you should see the new players

#Playing the Game
Click the play button. Continue clicking until there is only 1 player left.

#Reset the Game
Click reset and all the players will be added back to the game and shuffled on the board

#Scooter Config
In the game, the config menu will allow you to manage players and choose a new theme. You can manually add players, make them lose or give them a second chance.
Note - If you refresh the browser you will lose any players added in the config menu.
