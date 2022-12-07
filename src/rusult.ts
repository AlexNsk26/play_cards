import { Playground } from './playground';
import { templateEngine } from './template-engine';
import Stopwatch from 'vanil-stopwatch-js';
//import { Template } from 'webpack';
export class Result {
    element: HTMLDivElement;
    subscribeFunc:Function[];
    gameResult:string;
    difLevelLocal!:Number
    static finalBoard (result:string, time:Time):Template{return {
        tag: 'div',
        cls: ['finalBoard'],
        content: [
            {
                tag: 'div',
                cls: 'resultPicDiv',
                content: {
                    tag: 'img',
                    attrs: {
                        src: `./img/frontCards/${
                            result === 'win' ? 'celebrate' : 'loose'
                        }.svg`,
                    },
                    cls: 'resultPic',
                },
            },
            {
                tag: 'h3',
                cls: 'resultText',
                content: result === 'win' ? 'Вы выиграли!' : 'Вы проиграли!',
            },
            {
                tag: 'h4',
                cls: 'ResultTimeText',
                content: 'Затраченное время:',
            },
            {
                tag: 'div',
                cls: 'resultTimeDiv',
                content: {
                    tag: 'h1',
                    cls: 'ResultTimeDigits',
                    content: `${time.min}.${time.sek}`,
                },
            },
            {
                tag: 'button',
                cls: ['difficultyLevelDivBtnStart', 'btnStartAgainResult'],
                content: 'Играть снова',
            },
        ],
    }}
    static TransparentBGC:Template
    constructor(element:HTMLDivElement) {
        if (!(element instanceof HTMLElement)) {
            throw new Error('передан не HTML элемент');
        }
        this.element = element;
        this.subscribeFunc = [];
        this.getPlayground = this.getPlayground.bind(this);
        this.checkResult = this.checkResult.bind(this);
        //this.stopGame = stopGame;
        this.gameResult = 'lose';
    }
    subscribe(func) {
        this.subscribeFunc.push(func);
    }
    checkResult(arrResult = [], curTime, stopGame = false) {
        const itemsResult = arrResult.length;
        switch (localStorage.getItem('DifficultyLevel')) {
            case '1':
                this.difLevelLocal = 3;
                break;
            case '2':
                this.difLevelLocal = 6;
                break;
            case '3':
                this.difLevelLocal = 9;
                break;
            default:
                break;
        }
        if (itemsResult === this.difLevelLocal) {
            stopGame = true;
            this.gameResult = 'win';
        }

        if (stopGame) {
            this.subscribeFunc[0]();
            this.element.append(templateEngine(Result.TransparentBGC));
            const divResultDashboard =
                this.element.querySelector('.appOpacity') as HTMLDivElement;
            divResultDashboard.append(
                templateEngine(Result.finalBoard(this.gameResult, curTime))
            );
            const btn = this.element.querySelector('.btnStartAgainResult') as HTMLButtonElement;
            btn.addEventListener('click', this.getPlayground);
        }
    }
    getPlayground(e) {
        this.element.innerHTML = '';
        const hidePlayground = new Playground(this.element, new Stopwatch());
        const result = new Result(this.element);
        hidePlayground.subscribe(result.checkResult);
        result.subscribe(hidePlayground.dropTimers);
    }
}
Result.TransparentBGC = {
    tag: 'div',
    cls: ['appOpacity'],
};
/* Result.finalBoard = (result, time) => {
    return {
        tag: 'div',
        cls: ['finalBoard'],
        content: [
            {
                tag: 'div',
                cls: 'resultPicDiv',
                content: {
                    tag: 'img',
                    attrs: {
                        src: `./img/frontCards/${
                            result === 'win' ? 'celebrate' : 'loose'
                        }.svg`,
                    },
                    cls: 'resultPic',
                },
            },
            {
                tag: 'h3',
                cls: 'resultText',
                content: result === 'win' ? 'Вы выиграли!' : 'Вы проиграли!',
            },
            {
                tag: 'h4',
                cls: 'ResultTimeText',
                content: 'Затраченное время:',
            },
            {
                tag: 'div',
                cls: 'resultTimeDiv',
                content: {
                    tag: 'h1',
                    cls: 'ResultTimeDigits',
                    content: `${time.min}.${time.sek}`,
                },
            },
            {
                tag: 'button',
                cls: ['difficultyLevelDivBtnStart', 'btnStartAgainResult'],
                content: 'Играть снова',
            },
        ],
    };
}; */
