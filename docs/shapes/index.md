# 基础属性

## 图形基础属性

| Property | Description | Type                       | Required | Default  |
| -------- | ----------- | -------------------------- | -------- | -------- |
| type     | 类型        | `circle` &#124; `ellipse` &#124; `image` &#124; `line` &#124; `polygon` &#124; `polyline` &#124; `rect` &#124; `text` &#124; `triangle` | true     | -        |
| left     | x 轴距离    | `number`                   | true     | 0        |
| top      | y 轴距离    | `number`                   | true     | 0        |
| width    | 宽度        | `number`                   | true     | 0        |
| height   | 高度        | `number`                   | true     | 0        |
| fill     | 填充        | `string` &#124; `Gradient` | true     | -        |
| zIndex   | 层叠顺序    | `number`                   | false    | 自身索引 |
| visible  | 是否可见    | `boolean`                  | false    | true     |

### fill 填充

`fill: string | Gradient`

#### 纯色填充

例： `fill: #000`

#### 渐变填充

`Gradient`
| Property | Description | Type | Required | Default |
| --- | --- | --- | --- | --- |
| type | 渐变类型 | `linear` &#124; `radial` | true | - |
| coords | 渐变区域坐标 | `{ x1: number, y1: number, x2: number, y2: number, r1?: number, r2?: number }` | true | - |
| colorStops | 渐变断点 | `{color: string, offset: number, opacity?: number}[]` | true | - |

:::tip
当指定 type 为 radial 时，coords r1 和 r2 必填

offset 数值范围 0 ~ 1
:::

例：

```ts
{
  fill: {
    type: 'radial',
    coords: { x1: 50, y1: 50, x2: 50, y2: 50, r1: 0, r2: 50 },
    colorStops: [
      { offset: 0, color: '#000' },
      { offset: 1, color: '#fff' }
    ]
  },
}
```
