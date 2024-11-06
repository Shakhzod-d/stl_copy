import { CustomTable } from "@/track/components/shared";
import { DeleteFilled } from "@ant-design/icons";

const header = [
  {
    header: "NO",
    accessor: "no",
    id: 1,
  },
  {
    header: "",
    accessor: "noo",
    id: 2,
  },
  {
    header: "Title",
    accessor: "title",
    id: 2,
  },
  {
    header: "Key",
    accessor: "key",
    id: 3,
  },
  {
    header: "Created At",
    accessor: "created",
    id: 4,
  },
  {
    header: "",
    accessor: "action",
    id: 5,
  },
];
const DeleteIcon = () => (
  <img loading="lazy" src="/assets/icons/trash.svg" alt=""style={{fill:"red"}}/>
);
export const data = [
  {
    no: "1",
    title: "gohighway",
    key: "pxof0bxm5pjma9o786v1kh8e9qpotftteldhclv67glhsvgn5053nv3ptzvnc9qn0tteld",
    created: "02-08-2024 04:33:05 pm",
    action: <DeleteIcon />,
  },
  {
    no: "2",
    title: "gohighway",
    key: "pxof0bxm5pjma9o786v1kh8e9qpotftteldhclv67glhsvgn5053nv3ptzvnc9qn0tteld",
    created: "02-08-2024 04:33:05 pm",
    action: <DeleteIcon />,
  },
];

export const ApiKeys = () => {
  return (
    <div>
      <CustomTable columns={header} data={data} copyId={3} />
    </div>
  );
};
