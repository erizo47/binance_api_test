export interface IOrderBookStoreState {
  lastUpdateId: number,
  bids: string[][],
  asks: string[][],
  limit: number,
}
