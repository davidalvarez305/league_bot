import { CUCU_GUILD_ID } from "../constants.js";

export const getDiscordUser = async (discordClient, discordUsername) => {
  const discordGuild = await discordClient.guilds.fetch(CUCU_GUILD_ID);
  const foundUser = await discordGuild.members.search({
    query: discordUsername,
  });
  console.log("foundUser: ", foundUser);
  if (foundUser.length > 0) {
    return foundUser.values().next().value.user.id;
  }
  return null;
};
