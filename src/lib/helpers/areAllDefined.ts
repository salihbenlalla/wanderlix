export function areAllDefined<T>(arr: (T | undefined | null)[]): arr is T[] {
  return arr.every((element): element is T => element !== undefined && element !== null);
}