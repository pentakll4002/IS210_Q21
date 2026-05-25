export const mapUsToEuSize = (usSize: string): string => {
  if (!usSize) return "";
  const match = usSize.match(/US\s*([0-9.]+)/i);
  if (!match) return usSize;
  const usNum = parseFloat(match[1]);
  if (isNaN(usNum)) return usSize;

  const mapping: { [key: number]: string } = {
    6: "38.5",
    6.5: "39",
    7: "40",
    7.5: "40.5",
    8: "41",
    8.5: "42",
    9: "42.5",
    9.5: "43",
    10: "44",
    10.5: "44.5",
    11: "45",
    11.5: "45.5",
    12: "46",
    12.5: "47",
    13: "47.5"
  };

  const euVal = mapping[usNum];
  return euVal ? `EU ${euVal} (${usSize})` : usSize;
};
