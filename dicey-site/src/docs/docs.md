## Documentation

Dicey is based on the wonderful [AnyDice](https://anydice.com/) made by [Jasper Flick](https://catlikecoding.com/jasper-flick/). The syntax has been changed somewhat, with dice notation being aligned closer to [Foundry](https://foundryvtt.com/article/dice-advanced/) and [Roll20](https://wiki.roll20.net/Dice_Reference).

### Basics

Dicey fundamentally operates as a calculator, but instead of operating only on numbers, it can also operate on probabilities.

As an overly simple example, let's add two and two together. You can click on the example to load it.

<kbd>output 2+2</kbd>

<br /><br />

Notice the calculation starts with the word `output`. This instructs Dicey to display the result. You can leave this out, but it's good to know about if you want to output multiple things.

<kbd>output 2+2
output 2+2\*2</kbd>

### Dice

As a simple example, <kbd>3d6</kbd> represents rolling three six-sided dice.

The arguments to the die operator aren't limited to numbers. If a <kbd>d{4,5,10}</kbd> sets is passed to the right hand argument, the elements of that set will make up the sides of the die. Similarly a probability can be used as the second argument to give chance to roll die with that number of sides. <kbd>2d(d6)</kbd> would be analogous to rolling a d6 to determine which type of dice to pick up, and then rolling two of those types of dice.

### Sets

Sets are formed by placing comma separated elements between `{}`'s. For example <kbd>{3,4,5}</kbd> is a set of three numbers. By default, the elements of a set are added together and displayed as one number. This can be disabled with the `collapse` toggle at the bottom of the calculator page. Sets are by convention stored in descending order.

&gt; <kbd>{3d6, d10} kh 1</kbd> - Take the highest roll between `3d6` and `d10`.

### Operators

The standard math operators `+ - * /` are defined as normal, with standard order of operation.

The comparison operators `> >= < <= == !=` use the values `1` and `0` as their output instead of `true` and `false` respectively. These operators can be modified with `cs ms ro zu` as per [Foundry Die Modifiers](https://foundryvtt.com/article/dice-modifiers/)

The `kl lh dl dh` binary operators also work as per [Foundry](https://foundryvtt.com/article/dice-advanced/).

### Functions

Function calls are made similar to C-style languages. For example <kbd>max(d6)</kbd> represents calling the max function and passing `d6` as its only argument.

See the [function reference](/functions) for a list of built-in functions.
