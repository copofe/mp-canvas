/// <reference types="wechat-miniprogram" />

import type { Gradient } from './gradient'

interface NominalTag<T> {
  nominalTag?: T
}

type Nominal<Type, Tag> = NominalTag<Tag> & Type

export interface Point {
  x: number
  y: number
}
export interface Offset {
  top: number
  left: number
}

export type FillStyle = CanvasFillStrokeStyles['fillStyle']
export type TFiller = Gradient

const enum Degree {}
const enum Radian {}
export type TDegree = Nominal<number, Degree>
export type TRadian = Nominal<number, Radian>

export type CanvasElement = HTMLCanvasElement | WechatMiniprogram.Canvas

export interface RObjectProps {
  nDpr: number
  left: number
  top: number
  width: number
  height: number
  zIndex?: number
}

/**
 * gradient
 */
export type GradientType = 'linear' | 'radial'
export interface Coords {
  x1: number
  y1: number
  r1?: number
  x2: number
  y2: number
  r2?: number
  [key: string]: number | undefined
}

export type ColorStop = {
  color: string
  offset: number
  opacity?: number
}

export interface GradientProps extends RObjectProps {
  type: GradientType
  coords: Coords
  colorStops: ColorStop[]
}

export type Shadow = {
  color: string
  blur: number
  offsetX: number
  offsetY: number
  affectStroke: boolean
  nonScaling: boolean
}

export interface BaseShapeProps extends RObjectProps {
  nDpr: number
  /**
   * Top position of an object
   * @default 0
   */
  top: number

  /**
   * Left position of an object
   * @default 0
   */
  left: number

  /**
   * Object width
   */
  width: number

  /**
   * Object height
   */
  height: number

  /**
   * Opacity of an object
   * @default 1
   */
  opacity?: number

  /**
   * Shadow object representing shadow of this shape
   * @default null
   */
  // shadow: Shadow | null

  /**
   * When set to `false`, an object is not rendered on canvas
   * @default
   */
  visible?: boolean

  /**
   * When true, an object is rendered as flipped horizontally
   */
  // flipX: boolean

  /**
   * When true, an object is rendered as flipped vertically
   * @default false
   */
  // flipY: boolean

  /**
   * Object scale factor (horizontal)
   * @default 1
   */
  // scaleX: number

  /**
   * Object scale factor (vertical)
   * @default 1
   */
  // scaleY: number

  /**
   * Angle of skew on x axes of an object (in degrees)
   * @default 0
   */
  // skewX: number

  /**
   * Angle of skew on y axes of an object (in degrees)
   * @default 0
   */
  // skewY: number

  /**
   * Horizontal origin of transformation of an object (one of "left", "right", "center")
   * See http://jsfiddle.net/1ow02gea/244/ on how originX/originY affect objects in groups
   * @default 'left'
   */
  // originX: TOriginX

  /**
   * Vertical origin of transformation of an object (one of "top", "bottom", "center")
   * See http://jsfiddle.net/1ow02gea/244/ on how originX/originY affect objects in groups
   * @default 'top'
   */
  // originY: TOriginY

  /**
   * Angle of rotation of an object (in degrees)
   * @default 0
   */
  // angle: TDegree
}

export interface FillStrokeProps {
  /**
   * Determines if the fill or the stroke is drawn first (one of "fill" or "stroke")
   * @default
   */
  paintFirst?: 'fill' | 'stroke'

  /**
   * Color of object's fill
   * takes css colors https://www.w3.org/TR/css-color-3/
   * @default rgb(0,0,0)
   */
  fill?: string | Gradient

  /**
   * Fill rule used to fill an object
   * accepted values are nonzero, evenodd
   * <b>Backwards incompatibility note:</b> This property was used for setting globalCompositeOperation until v1.4.12 (use `globalCompositeOperation` instead)
   * @default nonzero
   */
  fillRule?: CanvasFillRule

  /**
   * When defined, an object is rendered via stroke and this property specifies its color
   * takes css colors https://www.w3.org/TR/css-color-3/
   */
  stroke?: string

  /**
   * Width of a stroke used to render this object
   * @default 1
   */
  strokeWidth?: number

  /**
   * Array specifying dash pattern of an object's stroke (stroke must be defined)
   */
  strokeDashArray?: number[]

  /**
   * Line offset of an object's stroke
   * @default 0
   */
  strokeDashOffset?: number

  /**
   * Line endings style of an object's stroke (one of "butt", "round", "square")
   */
  strokeLineCap?: CanvasLineCap

  /**
   * Corner style of an object's stroke (one of "bevel", "round", "miter")
   */
  strokeLineJoin?: CanvasLineJoin

  /**
   * Maximum miter length (used for strokeLineJoin = "miter") of an object's stroke
   * @default 4
   */
  strokeMiterLimit?: number

