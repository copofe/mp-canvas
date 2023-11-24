# 椭圆

| Property | Description | Type                                    | Required | Default |
| -------- | ----------- | --------------------------------------- | -------- | ------- |
| fill     | 填充颜色    | `string` &#124; [`Gradient`](#gradient) | false    | -       |
| rx       | x 轴半径    | `number`                                | true     | 0       |
| ry       | y 轴半径    | `number`                                | true     | 0       |

# 示例

<ClientOnly>
<canvas id="canvas"></canvas>

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
</ClientOnly>

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
