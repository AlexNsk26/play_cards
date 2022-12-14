import { templateEngine } from './template-engine';
import { Result } from './rusult';
import Stopwatch from 'vanil-stopwatch-js';
//import { Template } from 'webpack';
export class Playground {
    element: HTMLDivElement;
    timerId: NodeJS.Timeout[];
    idTimerInt: NodeJS.Timer[];
    deckСardsRandom: Set<string>;
    result: object[];
    timer: Stopwatch;
    currentTime: Time;
    preResult: CardResult;
    suits: string[];
    ranges: string[];
    subscribeFunc: Function[];
    static mainTemplate: Template;
    static backCard(i: Number): Template {
        return {
            tag: 'div',
            cls: 'whiteBGRCard',
            content: {
                tag: 'div',
                attrs: { 'data-index': i },
                cls: ['card', 'backCard', 'cardBackColor'],
            },
        };
    }
    static frontCard(bgiURL: String): Template {
        return {
            tag: 'div',
            cls: 'whiteBGRCard',
            attrs: {
                style: `background-image:url('./img/frontCards/${bgiURL}.svg')`,
                'data-valueCard': bgiURL,
            },
        };
    }
    btn: HTMLButtonElement;
    timerMin: HTMLElement;
    timerSek: HTMLElement;
    playgroundCardsCol: HTMLDivElement;
    constructor(element: HTMLDivElement, timer: Stopwatch) {
        if (!(element instanceof HTMLElement)) {
            throw new Error('передан не HTML элемент');
        }
        this.element = element;
        this.timer = timer;
        this.timerId = [];
        this.idTimerInt = [];
        this.deckСardsRandom = new Set();
        this.result = [];
        this.currentTime = {}; // min: '', sek: ''
        this.preResult = { fistCard: '', secondCard: '' };
        this.suits = ['1', '2', '3', '4'];
        this.ranges = ['14', '13', '12', '11', '10', '9', '8', '7', '6'];
        /* this.onClickValue = this.onClickValue.bind(this);
        this.onMouseenter = this.onMouseenter.bind(this);*/
        this.dropTimers = this.dropTimers.bind(this);
        this.getPlayground = this.getPlayground.bind(this);
        this.dropTimers();
        this.clickBackCard = this.clickBackCard.bind(this);
        this.renderMainGround();
        this.btn = this.element.querySelector(
            '.startAgainBtn'
        ) as HTMLButtonElement;
        this.btn.addEventListener('click', this.getPlayground);
        this.timerMin = this.element.querySelector(
            '.valueTimerMin'
        ) as HTMLElement;
        this.timerSek = this.element.querySelector(
            '.valueTimerSek'
        ) as HTMLElement;
        this.playgroundCardsCol = this.element.querySelector(
            '.playgroundCardsCollection'
        ) as HTMLDivElement;
        this.playgroundCardsCol.addEventListener('click', this.clickBackCard);
        this.renderFrontGroundCards();
        this.subscribeFunc = [];
    }
    getPlayground(e: Event) {
        const hidePlayground = new Playground(this.element, new Stopwatch());
        const result = new Result(this.element);
        hidePlayground.subscribe(result.checkResult);
        result.subscribe(hidePlayground.dropTimers);
    }
    renderMainGround() {
        this.element.innerHTML = '';
        this.element.appendChild(templateEngine(Playground.mainTemplate));
        const difLevel = Number(localStorage.getItem('DifficultyLevel'));
    }
    dropTimers() {
        this.timerId.forEach(clearTimeout);
        this.idTimerInt.forEach(clearInterval);
        this.timer.stop();
    }
    renderBackGroundCards() {
        this.playgroundCardsCol.innerHTML = '';
        for (let index = 1; index < 37; index++) {
            this.playgroundCardsCol.appendChild(
                templateEngine(Playground.backCard(index))
            );
        }
        this.startTimer();
    }
    subscribe(func: Function) {
        this.subscribeFunc.push(func);
    }
    clickBackCard(e: Event) {
        const target = e.target as HTMLElement;
        const indexCard = target.dataset.index as string;
        const volumeCard: string = Array.from(this.deckСardsRandom.values())[
            Number(indexCard) - 1
        ]; //[...this.deckСardsRandom]
        const localCurTime = this.convertTime(this.currentTime);
        const rangeValueCardChange = volumeCard.slice(1);
        if (!this.preResult.fistCard && !this.preResult.secondCard) {
            this.preResult.fistCard = rangeValueCardChange;
            target.className = 'whiteBGRCard';
            target.style.backgroundImage = `url(./img/frontCards/${volumeCard}.svg)`;
        } else if (this.preResult.fistCard && !this.preResult.secondCard) {
            this.preResult.secondCard = rangeValueCardChange;
            if (this.preResult.fistCard === this.preResult.secondCard) {
                this.result.push(this.preResult);
                target.className = 'whiteBGRCard';
                target.style.backgroundImage = `url(./img/frontCards/${volumeCard}.svg)`;
                this.preResult = {};
                this.subscribeFunc[0](this.result, localCurTime);
            } else {
                this.subscribeFunc[0](this.result, localCurTime, true);
            }
        }
    }
    convertTime(timeObj: Time) {
        for (const keyTime in timeObj) {
            const arrTime = String(timeObj[keyTime]).split('');
            if (arrTime.length === 1) {
                arrTime.unshift('0');
                const stringTime = arrTime.join('');
                timeObj[keyTime] = stringTime;
            }
        }
        return timeObj;
    }
    startTimer() {
        this.timer.start();
        this.idTimerInt.push(setInterval(this.changeTime.bind(this), 10));
    }
    changeTime() {
        const currMin = Math.trunc(this.timer.elapsedTime.minutes);
        const currSek =
            Math.trunc(this.timer.elapsedTime.seconds) - currMin * 60;
        this.currentTime.min = String(currMin);
        this.currentTime.sek = String(currSek);
        if (currMin === 5) {
            this.subscribeFunc[0](
                this.result,
                this.convertTime(this.currentTime),
                true
            );
        } // stop by timeout

        if (!(Number(this.timerMin.textContent) === currMin)) {
            this.timerMin.textContent =
                currMin < 10 ? '0' + String(currMin) : String(currMin);
        }
        if (!(Number(this.timerSek.textContent) === currSek)) {
            this.timerSek.textContent =
                currSek < 10 ? '0' + String(currSek) : String(currSek);
        }
    }
    compilePack(suits: string[], ranges: string[]): string[] {
        let deckСards: string[] = new Array();
        suits.forEach((suit) => {
            ranges.forEach((range) => {
                deckСards.push(suit.concat(String(range)));
            });
        });
        return deckСards;
    }

