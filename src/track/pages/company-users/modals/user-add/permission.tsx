import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { EditModalBtn } from "@/track/components/ui";
import { Text, userpermission } from "@/track/constants";

export const Permission = () => {
  return (
    <>
      <Flex $gap={"140px"}>
        {" "}
        {userpermission.map((col: any) => (
          <Flex key={col.id} $vertical={true} $gap={"20px"}>
            {col?.title ? <Text size={24}>{col.title}</Text> : ""}

            {col.options.map((item:any) => (
              <Flex $vertical={true} $gap={"15px"}>
                <Text size={16}>{item.title}</Text>
                <Flex $gap={"10px"}>
                  {item.buttons.map((btn:any) => (
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
      </Flex>
    </>
  );
};
