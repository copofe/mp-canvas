import { Rubbing } from './canvas'

type RObjectProps<T extends Record<string, any>> = T & {
  nDpr?: number
}

export class RObject<T extends Record<string, any>> {
  nDpr = 1
  left: number
  top: number
  width: number
  height: number
  ctx: CanvasRenderingContext2D

  constructor(options: RObjectProps<T>) {
    this.setOptions(options)
  }

  _set(key: keyof RObjectProps<T>, value: T[keyof T]) {
    // @ts-ignore
    this[key] = value
  }

  set(key: keyof T, value: T[keyof T]) {
    if (typeof key === 'object') {
      this._setObject(key)
    } else {
      this._set(key, value)
    }
  }

  _setObject(object: T) {
    for (const key in object) {
      this.set(key, object[key])
    }
  }

  _setOptions(options: T) {
    for (const key in options) {
      this.set(key, options[key])
    }
  }

  setOptions(options: T, defaultValue?: T) {
    this._setOptions(
      Object.assign(
        defaultValue || {
          nDpr: 1,
          left: 0,
          top: 0,
          width: 0,
          height: 0,
        },
        options,
      ),
    )
  }

  xDpr(v: number): number {
    return v * this.nDpr
  }

  new(options: any, canvas?: Rubbing) {
    return {
      left: this.left,
      top: this.top,
      nDpr: this.nDpr,
      width: this.width,
      height: this.height,
      canvas: canvas?.canvas,
      ...options,
    }
  }
}
