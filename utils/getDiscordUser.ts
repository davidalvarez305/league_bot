import { CUCU_GUILD_ID } from "../constants.js";

export const getDiscordUser = async (discordClient, discordUsername) => {
  try {
    const discordGuild = await discordClient.guilds.fetch(CUCU_GUILD_ID);
    const foundUser = await discordGuild.members.search({
      query: discordUsername,
    });
    if (foundUser.values().next().value) {
      return foundUser.values().next().value.user.id;
    }
    return null;
  } catch (err) {
    throw new Error(err);
  }
};
