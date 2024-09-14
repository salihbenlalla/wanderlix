function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUniqueRandomNumbers(
  howManyNums: number,
  min: number,
  max: number
): number[] {
  const uniqueNumbers = new Set<number>();

  while (uniqueNumbers.size < howManyNums) {
    const randomNumber = getRandomNumber(min, max);
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}

export { getUniqueRandomNumbers };
