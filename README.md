# Poke the bear!

## Introduction

This is a simple JavaScript game inspired by the famous expression **'Poke the bear!'**. The game is an attempt to solve the 'real-world problem' of drawing a random person out of a group, but in a more fun and creative way. To exemplify this, imagine a family whose children want to sit in the front seat of the car. One could easily bring up **'Poke the bear!'** on their phone or computer to randomly choose one lucky winner. The one who survives the bear encounter gets to sit in the front seat of the car. 

Since the winner is chosen randomly, a larger range of people can take part in the draw without the sensation of unfairness. 

### Rules/instructions

1. Players are drawn randomly and should take turns in poking the bear. 
2. As the players keep poking the bear while the rage meter increases, someone will eventually be kicked out of the game. 
3. The 'last standing' player that survived the bear encounter takes the price.

## Features

### **Landing page/start menu**

#### Add players to the game
The start menu enables the users to add their names to the player's list. This personalizes the game experience by sending 'custom-created' users into the game space. To prevent user inputs from destroying the interface, a certain criteria have to be met for the players to grant access to the game space. 

The users are constrained to follow these criteria for the following reasons:
1. To avoid breaking the underlying game logic.
2. To avoid breaking the UI with 'lengthy' usernames, or no username at all.
3. To avoid players choosing identical usernames, which also will break the underlying game logic.
4. To avoid too many players entering a game.

- Minimum amount of players: **2**
- Maximum amount of players: **150**

#### Remove players from the game
A system for removing players has been implemented to enhance the user experience. This solves a lot of 'real world' scenarios where a user might accidentally add a 'wrongly typed' username to the player's list. Another scenario could be a large group that all have added their username and before starting the game, one person has to leave for whatever reason. This would force the group to (a) reset the game and (b) type in each username again. 

With this system, users can simply click on the **red 'X' button** to erase a player from the player list.

