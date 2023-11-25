# 圆

| Property         | Description          | Type                                    | Required | Default |
| ---------------- | -------------------- | --------------------------------------- | -------- | ------- |
| radius           | 半径                 | `number`                                | true     | 0       |
| startAngle       | 起始角度             | `number`                                | true     | 0       |
| endAngle         | 结束角度             | `number`                                | true     | 0       |
| fill             | 填充颜色             | `string` &#124; [`Gradient`](#gradient) | false    | -       |
| stroke           | 描边颜色             | `string`                                | -        |         |
| strokeWidth      | 描边宽度             | `number`                                | 1        |         |
| strokeDashArray  | 描边点划线           | `number[]`                              | -        |         |
| strokeDashOffset | 描边点划线偏移       | `number`                                | 0        |         |
| strokeLineCap    | 开放自路径两端的形状 | `CanvasLineCap`                         | -        |         |
| strokeLineJoin   | 转角处形状           | `CanvasLineJoin`                        | -        |         |
| strokeMiterLimit | 转角最大距离         | `number`                                | 4        |         |

# 示例

<ClientOnly>
  <canvas id="canvas"></canvas>
</ClientOnly>

<script>
if (!import.meta.env.SSR) {
  import('https://unpkg.com/rubbing@latest/dist/index.mjs').then(async ({ Rubbing }) => {
    const rubbing = new Rubbing({
      selector: '#canvas',
      background: '#fff',
      width: 300,
      height: 300,
    })
    await rubbing.init()
    rubbing.loadFrom({
      objects: [
        {
          type: 'circle',
          left: 50,
          top: 50,
          radius: 100,
          fill: '#7c3aed',
        },
      ],
    })
  })
}
</script>

::: details Source Code

```js
const rubbing = new Rubbing({
  selector: '#canvas',
  background: '#fff',
  width: 300,
  height: 300,
})
await rubbing.init()
rubbing.loadFrom({
  objects: [
    {
      type: 'circle',
      left: 50,
      top: 50,
      radius: 100,
      fill: '#7c3aed',
    },
  ],
})
```

:::
