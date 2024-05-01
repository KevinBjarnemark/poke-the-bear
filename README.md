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

The start menu enables the users to add their names to the player's list. This personalizes the game experience by sending 'custom-created' users into the game space. 

To prevent user inputs from destroying the interface, a certain criteria have to be met for the players to grant access to the game space. The users are constrained to follow these criteria for the following reasons:
1. To avoid breaking the underlying game logic.
2. To avoid breaking the UI with 'lengthy' usernames, or usernames without characters.
3. To avoid players choosing identical usernames.
4. To limit the amount of players entering a game.

- Minimum amount of players: **2**
- Maximum amount of players: **150**

#### Remove players from the game

A system for removing players has been implemented to enhance the user experience. This solves 'real world' scenarios where a user might accidentally add a 'wrongly typed' username to the player's list or when an already registered player has to leave before the game starts. Users are able to instead simply click on the **red 'X' button** to remove a player from the player list.

## Future implementations

Here's a breakdown of some ideas and improvements to further develop this project.

### **Settings**

At the landing page/start menu and perhaps accessible inside the game, a 'settings area' should be considered to both solve problems and enhance the user experience. Here's a breakdown of some of the settings that could be implemented. 

##### **Temperament meter** 

- A setting that sets how easily the bear will be provoked.

This could make it easier to speed up a game if it is a large group who is playing.


## Credits and resources

### Fonts

The fonts below were found at [Google fonts](https://fonts.google.com/).

- [Luckiest Guy](https://fonts.google.com/specimen/Luckiest+Guy)
- [Niramit](https://fonts.google.com/specimen/Tilt+Neon)

### Images, icons, videos, logo and favicon Information

- All images and icons has been designed, illustrated, and drawn by the creator of this Github repository Kevin Bjarnemark.


## Testing 

Here's the tools used to test this project against performance issues, accessibility, best practices, seo, and so forth.

- [Lighthouse](https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
- [W3C validator](https://validator.w3.org/)
- [Jigsaw validator](https://jigsaw.w3.org/css-validator/)
- [JsHint](https://jshint.com/)

