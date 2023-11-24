import { Gradient } from './gradient'
import { RObject } from './object'
import { shapeHandler } from './shapes'
import { Rect } from './shapes/rect'
import { CanvasElement, ShapeObject } from './types'
import { isWeb } from './utils/env'

export interface RubbingOptions {
  /**
   * Selector of the canvas element.
   */
  selector: string

  /**
   * Canvas width.
   */
  width: number

  /**
   * Canvas height.
   */
  height: number

  /**
   * Canvas Radius.
   */
  radius?: number

  /**
   * Background color.
   */
  background?: string | Gradient

  /**
   * Whether to use image smoothing for the canvas.
   * Only available for browser.
   * @default true
   */
  imageSmoothingEnabled?: boolean

  /**
   * Customized component this.
   * @description Required in WeChat miniprogram custom components.
   */
  component?: WechatMiniprogram.Component.Instance<any, any, any>
}

const RubbingOptionsDefaultValue: Partial<RubbingOptions> = {
  background: 'transparent', // Default background color is transparent.
  imageSmoothingEnabled: true, // Default to enable image smoothing.
  width: 0,
  height: 0,
  radius: 0,
}

export class Rubbing extends RObject<RubbingOptions> {
  selector: string

  background?: string | Gradient

  imageSmoothingEnabled?: boolean

  enableRetinaScaling: boolean

  radius?: number

  dpr: number = 1

  canvas: CanvasElement

  component: WechatMiniprogram.Component.Instance<any, any, any>

  isRendering = 0

  serialized: any[] // Store serialized Shape objects.

  constructor(option: RubbingOptions) {
    const opt = {
      ...RubbingOptionsDefaultValue,
      ...option,
    }
    super(opt)
    this.setOptions(opt)
  }

  /**
   * Initialize after canvas exists.
   */
  async init() {
    const res = await this.queryCanvas()
    this.canvas = res
    // @ts-ignore
    this.ctx = (isWeb ? res : res.node).getContext('2d')
    this.retinaScale()
    return {
      // @ts-ignore
      canvas: isWeb ? res : res.node,
      context: this.ctx,
    }
  }

  /**
   * Get canvas element.
   */
  queryCanvas(): Promise<CanvasElement> {
    return new Promise((resolve, reject) => {
      if (isWeb) {
        // Check if running in browser environment.
        // Get canvas element by selector.
        const ele = document.querySelector<HTMLCanvasElement>(this.selector)
        ele ? resolve(ele) : reject(ele)
      } else {
        // Running in WeChat miniprogram environment.
        // Use selector to find a canvas or a component containing canvas and get its size information.
        ;(this.component || wx)
          .createSelectorQuery()
          .select(this.selector)
          .fields({ node: true, size: true })
          .exec((res: any[]) => {
            if (res[0]) {
              resolve(res[0])
            } else {
              reject(res)
            }
          })
      }
    })
  }

  /**
   * Screen adaptation.
   */
  retinaScale() {
    if (isWeb) {
      // Check if running in browser environment.
      // Scale canvas element to actual physical pixels according to style property.
      ;(this.canvas as HTMLCanvasElement).style.width = this.width + 'px'
      ;(this.canvas as HTMLCanvasElement).style.height = this.height + 'px'
      this.nDpr = this.dpr
      // Scale actual size of canvas element and scaling ratio of canvas drawing, according to width and height and device pixel ratio.
      this.canvas.width = this.width * this.dpr
      this.canvas.height = this.height * this.dpr
    } else {
      // Running in WeChat miniprogram environment.
      const systemInfo = wx.getSystemInfoSync()
      // Calculate scaling ratio for Retina display.
      this.dpr = systemInfo.pixelRatio
      this.nDpr = this.dpr
      // @ts-ignore
      this.canvas.node.width = this.canvas.width * this.dpr
      // @ts-ignore
      this.canvas.node.height = this.canvas.height * this.dpr
    }
  }

  /**
   * Initialize canvas range and properties.
   */
  clipCanvas(ctx: CanvasRenderingContext2D) {
    // Initialize canvas range as the boundary box of the entire Rubbing object, and get a new Rect object.
    const rect = new Rect({
      left: 0,
      top: 0,
      width: this.width,
      height: this.height,
      fill: this.background,
      rx: this.radius,
      ry: this.radius,
      nDpr: this.nDpr,
    })

    // Render this rect to display it on the canvas.
    rect.render(ctx)

    // Clip the canvas.
    ctx.clip()
  }

  /**
   * Clear canvas context.
   */
  clearContext(ctx: CanvasRenderingContext2D) {
    // Clear all existing drawing contents on the canvas.
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // Set current clipping path, so that contents are only rendered within the boundary box of the canvas range.
    this.clipCanvas(ctx)
  }

  async _renderObjects(ctx: CanvasRenderingContext2D, objects: any[]) {
    // Render all Shape objects.
    for (let index = 0; index < objects.length; index++) {
      const object = objects[index];
      await object.render(ctx)
    }
  }

  async renderCanvas(ctx: CanvasRenderingContext2D) {
    // Render canvas, specify context object.
    this.clearContext(ctx)

    ctx.save()
    // Pass all serialized Shape objects, and render them in order of z-index.
    await this._renderObjects(ctx, this.serialized)
    ctx.restore()
  }

  async renderAll() {
    // Render the entire canvas by calling the renderCanvas method
    await this.renderCanvas(this.ctx)
  }

  async serialize(shapes: ShapeObject[]) {
    // Sorts an array of all shapes of Rubbing instance by z-index and converts them into a new array _serialized to render them in order in the future.
    const _shapes = shapes
      .filter((n) => !(n.visible === false))
      .map((n, i) => ({ ...n, zIndex: n.zIndex || i }))
      .sort((n, m) => n.zIndex - m.zIndex)

    // Generate new ShapeObjects from array elements, based on the corresponding shape definition
    const serialized = _shapes.map((s) => {
      const shape = shapeHandler[s.type]
      return new shape(this.new(s, this))
    })

    // Record the serialized data for future reference and rendering
    this.serialized = serialized
    // Render the canvas again
    await this.renderAll()
  }

  async loadFrom(params: { objects: ShapeObject[] }) {
    // Re-serialize all shape objects and re-render after the structure of the canvas changes
    await this.serialize(params.objects)
  }
}
