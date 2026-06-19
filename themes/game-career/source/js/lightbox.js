/**
 * 媒体画廊（Lightbox）
 * 
 * 功能：
 * 1. 点击图片/视频缩略图弹出全屏画廊
 * 2. 支持左右切换浏览
 * 3. 支持键盘控制（ESC关闭，左右箭头切换）
 * 4. 显示当前位置计数器
 * 5. 支持图片和视频混合浏览
 */

(function() {
  'use strict';

  class GameLightbox {
    constructor() {
      this.overlay = null;
      this.currentIndex = 0;
      this.mediaItems = [];
      this.isOpen = false;
      
      this.init();
    }

    init() {
      this.createOverlay();
      this.bindEvents();
      console.log('[Lightbox] 初始化完成');
    }

    /**
     * 创建 Lightbox DOM 结构
     */
    createOverlay() {
      this.overlay = document.createElement('div');
      this.overlay.className = 'lightbox-overlay';
      this.overlay.id = 'lightbox';
      this.overlay.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-container">
          <button class="lightbox-close" aria-label="关闭">&times;</button>
          <button class="lightbox-prev" aria-label="上一张">&#8249;</button>
          <button class="lightbox-next" aria-label="下一张">&#8250;</button>
          <div class="lightbox-content"></div>
          <div class="lightbox-counter"></div>
        </div>
      `;
      
      document.body.appendChild(this.overlay);
      
      // 绑定控制按钮
      this.overlay.querySelector('.lightbox-close').addEventListener('click', () => this.close());
      this.overlay.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
      this.overlay.querySelector('.lightbox-next').addEventListener('click', () => this.next());
      this.overlay.querySelector('.lightbox-backdrop').addEventListener('click', () => this.close());
      
      // 键盘控制
      document.addEventListener('keydown', (e) => {
        if (!this.isOpen) return;
        if (e.key === 'Escape') this.close();
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      });
    }

    /**
     * 绑定媒体点击事件
     */
    bindEvents() {
      // 使用事件委托，处理动态添加的元素
      document.addEventListener('click', (e) => {
        const mediaTrigger = e.target.closest('[data-lightbox]');
        if (!mediaTrigger) return;
        
        e.preventDefault();
        
        // 获取画廊组
        const galleryId = mediaTrigger.dataset.gallery;
        const items = galleryId 
          ? document.querySelectorAll(`[data-gallery="${galleryId}"]`)
          : [mediaTrigger];
        
        this.open(Array.from(items), Array.from(items).indexOf(mediaTrigger));
      });
    }

    /**
     * 打开 Lightbox
     * @param {Array} items - 媒体元素数组
     * @param {number} startIndex - 起始索引
     */
    open(items, startIndex = 0) {
      this.mediaItems = items.map(item => ({
        type: item.dataset.type || 'image',
        src: item.dataset.src || item.src,
        alt: item.alt || ''
      })).filter(item => item.src);
      
      if (this.mediaItems.length === 0) return;
      
      this.currentIndex = startIndex;
      this.isOpen = true;
      
      // 显示遮罩
      this.overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      this.loadMedia();
      this.updateNavigation();
    }

    /**
     * 关闭 Lightbox
     */
    close() {
      this.isOpen = false;
      this.overlay.classList.remove('active');
      document.body.style.overflow = '';
      
      // 停止视频播放
      const video = this.overlay.querySelector('video');
      if (video) {
        video.pause();
        video.src = '';
      }
    }

    /**
     * 加载当前媒体
     */
    loadMedia() {
      const content = this.overlay.querySelector('.lightbox-content');
      const counter = this.overlay.querySelector('.lightbox-counter');
      const item = this.mediaItems[this.currentIndex];
      
      // 清空内容
      content.innerHTML = '';
      
      // 更新计数器
      if (this.mediaItems.length > 1) {
        counter.textContent = `${this.currentIndex + 1} / ${this.mediaItems.length}`;
      } else {
        counter.textContent = '';
      }
      
      // 加载媒体
      if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.src;
        video.controls = true;
        video.autoplay = true;
        video.setAttribute('playsinline', '');
        content.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s';
        
        img.onload = () => {
          img.style.opacity = '1';
        };
        
        content.appendChild(img);
      }
    }

    /**
     * 上一张
     */
    prev() {
      if (this.mediaItems.length <= 1) return;
      this.currentIndex = (this.currentIndex - 1 + this.mediaItems.length) % this.mediaItems.length;
      this.loadMedia();
    }

    /**
     * 下一张
     */
    next() {
      if (this.mediaItems.length <= 1) return;
      this.currentIndex = (this.currentIndex + 1) % this.mediaItems.length;
      this.loadMedia();
    }

    /**
     * 更新导航按钮显示状态
     */
    updateNavigation() {
      const prevBtn = this.overlay.querySelector('.lightbox-prev');
      const nextBtn = this.overlay.querySelector('.lightbox-next');
      
      const showNav = this.mediaItems.length > 1;
      prevBtn.style.display = showNav ? 'flex' : 'none';
      nextBtn.style.display = showNav ? 'flex' : 'none';
    }
  }

  // 初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new GameLightbox());
  } else {
    new GameLightbox();
  }
})();
