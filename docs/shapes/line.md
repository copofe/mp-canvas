# 直线

| Property | Description | Type                                    | Required | Default |
| -------- | ----------- | --------------------------------------- | -------- | ------- |
| x1       | x 轴起点    | `number`                                | true     | 0       |
| y1       | y 轴起点    | `number`                                | true     | 0       |
| x2       | x 轴终点    | `number`                                | true     | 0       |
| y2       | y 轴终点    | `number`                                | true     | 0       |

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
