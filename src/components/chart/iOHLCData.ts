export interface IOHLCData {
  readonly close: number;
  readonly datetime: Date;
  readonly high: number;
  readonly low: number;
  readonly open: number;
  readonly volume: number;
}