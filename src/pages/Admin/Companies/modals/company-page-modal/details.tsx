import { FormInput, FormSelect } from "@/track/components/ui";
import { TextAria } from "@/track/pages/company-users/modals/manage-user-modal/modal-styled";
import { StyleFlex } from "@/track/pages/tab-company/styled";

const timezone = [
  {
    label: "Eastern Standard Time (EST)",
    value: "Eastern Standard Time (EST)",
  },
  { label: "Central Standard Time(CST)", value: "Central Standard Time(CST)" },
  {
    label: "Mountain Standard Time (MST)",
    value: "Mountain Standard Time (MST)",
  },
  {
    label: "Pacific Standard Time (PST)",
    value: "Pacific Standard Time (PST)",
  },
];
const country = [
  {
    label: "US",
    value: "US",
  },
  {
    label: "CA",
    value: "CA",
  },
];

const status = [
  { label: "Active", value: "active" },
  { label: "On Hold", value: "On Hold" },
  { label: "Inactive", value: "Inactive" },
  { label: "Suspended", value: "Suspended" },
];
const state = [{ value: "ny", label: "NY" }];
export const Details = () => {
  return (
    <>
      <StyleFlex >
        <FormInput placeholder="Account Name" h="70px" />
        <FormInput placeholder="DOT" h="70px" />
        <FormSelect placeholder="Timezone" data={timezone} h="70px" />
        <FormSelect
          data={country}
          width="100%"
          placeholder="Country"
          h="70px"
        />
      </StyleFlex>
      <StyleFlex >
        <FormInput placeholder="Address Line 1" h="70px" />
        <FormInput placeholder="Address Line 2" h="70px" />
        <FormInput placeholder="Contact phone" h="70px" />
        <FormInput placeholder="City" h="70px" />
      </StyleFlex>
      <StyleFlex >
        <FormSelect placeholder="State" data={state} width="100%" h="70px" />
        <FormSelect data={status} width="100%" placeholder="Status" h="70px" />
      </StyleFlex>
      <TextAria placeholder="Note" />
    </>
  );
};
