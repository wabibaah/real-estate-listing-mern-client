export const formatNumber = (x) => {
  return x?.string().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
