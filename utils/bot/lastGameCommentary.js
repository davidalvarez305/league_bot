import { isTopDamage, isTopPlayer, isTopKills, isLeastDamage, isWorstPlayer, isDuo } from "../gameAnalysis.js";
import { rankPlayersInMatch } from "../rankPlayersInMatch.js";

export const lastGameCommentary = (matchData, userName, discordUser) => {
    console.log('lastGameCommtary: ', )
    console.log('matchData: ', matchData)
    console.log('userName: ', userName)
    console.log('discordUser: ', discordUser)

    const performance = matchData.info.participants.filter((p) => p.summonerName === userName)[0]

    const topPlayer = isTopPlayer(matchData, userName)
    const topDamage = isTopDamage(matchData, userName)
    const topKills = isTopKills(matchData, userName)
    const leastDamage = isLeastDamage(matchData, userName)
    const worstPlayer = isWorstPlayer(matchData, userName)
    const duo = isDuo(matchData);

    if (duo.length > 1) {
        const { lobbyRankings } = rankPlayersInMatch(duo);
        switch (true) {
            case duo[0].win: {
                return `${lobbyRankings[0].player} just carried the shitter ${lobbyRankings[1].player}`
            }
            case !duo[0].win: {
                return `${lobbyRankings[1].player} & ${lobbyRankings[0].player} lost the last game together because they're both trash.`
            }
        }
    }

    switch (true) {
        case topPlayer && performance.win: {
            return `<@${discordUser}> hard carried last game with ${performance.kills} kills, ${performance.assists} assists, ${performance.deaths} deaths. He was the best player in the lobby.`
        }
        case topPlayer && !performance.win: {
            return `<@${discordUser}> was the best player in the last game with ${performance.kills} kills, ${performance.assists} assists, ${performance.deaths} deaths but couldn't bring the dub home. Feels bad man.`
        }
        case topDamage && performance.win: {
            return `<@${discordUser}> bajo tremendo foco last game with ${performance.kills} kills, ${performance.assists} assists, ${performance.deaths} deaths and got the free dub by doing the most damage. EZ.`
        }
        case topDamage && !performance.win: {
            return `<@${discordUser}> did the most damage last game but couldn't win. Sad days bruv. Man got ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths.`
        }
        case topKills && performance.win: {
            return `<@${discordUser}> just got ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths. El tipo le dio caña a to el mundo & got the DUB.`
        }
        case topKills && !performance.win: {
            return `<@${discordUser}> just got ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths. Killed a lot of people but didn't win. XD. Chased too much.`
        }
        case leastDamage && performance.win: {
            return `<@${discordUser}> did the least damage in the game but somehow got carried and won. XD. Man had ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths. I wish I was you bruv.`
        }
        case leastDamage && !performance.win: {
            return `<@${discordUser}> did the least damage and caused his team the game. ALT-F4 is the name of the game for you. LOL. He got ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths.`
        }
        case worstPlayer && performance.win: {
            return `<@${discordUser}> IDK how you managed to be that bad and still win. Man was the worst player in the lobby and got the dub by getting carried. He got ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths.`
        }
        case worstPlayer && !performance.win: {
            return `<@${discordUser}> not only didn't you not win, but you were also the worst player in the lobby with ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths. LMAO. Aye...trust ALT-F4. Maybe even uninstall, idk.`
        }
        default: {
            return `<@${discordUser}> just got ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths. Nothing special, average player.${performance.win ? ` Got carried.` : ` Lost because he stank.`}`
        }
    }
}