import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";

import { permissionModal, Text } from "@/track/constants";
import { CheckboxBtn } from "./checkboxBtn";

export const Permission = () => {
  return (
    <>
      <Flex $gap={"70px"}>
        {permissionModal.map((col) => (
          <Flex key={col.id} $vertical={true} $gap={"0"}>
            {col.title ? <Text size={24}>{col.title}</Text> : ""}

            {col.options.map((item) => (
              <Flex $vertical={true} $gap={"15px"}>
                <Text size={16}>{item.title}</Text>
                <Flex $gap={"10px"}>
                  {item.buttons.map((btn: any) => {
                    return (
                      <CheckboxBtn
                        key={btn.id}
                        text={btn.text}
                        isActive={btn.isActive}
                        name={btn.name}
                      />
                    );
                  })}
                </Flex>
              </Flex>
            ))}
          </Flex>
        ))}
      </Flex>
    </>
  );
};
