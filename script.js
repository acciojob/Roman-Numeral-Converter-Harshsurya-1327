function makeChange(input) {
  // Normalize input -> integer cents
  if (input === undefined || input === null) {
    throw new Error('No amount provided. Pass cents (e.g. 47) or dollars (e.g. 0.47 or "0.47").');
  }

  let amount = input;

  // Convert string input
  if (typeof amount === 'string') {
    amount = amount.trim();
    if (amount === '') throw new Error('Empty string provided.');
    // If string contains a decimal point, treat as dollars
    if (amount.includes('.')) {
      const n = Number(amount);
      if (!Number.isFinite(n)) throw new Error('Invalid number string.');
      amount = Math.round(n * 100);
    } else {
      amount = parseInt(amount, 10);
      if (Number.isNaN(amount)) throw new Error('Invalid integer string.');
    }
  }

  // Convert numeric floats (assume dollars if < 1 or has fractional part)
  if (typeof amount === 'number' && !Number.isInteger(amount)) {
    // If it's less than 1 (e.g., 0.47), assume dollars -> cents
    if (Math.abs(amount) < 1) amount = Math.round(amount * 100);
    else amount = Math.round(amount); // round cents if user passed float like 47.0
  }

  // Validate final amount
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    throw new Error('Amount could not be parsed to a finite number.');
  }
  amount = Math.trunc(amount); // ensure integer

  // Constraint from problem: amount >0 and <100
  if (amount <= 0 || amount >= 100) {
    throw new Error('Amount must be a positive integer less than 100 (in cents).');
  }

  // Compute change
  const change = { q: 0, d: 0, n: 0, p: 0 };
  change.q = Math.floor(amount / 25);
  amount %= 25;
  change.d = Math.floor(amount / 10);
  amount %= 10;
  change.n = Math.floor(amount / 5);
  amount %= 5;
  change.p = amount;

  return change;
}

// Example runs
console.log(makeChange(47));    // { q: 1, d: 2, n: 0, p: 2 }
console.log(makeChange("24"));  // { q: 0, d: 2, n: 0, p: 4 }
console.log(makeChange(0.99));  // treats as dollars -> 99 cents -> { q:3, d:2, n:0, p:4 }
console.log(makeChange("0.47"));// { q:1, d:2, n:0, p:2 }
