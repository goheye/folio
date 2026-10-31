# 手绘 SVG 书本图标

这是依据用户提供的手绘参考重建的 React 内联 SVG 组件，不使用 PNG 图片，也不声称是原始 SVG 源文件。

## 交互

- 合拢状态保留原图的封面、闭眼表情、左侧书脊和完整书页厚度。
- 点击后，ZZZ 先消失；封面作为一整张纸页进行 3D 翻转，眼睛随封面转到背面，不做独立眨眼，也不使用封面透明度淡出。
- 封面翻转期间，内页从中缝逐渐展开；底部书页厚度切换为打开状态的书页边缘。
- 完全打开后只显示展开的双页，不保留封面表情或重影。
- 再次点击反向合拢，恢复原来的睡眠状态。

## 使用

~~~tsx
import BookCharacterIcon from './components/BookCharacterIcon';

export function ScriptsEntry() {
  return <BookCharacterIcon size={160} />;
}
~~~

组件支持受控的 `open` / `onOpenChange`、键盘操作、焦点提示和系统减少动态效果设置。
