const isValidCombination = (current: string[]): boolean => {
  const prefixes = new Set<string>();
  for (const item of current) {
    const prefix = item[0];
    if (prefixes.has(prefix)) return false;
    prefixes.add(prefix);
  }
  return true;
};

export const generateCombinations = (
  items: string[],
  length: number,
): string[][] => {
  const result: string[][] = [];
  const used = new Set<string>();

  const generate = (start: number, current: string[]) => {
    if (current.length === length) {
      const sortedComb = [...current].sort();
      const key = sortedComb.join(',');
      if (!used.has(key) && isValidCombination(current)) {
        used.add(key);
        result.push(sortedComb);
      }
      return;
    }

    for (let i = start; i < items.length; i++) {
      current.push(items[i]);
      generate(i + 1, current);
      current.pop();
    }
  };

  generate(0, []);

  return result.sort((a, b) => {
    for (let i = 0; i < length; i++) {
      const comp = a[i].localeCompare(b[i]);
      if (comp !== 0) return comp;
    }
    return 0;
  });
};
