/**
 * Converts and formats prices from database USD numbers to Vietnamese Dong (VND).
 * e.g., 150 -> "3,750,000 ₫"
 */
export function formatVND(price: number): string {
  if (price === undefined || price === null || isNaN(price)) return "0 ₫";
  
  // If price is already a large number (e.g. > 10000), treat it as VND.
  // Otherwise, convert it from USD by multiplying by 25,000 VND/USD.
  const vndAmount = price > 10000 ? price : price * 25000;
  
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(vndAmount);
  
  return `${formatted} ₫`;
}

/**
 * Returns the numeric VND amount for calculations.
 */
export function getVNDAmount(price: number): number {
  if (price === undefined || price === null || isNaN(price)) return 0;
  return price > 10000 ? price : price * 25000;
}
