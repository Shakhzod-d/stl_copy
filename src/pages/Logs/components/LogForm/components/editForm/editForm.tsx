interface IEditFormProps {
  item: {
    _id: string;
    driver: string;
    mile: number;
    trailers: string;
    notes: string;
  };
}

export const EditForm = ({ item }: IEditFormProps) => {
  return <div>{JSON.stringify(item)}</div>;
};
