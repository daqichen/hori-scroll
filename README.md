<img width="200px" height="200px" alt="hori-scroll" src="https://github.com/user-attachments/assets/71b05727-90a6-42d6-ae19-c9d8933a9a6f"/>

# `hori-scroll`

endless, animated horizontal scrolling

### [View Demo on CodeSandbox.io](https://codesandbox.io/p/devbox/boring-star-jkz2yj)

Built using Rslib.

Unlike a pure `CSS`-driven scroll solution, the horizontal scroll in this library is driven by `JS` + `translate` `CSS` property, therefore allows for user interference and upon user's cursor leaving the container, the scrolling animation continues infinitely.

The idea was inspired by Perplexity's prompts library and Instagram's search suggestions, both of which scroll endlessly while allowing user to interact with the scroll if they wish.


## Installation

```bash
npm i hori-scroll
```

## Usage

```js
import { HoriScroll } from "hori-scroll";
```
---

### Option Array `prop` (w/o passing children props)
- options
  - `Array<ListItemProps<TValue> & { key: Key; }>;` (optional)
  - `ListItemProps<TValue>`
    - value
      - `TValue` (required)
    - materialIconName
      - `IconName` | string (optional)
    - icon
      - `ReactNode` (optional)

- isClickable
  - `boolean` (optional)
  - default `false`

- onClick
  - `(value: TValue, key: Key) => void` (optional)

e.g.
```js
<HoriScroll
  options={[
    {
      value: 'Hiking',
      key: 'hiking',
      materialIconName: 'hiking',
    },
    {
      value: 'Downhill skiing',
      key: 'downhill_skiing',
      materialIconName: 'downhill_skiing',
    }]}
  isClickable
  onClick={(e, key) => alert(e + ' with key ' + key)}
/>
```
---

### Animation `prop` Options
- animationEnabled
  - `boolean` (optional)
  - default `true`

- enteringAnimationType
  - see below (optional)
  - Possible values: `none` | `scale` | `translate-up` | `translate-down`
- animationSpeed
  - `ANIMATION_SPEED_TYPE` (optional)
  - Possible values: `FAST` | `MEDIUM` | `SLOW`

e.g.
```js
{/* Scale Up & Medium Speed */}
<HoriScroll
  options={...}
  enteringAnimationType="scale"
  animationSpeed="MEDIUM"
  isClickable
/>
```
---


### Styling `prop` Options
- blurredEdges
  - `boolean` (optional)
  - default `false`
- styles.background
  - `string` (optional)
  - default `#023047`
- styles.buttonBackground
  - `string` (optional)
  - default `#415a77`
- styles.color
  - `string` (optional)
  - default `white`
- styles.gapBetweenElementsInPixels
  - `number` (optional)
  - default `24`
- styles.containerWidth
  - `string` (optional)
  - default `80vw`

e.g.
```js
<HoriScroll
  options={SportsOptions}
  blurredEdges // has blur effect on two ends of the containers
  styles={{
    background: '#454955',
    gapBetweenElementsInPixels: 50,
  }}
/>
```
---


## Local Dev Setup

Install the dependencies:

```bash
pnpm install
```

Build the library:

```bash
pnpm build
```

Build the library in watch mode:

```bash
pnpm dev
```

Run Storybook:

```bash
pnpm storybook
```

View at `http://localhost:8000/`

## License

[MIT](https://choosealicense.com/licenses/mit/)
