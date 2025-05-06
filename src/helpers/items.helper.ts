export const convertInputToItems = (items: number[]): string[] => {
  const result: string[] = [];

  for (let i = 0; i < items.length; i++) {
    const count = items[i];
    const letter = String.fromCharCode('A'.charCodeAt(0) + i);

    for (let j = 1; j <= count; j++) {
      result.push(`${letter}${j}`);
    }
  }

  return result;
};
