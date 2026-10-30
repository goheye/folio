# 手绘 SVG 书本图标

这是根据用户提供的手绘 PNG 参考重建的独立 React 组件，**不是原始 SVG 源文件**。图形由内联 SVG 路径绘制，不使用 PNG 图片。

## 使用

~~~tsx
import BookCharacterIcon from './components/BookCharacterIcon';

export function ScriptsEntry() {
  return <BookCharacterIcon size={160} />;
}
~~~

默认状态是合拢睡觉；点击后睁开眼睛并展开书页，再次点击会合上书本。

## 受控状态

~~~tsx
<BookCharacterIcon
  open={isBookOpen}
  onOpenChange={setIsBookOpen}
/>
~~~

组件支持键盘操作、焦点提示和系统减少动态效果设置。可通过 `size`、`className` 调整尺寸与布局。
