// practice/14.2-clean-code.js

// Exercise 1: Meaningful names — before & after
// BAD:
function calc(a, b) { return a * b * 0.1; }
// GOOD:
const DISCOUNT_RATE = 0.1;
function calculateDiscount(price, quantity) {
    return price * quantity * DISCOUNT_RATE;
}

// Exercise 2: Single responsibility
// Split processUser into validateUser, normalizeUser, createUser, handleCreateUser
// (copy the "GOOD" version from the assignment and annotate why it's better)

// Exercise 3: Magic numbers
const MIN_PASSWORD_LENGTH = 8;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const HTTP_NOT_FOUND = 404;