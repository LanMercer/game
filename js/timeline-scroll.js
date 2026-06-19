/**
 * 时间轴导航 - 双轨同步滚动
 * 
 * 功能：
 * 1. 点击时间轴链接时，双轨同时滚动到对应时间
 * 2. 平滑滚动动画
 */

(function() {
  'use strict';

  function initTimelineScroll() {
    const timelineNav = document.querySelector('.timeline-nav');
    const singleTrack = document.querySelector('.track-single');
    const multiTrack = document.querySelector('.track-multi');
    
    if (!timelineNav || !singleTrack || !multiTrack) return;

    // 监听时间轴点击
    timelineNav.addEventListener('click', function(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      
      e.preventDefault();
      
      const targetId = link.getAttribute('href').slice(1);
      
      // 在两个轨道中查找对应元素
      const singleTarget = singleTrack.querySelector('[id="' + targetId + '"]');
      const multiTarget = multiTrack.querySelector('[id="' + targetId + '"]');
      
      // 计算滚动位置
      let scrollToSingle = null;
      let scrollToMulti = null;
      
      if (singleTarget) {
        scrollToSingle = singleTarget.offsetTop - singleTrack.querySelector('.track-header').offsetHeight - 20;
      }
      
      if (multiTarget) {
        scrollToMulti = multiTarget.offsetTop - multiTrack.querySelector('.track-header').offsetHeight - 20;
      }
      
      // 同步滚动
      if (scrollToSingle !== null) {
        singleTrack.scrollTo({
          top: scrollToSingle,
          behavior: 'smooth'
        });
      }
      
      if (scrollToMulti !== null) {
        multiTrack.scrollTo({
          top: scrollToMulti,
          behavior: 'smooth'
        });
      }
      
      // 如果没有找到对应元素，尝试滚动到最近的年份
      if (scrollToSingle === null && scrollToMulti === null) {
        // 提取年份
        const yearMatch = targetId.match(/year-(\d+)/);
        if (yearMatch) {
          const year = yearMatch[1];
          const yearTargets = document.querySelectorAll('[id^="' + year + '-"]');
          
          yearTargets.forEach(el => {
            const track = el.closest('.track-single') || el.closest('.track-multi');
            if (track) {
              const header = track.querySelector('.track-header');
              const scrollPos = el.offsetTop - (header ? header.offsetHeight : 0) - 20;
              track.scrollTo({
                top: scrollPos,
                behavior: 'smooth'
              });
            }
          });
        }
      }
    });
  }

  // 初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimelineScroll);
  } else {
    initTimelineScroll();
  }
})();
