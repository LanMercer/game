/**
 * 星图连线交互
 * 
 * 功能：
 * 1. 鼠标悬停游戏卡片时，同 game_id 的卡片高亮
 * 2. 非该游戏的卡片暗化退居背景
 * 3. 高亮卡片之间绘制 SVG 虚线连接
 * 4. 鼠标离开时恢复默认状态
 */

(function() {
  'use strict';

  class StarMap {
    constructor() {
      this.svg = null;
      this.lines = [];
      this.cards = [];
      this.activeGameId = null;
      this.container = document.querySelector('.tracks-container');
      
      this.init();
    }

    init() {
      if (!this.container) {
        console.warn('[StarMap] 未找到轨道容器');
        return;
      }

      this.createSVGOverlay();
      this.collectCards();
      this.bindEvents();
      
      console.log('[StarMap] 初始化完成，找到', this.cards.length, '个卡片');
    }

    /**
     * 创建 SVG 覆盖层
     */
    createSVGOverlay() {
      this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.svg.setAttribute('class', 'star-map-svg');
      this.svg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 100;
        overflow: visible;
      `;
      
      this.container.appendChild(this.svg);
    }

    /**
     * 收集所有游戏卡片
     */
    collectCards() {
      const cardElements = document.querySelectorAll('.game-card');
      
      this.cards = Array.from(cardElements).map(card => {
        const track = card.closest('.track-single') ? 'single' : 'multi';
        return {
          element: card,
          gameId: card.dataset.gameId || '',
          track: track
        };
      }).filter(card => card.gameId); // 只保留有 game_id 的卡片
    }

    /**
     * 绑定悬停事件
     */
    bindEvents() {
      this.cards.forEach(({ element, gameId }) => {
        if (!gameId) return;
        
        element.addEventListener('mouseenter', () => {
          this.highlightGame(gameId);
        });
        
        element.addEventListener('mouseleave', () => {
          // 延迟清除，避免快速移动时闪烁
          this.clearHighlightTimeout = setTimeout(() => {
            this.clearHighlight();
          }, 50);
        });
      });

      // 鼠标进入 SVG 区域时取消清除（防止移到连线上时断开）
      this.svg.addEventListener('mouseenter', () => {
        if (this.clearHighlightTimeout) {
          clearTimeout(this.clearHighlightTimeout);
        }
      });

      // 监听窗口大小变化，重绘连线
      window.addEventListener('resize', () => {
        if (this.activeGameId) {
          this.drawConnections(this.activeGameId);
        }
      });
    }

    /**
     * 高亮特定游戏的所有记录
     * @param {string} gameId - 游戏唯一标识
     */
    highlightGame(gameId) {
      // 取消待执行的清除
      if (this.clearHighlightTimeout) {
        clearTimeout(this.clearHighlightTimeout);
        this.clearHighlightTimeout = null;
      }

      // 如果已经是当前高亮，不重复操作
      if (this.activeGameId === gameId) return;
      
      this.activeGameId = gameId;
      
      // 设置卡片状态
      this.cards.forEach(({ element, gameId: cardGameId }) => {
        if (cardGameId === gameId) {
          element.classList.add('star-highlight');
          element.classList.remove('star-dimmed');
        } else {
          element.classList.remove('star-highlight');
          element.classList.add('star-dimmed');
        }
      });

      // 绘制连线
      this.drawConnections(gameId);
    }

    /**
     * 清除高亮
     */
    clearHighlight() {
      this.activeGameId = null;
      
      this.cards.forEach(({ element }) => {
        element.classList.remove('star-highlight', 'star-dimmed');
      });

      this.clearLines();
    }

    /**
     * 绘制连线
     * @param {string} gameId - 游戏唯一标识
     */
    drawConnections(gameId) {
      this.clearLines();
      
      // 获取该游戏的所有卡片位置
      const relatedCards = this.cards.filter(c => c.gameId === gameId);
      if (relatedCards.length < 2) return;

      const containerRect = this.container.getBoundingClientRect();
      
      const positions = relatedCards.map(({ element }) => {
        const rect = element.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top
        };
      });

      // 绘制卡片之间的连线（两两连接）
      for (let i = 0; i < positions.length - 1; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          this.createLine(positions[i], positions[j], relatedCards[0].track);
        }
      }
    }

    /**
     * 创建 SVG 线条
     * @param {Object} start - 起点坐标 {x, y}
     * @param {Object} end - 终点坐标 {x, y}
     * @param {string} track - 'single' | 'multi'
     */
    createLine(start, end, track) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      
      // 根据轨道确定线条颜色
      const color = track === 'single' ? '#81A1C1' : '#EBCB8B';
      
      line.setAttribute('x1', start.x);
      line.setAttribute('y1', start.y);
      line.setAttribute('x2', end.x);
      line.setAttribute('y2', end.y);
      line.setAttribute('stroke', color);
      line.setAttribute('stroke-width', '1');
      line.setAttribute('stroke-opacity', '0.4');
      line.setAttribute('stroke-dasharray', '4,4');
      
      // 添加流动动画
      line.style.animation = 'dash 20s linear infinite';
      
      this.svg.appendChild(line);
      this.lines.push(line);
    }

    /**
     * 清除所有线条
     */
    clearLines() {
      this.lines.forEach(line => line.remove());
      this.lines = [];
    }

    /**
     * 刷新卡片列表（用于动态加载后）
     */
    refresh() {
      this.collectCards();
      this.bindEvents();
    }
  }

  // 添加 CSS 动画关键帧（如果不存在）
  if (!document.getElementById('star-map-animations')) {
    const style = document.createElement('style');
    style.id = 'star-map-animations';
    style.textContent = `
      @keyframes dash {
        to {
          stroke-dashoffset: -100;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // 初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new StarMap());
  } else {
    new StarMap();
  }
})();
