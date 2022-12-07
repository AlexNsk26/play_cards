import { templateEngine } from './template-engine';
import { Result } from './rusult';
export class Playground {
    constructor(element, timer) {
        if (!(element instanceof HTMLElement)) {
            throw new Error('передан не HTML элемент');
        }
        this.element = element;
        this.timer = timer;
        this.timerId = [];
        this.idTimerInt = [];
        this.deckСardsRandom = [];
        this.result = [];
        this.currentTime = { min: '', sek: '' };
        this.preResult = { fistCard: '', secondCard: '' };
        this.suits = ['1', '2', '3', '4'];
        this.ranges = ['14', '13', '12', '11', '10', '9', '8', '7', '6'];
        /* this.onClickValue = this.onClickValue.bind(this);
        this.onMouseenter = this.onMouseenter.bind(this);*/
        this.dropTimers = this.dropTimers.bind(this);
        this.clickBackCard = this.clickBackCard.bind(this);
        this.renderMainGround();
        this.btn = this.element.querySelector('.startAgainBtn');
        this.timerMin = this.element.querySelector('.valueTimerMin');
        this.timerSek = this.element.querySelector('.valueTimerSek');
        this.playgroundCardsCol = this.element.querySelector(
            '.playgroundCardsCollection'
        );
        this.playgroundCardsCol.addEventListener('click', this.clickBackCard);
        this.renderFrontGroundCards();
        this.subscribeFunc = [];
    }
    renderMainGround() {
        this.element.innerHTML = '';
        this.element.appendChild(templateEngine(Playground.mainTemplate));
        const difLevel = Number(localStorage.getItem('DifficultyLevel'));
        //let arrBackCardsTemplate = [];
    }
    dropTimers() {
        this.timerId.forEach(clearTimeout);
        this.idTimerInt.forEach(clearInterval);
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
    subscribe(func) {
        this.subscribeFunc.push(func);
    }
    clickBackCard(e) {
        const target = e.target;
        const indexCard = target.dataset.index;
        const volumeCard = [...this.deckСardsRandom][Number(indexCard) - 1];

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
                this.subscribeFunc[0](this.result, this.currentTime);
            } else {
                this.subscribeFunc[0](this.result, this.currentTime, true);
            }
        }
    }

    startTimer() {
        this.timer.start();
        this.idTimerInt.push(setInterval(this.changeTime.bind(this), 10));
    }
    changeTime() {
        const currMin = Math.trunc(this.timer.elapsedTime.minutes);
        const currSek =
            Math.trunc(this.timer.elapsedTime.seconds) - currMin * 60;
        this.currentTime.min = currMin;
        this.currentTime.sek = currSek;
        if (
            !(
                Number(this.timerMin.textContent) ===
                Math.trunc(this.timer.elapsedTime.minutes)
            )
        ) {
            this.timerMin.textContent =
                currMin < 10 ? '0' + String(currMin) : String(currMin);
        }
        if (
            !(
                Number(this.timerSek.textContent) ===
                Math.trunc(this.timer.elapsedTime.seconds)
            )
        ) {
            this.timerSek.textContent =
                currSek < 10 ? '0' + String(currSek) : String(currSek);
        }
    }
    renderFrontGroundCards() {
        let deckСards = [];
        this.suits.forEach((suit) => {
            this.ranges.forEach((range) => {
                deckСards.push(suit + range);
            });
        });
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
    randomaizer(arrIn) {
        let rndArrIn = new Set();
        do {
            const rndCard = arrIn[Math.round(Math.random() * 35)];
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
Playground.backCard = (i) => {
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
};
