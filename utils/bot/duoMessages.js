import { getRandomIndex } from "../getRandomIndex.js";

const DUO_LOSSES = [
  "lost the last game together for being trash",
  "lost the last game together for being tremendas lleguas lmaooooo",
  "lost the last game together for being actual dogs",
  "lost the last game together for being doggies",
  "lost the last game together for being hot garb XDDDDDDD",
  "lost the last game together por ser trash",
  "lost the last game together por ser tremendas lleguas lmaooooo",
  "lost the last game together por ser actual dogs",
  "lost the last game together por ser doggies",
  "lost the last game together por ser hot garb XDDDDDDD",
  "lost the last game together cuz they're trash",
  "lost the last game together cuz they're tremendas lleguas lmaooooo",
  "lost the last game together cuz they're actual dogs",
  "lost the last game together cuz they're doggies",
  "lost the last game together cuz they're hot garb XDDDDDDD",
  "lost the last game together porque son trash",
  "lost the last game together porque son tremendas lleguas lmaooooo",
  "lost the last game together porque son actual dogs",
  "lost the last game together porque son doggies",
  "lost the last game together porque son hot garb XDDDDDDD",
  "dropped an easy W for being trash",
  "dropped an easy W for being tremendas lleguas lmaooooo",
  "dropped an easy W for being actual dogs",
  "dropped an easy W for being doggies",
  "dropped an easy W for being hot garb XDDDDDDD",
  "dropped an easy W por ser trash",
  "dropped an easy W por ser tremendas lleguas lmaooooo",
  "dropped an easy W por ser actual dogs",
  "dropped an easy W por ser doggies",
  "dropped an easy W por ser hot garb XDDDDDDD",
  "dropped an easy W cuz they're trash",
  "dropped an easy W cuz they're tremendas lleguas lmaooooo",
  "dropped an easy W cuz they're actual dogs",
  "dropped an easy W cuz they're doggies",
  "dropped an easy W cuz they're hot garb XDDDDDDD",
  "dropped an easy W porque son trash",
  "dropped an easy W porque son tremendas lleguas lmaooooo",
  "dropped an easy W porque son actual dogs",
  "dropped an easy W porque son doggies",
  "dropped an easy W porque son hot garb XDDDDDDD",
  "took home a fat L for being trash",
  "took home a fat L for being tremendas lleguas lmaooooo",
  "took home a fat L for being actual dogs",
  "took home a fat L for being doggies",
  "took home a fat L for being hot garb XDDDDDDD",
  "took home a fat L por ser trash",
  "took home a fat L por ser tremendas lleguas lmaooooo",
  "took home a fat L por ser actual dogs",
  "took home a fat L por ser doggies",
  "took home a fat L por ser hot garb XDDDDDDD",
  "took home a fat L cuz they're trash",
  "took home a fat L cuz they're tremendas lleguas lmaooooo",
  "took home a fat L cuz they're actual dogs",
  "took home a fat L cuz they're doggies",
  "took home a fat L cuz they're hot garb XDDDDDDD",
  "took home a fat L porque son trash",
  "took home a fat L porque son tremendas lleguas lmaooooo",
  "took home a fat L porque son actual dogs",
  "took home a fat L porque son doggies",
  "took home a fat L porque son hot garb XDDDDDDD",
  "le dieron tres patas por culo for being trash",
  "le dieron tres patas por culo for being tremendas lleguas lmaooooo",
  "le dieron tres patas por culo for being actual dogs",
  "le dieron tres patas por culo for being doggies",
  "le dieron tres patas por culo for being hot garb XDDDDDDD",
  "le dieron tres patas por culo por ser trash",
  "le dieron tres patas por culo por ser tremendas lleguas lmaooooo",
  "le dieron tres patas por culo por ser actual dogs",
  "le dieron tres patas por culo por ser doggies",
  "le dieron tres patas por culo por ser hot garb XDDDDDDD",
  "le dieron tres patas por culo cuz they're trash",
  "le dieron tres patas por culo cuz they're tremendas lleguas lmaooooo",
  "le dieron tres patas por culo cuz they're actual dogs",
  "le dieron tres patas por culo cuz they're doggies",
  "le dieron tres patas por culo cuz they're hot garb XDDDDDDD",
  "le dieron tres patas por culo porque son trash",
  "le dieron tres patas por culo porque son tremendas lleguas lmaooooo",
  "le dieron tres patas por culo porque son actual dogs",
  "le dieron tres patas por culo porque son doggies",
  "le dieron tres patas por culo porque son hot garb XDDDDDDD",
  "le pusieron el deo for being trash",
  "le pusieron el deo for being tremendas lleguas lmaooooo",
  "le pusieron el deo for being actual dogs",
  "le pusieron el deo for being doggies",
  "le pusieron el deo for being hot garb XDDDDDDD",
  "le pusieron el deo por ser trash",
  "le pusieron el deo por ser tremendas lleguas lmaooooo",
  "le pusieron el deo por ser actual dogs",
  "le pusieron el deo por ser doggies",
  "le pusieron el deo por ser hot garb XDDDDDDD",
  "le pusieron el deo cuz they're trash",
  "le pusieron el deo cuz they're tremendas lleguas lmaooooo",
  "le pusieron el deo cuz they're actual dogs",
  "le pusieron el deo cuz they're doggies",
  "le pusieron el deo cuz they're hot garb XDDDDDDD",
  "le pusieron el deo porque son trash",
  "le pusieron el deo porque son tremendas lleguas lmaooooo",
  "le pusieron el deo porque son actual dogs",
  "le pusieron el deo porque son doggies",
  "le pusieron el deo porque son hot garb XDDDDDDD",
  "se la aplicaron for being trash",
  "se la aplicaron for being tremendas lleguas lmaooooo",
  "se la aplicaron for being actual dogs",
  "se la aplicaron for being doggies",
  "se la aplicaron for being hot garb XDDDDDDD",
  "se la aplicaron por ser trash",
  "se la aplicaron por ser tremendas lleguas lmaooooo",
  "se la aplicaron por ser actual dogs",
  "se la aplicaron por ser doggies",
  "se la aplicaron por ser hot garb XDDDDDDD",
  "se la aplicaron cuz they're trash",
  "se la aplicaron cuz they're tremendas lleguas lmaooooo",
  "se la aplicaron cuz they're actual dogs",
  "se la aplicaron cuz they're doggies",
  "se la aplicaron cuz they're hot garb XDDDDDDD",
  "se la aplicaron porque son trash",
  "se la aplicaron porque son tremendas lleguas lmaooooo",
  "se la aplicaron porque son actual dogs",
  "se la aplicaron porque son doggies",
  "se la aplicaron porque son hot garb XDDDDDDD",
  "gave away some freelo for being trash",
  "gave away some freelo for being tremendas lleguas lmaooooo",
  "gave away some freelo for being actual dogs",
  "gave away some freelo for being doggies",
  "gave away some freelo for being hot garb XDDDDDDD",
  "gave away some freelo por ser trash",
  "gave away some freelo por ser tremendas lleguas lmaooooo",
  "gave away some freelo por ser actual dogs",
  "gave away some freelo por ser doggies",
  "gave away some freelo por ser hot garb XDDDDDDD",
  "gave away some freelo cuz they're trash",
  "gave away some freelo cuz they're tremendas lleguas lmaooooo",
  "gave away some freelo cuz they're actual dogs",
  "gave away some freelo cuz they're doggies",
  "gave away some freelo cuz they're hot garb XDDDDDDD",
  "gave away some freelo porque son trash",
  "gave away some freelo porque son tremendas lleguas lmaooooo",
  "gave away some freelo porque son actual dogs",
  "gave away some freelo porque son doggies",
  "gave away some freelo porque son hot garb XDDDDDDD",
  "are giving out freelo for being trash",
  "are giving out freelo for being tremendas lleguas lmaooooo",
  "are giving out freelo for being actual dogs",
  "are giving out freelo for being doggies",
  "are giving out freelo for being hot garb XDDDDDDD",
  "are giving out freelo por ser trash",
  "are giving out freelo por ser tremendas lleguas lmaooooo",
  "are giving out freelo por ser actual dogs",
  "are giving out freelo por ser doggies",
  "are giving out freelo por ser hot garb XDDDDDDD",
  "are giving out freelo cuz they're trash",
  "are giving out freelo cuz they're tremendas lleguas lmaooooo",
  "are giving out freelo cuz they're actual dogs",
  "are giving out freelo cuz they're doggies",
  "are giving out freelo cuz they're hot garb XDDDDDDD",
  "are giving out freelo porque son trash",
  "are giving out freelo porque son tremendas lleguas lmaooooo",
  "are giving out freelo porque son actual dogs",
  "are giving out freelo porque son doggies",
  "are giving out freelo porque son hot garb XDDDDDDD",
];

