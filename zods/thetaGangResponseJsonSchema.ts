import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

export const metadata = z.object({
  winners: z.number(),
  losers: z.number(),
  closed: z.number(),
  netPremium: z.string(),
  netPremium2020: z.string().optional(),
  netPremium2021: z.string().optional(),
  netPremium2022: z.string().optional(),
  recentSymbols: z.array(z.string().nullable()),
  recentTradeTypes: z.array(z.string().nullable()),
  winPercentage: z.string(),
  averageTradeLength: z.string(),
});

export const tradesV1 = z.array(
  z.object({
    profitLoss: z.string().nullable().or(z.number().nullable()),
    pl: z.number().optional(),
    guid: z.string(),
    expiry_date: z.string().nullable(), // this is nullable because stock buys dont have an expiry date
    close_date: z.string().nullable(), // this is nullable because open trades
    open_date: z.string(),
    symbol: z.string(),
    initial: z.boolean().nullable(),
    quantity: z.number(),
    type: z.string(),
    win: z.boolean().nullable(), // This is nullable because stock buys dont have a win/loss
  }).nullable(),
);

export const tradesV3 = z.array(
  z.object({
    shares: z.number(),
    cost: z.number(),
    profitLoss: z.string().nullable().or(z.number().nullable()),
    guid: z.string(),
    user_guid: z.string(),
    symbol: z.string(),
    type: z.string(),
    payment: z.string().includes("credit").or(z.string().includes("debit"))
      .nullable(),
    short_call: z.string().nullable(),
    short_call2: z.string().nullable(),
    long_call: z.string().nullable(),
    long_call2: z.string().nullable(),
    short_put: z.string().nullable(),
    short_put2: z.string().nullable(),
    long_put: z.string().nullable(),
    long_put2: z.string().nullable(),
    quantity: z.number(),
    price_filled: z.number(),
    price_closed: z.number().nullable(),
    opened_during_market_hours: z.boolean().nullable(),
    closed_during_market_hours: z.boolean().nullable(),
    closed_before_expiration: z.boolean().nullable(),
    tweet_id: z.string().nullable(),
    open_quote: z.number().nullable(),
    close_quote: z.number().nullable(),
    tag: z.string().nullable(),
    note: z.string().nullable(),
    closing_note: z.string().nullable(),
    earnings: z.boolean().nullable(),
    assigned: z.boolean().nullable(),
    win: z.boolean().nullable(), // This is nullable because stock buys dont have a win/loss
    initial: z.boolean().nullable(),
    expiry_date: z.string().nullable(), // this is nullable because stock buys dont have an expiry date
    close_date: z.string().nullable(), // this is nullable because open trades
    open_date: z.string(),
    podcast_url: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    Posts: z.array(z.object({
      guid: z.string(),
      text: z.string(),
      user_guid: z.string(),
      trade_guid: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })),
    User: z.object({
      guid: z.string(),
      username: z.string(),
      lowercase: z.string(),
      flair: z.string().nullable(),
      ticker_message: z.string().nullable(),
      bio: z.string().nullable(),
      verified: z.boolean().nullable(),
      role: z.string(),
      last_active: z.string(),
      streak_updated_at: z.string(),
      streak: z.number(),
      longest_streak: z.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  }).nullable(),
);

export const thetaGangResponseV1JsonSchema = z.object({
  data: z.object({
    trades: tradesV1,
    metadata: metadata,
  }),
});

export const thetaGangResponseV3JsonSchema = z.object({
  data: tradesV3,
});
export type TradesList = z.infer<
  typeof tradesV3
>;
