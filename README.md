# find-this-value

Find a value in a given object with programmable matching logic - node module

## Usage

```javascript
const ftv = require("find-this-value");
ftv({ a: "b" }, "b", (a, b) => a === b); // true
ftv({ a: "b" }, "a", (a, b) => a === b); // false
```

## License

MIT &copy; 2018 Git Faf
Copyright (c) 2025 Anubhav Saini
