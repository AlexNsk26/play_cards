class DifficultyLevel {
    constructor(element) {
        if (!(element instanceof HTMLElement)) {
            throw new Error('передан не HTML элемент');
        }
        this.element = element;
        this.render();
        this.btn = this.element.querySelector('.DifficultyLevel_div_btnStart');
        this.divValue = this.element.querySelector('.DifficultyLevel_div_divItems');
        this.onClickBtn = this.onClickBtn.bind(this);
        this.btn.addEventListener('click', this.onClickBtn);
        this.onClickValue = this.onClickValue.bind(this);
        this.divValue.addEventListener('click', this.onClickValue);
    }

    render() {
        this.element.appendChild(templateEngine(DifficultyLevel.template));
    }
    onClickBtn() {
        console.log('Кнопка старт');
    }
    onClickValue() {
        console.log('выбор уровня сложности');
    }
}
DifficultyLevel.template = {
    tag: 'div',
    cls: 'DifficultyLevel_div',
    content: [{
        tag: 'div',
        cls: 'DifficultyLevel_div_fortext',
        content: [{
            tag: 'h3',
            cls: 'DifficultyLevel_div_h3text',
            content: 'Выбери сложность'
        }]
    },
    {
        tag: 'div',
        cls: 'DifficultyLevel_div_divItems',
        content: [{
            tag: 'div',
            cls: 'DifficultyLevel_div_divItem',
            content: [
                {
                    tag: 'h3',
                    cls: 'DifficultyLevel_div_h3value',
                    content: '1'
                }
            ]
        },
        {
            tag: 'div',
            cls: 'DifficultyLevel_div_divItem',
            content: [
                {
                    tag: 'h3',
                    cls: 'DifficultyLevel_div_h3value',
                    content: '2'
                }
            ]
        },
        {
            tag: 'div',
            cls: 'DifficultyLevel_div_divItem',
            content: [
                {
                    tag: 'h3',
                    cls: 'DifficultyLevel_div_h3value',
                    content: '3'
                }
            ]
        }
        ]
    },

    {
        tag: 'button',
        cls: 'DifficultyLevel_div_btnStart',
        content: 'Старт!'
    }
    ]
}