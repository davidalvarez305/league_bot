import { Client } from "discord.js";
import { CUCU_GUILD_ID } from "../constants";

export const getDiscordUser = async (discordClient: Client<boolean>, discordUsername: string): Promise<any | null> => {
  try {
    const discordGuild = await discordClient.guilds.fetch(String(CUCU_GUILD_ID));
    const foundUser = await discordGuild.members.search({
      query: discordUsername,
    });
    if (foundUser.values().next().value) {
      return foundUser.values().next().value.user.id;
    }
    return null;
  } catch (err) {
    throw new Error(err as any);
  }
};
