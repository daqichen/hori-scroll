# `hori-scroll`
A framework-agnostic UI component for an infinite scroll effect
### [View Demo on CodeSandbox.io](https://codesandbox.io/p/devbox/boring-star-jkz2yj)

Built using Rslib.

Unlike a pure `CSS`-driven scroll solution, the horizontal scroll in this library is driven by `JS` and therefore allows for user interference and upon user's cursor leaving the container, the scrolling animation continues infinitely. 

The idea was inspired by Perplexity's prompts library and Instagram's search suggestions, both of which scroll endlessly while allowing user to interact with the scroll if they wish. 

To install: 
```bash
npm i hori-scroll
```

To use:

```js
import { HoriScroll } from "hori-scroll";

...
 {/** Plain text */}
<HoriScroll options={["hello", "hi", "welcome"]} />

 {/** Buttons */}
<HoriScroll options={["hello", "hi", "welcome"]} isClickable />

 {/** Fast variant */}
<HoriScroll
  options={["This", "is", "faster"]}
  isClickable
  animationSpeed="FAST"
/>

 {/** Slow variant */}
<HoriScroll
  options={["This", "is", "slower"]}
  isClickable
  animationSpeed="SLOW"
/>
...
```


## Setup

Install the dependencies:

```bash
pnpm install
```

## Get Started

Build the library:

```bash
pnpm build
```

Build the library in watch mode:

```bash
pnpm dev
```
