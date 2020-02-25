export function randomNumber(max: number = 256): number {
  return Math.floor(Math.random() * (max + 1))
}

export function randomArray(size: number = 10, max: number = 256): number[] {
  const result: number[] = []
  for (var i = 0; i < size; i++) {
    result.push(randomNumber(max));
  }
  return result;
}
