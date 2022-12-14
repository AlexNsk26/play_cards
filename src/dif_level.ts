import { templateEngine } from './template-engine';
export class DifficultyLevel {
    element: HTMLDivElement;
    divValue: HTMLDivElement;
    static template: Template;
    static templateItems: Template[];

    //type ObjectTemplate = (template:unknown) => Object;
    constructor(element: HTMLDivElement) {
        if (!(element instanceof HTMLElement)) {
            throw new Error('передан не HTML элемент');
        }
        this.element = element;
        this.onClickValue = this.onClickValue.bind(this);
        this.onMouseenter = this.onMouseenter.bind(this);
        this.onMouseleave = this.onMouseleave.bind(this);
        this.renderItems = this.renderItems.bind(this);
        //this.onClickBtn = this.onClickBtn.bind(this);
        this.render();
        //this.btn = this.element.querySelector('.difficultyLevelDivBtnStart');
        this.divValue = this.element.querySelector(
            '.DifficultyLevel_div_divItems'
        ) as HTMLDivElement;

        this.addListenerHover();

        //this.btn.addEventListener('click', this.onClickBtn);

        this.divValue.addEventListener('click', this.onClickValue);
        this.divValue.addEventListener('mouseleave', this.renderItems);
    }

    render() {
        this.element.innerHTML = '';
        this.element.appendChild(templateEngine(DifficultyLevel.template));
        const difLevel = Number(localStorage.getItem('DifficultyLevel'));
        this.checkItemValue(difLevel);
    }
    renderItems() {
        this.divValue.innerHTML = '';
        this.divValue.appendChild(
            templateEngine(DifficultyLevel.templateItems)
        );
        const difLevel = Number(localStorage.getItem('DifficultyLevel'));
        this.checkItemValue(difLevel);
    }
    checkItemValue(level: Number) {
        if (level > 0) {
            const findChangeItem = document.querySelectorAll(
                '.DifficultyLevel_div_divItem'
            );
            for (let item = 0; item < findChangeItem.length; item++) {
                const element = findChangeItem[item];
                if (element.textContent === String(level)) {
                    element.classList.add('DifficultyLevel_div_divItem_hover');
                    const childNode = element.firstChild as HTMLElement;
                    childNode.classList.add(
                        'DifficultyLevel_div_h3value_hover'
                    );
                }
            }
        }
    }
    addListenerHover() {
        const childrenDivItems = this.divValue.children;
        for (let item = 0; item < childrenDivItems.length; item++) {
            childrenDivItems[item].addEventListener(
                'mouseenter',
                this.onMouseenter
            );
            childrenDivItems[item].addEventListener(
                'mouseleave',
                this.onMouseleave
            );
        }
    }
    addListenerHoverClick(idItem: String) {
        const childrenDivItems = this.divValue.children;
        for (let item = 0; item < childrenDivItems.length; item++) {
            childrenDivItems[item].addEventListener(
                'mouseenter',
                this.onMouseenter
            );
            if (idItem !== childrenDivItems[item].textContent) {
                childrenDivItems[item].addEventListener(
                    'mouseleave',
                    this.onMouseleave
                );
            }
        }
    }

    onClickValue(e: Event) {
        localStorage.setItem(
            'DifficultyLevel',
            (e.target as HTMLElement).textContent as string
        );
        this.renderItems();
        this.addListenerHoverClick(
            (e.target as HTMLElement).textContent as string
        );
    }
    onMouseenter(e: Event) {
        const findChangeItem = this.divValue.querySelector(
            '.DifficultyLevel_div_divItem_hover'
        );
        if (findChangeItem) {
            findChangeItem.classList.remove(
                'DifficultyLevel_div_divItem_hover'
            );
            const childNode = findChangeItem.firstChild as HTMLElement;
            childNode.classList.remove('DifficultyLevel_div_h3value_hover');
        }
        (e.target as HTMLElement).classList.add(
            'DifficultyLevel_div_divItem_hover'
        );
        ((e.target as HTMLElement).firstChild as HTMLElement).classList.add(
            'DifficultyLevel_div_h3value_hover'
        );
    }

    onMouseleave(e: Event) {
        (e.target as HTMLElement).classList.remove(
            'DifficultyLevel_div_divItem_hover'
        );
        ((e.target as HTMLElement).firstChild as HTMLElement).classList.remove(
            'DifficultyLevel_div_h3value_hover'
        );
    }
}

DifficultyLevel.template = {
    tag: 'div',
    cls: 'playgroundCards',
    content: {
        tag: 'div',
        cls: 'DifficultyLevel_div',
        content: [
            {
                tag: 'div',
                cls: 'DifficultyLevel_div_fortext',
                content: [
                    {
                        tag: 'h3',
                        cls: 'DifficultyLevel_div_h3text',
                        content: 'Выбери сложность',
                    },
                ],
            },
            {
                tag: 'div',
                cls: 'DifficultyLevel_div_divItems',
                content: [
                    {
                        tag: 'div',
                        cls: 'DifficultyLevel_div_divItem',
                        content: [
                            {
                                tag: 'h3',
                                cls: 'DifficultyLevel_div_h3value',
                                content: '1',
                            },
                        ],
                    },
                    {
                        tag: 'div',
                        cls: 'DifficultyLevel_div_divItem',
                        content: [
                            {
                                tag: 'h3',
                                cls: 'DifficultyLevel_div_h3value',
                                content: '2',
                            },
                        ],
                    },
                    {
                        tag: 'div',
                        cls: 'DifficultyLevel_div_divItem',
                        content: [
                            {
                                tag: 'h3',
                                cls: 'DifficultyLevel_div_h3value',
                                content: '3',
                            },
                        ],
                    },
                ],
            },

            {
                tag: 'button',
                cls: 'difficultyLevelDivBtnStart',
                content: 'Старт!',
            },
        ],
    },
};
DifficultyLevel.templateItems = [
    {
        tag: 'div',
        cls: 'DifficultyLevel_div_divItem',
        content: [
            {
                tag: 'h3',
                cls: 'DifficultyLevel_div_h3value',
                content: '1',
            },
        ],
    },
    {
        tag: 'div',
        cls: 'DifficultyLevel_div_divItem',
        content: [
            {
                tag: 'h3',
                cls: 'DifficultyLevel_div_h3value',
                content: '2',
            },
        ],
    },
    {
        tag: 'div',
        cls: 'DifficultyLevel_div_divItem',
        content: [
            {
                tag: 'h3',
                cls: 'DifficultyLevel_div_h3value',
                content: '3',
            },
        ],
    },
];
