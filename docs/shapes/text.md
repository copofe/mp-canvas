# 文本

| Property    | Description                                  | Type                                      | Required | Default   |
| ----------- | -------------------------------------------- | ----------------------------------------- | -------- | --------- |
| text        | text content                                 | `string`                                  | true     | ''        |
| fontFamily  | font family                                  | `string`                                  | false    | system-ui |
| fontWeight  | font weight                                  | `string`                                  | false    | normal    |
| fontSize    | font size                                    | `number`                                  | false    | 12        |
| underline   | <mark>TODO</mark>                            | `boolean`                                 | false    | false     |
| overline    | <mark>TODO</mark>                            | `boolean`                                 | false    | false     |
| linethrough | <mark>TODO</mark>                            | `boolean`                                 | false    | false     |
| fontStyle   | font style                                   | `normal` &#124; `italic` &#124; `oblique` | false    | normal    |
| lineHeight  | line height for the text                     | `number`                                  | false    | 14        |
| charSpacing | <mark>TODO</mark> character spacing for text | `number`                                  | false    | 0         |
| direction   | <mark>TODO</mark>                            | `ltr` &#124; `rtl`                        | false    | ltr       |
| lineClamp | maximum number of lines to display, if overflow and value is Greater than zero, ellipsis will be displayed | `number` | false | 0 | 
| textAlign | text align | `center` &#124; `end` &#124; `left` &#124; `right` &#124; `start` | false | left |
| textBaseline | text baseline | `alphabetic`  &#124; `bottom`  &#124; `hanging`  &#124; `ideographic`  &#124; `middle`  &#124; `top` | false | top |