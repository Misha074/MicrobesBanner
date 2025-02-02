/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-console */
import { gsap } from 'gsap';

function mainAnimation() {
  const bacteriaElements = [
    document.getElementById('bacteria-1'),
    document.getElementById('bacteria-2'),
    document.getElementById('bacteria-3'),
    document.getElementById('bacteria-4'),
    document.getElementById('bacteria-5'),
    document.getElementById('bacteria-6'),
    document.getElementById('bacteria-7')
  ];

  bacteriaElements.forEach((bacteria, index) => {
    bacteria.addEventListener('click', () => clickByMicrobe(index + 1));
  });

  let clickedMicrobesCounter = 0;
  // По завершении анимации баннера будет проверка, если счётчик 7, то текст-успех, если не 7 то текст-неуспех

  const banner = document.getElementById('banner');

  const startButton = document.getElementById('startButton');
  const finalBanner = document.getElementById('finalBanner');
  const backgoundImage = document.getElementById('backgroundImage');

  const bannerStyle = window.getComputedStyle(banner);
  const backgoundImageStyle = window.getComputedStyle(backgoundImage);

  const bannerWidth = parseFloat(bannerStyle.width);
  const backgoundImageWidth = parseFloat(backgoundImageStyle.width);

  const distance = backgoundImageWidth - bannerWidth;

  // время движения баннера/длительности игры
  const TIME = 15;

  // параметры типовой анимации
  const basicAnimationParams = { opacity: 1, scale: 1, duration: 1 };

  // останавливаем анимации
  function killTweens(selector) {
    gsap.globalTimeline.getTweensOf(selector).forEach((tween) => tween.kill());
  }

  // анимация прыгающей бактерии
  function bacteriaJumpingAnimation(bacteria) {
    return gsap.timeline({ repeat: -1, yoyo: true })
      .to(bacteria, { y: '-=20%', duration: 2, ease: 'power1.inOut' }); // Подпрыгивание вверх и вниз
  }

  // анимация прыгающей кнопки
  function buttonJumpingAnimation(button) {
    return gsap.timeline({ repeat: -1 })
      .to(button, { y: '-10%', duration: 1, ease: "power1.out" })
      .to(button, { y: '0%', duration: 1, ease: "bounce.out" })
      .set(button, { y: '0%' }, '+=3'); // Пауза на 3 секунды чтобы было не слишком навязчиво
  }

  // анимация появления стартового баннера

  const showStartBanner = gsap.timeline({ paused: true });

  showStartBanner.to('#startGradient', { opacity: 1, duration: 3, delay: 1 })
    .to('#startBacteria-1', { y: '-10%', opacity: 1, scale: 1, duration: 1.5 })
    .call(() => bacteriaJumpingAnimation('#startBacteria-1'))
    .to('#startBacteria-2', { y: '-10%', opacity: 1, scale: 1, duration: 1.5, delay: -0.5 })
    .call(() => bacteriaJumpingAnimation('#startBacteria-2'))
    .to('#startBacteria-3', { y: '-10%', opacity: 1, scale: 1, duration: 1.5, delay: -0.5 })
    .call(() => bacteriaJumpingAnimation('#startBacteria-3'))
    .to('#startText', { y: '-10%', opacity: 1, duration: 2 })
    .call(() => buttonJumpingAnimation('#startButton'));


  // Вызываем анимацию при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => {
    showStartBanner.play();
  });

  // анимация треугольника на баннере с правилами
  const triangleAnimation = gsap.timeline({ paused: true, repeat: -1 });

  triangleAnimation.to('#rulesTriangle', { opacity: 1, duration: 0 })
    .to('#rulesTriangle', { x: '-100%', duration: 2 })
    .to('#rulesTriangle', { opacity: 0, duration: 0.5 })
    .set('#rulesTriangle', { x: '0%', opacity: 1 });

  // анимация показа основного игрового баннера и баннера с правилами игры
  const showRulesBanner = gsap.timeline({ paused: true });

  showRulesBanner.to('#startBanner', { opacity: 0, duration: 2 })
    .call(() => {
      gsap.set('#gameBanner', { display: 'block' });
      gsap.set('#rulesBanner', { display: 'block' });
    })
    .to('#gameBanner', { opacity: 1, duration: 2 })
    .to('#bacteria-1', { opacity: 1, duration: 2 })
    .to('#rulesBanner', { opacity: 1, duration: 2 })
    .call(() => {
      // запускаем анимацию треугольника
      triangleAnimation.play();
      gsap.set('#startBanner', { display: 'none' });
    });

  startButton.addEventListener('click', () => {
    // прерываем анимации, т.к. они нам больше не нужны
    ['#startBacteria-1', '#startBacteria-2', '#startBacteria-3', '#startButton'].forEach(killTweens);
    showRulesBanner.play();
  });

  function clickByMicrobe(index) {
    const tl1 = gsap.timeline();
    clickedMicrobesCounter += 1;

    tl1.to(`#foam-${index}`, { scale: 1, duration: 0.7 })
      .to(`#foam-${index}`, { opacity: 0, y: '50%', duration: 4 }, 0)
      .to([`#dirtGroup-${index}`, `#bacteria-${index}`], { opacity: 0, duration: 2 }, 0)
      .call(() => {
        gsap.set([`#dirtGroup-${index}`, `#bacteria-${index}`, `#foam-${index}`], { display: 'none' });
      });

    if (clickedMicrobesCounter === 1) {
      startGame();
    }

    if (clickedMicrobesCounter === 4) {
      showBacteria5.play();
    }

    if (clickedMicrobesCounter === 5) {
      showBacteria67.play();
    }
  }

  // Анимация "движения баннера"
  function startGame() {
    const tl1 = gsap.timeline({ defaults: { ease: 'none', duration: 1 } });
    const tl2 = gsap.timeline();

    // Скрываем баннер с правилами, показываем прогрессбар и пульверизатор
    tl1.to('#rulesBanner', { opacity: 0 })
      .call(() => {
        gsap.set('#rulesBanner', { display: 'none' });
        // ставим на паузу анимацию треугольника, она нам больше не нужна
        triangleAnimation.pause();
      })
      .to('#sprayer', { opacity: 1 })
      .to('#timer', { opacity: 1 });

    // Начало "движения" баннера

    // так три сразу
    // tl2.to(['#bacteria-2', '#bacteria-3', '#bacteria-4'], basicAnimationParams)
    //   .to('#gameBanner', { x: -distance, duration: TIME, delay: -1, ease: 'none', onComplete: showFinalBanner })
    //   .to('#timerLine', { x: '100%', duration: TIME }, 0);

    // так по очереди, как мне показалось красивее
    tl2.to('#bacteria-2', basicAnimationParams)
      .to('#bacteria-3', basicAnimationParams)
      .to('#bacteria-4', basicAnimationParams)
      .to('#gameBanner', { x: -distance, duration: TIME, delay: 3, ease: 'none', onComplete: showFinalBanner}, 0)
      .to('#timerLine', { x: '100%', duration: TIME, delay: 3 }, 0);
    tl1.add(tl2, '+=0');
  }

  // Показ бактерии 5
  const showBacteria5 = gsap.timeline({ paused: true });
  showBacteria5.to('#bacteria-5', basicAnimationParams);

  // Показ бактерии 6 и 7
  const showBacteria67 = gsap.timeline({ paused: true });

  // знаю, что можно вот так через массив элементов, но хочу именно по очереди
  // showBacteria672.to(['#bacteria-6', '#bacteria-7'], basicAnimationParams);
  showBacteria67.to('#bacteria-6', basicAnimationParams)
    .to('#bacteria-7', basicAnimationParams);

  function showFinalBanner() {
    const tl1 = gsap.timeline({ defaults: { duration: 1 } });

    tl1.to('#gameBanner', { opacity: 0 })
      .to(['#sprayer', '#timer'], { opacity: 0 }, 0)
      .set('#finalBanner', { display: 'block' })
      .to('#finalBanner', { opacity: 1 })
      .to('#sprayer-2', { opacity: 1 })
      .to('#finalText', { opacity: 1, duration: 2 })
      .to('#foamTop', { y: '0%', duration: 4 })
      .set(['#gameBanner', '#sprayer', '#timer'], { display: 'none' })
      .call(() => buttonJumpingAnimation('#finalButton'));

    if (clickedMicrobesCounter === 7) {
      finalBanner.classList.add('final-banner--success');
    }
  }
}

export { mainAnimation };
