# 图片

| Property | Description | Type     | Required | Default |
| -------- | ----------- | -------- | -------- | ------- |
| src      | 图片地址    | `string` | true     | ""      |
| width    | 宽度        | `number` | true     | 0       |
| height   | 高度        | `number` | true     | 0       |
| radius   | 圆角        | `number` | false    | 0       |

# 示例

<ClientOnly>
<canvas id="canvas"></canvas>

<script>
if (!import.meta.env.SSR) {
  import('https://unpkg.com/rubbing@latest/dist/index.mjs').then(async ({ Rubbing }) => {
    const rubbing = new Rubbing({
      selector: '#canvas',
      background: '#fff',
      width: 600,
      height: 200,
    })
    await rubbing.init()
    rubbing.loadFrom({
      objects: [
        {
          type: 'image',
          left: 0,
          top: 0,
          width: 600,
          height: 200,
          src: 'https://source.unsplash.com/random/600x200'
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
  height: 215,
})
await rubbing.init()
rubbing.loadFrom({
  objects: [
    {
      type: 'image',
      left: 0,
      top: 0,
      width: 600,
      height: 200,
      src: 'https://source.unsplash.com/random/600x200',
    },
  ],
})
```

:::
