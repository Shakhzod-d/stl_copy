export const deepEquals = (x: any, y: any) => {
     if (x === y) {
          return true;
     } else if (
          typeof x == "object" &&
          x != null &&
          typeof y == "object" &&
          y != null
     ) {
          if (Object.keys(x).length !== Object.keys(y).length) return false;

          for (let prop in x) {
               if (y.hasOwnProperty(prop)) {
                    if (!deepEquals(x[prop], y[prop])) return false;
               } else return false;
          }

          return true;
     } else return false;
};

