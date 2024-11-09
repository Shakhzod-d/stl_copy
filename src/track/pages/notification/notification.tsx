import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { Navbar } from "@/track/components/ui";
import { Text } from "@/track/constants";
import { Main } from "@/track/utils";

export const Notification = () => {
  return (
    <>
      <Main>
        <Navbar search={true} title="Notification" />
        <Flex $justify="center" $h="calc(100vh - 200px)" $align="center"> 
          <Text size={30}>No notification yet</Text>
        </Flex>
      </Main>
    </>
  );
};
