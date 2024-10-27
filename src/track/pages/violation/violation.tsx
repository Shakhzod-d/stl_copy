import { CustomTable } from "../../components/shared";
import { TimeContainer } from "../../components/ui";
import { violationTabData, violationTabHeader } from "../../utils/constants";

export function Violation() {
  return (
    <>
      <TimeContainer />
      <CustomTable columns={violationTabHeader} data={violationTabData} />
    </>
  );
}
