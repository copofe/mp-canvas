import { ShapeType } from '../types'
import { Circle } from './circle'
import { Ellipse } from './ellipse'
import { ImageShape } from './image'
import { Line } from './line'
import { Polygon } from './polygon'
import { Polyline } from './polyline'
import { Rect } from './rect'
import { Text } from './text'
import { Triangle } from './triangle'

export const shapeHandler: Partial<Record<ShapeType, any>> = {
  circle: Circle,
  ellipse: Ellipse,
  rect: Rect,
  triangle: Triangle,
  polyline: Polyline,
  polygon: Polygon,
  line: Line,
  text: Text,
  image: ImageShape,
}
