import { CommandHandler } from "../runner";
import { getShiri, gooJisho } from "../common";

export const shiritori: CommandHandler = async (ctx) => {
  const word = ctx.options.getOptionValue("word") as string;
  const reading_ = ctx.options.getOptionValue("reading") as string | undefined;

  const baseUrl = "https://dictionary.goo.ne.jp/word";
  let url = `${baseUrl}/${word}/`;
  let reading = await gooJisho(url);
  if (!reading && reading_) {
    url = `${baseUrl}/${word}_%28${reading_}%29/`;
    reading = await gooJisho(url);
  }

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
      const shiri = getShiri(words[0].reading);
      if (shiri !== "ん" && shiri !== "ン" && shiri !== reading[0]) {
        mutations.push(
          ctx.followUp({
            content: `❌ ${ctx.replyI8l.shiritoriBad(word)}`,
          })
        );

        break condition;
      }
    }

    mutations = [
      ctx.model.entities.WordEntity.create({
        shiritoriId: ctx.shiritori.shiritoriId,
        memberHash: ctx.member.getIdHash(),
        reading,
        word,
      }).go(),

      ctx.model.entities.ShiritoriEntity.update({
        shiritoriId: ctx.shiritori.shiritoriId,
      })
        .add({ score: 1 })
        .go(),

      ctx.followUp({
        content: `⭕ ${ctx.replyI8l.shiritoriGet()} (${url})`,
      }),
    ];
  } else {
    mutations.push(
      ctx.followUp({
        content: `❌ ${ctx.replyI8l.shiritoriNotFound(word)}`,
      })
    );
  }

  return { mutations };
};
