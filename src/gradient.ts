import { Color } from './color'
import { RObject } from './object'
import { ColorStop, Coords, GradientProps, GradientType } from './types'

export class Gradient extends RObject<GradientProps> {
  type: GradientType
  coords: Required<Coords>
  colorStops: ColorStop[]

  constructor(opt: GradientProps) {
    super(opt)
    this.setOptions(opt)
  }

  toLive(ctx: CanvasRenderingContext2D) {
    const { x1 = 0, y1 = 0, x2 = 0, y2 = 0, r1 = 0, r2 = 0 } = this.coords
    let gradient: CanvasGradient

    // Check if gradient type is undefined
    if (!this.type) {
      throw new Error('gradient type is undefined')
    }

    // Decide between linear and radial gradient
    if (this.type === 'linear') {
      console.log(this)
      gradient = ctx.createLinearGradient(
        this.xDpr(x1),
        this.xDpr(y1),
        this.xDpr(x2),
        this.xDpr(y2),
      )
    } else {
      // TODO: miniprogram don't support?
      gradient = ctx.createRadialGradient(
        this.xDpr(x1),
        this.xDpr(y1),
        this.xDpr(r1),
        this.xDpr(x2),
        this.xDpr(y2),
        this.xDpr(r2),
      )
    }

    // Apply color stops to the gradient
    this.colorStops.map((cs) => {
      const color =
        cs.opacity !== undefined
          ? new Color(cs.color).setAlpha(cs.opacity).toRgba()
          : cs.color
      gradient.addColorStop(cs.offset, color)
    })
    return gradient!
  }
}
