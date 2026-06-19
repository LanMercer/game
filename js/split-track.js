/**
 * 动态分屏双轨交互
 * 
 * 功能：
 * 1. 监听轨道悬停事件，触发自定义事件供其他模块使用
 * 2. 处理浏览器兼容性（:has() 检测）
 * 3. 双轨滚动同步（可选功能）
 */

(function() {
  'use strict';

  class SplitTrack {
    constructor() {
      this.container = document.querySelector('.tracks-container');
      this.singleTrack = document.querySelector('.track-single');
      this.multiTrack = document.querySelector('.track-multi');
      this.currentTrack = null;
      
      // 检测 :has() 支持
      this.hasHasSupport = CSS.supports('selector(:has(*))');
      
      this.init();
    }

    init() {
      if (!this.container || !this.singleTrack || !this.multiTrack) {
        console.warn('[SplitTrack] 未找到轨道元素');
        return;
      }

      this.bindEvents();
      console.log('[SplitTrack] 初始化完成');
    }

    bindEvents() {
      // 单机轨道悬停
      this.singleTrack.addEventListener('mouseenter', () => {
        this.onTrackEnter('single');
      });

      // 联机轨道悬停
      this.multiTrack.addEventListener('mouseenter', () => {
        this.onTrackEnter('multi');
      });

      // 鼠标离开容器
      this.container.addEventListener('mouseleave', () => {
        this.onTrackLeave();
      });

      // 如果没有 :has() 支持，使用 JS 实现展开效果
      if (!this.hasHasSupport) {
        this.enableJSFallback();
      }
    }

    /**
     * 鼠标进入轨道
     * @param {string} track - 'single' | 'multi'
     */
    onTrackEnter(track) {
      this.currentTrack = track;
      
      // 触发自定义事件，供星图连线等模块使用
      window.dispatchEvent(new CustomEvent('track:focus', {
        detail: { track }
      }));

      // 添加视觉类
      if (track === 'single') {
        this.singleTrack.classList.add('is-active');
        this.multiTrack.classList.add('is-inactive');
      } else {
        this.multiTrack.classList.add('is-active');
        this.singleTrack.classList.add('is-inactive');
      }
    }

    /**
     * 鼠标离开轨道容器
     */
    onTrackLeave() {
      this.currentTrack = null;
      
      // 触发重置事件
      window.dispatchEvent(new CustomEvent('track:reset'));

      // 移除视觉类
      this.singleTrack.classList.remove('is-active', 'is-inactive');
      this.multiTrack.classList.remove('is-active', 'is-inactive');
    }

    /**
     * 为不支持 :has() 的浏览器提供 JS 回退
     */
    enableJSFallback() {
      console.log('[SplitTrack] 启用 JS 回退模式');
      
      // 添加 CSS 类来控制宽度
      const style = document.createElement('style');
      style.textContent = `
        .track-single.is-active { width: 75% !important; }
        .track-single.is-inactive { width: 25% !important; }
        .track-multi.is-active { width: 75% !important; }
        .track-multi.is-inactive { width: 25% !important; }
      `;
      document.head.appendChild(style);
    }

    /**
     * 获取当前激活的轨道
     * @returns {string|null} 'single' | 'multi' | null
     */
    getCurrentTrack() {
      return this.currentTrack;
    }

    /**
     * 检查是否在单机轨道
     */
    isSingleTrack() {
      return this.currentTrack === 'single';
    }

    /**
     * 检查是否在联机轨道
     */
    isMultiTrack() {
      return this.currentTrack === 'multi';
    }
  }

  // 初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new SplitTrack());
  } else {
    new SplitTrack();
  }
})();
