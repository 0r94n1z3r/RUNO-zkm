export const beautifyNumber = (num, options = {}) => {
    let symb = '';

    let isOverflow = num >= 1000;

    if(num >= 1000000000){
        num = divideAndRoundToOne(num, 1000000000)
        symb = 'b'
    }else if(num >= 1000000){
        num = divideAndRoundToOne(num, 1000000)
        symb = 'm'
    }else if(num >= 1000){
        num = divideAndRoundToOne(num, 1000)
        symb = 'k'
    }

    let str = `${num}${symb?' '+symb:''}`;

    let res = {
        num, 
        symb, 
        str, 
        isOverflow 
    };

    if(options.forEnding){
        res.forEnding = isOverflow?0:num;
    }

    return res;
}

const divideAndRoundToOne = (num, sub) => {
    return +(Math.floor((num/sub)*10)/10).toFixed(1)
}

export const splitNumber = (num, split = " ") => num?.toString().replace(/\B(?=(?:\d{3})+\b)/g, split)

export const pricifyNumber = (num) => {
    let roundedNum = Math.ceil(Number(num));
    let splitNum = splitNumber(roundedNum);
    return splitNum;
}