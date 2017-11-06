import { Calculator } from "./Calculator";

class DecCalculator extends Calculator {
    constructor(settings) {
        super(settings);
    }

    changeNumber(root) {
        let activeElement = root.find('span.active');
        activeElement.attr('contenteditable', true).empty();
        root.children(":first-child").trigger('focus');
    }

    add(numberX, numberY) {
        let result = [0,0,0,0,0,0,0,0,0];
        for(let i = numberX.length - 1; i >= 0  ; i--) {
            let carryBit =  numberX[i] + numberY[i] + result[i];
            if( carryBit  === 10) {
                result[i] = 0;
                result[i-1] = 1;
            } else if (carryBit >= 10 ){
                result[i] = numberX[i] + numberY[i] - 10;
                result[i-1] = 1;
            } else {
                result[i] = carryBit;
            }
        }
        return result;
    }

    initEvents(){
        this.$calculatorDOMElement.find(".display-number").on('click', (event) => {
            const parentLabel = $(event.target).parent(".display-number");
            const hintAdd = $('.tooltip').slideDown(500);
            this.changeNumber(parentLabel);
        })
        this.$calculatorDOMElement.find(".operator-bar").find("span").on('click', () => {
            $(event.target).next().slideUp(500);
            this.checkNumber();
            this.updateResult();
        })
    }
    updateResult() {
        let root =  this.$calculatorDOMElement;
        let $resultNumber = root.children(".group-number").children(".result-bit");
        for(let i =  this.resultNumberArray.length - 1, j = 0; i >= 0 ; i--, j++) {
            $resultNumber.eq(j).find(".active").text(this.resultNumberArray[i]);
        }
    }
}

export { DecCalculator };