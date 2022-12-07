import '../style.css';
import { DifficultyLevel } from './dif_level';
import { Playground } from './playground';
import Stopwatch from 'vanil-stopwatch-js';
import { Result } from './rusult';
/* eslint-disable prettier/prettier */
const app = document.querySelector('.app') as HTMLDivElement;
const difLevel = new DifficultyLevel(app);

// Initialize an instance.
const sw = new Stopwatch();
let hidePlayground;
let result;
app.addEventListener('click', getPlayground);
function getPlayground(e) {
    if (e.target.classList.contains('difficultyLevelDivBtnStart')) {
        hidePlayground = new Playground(app, sw);
        result = new Result(app);
        hidePlayground.subscribe(result.checkResult);
        result.subscribe(hidePlayground.dropTimers);
    }
}
