type RObjectProps$1<T extends Record<string, any>> = T & {
    nDpr: number;
};
declare class RObject<T extends Record<string, any>> {
    nDpr: number;
    left: number;
    top: number;
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    constructor(options: RObjectProps$1<T>);
    _set(key: keyof RObjectProps$1<T>, value: T[keyof T]): void;
    set(key: keyof T, value: T[keyof T]): void;
    _setObject(object: T): void;
    _setOptions(options: T): void;
    setOptions(options: T, defaultValue?: T): void;
    xDpr(v: number): number;
    new(options: any, canvas?: Rubbing): any;
}

interface Point {
    x: number;
    y: number;
}
type CanvasElement = HTMLCanvasElement | WechatMiniprogram.Canvas;
interface RObjectProps {
    nDpr: number;
    left: number;
    top: number;
    width: number;
    height: number;
    zIndex?: number;
}
/**
 * gradient
 */
type GradientType = 'linear' | 'radial';
interface Coords {
    x1: number;
    y1: number;
    r1?: number;
    x2: number;
    y2: number;
    r2?: number;
    [key: string]: number | undefined;
}
type ColorStop = {
    color: string;
    offset: number;
    opacity?: number;
};
interface GradientProps extends RObjectProps {
    type: GradientType;
    coords: Coords;
    colorStops: ColorStop[];
}
interface BaseShapeProps extends RObjectProps {
    nDpr: number;
    /**
     * Top position of an object
     * @default 0
     */
    top: number;
    /**
     * Left position of an object
     * @default 0
     */
    left: number;
    /**
     * Object width
     */
    width: number;
    /**
     * Object height
     */
    height: number;
    /**
     * Opacity of an object
     * @default 1
     */
    opacity?: number;
    /**
     * Shadow object representing shadow of this shape
     * @default null
     */
    /**
     * When set to `false`, an object is not rendered on canvas
     * @default
     */
    visible?: boolean;
}
interface FillStrokeProps {
    /**
     * Determines if the fill or the stroke is drawn first (one of "fill" or "stroke")
     * @default
     */
    paintFirst?: 'fill' | 'stroke';
    /**
     * Color of object's fill
     * takes css colors https://www.w3.org/TR/css-color-3/
     * @default rgb(0,0,0)
     */
    fill?: string | Gradient;
    /**
     * Fill rule used to fill an object
     * accepted values are nonzero, evenodd
     * <b>Backwards incompatibility note:</b> This property was used for setting globalCompositeOperation until v1.4.12 (use `globalCompositeOperation` instead)
     * @default nonzero
     */
    fillRule?: CanvasFillRule;
}
interface ClipPathProps {
}
interface ShapeProps extends BaseShapeProps, FillStrokeProps, ClipPathProps {
}
type ShapeType = 'image' | 'line' | 'rect' | 'text' | 'circle' | 'ellipse' | 'triangle' | 'polyline' | 'polygon';
interface RubbingShapeProps extends ShapeProps {
    [key: string]: any;
}
interface RectProps extends RubbingShapeProps {
    /**
     * fabric rect 原属性
     */
    rx?: number;
    ry?: number;
    /**
     * if support roundRect
     * see syntax: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect
     */
    radii?: number | number[];
}
interface CircleProps extends RubbingShapeProps {
    /**
     * Radius of this circle
     * @type Number
     * @default 0
     */
    radius: number;
    /**
     * degrees of start of the circle.
     * probably will change to degrees in next major version
     * @type Number 0 - 359
     * @default 0
     */
    startAngle: number;
    /**
     * End angle of the circle
     * probably will change to degrees in next major version
     * @type Number 1 - 360
     * @default 360
     */
    endAngle: number;
}
/**
 * 圆形
 */
interface CircleProps extends RubbingShapeProps {
    type: 'circle';
    /**
     * 圆的半径
     * @default 0
     */
    radius: number;
    /**
     * 圆的起始角度，沿顺时钟方向
     * probably will change to degrees in next major version
     * @default 0
     */
    startAngle: number;
    /**
     * 圆的结束角度
     * probably will change to degrees in next major version
     * @default 360
     */
    endAngle: number;
}
interface EllipseProps extends RubbingShapeProps {
    rx: number;
    ry: number;
}
/**
 * 椭圆
 */
