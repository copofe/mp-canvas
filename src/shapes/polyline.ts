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
   * A polyline is considered open if it has no points, or if the last point's y-coordinate is NaN.
   * NaN comes from parseFloat of an empty string in the parser.
   * @returns {boolean} True if the polyline is open, false otherwise.
   */
  isOpen() {
    return true
  }

  /**
   * Renders the polyline on a canvas.
   * @param {CanvasRenderingContext2D} ctx The context of the canvas to render on.
   */
  render(ctx: CanvasRenderingContext2D) {
    const len = this.points.length

    // Do not draw if there are no points or odd number of points
    // NaN comes from parseFloat of an empty string in the parser
    if (!len || isNaN(this.points[len - 1].y)) {
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
