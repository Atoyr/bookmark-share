import { Range } from '../types/range'
export function getRange(page: number, pageSize: number): Range {

  return {
    from: (page - 1) * pageSize,
    to: page * pageSize - 1,
  }
}