  /**
   * 当 false 时，stroke宽度将用对象扩展。
   * 当 true 时，stroke将始终匹配以 stroke 宽度输入的精确像素尺寸。
   * 此属性在使用stroketext，fillText方法的文本类或绘制呼叫上不起作用
   * @default false
   */
  // strokeUniform: boolean
}

export interface ClipPathProps {}

export interface ShapeProps
  extends BaseShapeProps,
    FillStrokeProps,
    ClipPathProps {}

export type ShapeType =
  | 'image'
  | 'line'
  | 'rect'
  | 'text'
  | 'circle'
  | 'ellipse'
  | 'triangle'
  | 'polyline'
  | 'polygon'

export interface RubbingShapeProps extends ShapeProps {
  [key: string]: any
}

export interface RectProps extends RubbingShapeProps {
  /**
   * fabric rect 原属性
   */
  rx?: number
  ry?: number

  /**
   * if support roundRect
   * see syntax: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect
   */
  radii?: number | number[]
}

export interface CircleProps extends RubbingShapeProps {
  /**
   * Radius of this circle
   * @type Number
   * @default 0
   */
  radius: number
  /**
   * degrees of start of the circle.
   * probably will change to degrees in next major version
   * @type Number 0 - 359
   * @default 0
   */
  startAngle: number
  /**
   * End angle of the circle
   * probably will change to degrees in next major version
   * @type Number 1 - 360
   * @default 360
   */
  endAngle: number
}

export interface EllipseProps extends RubbingShapeProps {
  rx: number
  ry: number
}

export interface PolygonProps extends RubbingShapeProps {
  points: Point[]
}
export interface LineProps extends RubbingShapeProps {
  x1: number
  y1: number
  x2: number
  y2: number
}
export interface TextProps extends RubbingShapeProps {
  text: string
  fontFamily: string
  fontWeight: string
  fontSize: number
  underline: boolean
  overline: boolean
  linethrough: boolean
  textAlign: CanvasTextAlign
  textBaseline: CanvasTextBaseline
  fontStyle: string
  lineHeight: number
  charSpacing: number
  direction: CanvasDirection
}

export interface ImageProps extends RubbingShapeProps {
  src: string
  radius: number
}

export interface LineStyle {
  /**
   * 线段两端样式
   * @default butt
   */
  cap?: 'butt' | 'round' | 'square'
  /**
   * 线段转角样式
   * @default bevel
   */
  join?: 'bevel' | 'round' | 'miter'
  /**
   * 虚线偏移量
   * @default 0
   */
  offset?: number
  /**
   * [虚线长度, 虚线间距]
   * @default [1, 0]
   */
  dash?: [number, number]
  /**
   * 线段颜色
   * @default #000
   */
  color?: string
  /**
   * 线段粗细
   * @default 2
   */
  width?: number
}

/**
 * 圆形
 */
export interface CircleProps extends RubbingShapeProps {
  type: 'circle'

  /**
   * 圆的半径
   * @default 0
   */
  radius: number

  /**
   * 圆的起始角度，沿顺时钟方向
   * probably will change to degrees in next major version
   * @default 0
   */
  startAngle: number

  /**
   * 圆的结束角度
   * probably will change to degrees in next major version
   * @default 360
   */
  endAngle: number
}

/**
 * 椭圆
 */

export interface EllipseProps extends RubbingShapeProps {
  type: 'ellipse'
  rx: number
  ry: number
}

/**
 * 三角形
 */
export interface TriangleProps extends RubbingShapeProps {
  type: 'triangle'
}

/**
 * 直线
 */
export interface LineProps extends RubbingShapeProps {
  type: 'line'
  x1: number
  x2: number
  y1: number
  y2: number
}

/**
 * 折线
 */
export interface PolylineProps extends RubbingShapeProps {
  type: 'polyline'
  points: Point[]
}

/**
 * 多边形
 */
export interface PolygonProps extends RubbingShapeProps {
  type: 'polygon'
}

/**
 * 图像
 */
export interface ImageProps extends RubbingShapeProps {
  type: 'image'
  src: string
  /**
   * @default false
   */
  srcFromAttribute: boolean
  /**
   * @default 0.5
   */
  minimumScaleTrigger: number
  /**
   * @default 0
   */
  cropX: number
  /**
   * @default 0
   */
  cropY: number
  /**
   * @default true
   */
  imageSmoothing: boolean
  crossOrigin: string | null
}

export type ShapeObject = Omit<
  | CircleProps
  | EllipseProps
  | TriangleProps
  | LineProps
  | RectProps
  | PolygonProps
  | ImageProps,
  'nDpr'
> & { type: ShapeType }
