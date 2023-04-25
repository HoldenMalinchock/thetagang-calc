import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

export const thetaGangResponseJsonSchema = z.object({
  data: z.object({
    trades: z.array(z.object({
      pl: z.number(),
      guid: z.string(),
      expiry_date: z.string().nullable(), // this is nullable because stock buys dont have an expiry date
      close_date: z.string().nullable(), // this is nullable because open trades
      open_date: z.string(),
      symbol: z.string(),
      initial: z.boolean(),
      quantity: z.number(),
      type: z.string(),
      win: z.boolean().nullable(), // This is nullable because stock buys dont have a win/loss
    })),
    metadata: z.object({
      winners: z.number(),
      losers: z.number(),
      closed: z.number(),
      netPremium: z.string(),
      netPremium2020: z.string().optional(),
      netPremium2021: z.string().optional(),
      netPremium2022: z.string().optional(),
      recentSymbols: z.array(z.string()),
      recentTradeTypes: z.array(z.string()),
      winPercentage: z.string(),
      averageTradeLength: z.string(),
    }),
  }),
});
