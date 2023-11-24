# 使用

## 初始化

```ts
const rubbing = new Rubbing({
  // ...options
})

// 请在 canvas 实际存在时调用
await rubbing.init()
```

## 渲染

```ts
rubbing.loadFrom({
  objects: [
    // ...shapes here
  ],
})
```

## 示例

<canvas id="canvas"></canvas>

<script>
  import('/index.mjs').then(async ({ Rubbing }) => {
    const rubbing = new Rubbing({
      selector: '#canvas',
      background: '#f9fafb',
      width: 300,
      height: 100,
    })
    await rubbing.init()
    rubbing.loadFrom({
      objects: [
        {
          type: 'text',
          text: '🎉 Rubbing!',
          left: 0,
          top: 50,
          fontSize: 16,
          fill: '#7c3aed',
          width: 300,
          textAlign: 'center',
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
  height: 100,
})
await rubbing.init()
rubbing.loadFrom({
  objects: [
    {
      type: 'text',
      text: '🎉 Rubbing!',
      left: 0,
      top: 50,
      fontSize: 16,
      fill: '#7c3aed',
      width: 300,
      textAlign: 'center',
    },
  ],
})
```
:::

## Options

| Property   | Description                 | Type                 | Required | Default     |
| ---------- | --------------------------- | -------------------- | -------- | ----------- |
| selector   | canvas 选择器               | `string`             | true     | -           |
| width      | canvas 宽度                 | `number`             | true     | 0           |
| height     | canvas 高度                 | `number`             | true     | 0           |
| radius     | 圆角半径                    | `number`             | false    | 0           |
| background | canvas 背景色               | `string`             | false    | transparent |
| component  | 小程序组件中使用需传 `this` | `Component.Instance` | false    | -           |

## Methods

| Method   | Description | Parameters                   | Return                                                                  |
| -------- | ----------- | ---------------------------- | ----------------------------------------------------------------------- |
| init     | 初始化      | -                            | `Promise<{ canvas: CanvasElement, context: CanvasRenderingContext2D }>` |
| loadFrom | 加载图形    | `{ objects: `[`ShapeObject`](/shapes/)`[] }` | `Promise<void>`                                                         |

## 图形对象

[`ShapeObject`](/shapes/)
