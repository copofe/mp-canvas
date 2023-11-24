# 三角形

| Property | Description | Type                                    | Required | Default |
| -------- | ----------- | --------------------------------------- | -------- | ------- |
| width    | 宽度        | `number`                                | true     | 0       |
| height   | 高度        | `number`                                | true     | 0       |
| fill     | 填充颜色    | `string` &#124; [`Gradient`](#gradient) | false    | -       |

# 示例

<canvas id="canvas"></canvas>

<script>
  import('/index.mjs').then(async ({ Rubbing }) => {
    const rubbing = new Rubbing({
      selector: '#canvas',
      background: '#fff',
      width: 300,
      height: 200,
    })
    await rubbing.init()
    rubbing.loadFrom({
      objects: [
        {
          type: 'triangle',
          fill: '#7c3aed',
          left: 50,
          top: 0,
          width: 200,
          height: 150,
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
  height: 200,
})
await rubbing.init()
rubbing.loadFrom({
  objects: [
    {
      type: 'rect',
      fill: '#7c3aed',
      left: 50,
      top: 0,
      width: 200,
      height: 150,
    },
  ],
})
```

:::
