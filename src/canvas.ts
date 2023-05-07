import { Gradient } from './gradient'
import { RObject } from './object'
import { shapeHandler } from './shapes/handler'
import { Rect } from './shapes/rect'
import { CanvasElement, RObjectProps, ShapeObject } from './types'
import { isWeb } from './utils/env'

export interface RubbingOptions extends RObjectProps {
  /**
   * Selector of the element.
   */
  selector: string

  /**
   * Width.
   */
  width: number

  /**
   * Design width.
   */
  designWidth: number

  /**
   * Height.
   */
  height: number

  /**
   * Radius.
   */
  radius?: number

  /**
   * Background color.
   */
  background?: string | Gradient

  /**
   * Whether to adapt to Retina screens. Auto-enabled for WeChat miniprogram.
   * @default true
   */
  enableRetinaScaling?: boolean

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

  serialized: [] // Serialized array is empty by default.
}

const RubbingOptionsDefaultValue: Partial<RubbingOptions> = {
  background: 'transparent', // Default background color is transparent.
  enableRetinaScaling: true, // Default to enable Retina display adaptation.
  imageSmoothingEnabled: true, // Default to enable image smoothing.
  width: 0,
  designWidth: 0,
  height: 0,
  radius: 0,
}

export class Rubbing extends RObject<RubbingOptions> {
  selector: string
  /**
   * Background color.
   */
  background?: string | Gradient

  /**
   * Whether to use image smoothing. Default enabled in browser.
   * @default true
   */
  imageSmoothingEnabled?: boolean

  enableRetinaScaling: boolean

  /**
   * Width.
   */
  width: number

  /**
   * Design width.
   */
  designWidth: number

  /**
   * Height.
   */
  height: number

  /**
   * Radius.
   */
  radius?: number

  dpr: number

  canvas: CanvasElement

  /**
   * Customized component this.
   * @description Required in WeChat miniprogram custom components.
   */
  component: WechatMiniprogram.Component.Instance<any, any, any>

  isRendering = 0

  serialized: any[] // Store serialized Shape objects.

  constructor(option: RubbingOptions) {
    super(option)
    const opt = {
      ...RubbingOptionsDefaultValue,
      ...option,
    }

    this.background = opt.background
    this.imageSmoothingEnabled = opt.imageSmoothingEnabled
    this.width = opt.width
    this.height = opt.height
    this.designWidth = opt.designWidth || opt.width
    this.radius = opt.radius
    this.component = opt.component
    this.selector = opt.selector
    this.dpr = isWeb
      ? window.devicePixelRatio
      : wx.getSystemInfoSync().pixelRatio
  }

  /**
   * Initialize after canvas exists.
   */
  async init() {
    const res = await this.queryCanvas()
    this.canvas = res
    this.ctx = res.getContext('2d')
    this.retinaScale()
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
      this.nDpr = (this.dpr * systemInfo.screenWidth) / this.designWidth
      // Adapt canvas size to design width and adjust actual display size according to Retina scaling ratio.
      this.canvas.width =
        (this.width / systemInfo.screenWidth / this.dpr) * this.designWidth
      this.canvas.height =
        (this.height / systemInfo.screenWidth / this.dpr) * this.designWidth
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
    for (let i = 0; i < objects.length; i++) {
      // Render all Shape objects.
      objects[i] && (await objects[i].render(ctx))
    }
  }

  renderCanvas(ctx: CanvasRenderingContext2D) {
    // Render canvas, specify context object.
    this.clearContext(ctx)

    ctx.save()
    // Pass all serialized Shape objects, and render them in order of z-index.
    this._renderObjects(ctx, this.serialized)
    ctx.restore()
  }

  renderAll() {
    // Render the entire canvas by calling the renderCanvas method
    this.renderCanvas(this.ctx)
  }

  serialize(shapes: ShapeObject[]) {
    // Sorts an array of all shapes of Rubbing instance by z-index and converts them into a new array _serialized to render them in order in the future.
    const _shapes = shapes
      .map((n) => ({ ...n, zIndex: n.zIndex || 0 }))
      .sort((n, m) => n.zIndex - m.zIndex)

    // Generate new ShapeObjects from array elements, based on the corresponding shape definition
    const serialized = _shapes.map((s) => {
      const shape = shapeHandler[s.type]
      return new shape(this.new(s, this))
    })

    // Record the serialized data for future reference and rendering
    this.serialized = serialized
    // Render the canvas again
    this.renderAll()
  }

  loadFromJSON(json: { objects: ShapeObject[] }) {
    // Re-serialize all shape objects and re-render after the structure of the canvas changes
    this.serialize(json.objects)
  }
}
