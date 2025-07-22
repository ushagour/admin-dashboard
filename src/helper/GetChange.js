
/* This function calculates the percentage change between two numbers.
   If the previous value is zero, it returns "+100%".
    Otherwise, it calculates the change and formats it as a percentage string.
    The result is a string that includes a sign (+ or -) and the percentage change rounded to one decimal place.
*/
export default function getChange(current, previous) {
  if (previous === 0) return "+100%";
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(1)}%`;
}