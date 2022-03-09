export const aggregatePlayerData = (array, stat, userName) => {
  return array.reduce((total, current) => {
    if (current.summonerName === userName) {
      total += current[stat];
    }
    return total;
  }, 0);
};
