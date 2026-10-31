# 手绘 SVG 场记板图标

独立 React 组件，按用户提供的 PNG 参考图重绘；这是重建稿，不是原始 SVG 文件。

## 使用

```tsx
import ClapperboardIcon from './components/ClapperboardIcon';

export function VideoControl() {
  return <ClapperboardIcon size={180} />;
}
```

默认点击会播放一声短促的合成“咔嚓”音，并切换播放状态；红灯只在播放状态闪烁。声音由 Web Audio API 实时合成，不依赖外部音频资源。

## 接入真实视频播放器

把播放器状态传入 `playing`，并用 `onPlayingChange` 触发播放 / 暂停。组件在受控模式下不会自行改变状态，红灯跟随外部播放器状态。

```tsx
<ClapperboardIcon
  playing={isVideoPlaying}
  onPlayingChange={(next) => {
    if (next) videoRef.current?.play();
    else videoRef.current?.pause();
  }}
/>
```

提示：浏览器可能要求用户先点击页面才允许播放声音。组件支持键盘聚焦和 `prefers-reduced-motion`。
