import { RShape } from '../shape'
import { Point, PolygonProps } from '../types'

export class Polyline extends RShape<PolygonProps> {
  points: Point[]

  constructor(opt: PolygonProps) {
    super(opt)
    this.setOptions(opt)
  }

  /**
   * Checks if the polyline is open.
   */
  isOpen() {
    return true
  }

  /**
   * Renders the polyline on a canvas.
   */
  render(ctx: CanvasRenderingContext2D) {
    const len = this.points.length

    // Do not draw if there are no points
    if (!len) {
      return
    }

    ctx.beginPath()
    ctx.moveTo(this.xDpr(this.points[0].x), this.xDpr(this.points[0].y))
    for (let i = 0; i < len; i++) {
      const point = this.points[i]
      ctx.lineTo(this.xDpr(point.x), this.xDpr(point.y))
    }
    !this.isOpen() && ctx.closePath()
    this._renderPaintInOrder(ctx)
  }
}
