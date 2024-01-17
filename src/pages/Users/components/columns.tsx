import { TableAction } from "@/components/elements/TableElements/TableElements";
import { role_names } from "@/constants";
import { IRoleName, } from "@/types";
interface IUseColumns {
     handleDelete: (id: string) => void;
     handleModal: (id: string) => void;
}

const useColumns = ({
     handleModal,
     handleDelete,
}: IUseColumns) => {

     return [
          {
               title: "First name",
               dataIndex: "firstName"
          },
          {
               title: "Last name",
               dataIndex: "lastName"
          },
          {
               title: "Phone number",
               dataIndex: "phone",
          },
          {
               title: "Role",
               dataIndex: "role",
               render: (role: IRoleName) => role_names.find(el => el.value === role)?.name
          },
          {
               title: "Email",
               dataIndex: "email",
          },
          {
               title: "Actions",
               dataIndex: "_id",
               render: (id: string, order: any) => (
                    <TableAction
                         updateFunction={() => handleModal(id)}
                         confirmTitle={`Do you want to deactivate ${order.firstName + " " + order.lastName
                              }`}
                         onDeleteConfirm={() => handleDelete(id)}
                    />
               ),
          },
     ];
};

export default useColumns;
