export const localTableFilter = (
     items: any,
     search: string,
     filterData = "driver"
) =>
     items.filter((item: any) =>
          search.toLowerCase() === ""
               ? item
               : item?.[filterData].toLowerCase().includes(search)
     );
