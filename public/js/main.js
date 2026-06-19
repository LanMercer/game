/**
 * 游戏生涯记录站 - 主入口
 * 
 * 初始化所有模块
 */

(function() {
  'use strict';

  console.log('🎮 游戏生涯记录站加载完成');
  console.log('📍 当前轨道:', document.querySelector('.track-single') ? '单机区可用' : '未找到');
  console.log('📍 联机轨道:', document.querySelector('.track-multi') ? '联机区可用' : '未找到');

  // 监听轨道事件（供调试使用）
  window.addEventListener('track:focus', function(e) {
    console.log('🎯 轨道聚焦:', e.detail.track);
  });

  window.addEventListener('track:reset', function() {
    console.log('🔄 轨道重置');
  });
})();
