import { OutletWrapper } from "@/track/constants";
import { Sidebar } from "./sidebar";
import { ReactNode, Suspense } from "react";
import { PageLoad } from "../ui";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
interface Props {
  children: ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const pageLoading = useSelector(
    (state: RootState) => state.booleans.pageLoading
  );
  return (
    <>
      {pageLoading && <PageLoad />}
      <div className="main_wrapper">
        <Sidebar />
        <Suspense>
          <OutletWrapper>{children}</OutletWrapper>
        </Suspense>
      </div>
    </>
  );
};
