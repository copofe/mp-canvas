import { RShape } from '../shape'
import { EllipseProps } from '../types'

/**
 * Ellipse shape
 */
export class Ellipse extends RShape<EllipseProps> {
  rx: number // Radius X
  ry: number // Radius Y

  constructor(opt: EllipseProps) {
    super(opt)
    this.setOptions(opt)
  }

  render(ctx: CanvasRenderingContext2D) {
    const left = this.xDpr(this.left)
    const top = this.xDpr(this.top)
    const rx = this.xDpr(this.rx)
    const ry = this.xDpr(this.ry)
    const step = rx > ry ? 1 / rx : 1 / ry

    ctx.beginPath()
    ctx.moveTo(left + rx, top) // Starting point

    // Draw ellipse
    for (let i = 0; i < 2 * Math.PI; i += step) {
      ctx.lineTo(left + rx * Math.cos(i), top + ry * Math.sin(i))
    }

    ctx.closePath()

    this._renderPaintInOrder(ctx) // Draw shape
  }
}
