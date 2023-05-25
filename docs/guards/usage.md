# 使用

## 实例化

```ts
// 实例化
const rubbing = new Rubbing({
  // ...options
})
```

## 渲染

```ts
// 初始化，请在 canvas 实际存在时调用
await rubbing.init()

// 开始渲染
rubbing.loadFrom({
  objects: [
    // ...shapes here
  ],
})
```

## Options

| Property   | Description             | Type   | Required | Default     |
| ---------- | ----------------------- | ------ | -------- | ----------- |
| selector   | canvas 选择器           | String | true     | -           |
| width      | canvas 宽度             | Number | true     | 0           |
| height     | canvas 高度             | Number | true     | 0           |
| radius     | 圆角的半径              | Number | false    | 0           |
| background | canvas 背景色           | String | false    | transparent |
| component  | 小程序组件中需传入 this | Object | false    | -           |

## Methods

| Method   | Description  | Parameters                             | Required | Default |
| -------- | ------------ | -------------------------------------- | -------- | ------- |
| loadFrom | 加载图形数据 | `({ objects: ShapeObject[] }) => void` | true     | -       |

## Types

- ShapeObject: [详见图形介绍](/shapes/)
