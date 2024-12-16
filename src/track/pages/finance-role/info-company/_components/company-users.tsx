import { InfoTable } from "@/track/components/shared";
export const TableHeader = [
  { header: "Name", accessor: "name" },
  { header: "Updated", accessor: "updated" },
  { header: "Status", accessor: "status" },

  { header: "", accessor: "role" },
  { header: "", accessor: "edit" },
  { header: "", accessor: "edit" },
  { header: "", accessor: "edit" },
];

export const TableData = [
  {
    id: "11",
    name: {
      label: "Annette Black",
      img: "/assets/images/user.png",
      data: [{ id: 1, text: "support@asritsolutions.com" }],
    },
    updated: { label: "3 week ago" },
    status: {
      label: "Active",
    },

   
    // edit: { label: "Edit" },
  },
];
export const CompanyUsers = () => {
  return (
    <InfoTable
      header={TableHeader}
      data={TableData}
      // editData={editData}
    />
  );
};
