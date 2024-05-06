
<link rel="stylesheet" type="text/css" media="all" href="assets/css/readme.css" />

# Poke the bear!

## Introduction

This is a simple JavaScript game inspired by the famous expression 
<span class="em">'Poke the bear!'</span>. 
The game is an attempt to solve the 'real-world problem' of drawing a random person out of a group but in a more 
<span class="em" style="color: var(--green);">fun</span>
and 
<span class="em" style="color: var(--orange);">creative</span>
way. 

To exemplify this, imagine a family whose children want to sit in the front seat of the car. One could easily bring up 
<span class="em">'Poke the bear!'</span>
on their phone or computer to randomly choose one lucky winner. The one who survives the bear encounter gets to sit in the front seat of the car. 

Since the winner is chosen randomly, a larger range of people can take part in the draw without the sensation of unfairness. Allowing children to have a chance against adults, as well as people with different kinds of disabilities, etc.

## Rules/instructions

Again, to widen the 'range' of users, the game is very simple. Users can easily add their usernames to the landing page and enter the gaming realm. Inside the game, the quest is to take turns in poking the bear. For ultimate 'unpredictability', the hint message will **randomly** pick whose turn it is.

As the players keep poking, the bear's furious rage will progressively increase. Eventually, someone will be kicked out of the game. This will reset the rage meter and allow the others to continue. The 'last standing' player that survived the hair-raising bear encounter takes the price.

## Features

#### Landing page/start menu

<details>
    <summary>
        Add players to the game
    </summary>

The start menu enables the users to add their names to the player's list. This personalizes the game experience by sending 'custom-created' users into the game space. 

To prevent user inputs from destroying the interface, a certain criteria have to be met for the players to grant access to the game space. The users are constrained to follow these criteria for the following reasons:
1. To avoid breaking the underlying game logic.
2. To avoid breaking the UI with 'lengthy' usernames, or usernames without characters.
3. To avoid players choosing identical usernames.
4. To limit the amount of players entering a game.

- Minimum amount of players: 2
- Maximum amount of players: 150
</details>

<details>
    <summary>
        Remove players from the game
    </summary>

A system for removing players has been implemented to enhance the user experience. This solves 'real world' scenarios where a user might accidentally add a 'wrongly typed' username to the player's list or when an already registered player has to leave before the game starts. Users are able to instead simply click on the red 
<span class="em" style="color: var(--red);">X</span>
 button to remove a player from the player list.
</details>

## Future implementations

Here's a breakdown of some ideas and improvements to further develop this project.

### **Settings**

At the landing page/start menu and perhaps accessible inside the game, a 'settings area' should be considered to both solve problems and to enhance the user experience. Here's a breakdown of some of the settings that could be implemented. 

##### **Temperament meter** 

- A setting that sets how easily the bear will be provoked.

This could make it easier to speed up a game if it is a large group who is playing.

### **Additional ideas** 

Right now, the game is very limited in terms of possibilities. More features could easily be implemented to further increase the excitment when playing this game. Here's a list of some ideas.

- **Spinning wheel**

instead of just a poke button, a spinning wheel could be introduced. This wheel would randomly pick between a set of buttons. Button examples:

1. Petting button

A button that lets the user pet the bear, this would decrease the rage meter.

2. Lazer pointer button

This would definitely increase the rage meter

3. Salmon button

Give the bear a salmon! This would bring the rage down to 0.

- **List of other implementations**

1. Delete all players button
2. Rules pop-up at the game menu
3. See who won in the previous game indicated by a star or similar
4. Scoreboard

## Credits and resources

### Fonts

The fonts below were found at [Google fonts](https://fonts.google.com/).

- [Tilt Neon](https://fonts.google.com/specimen/Tilt+Neon)
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

## Code 

In this section some code I will go over some concepts reflected in the actual codebase of this project. 

### # 1

#### Global scope

The global Scope consists of key variables and elements that most of the functions need to access. For a small project like this, it's a great way to manage states in a 'global' way. As the project grows one may want to migrate to a library like React in order to manage states more efficiently. In that way, single entries in an object can hold references to defined variables. This would enable the developer to insert single entries or 'props' as a parameters to functions. If the intent is to continue this project in vanilla javascript, one can instead split objects that need to be referenced globally into smaller groups. This would prevent small functions from dealing with unnecessary data.
