import { z } from "https://deno.land/x/zod/mod.ts";

export const thetaGangResponsJsonSchema = z.object({
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
  }),
});
