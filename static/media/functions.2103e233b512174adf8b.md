## Function Library

### `bag(...)`

Add the elements of each set to one big set.

&gt; <kbd>bag(3d6, 2d6, {d6, d6, d6})</kbd> = <kbd>8d6</kbd>

### `bucket(cloud, ...)`

&gt; <kbd>bucket(2d20kh, 'fumble', 2, 'failure', 10, 'success', 20, 'critical')</kbd>

### `contains(search, target)`

Returns the field represneting the chance of containing a number.

&gt; <kbd>contains(3d6,6)</kbd>

### `count(search, target)`

Returns the field represneting the chance of getting a number of target values.

&gt; <kbd>count(3d6,6)</kbd>

### `iif(condition, concequent, alternate)`

Merge two probability clouds weighed by condition.

&gt; <kbd>iif(d20+5&gt;12, d8+5, 0)</kbd>

### `max(v)`

Find the maximum possible outcome in a field.

&gt; <kbd>max(d6)</kbd> = 6

&gt; <kbd>max(3d6)</kbd> = 18

### `mean(v)`

Find the mean outcome in a field.

&gt; <kbd>mean(d6)</kbd> = 3.5

&gt; <kbd>mean(3d6)</kbd> = 10.5

### `min(v)`

Find the minimum possible outcome in a field.

&gt; <kbd>min(d6)</kbd> = 1

&gt; <kbd>min(3d6)</kbd> = 2

### `normal(range, stddev)`

A probability cloud follow the normal distribution from 0 to `range`
with mean `range/2` and standard deviation `stddev`

&gt; <kbd>output min(3d6)+normal(max(3d6)-min(3d6),3)
output 3d6</kbd>

### `repeat(what, times)`

A set containing the elment `cloud` repeated `times` times.

&gt; <kbd>repeat(d6, 3)</kbd> = <kbd>3d6</kbd>

### `set(...)`

Create a set containing the arguments.

&gt; <kbd>set(3d6, 2d6)</kbd> = <kbd>{3d6, 2d6}</kbd>

### `sum(...)`

Add the elements of each set together into a single field.

&gt; <kbd>sum(1, 2, 3)</kbd> = <kbd>6</kbd>

&gt; <kbd>sum(1, d6, 3d6)</kbd> = <kbd>4d6+1</kbd>
