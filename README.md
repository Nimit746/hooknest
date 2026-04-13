# hooknest 🪝

> A lightweight, zero-dependency collection of production-ready React custom hooks.

[![npm version](https://img.shields.io/npm/v/hooknest?color=crimson&style=flat-square)](https://www.npmjs.com/package/hooknest)
[![license](https://img.shields.io/npm/l/hooknest?color=crimson&style=flat-square)](./LICENSE)
[![react peer](https://img.shields.io/npm/dependency-version/hooknest/peer/react?style=flat-square)](https://reactjs.org/)

---

## Why hooknest?

Stop copy-pasting the same hooks across every project. **hooknest** gives you a clean, consistent set of battle-tested React hooks for the patterns you reach for every day — debouncing, local storage sync, clipboard access, and more.

- ✅ Zero dependencies (only React as a peer dep)
- ✅ ES Module native
- ✅ Tree-shakeable — import only what you use
- ✅ Works with React 17, 18, and 19

---

## Installation

```bash
npm install hooknest
```

---

## Hooks

| Hook | Description |
|---|---|
| [`useDebounce`](#usedebounce) | Debounce a rapidly changing value by a delay |
| [`useLocalStorage`](#uselocalstorage) | Persist and sync state with `localStorage` |
| [`useToggle`](#usetoggle) | Boolean toggle with a clean API |
| [`useOnClickOutside`](#useonclickoutside) | Fire a callback when clicking outside an element |
| [`usePrevious`](#useprevious) | Track the previous value of any state or prop |
| [`useCopyToClipboard`](#usecopytoclipboard) | Copy text to clipboard with a `copied` status flag |

---

## Usage

### useDebounce

Delays updating a value until after a specified wait time. Perfect for search inputs, API calls, and resize handlers.

```jsx
import { useDebounce } from "hooknest";

function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

**Parameters**

| Param | Type | Description |
|---|---|---|
| `value` | `any` | The value to debounce |
| `delay` | `number` | Delay in milliseconds |

**Returns:** The debounced value.

---

### useLocalStorage

Syncs React state with `localStorage`. Works just like `useState` but persists across page reloads.

```jsx
import { useLocalStorage } from "hooknest";

function ThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current theme: {theme}
    </button>
  );
}
```

**Parameters**

| Param | Type | Description |
|---|---|---|
| `key` | `string` | The localStorage key |
| `initialValue` | `any` | Default value if key doesn't exist |

**Returns:** `[storedValue, setValue]` — same API as `useState`.

---

### useToggle

A minimal hook for boolean state with a stable toggle function.

```jsx
import { useToggle } from "hooknest";

function Modal() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <button onClick={toggle}>Open Modal</button>
      {isOpen && <dialog open>Hello! <button onClick={toggle}>Close</button></dialog>}
    </>
  );
}
```

**Parameters**

| Param | Type | Description |
|---|---|---|
| `initialValue` | `boolean` | Starting value (default: `false`) |

**Returns:** `[value, toggle]`

---

### useOnClickOutside

Fires a callback whenever a click is detected outside the referenced element. Great for dropdowns, modals, and tooltips.

```jsx
import { useOnClickOutside } from "hooknest";

function Dropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref}>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      {open && <ul><li>Option 1</li><li>Option 2</li></ul>}
    </div>
  );
}
```

**Parameters**

| Param | Type | Description |
|---|---|---|
| `ref` | `RefObject` | Ref attached to the target element |
| `handler` | `function` | Callback to fire on outside click |

---

### usePrevious

Returns the value from the previous render. Useful for comparing old and new state, or animating between values.

```jsx
import { usePrevious } from "hooknest";

function Counter() {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <>
      <p>Now: {count} | Before: {previous ?? "—"}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </>
  );
}
```

**Parameters**

| Param | Type | Description |
|---|---|---|
| `value` | `any` | The value to track |

**Returns:** The value from the previous render (`undefined` on first render).

---

### useCopyToClipboard

Copies a string to the clipboard and exposes a `copied` flag that auto-resets after a timeout.

```jsx
import { useCopyToClipboard } from "hooknest";

function CopyButton({ text }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button onClick={() => copy(text)}>
      {copied ? "Copied! ✅" : "Copy to clipboard"}
    </button>
  );
}
```

**Returns**

| Property | Type | Description |
|---|---|---|
| `copy` | `function(text)` | Call with the string to copy |
| `copied` | `boolean` | `true` for ~2 seconds after a successful copy |

---

## Requirements

- React `>= 17.0.0`
- Node.js `>= 14`
- ESM-compatible bundler (Vite, Next.js, Webpack 5+)

---

## Contributing

Contributions, issues and feature requests are welcome!

1. Fork the repo
2. Create your branch: `git checkout -b feat/my-hook`
3. Commit your changes: `git commit -m 'feat: add useMyHook'`
4. Push to the branch: `git push origin feat/my-hook`
5. Open a Pull Request

---

## Author

**Nimit Gupta** · [@nimit726](https://github.com/nimit726)

---

## License

[MIT](./LICENSE) © Nimit Gupta