const DUO_WINS = [
  "just carried the shitter",
  "just carried the trash can",
  "just carried the doggie",
  "just carried the ol' ball and chain",
  "just carried the dead weight",
  "just carried the biggest zero to the left NA",
  "had to carry the shitter",
  "had to carry the trash can",
  "had to carry the doggie",
  "had to carry the ol' ball and chain",
  "had to carry the dead weight",
  "had to carry the biggest zero to the left NA",
  "gave the heaviest carry to the shitter",
  "gave the heaviest carry to the trash can",
  "gave the heaviest carry to the doggie",
  "gave the heaviest carry to the ol' ball and chain",
  "gave the heaviest carry to the dead weight",
  "gave the heaviest carry to the biggest zero to the left NA",
  "tubo que darle el carry of the century to the shitter",
  "tubo que darle el carry of the century to the trash can",
  "tubo que darle el carry of the century to the doggie",
  "tubo que darle el carry of the century to the ol' ball and chain",
  "tubo que darle el carry of the century to the dead weight",
  "tubo que darle el carry of the century to the biggest zero to the left NA",
  "has back pain after that heavy carry to the shitter",
  "has back pain after that heavy carry to the trash can",
  "has back pain after that heavy carry to the doggie",
  "has back pain after that heavy carry to the ol' ball and chain",
  "has back pain after that heavy carry to the dead weight",
  "has back pain after that heavy carry to the biggest zero to the left NA",
  "le hace falta tylenol pal lomo after carrying the shitter",
  "le hace falta tylenol pal lomo after carrying the trash can",
  "le hace falta tylenol pal lomo after carrying the doggie",
  "le hace falta tylenol pal lomo after carrying the ol' ball and chain",
  "le hace falta tylenol pal lomo after carrying the dead weight",
  "le hace falta tylenol pal lomo after carrying the biggest zero to the left NA",
  "needs some icy hot after having to carry the shitter",
  "needs some icy hot after having to carry the trash can",
  "needs some icy hot after having to carry the doggie",
  "needs some icy hot after having to carry the ol' ball and chain",
  "needs some icy hot after having to carry the dead weight",
  "needs some icy hot after having to carry the biggest zero to the left NA",
];

export const duoMessagesWin = (playerOne, playerTwo) => {
  return `${playerOne} ${
    DUO_WINS[getRandomIndex(DUO_WINS.length)]
  } ${playerTwo}`;
};

export const duoMessagesLoss = (playerOne, playerTwo) => {
    return `${playerOne} & ${playerTwo} ${DUO_LOSSES[getRandomIndex(DUO_LOSSES.length)]}`
}
