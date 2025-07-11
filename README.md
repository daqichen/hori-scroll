<p align="center">
  <img width="200px" height="200px" alt="hori-scroll" src="https://github.com/user-attachments/assets/71b05727-90a6-42d6-ae19-c9d8933a9a6f"/>
</p>
<h1 align="center"><code>hori-scroll</code></h1>

<p align="center">
  endless, animated horizontal scrollingg
</p>

<p align="center">
  <a href="https://npm.im/hori-scroll"><img src="https://img.shields.io/npm/v/hori-scroll?style=flat-square" alt="NPM Version" /></a>
  <a href="https://npm.im/hori-scroll"><img src="https://img.shields.io/npm/l/hori-scroll?style=flat-square" alt="MIT License" /></a>
  <a href="https://github.com/daqichen/hori-scroll"><img src="https://img.shields.io/github/actions/workflow/status/daqichen/hori-scroll/.github%2Fworkflows%2Fchromatic.yml?branch=main&style=flat-square" alt="Build status" /></a>
  <a href="https://github.com/daqichen/hori-scroll"><img src="https://img.shields.io/github/issues-search?query=repo%3Adaqichen%2Fhori-scroll%20is%3Aopen&label=Open%20issues&style=flat-square" alt="Open issues" /></a>
</p>
 
<p align="center">
  <a href="https://codesandbox.io/p/devbox/boring-star-jkz2yj"><img src="https://img.shields.io/badge/Demo-CodeSandbox-black?style=for-the-badge"></a>
  <a href="https://main--67aab46a4dba4c850f9bcb99.chromatic.com/"><img src="https://img.shields.io/badge/Docs-Storybook-pink?style=for-the-badge"></a>
</p>

Unlike a pure `CSS`-driven scroll solution, the horizontal scroll in this library is driven by `JS` + `translate` `CSS` property, therefore allows for user interference and upon user's cursor leaving the container, the scrolling animation continues infinitely.

The idea was inspired by Perplexity's prompts library and Instagram's search suggestions, both of which scroll endlessly while allowing user to interact with the scroll if they wish.

Built using Rslib.

## Installation

```bash
npm i hori-scroll
```

## Usage

```js
import HoriScroll from "hori-scroll";

// If you are using Typescript and need to extend/leverage types and interfaces:
import HoriScroll, { ANIMATION_SPEED_TYPE, HoriScrollClass } from "hori-scroll";
```
---

## Options:

| Prop Name                | Type    | Options                                         | Default Value                                                                                   | Required | Description                                         |
|--------------------------|---------|-------------------------------------------------|-----------------------------------------------------------------------------------------------|----------|-----------------------------------------------------|
| `options`                | `Array< value: TValue extends number \| string; materialIconName?: IconName \| string; icon?: ReactNode; key?: Key;>`  | —                                               | —                                                                                             | No       | Array of options to display in the horizontal scroll|
| `onClick`                | function| —                                               | —                                                                                             | No       | Triggered when an option is clicked                 |
| `animationSpeed`         | string  | SLOW, FAST, MEDIUM                              | MEDIUM                                                                                        | No       | Speed of the entering animation                     |
| `enteringAnimationType`  | string  | none, scale, translate-up, translate-down       | none                                                                                          | No       | Type of entering animation                          |
| `enteringAnimationDelay` | number  | —                                               | 100                                                                                           | No       | Delay before the entering animation starts          |
| `styles`                 | object  | —                                               | `{ background: "#023047", color: "white", buttonBackground: "#415a77", gapBetweenElementsInPixels: 24, containerWidth: "80vw" }` | No       | Custom styles for the component<br>**Fields:**<br>- background: string<br>- buttonBackground: string<br>- color: string<br>- gapBetweenElementsInPixels: number<br>- containerWidth: string |
| `isClickable`            | boolean | —                                               | false                                                                                         | No       | Make the options clickable                          |
| `blurredEdges`           | boolean | —                                               | false                                                                                         | No       | Apply blurred edges effect to the component         |
| `animationEnabled`       | boolean | —                                               | true                                                                                          | No       | Enable or disable the auto-scroll animation         |

**Note:**  
- For `styles`, the object can include: `background`, `buttonBackground`, `color`, `gapBetweenElementsInPixels`, `containerWidth`.  

### Option Array `prop` (w/o passing children props)
- `options`
  - `Array<ListItemProps<TValue extends number | string>>;` (optional)
  - `ListItemProps<TValue>`
    - value
      - `TValue` (required)
    - materialIconName
      - `IconName` | string (optional)
    - icon
      - `ReactNode` (optional)

- `isClickable`
  - `boolean` (optional)
  - default `false`

- `onClick`
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

// Typescript
<HoriScroll<string>
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
  onClick={(e, key) => alert(e + ' with key ' + key)} // type of `e` & `key` are inferred
/>
```
---

### Animation `prop` Options
- animationEnabled
  - `boolean` (optional)
  - default `true`

- enteringAnimationType
  - (optional)
  - Possible values: `none` | `scale` | `translate-up` | `translate-down`
  
- enteringAnimationDelay
  - `number` (optional)
  - default `100`
  
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
