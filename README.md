
<link rel="stylesheet" type="text/css" media="all" href="assets/css/readme.css" />

# Poke the bear!

## TIP!

If you want to view this document with more intricate styling, you can clone this project and preview it in your code editor eg. VS Code.  

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
        Add players
    </summary>

The start menu enables the users to add their names to the player's list. This personalizes the game experience by sending 'custom-created' users into the game space. 

To prevent user inputs from destroying the interface, among other things, certain criteria must be met for the players to gain access to the game space. The users are constrained to follow these criteria for the following reasons:
1. To avoid breaking the underlying game logic.
2. To avoid breaking the UI with 'lengthy' usernames, or usernames without characters.
3. To avoid players choosing identical usernames.
4. To limit the amount of players entering a game.

- Minimum amount of players: 2
- Maximum amount of players: 150
</details>

<details>
    <summary>
        Remove players
    </summary>

A player removal system has been implemented to enhance the user experience. It addresses real-world scenarios such as when a user mistakenly adds an incorrectly typed username to the player list, or when a registered player needs to leave before the game starts. Users can simply click the red 
<span class="em" style="color: var(--red);">X</span>
button to remove a player from the list.
</details>

## Future implementations

Here's a breakdown of some ideas and improvements to further develop this project.

<details>
    <summary>
        Settings
    </summary>

At the landing page/start menu and perhaps accessible inside the game, a 'settings area' should be considered to both solve problems and to enhance the user experience. Here's a breakdown of some of the settings that could be implemented. 

##### **Temperament meter** 

- A setting that sets how easily the bear will be provoked.

This could make it easier to speed up a game if it is a large group who is playing.
</details>

<details>
    <summary>
        Ideas
    </summary>

Right now, the game is very limited in terms of possibilities. More features could easily be implemented to further increase the excitment when playing this game. Here's a list of some ideas.

#### **Spinning wheel** 

instead of just a poke button, a spinning wheel could be introduced. This wheel would randomly pick between a set of buttons. Here's some ideas for buttons to implement:

- **Petting button**

A button that lets the user pet the bear, this would decrease the rage meter.

- **Lazer pointer button**

This would definitely increase the rage meter

- **Salmon button**

Give the bear a salmon! This would bring the rage down to 0.
</details>

<details>
    <summary>
        More
    </summary>

1. Delete all players button
2. Rules pop-up at the game menu
3. See who won in the previous game indicated by a star or similar
4. Scoreboard
</details>

## Credits and resources

### Fonts

The fonts below were found at [Google fonts](https://fonts.google.com/).

- [Tilt Neon](https://fonts.google.com/specimen/Tilt+Neon)
- [Luckiest Guy](https://fonts.google.com/specimen/Luckiest+Guy)
- [Niramit](https://fonts.google.com/specimen/Tilt+Neon)

### Art & design (images, icons, etc.)

All images, icons, logos, etc., have been designed, illustrated, and drawn by the creator of this GitHub repository, Kevin Bjarnemark. I'm that person, so I'll describe myself in the first person in this chapter.

I've never drawn a bear before, and I'm quite out of practice since I mostly write code these days. Obviously, the bear in this project isn't a professional design. However, after working in public schools, I've noticed that children generally tend to prefer designs that are 'unprofessional'.

The bear is drawn from imagination, although I did a quick Google search beforehand to refresh my memory of bear anatomy. Initially, I tried to draw the bear realistically, but later I felt that it didn't fully represent my vision. I also wanted to make the game inclusive for everyone, so I decided to sketch a more child-friendly version with soft paws.

#### First illustration

![Bear Sketch 1](https://raw.githubusercontent.com/KevinBjarnemark/poke-the-bear/main/assets/images/readme/first_sketch.gif "Bear sketch 1")

#### Second hand drawn sketch

!["The second hand drawn bear sketch"](assets/images/readMe/second_handrawn_sketch.jpg "Bear sketch")

#### Second illustration

![Bear Sketch 2](https://raw.githubusercontent.com/KevinBjarnemark/poke-the-bear/main/assets/images/readme/second_sketch.gif "Bear sketch 2")




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
