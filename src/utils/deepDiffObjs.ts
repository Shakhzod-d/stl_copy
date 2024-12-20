// const result = deepDiffMapper().map(
//      {
//           name: "kok",
//           age: 12,
//           hi: 'oko'
//      },
//      {
//           name: "ok",
//           age: 32
//      }
// );
/**
 *
 * @returns difference between two objects, here is example
 * @return_example :
 * {
 *   name: { type: 'updated', data: 'kok' },
 *   age: { type: 'unchanged', data: 12 },
 *   hi: { type: 'deleted', data: 'oko' }
 * }
 */

/**
 *
 * {
 *    [key: string]:{
 *      "type":"updated" | "unchanged" | deleted,
 *      "data": /data_of_current_date/
 *    }"
 * }
 */
const deepDiffObjs = (): any => {
     return {
          VALUE_CREATED: "created",
          VALUE_UPDATED: "updated",
          VALUE_DELETED: "deleted",
          VALUE_UNCHANGED: "unchanged",
          map: function (obj1: any, obj2: any) {
               if (this.isFunction(obj1) || this.isFunction(obj2)) {
                    throw "Invalid argument. Function given, object expected.";
               }
               if (this.isValue(obj1) || this.isValue(obj2)) {
                    return {
                         type: this.compareValues(obj1, obj2),
                         data: obj1 === undefined ? obj2 : obj1,
                    };
               }

               const diff: { [key: string]: any } = {};
               for (const key in obj1) {
                    if (this.isFunction(obj1[key])) {
                         continue;
                    }

                    let value2 = undefined;
                    if (obj2[key] !== undefined) {
                         value2 = obj2[key];
                    }

                    diff[key] = this.map(obj1[key], value2);
               }
               for (const key in obj2) {
                    if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
                         continue;
                    }

                    diff[key] = this.map(undefined, obj2[key]);
               }

               return diff;
          },
          compareValues: function (value1: any, value2: any) {
               if (value1 === value2) {
                    return this.VALUE_UNCHANGED;
               }
               if (
                    this.isDate(value1) &&
                    this.isDate(value2) &&
                    value1.getTime() === value2.getTime()
               ) {
                    return this.VALUE_UNCHANGED;
               }
               if (value1 === undefined) {
                    return this.VALUE_CREATED;
               }
               if (value2 === undefined) {
                    return this.VALUE_DELETED;
               }
               return this.VALUE_UPDATED;
          },
          isFunction: function (x: any) {
               return Object.prototype.toString.call(x) === "[object Function]";
          },
          isArray: function (x: any) {
               return Object.prototype.toString.call(x) === "[object Array]";
          },
          isDate: function (x: any) {
               return Object.prototype.toString.call(x) === "[object Date]";
          },
          isObject: function (x: any) {
               return Object.prototype.toString.call(x) === "[object Object]";
          },
          isValue: function (x: any) {
               return !this.isObject(x) && !this.isArray(x);
          },
     };
};

export default deepDiffObjs;
