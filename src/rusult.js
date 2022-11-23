import { Playground } from './playground';
export class Result {
    constructor() {
        /*         if (!(element instanceof HTMLElement)) {
            throw new Error('передан не HTML элемент');
        }
        this.element = element; */
        this.subscribeFunc = [];
        this.checkResult = this.checkResult.bind(this);
        //this.stopGame = stopGame;
        this.gameResult = 'lose';
    }
    subscribe(func) {
        this.subscribeFunc.push(func);
    }
    checkResult(arrResult, curTime, stopGame = false) {
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
            if ((this.gameResult === 'win')) {
                alert('Вы выиграли!');
            } else if ((this.gameResult === 'lose')) {
                alert('Вы проиграли!');
            }
        }
    }
}
