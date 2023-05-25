// This function returns min or max if value exceeds the range, otherwise
// the original value is returned
export const bandPassFilter = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
}