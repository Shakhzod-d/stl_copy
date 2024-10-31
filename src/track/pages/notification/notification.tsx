import { Navbar } from "@/track/components/ui";
import { Text } from "@/track/constants";
import { Main } from "@/track/utils";

export const Notification = () => {
  return (
    <>
      <Main>
        <Navbar search={true} title="Notification" />
        <Text size={40}>No notification yet</Text>
      </Main>
    </>
  );
};
