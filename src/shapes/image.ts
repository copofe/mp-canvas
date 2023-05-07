import { RShape } from '../shape'
import { ImageProps } from '../types'
import { loadImage } from '../utils/fetch'
import { Rect } from './rect'

export class ImageShape extends RShape<ImageProps> {
  src = '' // The source of the image
  mode = 'scaleToFill' // The mode used to fill the image
  radius = 0 // The border radius of the image

  constructor(opt: ImageProps) {
    super(opt)
    this.setOptions(opt)
  }

  async render(ctx: CanvasRenderingContext2D) {
    const { src, left, top, width, height, mode, radius } = this

    const res = await loadImage(src, this.canvas)
    const aspectRatio = width / height
    let widthRatio = 1
    let heightRatio = 1
    // Calculate the widthRatio and heightRatio according to the mode to determine how the image is filled
    if (mode === 'aspectFit') {
      widthRatio =
        res.width / res.height < aspectRatio
          ? ((width / res.width) * res.height) / height // Calculate the widthRatio and heightRatio based on the image aspect ratio (less than or greater than the container aspect ratio)
          : 1
      heightRatio =
        res.width / res.height > aspectRatio
          ? ((height / res.height) * res.width) / width
          : 1
    } else if (mode === 'aspectFill') {
      widthRatio =
        res.width / res.height > aspectRatio
          ? ((width / res.width) * res.height) / height
          : 1
      heightRatio =
        res.width / res.height < aspectRatio
          ? ((height / res.height) * res.width) / width
          : 1
    }

    // Crop the image
    const imgCut = {
      scaleToFill: [0, 0, res.width, res.height],
      aspectFit: [
        (res.width - res.width * widthRatio) / 2,
        (res.height - res.height * heightRatio) / 2,
        res.width * widthRatio,
        res.height * heightRatio,
      ],
      aspectFill: [
        (res.width - res.width * widthRatio) / 2,
        (res.height - res.height * heightRatio) / 2,
        res.width * widthRatio,
        res.height * heightRatio,
      ],
      widthFix: [],
      top: [(res.width - width) / 2, 0, width, height],
      bottom: [(res.width - width) / 2, res.height - height, width, height],
      center: [
        (res.width - width) / 2,
        (res.height - height) / 2,
        width,
        height,
      ],
      left: [0, (res.height - height) / 2, width, height],
      right: [res.width - width, (res.height - height) / 2, width, height],
      'top left': [0, 0, width, height],
      'top right': [res.width - width, 0, width, height],
      'bottom left': [0, res.height - height, width, height],
      'bottom right': [res.width - width, res.height - height, width, height],
    }

    if (radius) {
      // If radius is specified, set a clipping region for the image
      ctx.save()
      const rect = new Rect({
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height,
        nDpr: this.nDpr,
        rx: this.radius,
        ry: this.radius,
      })
      rect.render(ctx)
      ctx.clip()
    }

    ctx.drawImage(
      res.img,
      // Set the image structure according to the image fill mode
      // @ts-ignore
      ...(imgCut[mode] || []),
      // Draw the image
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
