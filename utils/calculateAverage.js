export const calculateAverage = (array, stat, userName) => {
  const sum = array.reduce((total, current) => {
    if (current.summonerName === userName) {
      total += current[stat];
    }
    return total;
  }, 0);
  return (
    sum / array.filter((p) => p.summonerName === userName).length
  ).toFixed(2);
};
