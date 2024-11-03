import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { EditModalBtn } from "@/track/components/ui";
import { companySettingsModal } from "@/track/constants";

export const Settings = () => {
  return (
    <>
      {companySettingsModal?.map((col) => (
        <Flex key={col.id} $vertical={true} $gap={"20px"}>
          {col.options.map((item) => (
            <Flex $vertical={true} $gap={"15px"} style={{ margin: "40px" }}>
              <Flex $gap={"15px"}>
                {item.buttons.map((btn) => (
                  <EditModalBtn
                    key={btn.id}
                    text={btn.text}
                    isActive={btn.isActive}
                  />
                ))}
              </Flex>
            </Flex>
          ))}
        </Flex>
      ))}
    </>
  );
};
