# hooknest 🪝

A lightweight collection of essential React hooks for everyday use.

![npm](https://img.shields.io/npm/v/hooknest)
![license](https://img.shields.io/npm/l/hooknest)
![npm downloads](https://img.shields.io/npm/dm/hooknest)

## Installation

```bash
npm install hooknest
```

## Hooks

| Hook | Description |
|------|-------------|
| `useDebounce` | Debounce a value by a given delay |
| `useLocalStorage` | Sync state with localStorage |
| `useToggle` | Simple boolean toggle |
| `useOnClickOutside` | Detect clicks outside an element |
| `usePrevious` | Track the previous value of a state |
| `useCopyToClipboard` | Copy text to clipboard with copied status |

---

## Usage

### useDebounce

```jsx
import { useDebounce } from "hooknest";

function Search() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 500);

  return <input onChange={(e) => setQuery(e.target.value)} />;
}
```

### useLocalStorage

```jsx
import { useLocalStorage } from "hooknest";

function App() {
  const [name, setName] = useLocalStorage("username", "Guest");

  return <button onClick={() => setName("Nimit")}>{name}</button>;
}
```

### useToggle

```jsx
import { useToggle } from "hooknest";

function App() {
  const [on, toggle] = useToggle();

  return <button onClick={toggle}>{on ? "ON" : "OFF"}</button>;
}
```

### useOnClickOutside

```jsx
import { useOnClickOutside } from "hooknest";

function App() {
  const ref = useRef();
  useOnClickOutside(ref, () => console.log("Clicked outside!"));

  return <div ref={ref}>Click outside me</div>;
}
```

### usePrevious

```jsx
import { usePrevious } from "hooknest";

function App() {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <>
      <p>Current: {count}</p>
      <p>Previous: {previous}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </>
  );
}
```

### useCopyToClipboard

```jsx
import { useCopyToClipboard } from "hooknest";

function App() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button onClick={() => copy("Hello World")}>
      {copied ? "Copied! ✅" : "Copy"}
    </button>
  );
}
```

---

## Requirements

- React >= 17.0.0

## License

MIT © Nimit Gupta
