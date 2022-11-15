## About

Dicey is based on the wonderful [AnyDice](https://anydice.com/) made by [Jasper Flick](https://catlikecoding.com/jasper-flick/). The syntax has been changed somewhat, with dice notation being aligned closer to [Foundry](https://foundryvtt.com/article/dice-advanced/) and [Roll20](https://wiki.roll20.net/Dice_Reference). Dicey runs completely in the browser, and can be used offline when saved to your phone's homescreen.

Dicey is open-source under the MIT license. Development takes place on [github](https://github.com/basicer/dicey).

### I think I found a problem with your math.

Please file a bug report on the [Issue Tracker](https://github.com/basicer/dicey/issues/new).

### Can I use Dicey in my app?

Most likely. There is a sub-module inside dicey called dicey-math, however the API to interact with it is still pretty rough. It's on the todo list to clean this up.

### Can I define functions like in [AnyDice](https://anydice.com/) or [SnakeEyes](https://snake-eyes.io/)

Not yet. The goal of dicey is to take dice expressions directly from various games and compute the odds declaratively. This is something we would like to add eventually.