    renderFrontGroundCards() {
        const deckСards = this.compilePack(this.suits, this.ranges);
        this.deckСardsRandom = this.randomaizer(deckСards);
        this.deckСardsRandom.forEach((rndCard) => {
            this.playgroundCardsCol.appendChild(
                templateEngine(Playground.frontCard(rndCard))
            );
        });

        this.timerId.push(
            setTimeout(this.renderBackGroundCards.bind(this), 5000)
        );
    }
    randomaizer(arrIn: string[]): Set<string> {
        let rndArrIn: Set<string> = new Set();
        do {
            const rndCard: string = arrIn[Math.round(Math.random() * 35)];
            rndArrIn.add(rndCard);
        } while (rndArrIn.size < 36);
        return rndArrIn;
    }
}

Playground.mainTemplate = {
    tag: 'div',
    cls: 'playgroundCards',
    content: [
        {
            tag: 'div',
            cls: 'controlMenu',
            content: [
                {
                    tag: 'div',
                    cls: 'timer',
                    content: [
                        {
                            tag: 'div',
                            cls: 'timerMin',
                            content: [
                                {
                                    tag: 'p',
                                    cls: 'labelTimerDim',
                                    content: 'min',
                                },
                                {
                                    tag: 'p',
                                    cls: ['valueTimer', 'valueTimerMin'],
                                    content: '00',
                                },
                            ],
                        },
                        {
                            tag: 'div',
                            cls: 'timerMin',
                            content: {
                                tag: 'p',
                                cls: 'valueTimer',
                                content: '.',
                            },
                        },
                        {
                            tag: 'div',
                            cls: 'timerMin',
                            content: [
                                {
                                    tag: 'p',
                                    cls: 'labelTimerDim',
                                    content: 'sek',
                                },
                                {
                                    tag: 'p',
                                    cls: ['valueTimer', 'valueTimerSek'],
                                    content: '00',
                                },
                            ],
                        },
                    ],
                },
                {
                    tag: 'button',
                    cls: 'startAgainBtn',
                    content: 'Начать заново',
                },
            ],
        },
        {
            tag: 'div',
            cls: 'playgroundCardsCollection',
        },
    ],
};
/* Playground.backCard = (i) => {
    return {
        tag: 'div',
        cls: 'whiteBGRCard',
        content: {
            tag: 'div',
            attrs: { 'data-index': i },
            cls: ['card', 'backCard', 'cardBackColor'],
        },
    };
};
Playground.frontCard = (bgiURL) => {
    return {
        tag: 'div',
        cls: 'whiteBGRCard',
        attrs: {
            style: `background-image:url('./img/frontCards/${bgiURL}.svg')`,
            'data-valueCard': bgiURL,
        },
    };
}; */
