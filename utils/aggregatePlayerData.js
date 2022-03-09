export const aggregatePlayerData = (array, stat, userName) => {
  return array.reduce((total, current) => {
    if (current.summonerName === userName) {
      if (stat === "wins") {
        if (current["win"] === true) {
          return (total += current["win"]);
        }
      } else {
        total += current[stat];
      }
    }
    return total;
  }, 0);
};
