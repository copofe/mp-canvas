# 椭圆

| Property | Description | Type                                    | Required | Default |
| -------- | ----------- | --------------------------------------- | -------- | ------- |
| fill     | 填充颜色    | `string` &#124; [`Gradient`](#gradient) | false    | -       |
| rx       | x 轴半径    | `number`                                | true     | 0       |
| ry       | y 轴半径    | `number`                                | true     | 0       |

# 示例

<canvas id="canvas"></canvas>

<script>
  import('/index.mjs').then(async ({ Rubbing }) => {
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
