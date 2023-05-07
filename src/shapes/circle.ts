import { CircleProps } from '../types'
import { RShape } from '../shape'
import { degreesToRadians } from '../utils/radiansDegreesConversion'

/**
 * The Circle class represents a circle shape.
 */
export class Circle extends RShape<CircleProps> implements CircleProps {
  /** The type of the shape. */
  type: 'circle'

  /** The radius of the circle. */
  radius = 0

  /** The start angle of the circle. */
  startAngle = 0

  /** The end angle of the circle. */
  endAngle = 360

  /** The left offset of the circle relative to the canvas. */
  left = 0

  /** The top offset of the circle relative to the canvas. */
  top = 0

  /**
   * Initializes a new instance of the Circle class.
   * @param opt Options that can be applied to the circle.
   */
  constructor(opt: CircleProps) {
    const option = {
      ...opt,
      width: opt.radius * 2,
      height: opt.radius * 2,
    }
    super(option)
    this.setOptions(option)
  }

  /**
   * Renders the circle on the canvas.
   * @param ctx The 2-dimensional rendering context of the canvas.
   */
  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(
      this.xDpr(this.left + this.radius),
      this.xDpr(this.top + this.radius),
      this.xDpr(this.radius),
      degreesToRadians(this.startAngle),
      degreesToRadians(this.endAngle),
      false,
    )
    this._renderPaintInOrder(ctx)
  }
}
