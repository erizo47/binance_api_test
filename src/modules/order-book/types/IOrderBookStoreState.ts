export interface IOrderBookStoreState {
  lastUpdateId: number,
  bids: Record<string, string>,
  asks: Record<string, string>,
  limitList: number[],
  limit: number,
}