interface EllipseProps extends RubbingShapeProps {
    type: 'ellipse';
    rx: number;
    ry: number;
}
/**
 * 三角形
 */
interface TriangleProps extends RubbingShapeProps {
    type: 'triangle';
}
interface LineProps extends RubbingShapeProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
/**
 * 直线
 */
interface LineProps extends RubbingShapeProps {
    type: 'line';
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}
interface PolygonProps extends RubbingShapeProps {
    points: Point[];
}
/**
 * 多边形
 */
interface PolygonProps extends RubbingShapeProps {
    type: 'polygon';
}
interface ImageProps extends RubbingShapeProps {
    src: string;
    radius: number;
    mode: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
}
/**
 * 图像
 */
interface ImageProps extends RubbingShapeProps {
    type: 'image';
    src: string;
    /**
     * @default false
     */
    srcFromAttribute: boolean;
    /**
     * @default 0.5
     */
    minimumScaleTrigger: number;
    /**
     * @default 0
     */
    cropX: number;
    /**
     * @default 0
     */
    cropY: number;
    /**
     * @default true
     */
    imageSmoothing: boolean;
    crossOrigin: string | null;
}
type ShapeObject = Omit<CircleProps | EllipseProps | TriangleProps | LineProps | RectProps | PolygonProps | ImageProps, 'nDpr'> & {
    type: ShapeType;
};

declare class Gradient extends RObject<GradientProps> {
    type: GradientType;
    coords: Required<Coords>;
    colorStops: ColorStop[];
    constructor(opt: GradientProps);
    toLive(ctx: CanvasRenderingContext2D): CanvasGradient;
}

interface RubbingOptions extends RObjectProps {
    /**
     * Selector of the element.
     */
    selector: string;
    /**
     * Width.
     */
    width: number;
    /**
     * Design width.
     */
    designWidth: number;
    /**
     * Height.
     */
    height: number;
    /**
     * Radius.
     */
    radius?: number;
    /**
     * Background color.
     */
    background?: string | Gradient;
    /**
     * Whether to adapt to Retina screens. Auto-enabled for WeChat miniprogram.
     * @default true
     */
    enableRetinaScaling?: boolean;
    /**
     * Whether to use image smoothing for the canvas.
     * Only available for browser.
     * @default true
     */
    imageSmoothingEnabled?: boolean;
    /**
     * Customized component this.
     * @description Required in WeChat miniprogram custom components.
     */
    component?: WechatMiniprogram.Component.Instance<any, any, any>;
    serialized: [];
}
declare class Rubbing extends RObject<RubbingOptions> {
    selector: string;
    /**
     * Background color.
     */
    background?: string | Gradient;
    /**
     * Whether to use image smoothing. Default enabled in browser.
     * @default true
     */
    imageSmoothingEnabled?: boolean;
    enableRetinaScaling: boolean;
    /**
     * Width.
     */
    width: number;
    /**
     * Design width.
     */
    designWidth: number;
    /**
     * Height.
     */
    height: number;
    /**
     * Radius.
     */
    radius?: number;
    dpr: number;
    canvas: CanvasElement;
    /**
     * Customized component this.
     * @description Required in WeChat miniprogram custom components.
     */
    component: WechatMiniprogram.Component.Instance<any, any, any>;
    isRendering: number;
    serialized: any[];
    constructor(option: RubbingOptions);
    /**
     * Initialize after canvas exists.
     */
    init(): Promise<void>;
    /**
     * Get canvas element.
     */
    queryCanvas(): Promise<CanvasElement>;
    /**
     * Screen adaptation.
     */
    retinaScale(): void;
    /**
     * Initialize canvas range and properties.
     */
    clipCanvas(ctx: CanvasRenderingContext2D): void;
    /**
     * Clear canvas context.
     */
    clearContext(ctx: CanvasRenderingContext2D): void;
    _renderObjects(ctx: CanvasRenderingContext2D, objects: any[]): Promise<void>;
    renderCanvas(ctx: CanvasRenderingContext2D): void;
    renderAll(): void;
    serialize(shapes: ShapeObject[]): void;
    loadFromJSON(json: {
        objects: ShapeObject[];
    }): void;
}

export { Rubbing as default };
