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
| loadFrom | 加载图形    | `{ objects: ShapeObject[] }` | `Promise<void>`                                                         |

## 图形对象

[`ShapeObject`](/shapes/)
