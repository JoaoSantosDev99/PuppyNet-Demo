export const addressShortener = (address) => {
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export const longAddressCrop = (address) => {
  return address.slice(0, 10) + " . . . " + address.slice(-10);
};
