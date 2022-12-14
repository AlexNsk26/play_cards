/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */
import { Playground } from '../src/playground';
const Stopwatch = require('../node_modules/vanil-stopwatch-js/build/vanil-stopwatch');
const sw = new Stopwatch(false);
const appElem = document.createElement('div');
const playground = new Playground(appElem, sw);
describe('test some functions class Playground', () => {
    test('should check convert Time', () => {
        const convertTimeReturn = playground.convertTime({
            min: '1',
            sek: '5',
        });
        expect(convertTimeReturn.min).toBe('01');
        expect(convertTimeReturn.sek).toBe('05');
    });

    test('should random card array', () => {
        const suits = ['1', '2', '3', '4'];
        const ranges = ['14', '13', '12', '11', '10', '9', '8', '7', '6'];
        const deckСards: string[] = playground.compilePack(suits, ranges);
        expect(deckСards).toHaveLength(36);
        const RandomPack = playground.randomaizer(deckСards);
        const RandomPackArr = Array.from(RandomPack);
        expect(RandomPack.size).toBe(36);
        expect(deckСards).not.toEqual(RandomPackArr);
    });
});
