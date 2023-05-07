import { PolygonProps } from '../types'
import { Polyline } from './polyline'

export class Polygon extends Polyline {
  constructor(opt: PolygonProps) {
    super(opt)
    this.setOptions(opt)
  }

  isOpen() {
    return false
  }
}
