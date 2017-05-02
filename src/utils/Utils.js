export function getNumberWithCommas(number, returnFloat) {
  if (number === ''){
    return "";
  }
  let result = number;
  try {
    if (number.indexOf(',') == -1) {
      number = parseFloat(number).toString();
      number = parseFloat(Math.round(number * 100) / 100).toFixed(2);
      let numberArr = number.split('.');
      if (numberArr[1] && returnFloat) {
        result = numberArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          result = result + "." + numberArr[1].toString();
      }
      else {
        result = numberArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
  } catch (error) {
    result = number;
  }
  return result;
}


export function getNumberWithCommas2(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getStringForFetch(data) {
    let result = "";
    for (let [key, value] of entries(data)) {
        result += key + "=" + value + "&";
    }

    return result.substring(0, result.length - 1);
}

function* entries(obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

export const makeCancelable = (promise) => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((val) =>
            hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
        );
        promise.catch((error) =>
            hasCanceled_ ? reject({isCanceled: true}) : reject(error)
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
};

export function isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
