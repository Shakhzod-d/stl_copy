import React, { useState } from "react";

import { historyPush, setLocalStorage } from "@/utils";

import useApi from "@/hooks/useApi";

import { ICompanyData } from "@/types/company.type";

import { IPageData } from "@/types";

import { companyTableHeader, Main } from "@/track/constants";
import { CustomInput, Navbar, PageLoad } from "@/track/components/ui";
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
import { CompanyModal } from "./modals/company-page-modal";
import { useDebounce } from "@/track/hooks/use-debauce";

const Companies: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading } = useApi<IPageData<ICompanyData[]>>(
    "/main/allcompany",
    { page: 1, limit: 10000 }
  );

  const mapData = (data: ICompanyData[]): CompanyData[] => {
    return data.map((item) => {
      return {
        id: item._id,
        name: {
          label: item.companyName,
          img: "/company-logo.png",
          data: [
            { id: 1, text: "9328382389", icon: <HiPhone /> },
            { id: 2, text: "support@asritsolutions.com", icon: <IoMdMail /> },
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
            },
            { id: 2, text: " (318) 818-0000", icon: <HiPhone /> },
            { id: 3, text: "zavajan96@gmail.com", icon: <IoMdMail /> },
          ],
        },
        created: {
          label: "",
          data: [
            { id: 1, text: "Created: Apr 3rd 2023", icon: "" },
            { id: 2, text: "Edited: Apr 3rd 2023", icon: "" },
          ],
        },
        edit: { label: "Edit" },
      };
    });
  };
  const modalActive = (id: string) => {
    setOpen(true);
  };
  const { errFun } = useErrAuth();
  const CompanyHandler = async (id: string) => {
    try {
      setPageLoading(true);
      const data = await Company(id);
      sessionStorage.setItem("companyId", id);
      sessionStorage.setItem("company", JSON.stringify(data));
      setCompany(data);
      await historyPush(`/`);
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
      <CompanyModal open={open} setOpen={setOpen} />
      <Navbar title="Company" search={false} />
      <Top>
        <CustomInput
          type="search"
          change={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
        <AddBtn>
          <FaPlus size={18} />
        </AddBtn>
      </Top>

      <div>
        {isLoading ? (
          <PageLoad h="calc(100vh - 400px)" />
        ) : (
          <InfoTable
            header={companyTableHeader}
            data={filteredData}
            editData={modalActive}
            onClick={CompanyHandler}
          />
        )}
      </div>
    </Main>
  );
};

export default Companies;
