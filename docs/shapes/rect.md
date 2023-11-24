# 矩形

| Property | Description              | Type                                    | Required | Default |
| -------- | ------------------------ | --------------------------------------- | -------- | ------- |
| width    | 宽度                     | `number`                                | true     | 0       |
| height   | 高度                     | `number`                                | true     | 0       |
| fill     | 填充颜色                 | `string` &#124; [`Gradient`](#gradient) | false    | -       |
| rx       | Horizontal border radius | `number`                                | false    | 0       |
| ry       | Vertical border radius   | `number`                                | false    | 0       |
| radii    | border radius            | `number` &#124; `number[]`              | false    | 0       |

# 示例

<ClientOnly>
<canvas id="canvas"></canvas>

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
          type: 'rect',
          fill: '#7c3aed',
          left: 100,
          top: 0,
          width: 200,
          height: 200,
        },
      ],
    })
  })
}
</script>
</ClientOnly>

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
      type: 'rect',
      fill: '#7c3aed',
      left: 100,
      top: 0,
      width: 200,
      height: 200,
    },
  ],
})
```

:::
