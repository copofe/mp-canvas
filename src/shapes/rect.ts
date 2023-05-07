import { RectProps } from '../types'
import { kRect } from '../constants'
import { RShape } from '../shape'

export class Rect extends RShape<RectProps> {
  rx?: number
  ry?: number

  radii?: number | number[]

  constructor(opt: RectProps) {
    super(opt)
    this.setOptions(opt)
  }

  render(ctx: CanvasRenderingContext2D) {
    const x = this.xDpr(this.left)
    const y = this.xDpr(this.top)
    const w = this.xDpr(this.width)
    const h = this.xDpr(this.height)

    if (this.radii) {
      const radii =
        typeof this.radii === 'number'
          ? this.xDpr(this.radii)
          : this.radii?.map(this.xDpr)
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, radii)
        return
      } else {
        throw new Error('not support roundRect, please use rx, ry')
      }
    }
    const rx = this.rx ? Math.min(this.rx, w / 2) : 0
    const ry = this.ry ? Math.min(this.ry, h / 2) : 0
    const isRounded = rx !== 0 || ry !== 0

    ctx.beginPath()

    ctx.moveTo(x + rx, y)

    ctx.lineTo(x + w - rx, y)
    isRounded &&
      ctx.bezierCurveTo(
        x + w - kRect * rx,
        y,
        x + w,
        y + kRect * ry,
        x + w,
        y + ry,
      )

    ctx.lineTo(x + w, y + h - ry)
    isRounded &&
      ctx.bezierCurveTo(
        x + w,
        y + h - kRect * ry,
        x + w - kRect * rx,
        y + h,
        x + w - rx,
        y + h,
      )

    ctx.lineTo(x + rx, y + h)
    isRounded &&
      ctx.bezierCurveTo(
        x + kRect * rx,
        y + h,
        x,
        y + h - kRect * ry,
        x,
        y + h - ry,
      )

    ctx.lineTo(x, y + ry)
    isRounded &&
      ctx.bezierCurveTo(x, y + kRect * ry, x + kRect * rx, y, x + rx, y)

    ctx.closePath()

    this._renderPaintInOrder(ctx)
  }
}
