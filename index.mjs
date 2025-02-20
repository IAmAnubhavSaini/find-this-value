const DEFAULT_STRING = "";
const DEFAULT_OBJECT = {};
const TYPEOF_OBJECT = typeof DEFAULT_OBJECT;

const DEFAULT_COMPARE = (a, b) => typeof a === typeof b && a === b;

const getDefaultLocation = (location) => (location ? location : []);
const getDefaultObject = (input) => input || DEFAULT_OBJECT;
const getDefaultCompare = (compare) => compare || DEFAULT_COMPARE;

const isObject = (input) => typeof input === TYPEOF_OBJECT;

const removeLastCharacter = (input) => {
    return input.substr(0, input.length - 1);
};

/**
 *
 * @param {Object} inputObject - The object that somewhere deep down has the value you are interested in.
 * @param {*} toFind - Default string; if not, then compare function has to provide compare functionality
 * @param {Function} compareFn - compare function
 */
function findThisValue(inputObject, toFind, compareFn = DEFAULT_COMPARE) {
    if (!inputObject || !toFind) {
        return {
            found: false,
            location: undefined,
        };
    }
    const out = find(inputObject, toFind, compareFn);
    if (out.found) {
        out.location = (out.location && out.location.join(".")) || undefined;
    } else {
        out.location = undefined;
    }
    return out;
}

const find = (inputObject, toFind, compareFn = DEFAULT_COMPARE, location = []) => {
    if (!inputObject || !toFind) {
        return {
            found: false,
            location: undefined,
        };
    }

    const keys = Object.keys(inputObject);

    let found = false;

    for (let i = 0; i < keys.length && !found; i++) {
        const k = keys[i];
        const o = inputObject[k];
        location.push(k);

        if (isObject(o)) {
            const { found: _found, location: _location } = find(o, toFind, compareFn, [...location]);
            if (_found) {
                return {
                    found: _found,
                    location: _location,
                };
            } else {
                location.pop();
                continue;
            }
        }
        found = compareFn(o, toFind);
        if (!found) {
            location.pop();
        }
    }

    return {
        found,
        location,
    };
};

export { findThisValue };
