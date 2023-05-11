import { Gradient } from './gradient'
import { RObject } from './object'
import { CanvasElement, RubbingShapeProps, Shadow } from './types'

export class RShape<
  T extends RubbingShapeProps = RubbingShapeProps,
> extends RObject<T> {
  top = 0
  left = 0
  width = 0
  height = 0
  opacity = 1
  stroke = null
  strokeWidth = 1
  strokeDashArray = null
  strokeDashOffset = 0
  fill = undefined
  visible = true

  shadow: Shadow
  paintFirst: 'fill' | 'stroke'
  fillRule: 'evenodd'
  strokeLineCap: CanvasLineCap
  strokeLineJoin: CanvasLineJoin
  strokeMiterLimit: number
  strokeUniform: boolean

  canvas?: CanvasElement

  constructor(opt: T) {
    super(opt)
    this.setOptions(opt)
  }

  _setFillStyles(ctx: CanvasRenderingContext2D, { fill }: Pick<this, 'fill'>) {
    if (fill) {
      if (typeof fill === 'string') {
        ctx.fillStyle = fill
      } else {
        ctx.fillStyle = new Gradient(this.new(fill)).toLive(ctx)
      }
    }
  }

  _renderFill(ctx: CanvasRenderingContext2D) {
    if (!this.fill) {
      return
    }

    ctx.save()
    this._setFillStyles(ctx, this)
    if (this.fillRule === 'evenodd') {
      ctx.fill('evenodd')
    } else {
      ctx.fill()
    }
    ctx.restore()
  }

  _renderStroke(ctx: CanvasRenderingContext2D) {
    // TODO:
  }

  _renderPaintInOrder(ctx: CanvasRenderingContext2D) {
    if (this.paintFirst === 'stroke') {
      this._renderStroke(ctx)
      this._renderFill(ctx)
    } else {
      this._renderFill(ctx)
      this._renderStroke(ctx)
    }
  }
}
