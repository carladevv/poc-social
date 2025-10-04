export function randomPick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
