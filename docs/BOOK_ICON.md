# 手绘 SVG 书本图标

这是依据用户提供的手绘参考重建的 React 内联 SVG 组件，不使用 PNG 图片，也不声称是原始 SVG 源文件。

## 交互

- 初始状态保留合拢书本的体块、厚度、左侧书脊、底部书页线条和闭眼表情。
- 点击后，ZZZ 淡出；整块封面连同闭眼表情绕书脊翻开，不做独立眨眼或睁眼动作。
- 封面翻开时，打开的两侧书页从中缝缓慢展开；打开状态保留厚实的书页边缘，不显示脸。
- 再次点击反向合拢，恢复睡眠状态。

## 使用

~~~tsx
import BookCharacterIcon from './components/BookCharacterIcon';

export function ScriptsEntry() {
  return <BookCharacterIcon size={160} />;
}
~~~

组件支持受控的 `open` / `onOpenChange`、键盘操作、焦点提示和系统减少动态效果设置。
