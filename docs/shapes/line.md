# 直线

| Property         | Description          | Type             | Required | Default |
| ---------------- | -------------------- | ---------------- | -------- | ------- |
| x1               | x 轴起点             | `number`         | true     | 0       |
| y1               | y 轴起点             | `number`         | true     | 0       |
| x2               | x 轴终点             | `number`         | true     | 0       |
| y2               | y 轴终点             | `number`         | true     | 0       |
| stroke           | 描边颜色             | `string`         | false    | -       |
| strokeWidth      | 描边宽度             | `number`         | false    | 1       |
| strokeDashArray  | 描边点划线           | `number[]`       | false    | -       |
| strokeDashOffset | 描边点划线偏移       | `number`         | false    | 0       |
| strokeLineCap    | 开放自路径两端的形状 | `CanvasLineCap`  | false    | -       |
| strokeLineJoin   | 转角处形状           | `CanvasLineJoin` | false    | -       |
| strokeMiterLimit | 转角最大距离         | `number`         | false    | 4       |

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
          type: 'line',
          stroke: '#7c3aed',
          x1: 0,
          y1: 100,
          x2: 300,
          y2: 200,
        },
        {
          type: 'line',
          stroke: '#7c3aed',
          x1: 200,
          y1: 50,
          x2: 300,
          y2: 300,
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
      type: 'line',
      x1: 0,
      y1: 100,
      x2: 300,
      y2: 200,
    },
    {
      type: 'line',
      x1: 200,
      y1: 50,
      x2: 300,
      y2: 300,
    },
  ],
})
```

:::
