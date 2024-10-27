import React, { useState } from "react";

import { historyPush, setLocalStorage } from "@/utils";

import useApi from "@/hooks/useApi";

import { ICompanyData } from "@/types/company.type";
import { PAGE_LIMIT } from "@/constants/general.const";
import { IPageData } from "@/types";

import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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

const Companies: React.FC = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));

  const { data, isLoading, refetch, isRefetching } = useApi<
    IPageData<ICompanyData[]>
  >("/main/allcompany", { page, limit: PAGE_LIMIT });

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
    // console.log(id);
    setOpen(true);
  };
  const { errFun } = useErrAuth();
  const CompanyHandler = async (id: string) => {
    try {
      setPageLoading(true);
      const data = await Company(id);

      setLocalStorage("companyId", id);
      setLocalStorage("company", data);
      setCompany(data);
      await historyPush(`/`);
    } catch (err) {
      // console.log(err);
      return errFun(err);
    } finally {
      setPageLoading(false);
    }
  };

  const tableData: CompanyData[] = mapData(data ? data?.data.data : []);

  return (
    <Main>
      <CompanyModal open={open} setOpen={setOpen} />
      <Navbar title="Company" search={false} />
      <Top>
        <CustomInput
          type="search"
          // change={(e: React.ChangeEvent<HTMLInputElement>) =>
          //   setSearchTerm(e.target.value)
          // }
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
            data={tableData}
            editData={modalActive}
            onClick={CompanyHandler}
          />
        )}
      </div>
    </Main>
  );
};

export default Companies;
