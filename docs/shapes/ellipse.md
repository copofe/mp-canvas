# 椭圆

| Property         | Description          | Type                                    | Required | Default |
| ---------------- | -------------------- | --------------------------------------- | -------- | ------- |
| rx               | x 轴半径             | `number`                                | true     | 0       |
| ry               | y 轴半径             | `number`                                | true     | 0       |
| fill             | 填充颜色             | `string` &#124; [`Gradient`](#gradient) | false    | -       |
| stroke           | 描边颜色             | `string`                                | false    | -       |
| strokeWidth      | 描边宽度             | `number`                                | false    | 1       |
| strokeDashArray  | 描边点划线           | `number[]`                              | false    | -       |
| strokeDashOffset | 描边点划线偏移       | `number`                                | false    | 0       |
| strokeLineCap    | 开放自路径两端的形状 | `CanvasLineCap`                         | false    | -       |
| strokeLineJoin   | 转角处形状           | `CanvasLineJoin`                        | false    | -       |
| strokeMiterLimit | 转角最大距离         | `number`                                | false    | 4       |

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
      width: 200,
      height: 100,
    })
    await rubbing.init()
    rubbing.loadFrom({
      objects: [
        {
          type: 'ellipse',
          left: 100,
          top: 50,
          rx: 100,
          ry: 50,
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
  width: 200,
  height: 100,
})
await rubbing.init()
rubbing.loadFrom({
  objects: [
    {
      type: 'ellipse',
      left: 100,
      top: 50,
      rx: 100,
      ry: 50,
      fill: '#7c3aed',
    },
  ],
})
```

:::
