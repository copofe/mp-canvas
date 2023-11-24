# 多边形

| Property | Description | Type                       | Required | Default |
| -------- | ----------- | -------------------------- | -------- | ------- |
| points   | 点坐标      | `{x: number, y: number}[]` | true     | -       |

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
          type: 'polygon',
          fill: '#7c3aed',
          points: [
            { x: 0, y: 100 },
            { x: 200, y: 50 },
            { x: 300, y: 200 },
            { x: 100, y: 100 },
            { x: 0, y: 100 },
          ]
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
      type: 'polygon',
      fill: '#7c3aed',
      points: [
        { x: 0, y: 100 },
        { x: 200, y: 50 },
        { x: 300, y: 200 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ],
    },
  ],
})
```

:::
