import { RShape } from '../shape'
import { TextProps } from '../types'

export class Text extends RShape<TextProps> {
  text = '' // text content
  fontFamily = 'system-ui' // font family
  fontWeight = 'normal' // font weight
  fontSize = 12 // font size
  underline = false // if text is underlined
  overline = false // if text has a line over it
  linethrough = false // if text has a line through it
  textAlign: CanvasTextAlign = 'left' // text align
  textBaseline: CanvasTextBaseline = 'top' // text baseline
  fontStyle = 'normal' // font style
  lineHeight = 14 // line height for the text
  textBackgroundColor = '' // background color for the text
  charSpacing = 0 // character spacing for text
  direction: CanvasDirection = 'ltr' // text direction
  lineClamp = 0 // maximum number of lines to display

  width = Infinity // maximum width for the text

  constructor(opt: TextProps) {
    const options = {
      ...opt,
      lineHeight: opt.lineHeight || opt.fontSize || 14,
    }
    super(options)
    this.setOptions(options)
  }

  render(ctx: CanvasRenderingContext2D) {
    let index = 0 // index for the current line
    let splitStr: string[] = [] // split text array
    ctx.save()
    ctx.font = `${this.fontWeight} ${this.xDpr(this.fontSize)}px ${
      this.fontFamily
    }`
    ctx.textBaseline = 'top'
    ctx.textAlign = this.textAlign
    ctx.direction = this.direction
    ctx.fillStyle = this.textBackgroundColor
    ;([this.text] as string[]).forEach((n, i) => {
      // iterate through each line of text
      let start = 0 // starting index for the substring

      String(n)
        .split('')
        .forEach((m, j) => {
          const str = String(n).slice(start, j + 1)

          if (ctx.measureText(str).width < this.xDpr(this.width)) {
            // if text fits within the max-width
            splitStr[index] = str
          } else {
            // text does not fit within the max-width
            splitStr[index + 1] = m // add the current character to the next line
            start = j
            index++
          }
        })

      index++
    })

    if (this.lineClamp && splitStr.length > this.lineClamp) {
      // if there is a max number of lines to display
      splitStr = splitStr.slice(0, this.lineClamp) // slice the array to only contain the max number of lines
      splitStr[this.lineClamp - 1] =
        splitStr[this.lineClamp - 1].slice(0, -1) + '...' // add ellipsis to the last line
    }

    this._setFillStyles(ctx, this) // set the fill styles for the text

    splitStr.forEach((n, i) => {
      // render the text line by line
      ctx.fillText(
        n,
        this.xDpr(
          {
            left: this.left, // left aligned text
            start: this.left, // left aligned text
            right: this.left + this.width, // right aligned text
            end: this.left + this.width, // right aligned text
            center: this.left + this.width / 2, // center aligned text
          }[this.textAlign] || this.left,
        ),
        this.xDpr(
          this.top +
            this.lineHeight * i +
            (this.lineHeight - this.fontSize) / 2,
        ),
      )
    })

    ctx.restore() // restore the context
  }
}
