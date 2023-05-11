import { RShape } from '../shape'
import { ImageProps } from '../types'
import { loadImage } from '../utils/fetch'
import { Rect } from './rect'

export class ImageShape extends RShape<ImageProps> {
  src = '' // The source of the image
  radius = 0 // The border radius of the image

  constructor(opt: ImageProps) {
    super(opt)
    this.setOptions(opt)
  }

  async render(ctx: CanvasRenderingContext2D) {
    const { src, left, top, width, height, radius } = this

    const res = await loadImage(src, this.canvas)

    if (radius) {
      // If radius is specified, set a clipping region for the image
      ctx.save()
      const rect = new Rect({
        left: left,
        top: top,
        width: this.width,
        height: this.height,
        nDpr: this.nDpr,
        rx: this.radius,
        ry: this.radius,
      })
      rect.render(ctx)
      ctx.clip()
    }

    // Draw the image
    ctx.drawImage(
      res.img,
      0,
      0,
      res.width,
      res.height,
      this.xDpr(this.left),
      this.xDpr(this.top),
      this.xDpr(width || res.width),
      this.xDpr(height || res.height),
    )

    if (radius) {
      // If radius is specified, restore the context to its prior state after drawing the image
      ctx.restore()
    }
  }
}
