# 圆

| Property   | Description | Type                                    | Required | Default |
| ---------- | ----------- | --------------------------------------- | -------- | ------- |
| fill       | 填充颜色    | `string` &#124; [`Gradient`](#gradient) | false    | -       |
| radius     | 半径        | `number`                                | true     | 0       |
| startAngle | 起始角度    | `number`                                | true     | 0       |
| endAngle   | 结束角度    | `number`                                | true     | 0       |

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
          type: 'circle',
          left: 50,
          top: 50,
          radius: 100,
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
