const DEFAULT_OBJECT = {};
const TYPEOF_OBJECT = typeof DEFAULT_OBJECT;

const DEFAULT_COMPARE = (a, b) => typeof a === typeof b && a === b;
const isObject = (input) => typeof input === TYPEOF_OBJECT;


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
            const { found: f, location: l } = find(o, toFind, compareFn, [...location]);
            switch(f) {
                case true:
                    return {
                        found: f,
                        location: l,
                    };
                case false:
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
