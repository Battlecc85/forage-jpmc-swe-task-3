import { ServerRespond } from './DataStreamer';

export interface Row {
  timestamp: Date,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert?: number,
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row | undefined {
    if (serverResponds.length === 2) {
      const [stockABC, stockDEF] = serverResponds;

      const priceABC = stockABC.top_ask && stockABC.top_ask.price || 0;
      const priceDEF = stockDEF.top_ask && stockDEF.top_ask.price || 0;

      const ratio = priceABC / priceDEF;
      const upper_bound = 1.1;
      const lower_bound = 0.99;
      const trigger_alert = (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined;

      return {
        timestamp: stockABC.timestamp,
        ratio,
        upper_bound,
        lower_bound,
        trigger_alert,
      };
    }

    return undefined;
  }
}
