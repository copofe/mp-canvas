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
  stroke: string
  strokeWidth = 1
  strokeDashArray: number[]
  strokeDashOffset = 0
  fill = undefined
  visible = true

  shadow: Shadow
  paintFirst: 'fill' | 'stroke'
  fillRule: 'evenodd'
  strokeLineCap: CanvasLineCap = 'butt'
  strokeLineJoin: CanvasLineJoin
  strokeMiterLimit: number = 4
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

  _setStrokeStyles(ctx: CanvasRenderingContext2D, shape: this) {
    if (shape.stroke) {
      if (typeof shape.stroke === 'string') {
        ctx.strokeStyle = shape.stroke
      } else {
        ctx.strokeStyle = new Gradient(this.new(shape.stroke)).toLive(ctx)
      }
      ctx.lineDashOffset = shape.strokeDashOffset
      ctx.miterLimit = shape.strokeMiterLimit
      ctx.lineJoin = shape.strokeLineJoin
      ctx.lineCap = shape.strokeLineCap
      ctx.lineWidth = shape.strokeWidth
    }
  }

  _setLineDash(ctx: CanvasRenderingContext2D, dashArray?: number[] | null) {
    if (!dashArray || dashArray.length === 0) {
      return
    }
    // Spec requires the concatenation of two copies of the dash array when the number of elements is odd
    if (1 & dashArray.length) {
      dashArray.push(...dashArray)
    }
    ctx.setLineDash(dashArray)
  }

  _renderStroke(ctx: CanvasRenderingContext2D) {
    if (!this.stroke || this.strokeWidth === 0) {
      return
    }

    ctx.save()

    this._setLineDash(ctx, this.strokeDashArray)
    this._setStrokeStyles(ctx, this)
    ctx.stroke()
    ctx.restore()
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
