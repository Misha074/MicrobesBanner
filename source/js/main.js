import {mainAnimation} from './modules/mainAnimation';
import {makeElastic} from './modules/calcFontSize';


window.addEventListener('load', makeElastic);
window.addEventListener('resize', makeElastic);

mainAnimation();
