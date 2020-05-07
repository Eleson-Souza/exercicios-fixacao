var arrayBorders = ['0', '0', '0', '0'];
function formatarDiv(local, input) {
    const div = document.getElementById('div-border-radius').style;
    switch(local) {
        case 'sup-esq':
            arrayBorders[0] = input.value;
            break;
        case 'sup-dir':
            arrayBorders[1] = input.value;
            break;
        case 'inf-esq':
            arrayBorders[2] = input.value;
            break;
        case 'inf-dir':
            arrayBorders[3] = input.value;
            break;
    }

    var strBorder = '';
    arrayBorders.forEach(value => {
        strBorder = `${strBorder} ${value}px`;
    });

    console.log(strBorder);
    div.borderRadius = strBorder;
}