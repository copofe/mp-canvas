import { RShape } from '../shape'
import { RubbingShapeProps } from '../types'

/**
 * This class represents a triangle shape, which extends the RShape class
 * @class Triangle
 * @extends RShape
 */

export class Triangle extends RShape {
  /**
   * Creates an instance of Triangle
   * @param {RubbingShapeProps} opt - The options for the triangle shape.
   */

  constructor(opt: RubbingShapeProps) {
    super(opt)
    this.setOptions(opt)
  }

  /**
   * Renders the triangle shape on the canvas
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas
   */

  render(ctx: CanvasRenderingContext2D) {
    const x = this.xDpr(this.left)
    const y = this.xDpr(this.top)
    const w = this.xDpr(this.width)
    const h = this.xDpr(this.height)

    ctx.beginPath()
    ctx.moveTo(x + w / 2, y)
    ctx.lineTo(x, y + h)
    ctx.lineTo(x + w, y + h)
    ctx.closePath()

    this._renderPaintInOrder(ctx)
  }
}
