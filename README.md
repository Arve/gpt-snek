# gpt-snek

A snake game written in conversation with ChatGPT.

## Background

This game is written in conversation with [ChatGPT](https://chat.openai.com/), to check if writing an actual game using nothing but code from the AI is possible.

## Human input

* `index.html` is human-authored.
* `style.css` is authored by ChatGPT, instructing it to center the canvas on screen. It is later hand-modified to provide the correct colours
* `game.js` The start and end of the ChatGPT code is noted through comments. Basically, only the IIFE and load handler is ChatGPT.

## Running

Clone the repository, and drag it into your browser, or through any other means you can use it. Alternatively, you can play it live [here](https://arve.github.io/gpt-snek/).

## Bugs

Yes, there will be bugs.  While you are free to report them, they may or may not get fixed.  

## Pull requests?  

Only if ChatGPT is the one that fixes the bugs.

## Notes on ChatGPT

While I found it possible to create a game using ChatGPT, the process is extremely involved.  Some key problems with ChatGPT for writing code is:

* It will often write code that you did not ask it to, in particular if you aren't very detailed in outlining your requirements.  This can range from "Oh, that's actually clever, and while it wasn't exactly what I asked for, lets keep it" to "That's gonna crash, or have very obvious bugs".
* ChatGPT has amnesia.  I can ask it to change a function that it wrote a few minutes ago, and it will have forgotten what it provided.  The most effective means of having it revise a specific function is to provide the function it needs to revise, and tell it to change only that
* If you aren't careful about your requirements when asking for a new function, it will often produce code that's incompatible with what it has written before, such as changing function signatures, or in the case of the snake game, it would write keyboard handling code that did not use the same velocity format as the snake class.
* The programming style of this game is, apart from a few nudges determined by ChatGPT, hence the use of a snake class, whereas the rest of the game doesn't use them.  If you want a consistent result, you have to be very precise in determining what you want.
