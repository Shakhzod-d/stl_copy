import React, { useState } from "react";

import { historyPush, setLocalStorage } from "@/utils";

import useApi from "@/hooks/useApi";

import { ICompanyData } from "@/types/company.type";

import { IPageData } from "@/types";

import { companyTableHeader, Main } from "@/track/constants";
import { CustomInput, Navbar } from "@/track/components/ui";
import { AddBtn, Top } from "./company-styled";
import { FaPlus } from "react-icons/fa";
import { InfoTable } from "@/track/components/shared";

import { HiPhone } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";
import { RiUser3Fill } from "react-icons/ri";
import { CompanyData } from "@/track/types";
import { Company } from "@/track/utils/method";
import { setCompany, setPageLoading } from "@/track/utils/dispatch";
import { useErrAuth } from "@/hooks/useAuth";
import { CompanyModal } from "./components/company-page-modal";
import { useDebounce } from "@/track/hooks/use-debauce";
import { useDispatch, useSelector } from "react-redux";
import { setLoggerCompanyData, setRole } from "@/store/slices/company-slice";
import { RootState } from "@/store";

const Companies: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [modalRole, setModalRole] = useState<"add" | "edit">("add");
  const [editDataId, setEditDataId] = useState<string | null>("add");

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading, refetch } = useApi<IPageData<ICompanyData[]>>(
    "/companies",
    {
      page: 1,
      limit: 10000,
    }
  );

  const mapData = (data: ICompanyData[]): CompanyData[] => {
    return data.map((item) => {
      const image: string | undefined = item?.logo
        ? `https://unityapi.roundedteam.uz/public/uploads/companyLogos/${item?.logo}`
        : "/assets/images/company.png";

      return {
        id: item._id,
        name: {
          label: item.companyName,
          img: image,
          data: [
            { id: 1, text: "9328382389", icon: <HiPhone />, type: "company" },
            {
              id: 2,
              text: "support@asritsolutions.com",
              icon: <IoMdMail />,
              type: "company",
            },
          ],
        },
        status: { label: "Active" },
        contact: {
          label: "",
          data: [
            {
              id: 1,
              text: "Farmon Muhammadiyev (Owner)",
              icon: <RiUser3Fill />,
              type: "contact",
            },
            {
              id: 2,
              text: " (318) 818-0000",
              icon: <HiPhone />,
              type: "contact",
            },
            {
              id: 3,
              text: "zavajan96@gmail.com",
              icon: <IoMdMail />,
              type: "contact",
            },
          ],
        },
        created: {
          label: "",
          data: [
            { id: 1, text: "Created: Apr 3rd 2023", icon: "", type: "time" },
            { id: 2, text: "Edited: Apr 3rd 2023", icon: "", type: "time" },
          ],
        },
        edit: { label: "Edit" },
      };
    });
  };
  const modalActive = async (id: string) => {
    ModalFun("edit", id);
  };

  const ModalFun = async (role: "add" | "edit", id: string = "") => {
    if (role === "edit") {
      setModalRole("edit");
      setEditDataId(id);
      setOpen(true);
    } else {
      setModalRole("add");
      setOpen(true);
    }
    // setModalRole(role);
    // dispatch(setRole(role));
  };

  const { errFun } = useErrAuth();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const CompanyHandler = async (id: string) => {
    try {
      setPageLoading(true);
      const data = await Company(id);
      if (userData?.role.roleName === "logger") {
        dispatch(setLoggerCompanyData(data));
        historyPush("/info-company");
        // sessionStorage.setItem("companyId", id);
      } else {
        // sessionStorage.setItem("company", JSON.stringify(data));
        setLocalStorage("companyId", id);
        setLocalStorage("company", JSON.stringify(data));
        setCompany(data);

        await historyPush(`/`);
      }
    } catch (err) {
      return errFun(err);
    } finally {
      setPageLoading(false);
    }
  };
  const searchValue = useDebounce(searchTerm, 300);
  const tableData: CompanyData[] = mapData(data ? data?.data.data : []);
  const filteredData = tableData.filter((data) =>
    String(data?.name?.label)
      .toLowerCase()
      .startsWith(searchValue.toLowerCase())
  );
  return (
    <Main>
      <CompanyModal
        open={open}
        setOpen={setOpen}
        role={modalRole}
        id={editDataId}
        refetch={refetch}
      />

      <Navbar title="Company" search={false} />
      <Top>
        <CustomInput
          type="search"
          change={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
        <AddBtn onClick={() => ModalFun("add")}>
          <FaPlus size={18} />
        </AddBtn>
      </Top>

      <div>
        <InfoTable
          header={companyTableHeader}
          data={filteredData}
          editData={modalActive}
          onClick={CompanyHandler}
          isLoading={isLoading}
        />
      </div>
    </Main>
  );
};

export default Companies;
