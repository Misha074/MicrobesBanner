function makeElastic() {
  const bannerWrapper = document.getElementById('bannerWrapper');

  const elasticSize = (bannerWrapper.offsetHeight * 20) / 810 + 'px';
  document.documentElement.style.fontSize = elasticSize;
}

export {makeElastic};
