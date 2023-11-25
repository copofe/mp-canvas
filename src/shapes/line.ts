import { RShape } from '../shape'
import { LineProps } from '../types'

export class Line extends RShape<LineProps> {
  x1: number // x coordinate of starting point
  y1: number // y coordinate of starting point
  x2: number // x coordinate of end point
  y2: number // y coordinate of end point

  constructor(opt: LineProps) {
    super(opt)
    this.setOptions(opt)
  }

  render(ctx: CanvasRenderingContext2D) {
    const { x1, y1, x2, y2 } = this
    ctx.beginPath()
    ctx.moveTo(this.xDpr(x1), this.xDpr(y1)) // move pen to starting point
    ctx.lineTo(this.xDpr(x2), this.xDpr(y2)) // draw line to end point
    this._renderPaintInOrder(ctx)
    // ctx.stroke()
  }
}
