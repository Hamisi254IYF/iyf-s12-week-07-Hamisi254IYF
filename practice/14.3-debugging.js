function calculateOrderTotal(items) {
    let total = 0;

    // BUG 1: <= should be < (off-by-one — accesses items[length] = undefined)
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // BUG 2: quanity → quantity (typo — NaN result)
        total += item.price * item.quantity;
    }

    if (total > 100) {
        // BUG 3 (logic): "10% discount" — if intended price = total * 0.9, the comment is fine.
        //                But the comment says "10% discount", and 0.9 = keep 90% = 10% off. ✅ correct.
        total = total * 0.9;
    }

    return total;
}

// practice/14.3-debugging.js
// Fixed version — 3 bugs:
// 1. `i <= items.length` → `i < items.length` (avoid reading past end)
// 2. `item.quanity` → `item.quantity` (property name typo)
// 3. Verified discount logic (0.9 = 10% off, correct as written)