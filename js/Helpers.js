export const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const randFloat = (min, max) => {
    return Math.random() * (max - min) + min;
}

export const dist = (x1, y1, x2, y2) => {
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.floor( Math.sqrt( a*a + b*b ) );
}

export const map = (val, start1, stop1, start2, stop2) => {
    return ((val-start1)/(stop1-start1))*(stop2-start2)+start2;
}

export const cloneObj = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

export const rmObjFromArr = (arr, key, val) => {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][key] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

export const round = (n, decimals) => {
    return +(n).toFixed(decimals);
}

export const ease = {
    linear: t => t,
    easeInQuad: t => t*t,
    easeOutQuad: t => t*(2-t),
    easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
    easeInCubic: t => t*t*t,
    easeOutCubic: t => (--t)*t*t+1,
    easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
    easeInQuart: t => t*t*t*t,
    easeOutQuart: t => 1-(--t)*t*t*t,
    easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
    easeInQuint: t => t*t*t*t*t,
    easeOutQuint: t => 1+(--t)*t*t*t*t,
    easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
};

export const pad = (n, width, z) => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}