import * as cheerio from "cheerio";
import fetch from "node-fetch";
import { CommandHandler } from "../runner";
import { getShiri } from "../common";

export const shiritori: CommandHandler = async (ctx) => {
  // todo: "reading" option
  const word = ctx.options.getOptionValue("word") as string;

  const url = `https://dictionary.goo.ne.jp/word/${word}/`;
  const reading = await fetch(url, { method: "GET" })
    .then((e) => e.text())
    .then((e) => cheerio.load(e))
    .then((e) => e(".yomi").text());

  let mutations = [];
  if (ctx.shiritori.score > 0) {
    mutations.push(
      ctx.model.entities.ShiritoriEntity.update({
        shiritoriId: ctx.shiritori.shiritoriId,
      })
        .subtract({ score: 1 })
        .go()
    );
  }

  condition: if (reading) {
    const words = await ctx.getRecentWords();

    if (words.length > 0) {
      if (getShiri(words[0].reading) !== reading[0]) {
        mutations.push(
          ctx.followUp({
            content: `${word} is not a shiritori! (-1)`,
          })
        );

        break condition;
      }
    }

    mutations = [
      ctx.model.entities.WordEntity.create({
        shiritoriId: ctx.shiritori.shiritoriId,
        memberHash: ctx.member.getIdHash(),
        word,
        reading,
      }).go(),

      ctx.model.entities.ShiritoriEntity.update({
        shiritoriId: ctx.shiritori.shiritoriId,
      })
        .add({ score: 1 })
        .go(),

      ctx.followUp({
        content: `Shiritori get! (+1) ${url}`,
      }),
    ];
  } else {
    mutations.push(
      ctx.followUp({
        content: `${word} could not be found! (-1)`,
      })
    );
  }

  return { mutations };
};
