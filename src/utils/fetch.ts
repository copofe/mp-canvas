import { CanvasElement } from '../types'
import { isWeb } from './env'

export const loadImage = async (
  url: string,
  canvas?: CanvasElement,
): Promise<{
  img: CanvasImageSource
  width: number
  height: number
}> => {
  return new Promise((resolve, reject) => {
    if (isWeb) {
      const image = new Image()
      image.onload = function () {
        resolve({ img: image, width: image.width, height: image.height })
      }
      image.onerror = reject
      image.src = url
    } else {
      if (!canvas) {
        throw new Error('canvas is undefined')
      }
      // @ts-ignore
      const image = canvas.node.createImage()
      image.src = url

      wx.getImageInfo({
        src: url,
        success: (res) => {
          resolve({
            img: image,
            width: res.width,
            height: res.height,
          })
        },
        fail: reject,
      })
    }
  })
}
