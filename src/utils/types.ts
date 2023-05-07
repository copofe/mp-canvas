import { TFiller } from '../types'

export const isFiller = (
  filler: TFiller | string | null,
): filler is TFiller => {
  return !!filler && (filler as TFiller).toLive !== undefined
}
