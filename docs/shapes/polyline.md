# 折线

| Property | Description | Type                       | Required | Default |
| -------- | ----------- | -------------------------- | -------- | ------- |
| points   | 点坐标       | `{x: number, y: number}[]` | true     | -       |


# 示例

<canvas id="canvas"></canvas>

<script>
  import('/index.mjs').then(async ({ Rubbing }) => {
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
          type: 'polyline',
          points: [
            { x: 0, y: 100 },
            { x: 200, y: 50 },
            { x: 300, y: 200 },
          ]
        },
      ],
    })
  })
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
      type: 'polyline',
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
