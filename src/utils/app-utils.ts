/* eslint-disable @typescript-eslint/no-explicit-any */
export function convertToBengali(num: number) {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((digit: any) => bengaliDigits[digit])
    .join("");
}
