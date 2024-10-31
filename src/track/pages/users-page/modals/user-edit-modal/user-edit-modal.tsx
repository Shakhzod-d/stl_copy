import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { EditModalBtn, FormInput, FormSelect } from "@/track/components/ui";
import {
  CustomModal,
  editUserRoleModalBtns,
  TransparentButton,
} from "@/track/constants";
import { Dispatch, SetStateAction, useState } from "react";
import { Title } from "../../users-styled";
import { DefaultBtn, PrimaryBtn } from "@/track/pages/units/units-styled";
import { editUserModalBtns } from "@/track/utils";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}
export const UserEditModal = ({ setOpen, open }: Props) => {
  const [activeBtn, setActiveBtn] = useState<number>(1);

  return (
    <CustomModal
      width={"100%"}
      style={{ maxWidth: `${activeBtn === 1 ? "1330px" : "1000px"}` }}
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      <Flex $vertical={true} $gap={"10px"} style={{ marginTop: "40px" }}>
        <Flex $justify="space-between" $w="100%">
          <Title>Edit user</Title>

          <Flex $gap={"10px"}>
            {editUserModalBtns.map((item) => (
              <TransparentButton
                key={item.id}
                active={String(activeBtn === item.id)}
                onClick={() => setActiveBtn(item.id)}
              >
                {item.text}
              </TransparentButton>
            ))}
          </Flex>
        </Flex>

        {activeBtn === 1 ? (
          <>
            <Flex $gap={"10px"} $w="100%">
              <FormSelect
                placeholder="status"
                data={[
                  { value: "status", label: "Reseller" },
                  { value: "active", label: "Actice" },
                  { value: "completed", label: "Completed" },
                ]}
                width="100%"
                h={"70px"}
              />

              <FormInput placeholder="Phone" width="100%" h="70px" />
            </Flex>

            <Flex $gap={"10px"} $w="100%">
              <FormInput placeholder="First name" h="70px" />
              <FormInput placeholder="Last name" h="70px" />
              <FormInput placeholder="Email" h="70px" />
              <FormInput placeholder="Password" h="70px" />
            </Flex>

            <Flex $gap={"10px"} $w="100%">
              <FormSelect
                placeholder="status"
                data={[
                  { value: "status", label: "Status" },
                  { value: "active", label: "Actice" },
                  { value: "completed", label: "Completed" },
                ]}
                // width="50%"
                h={"70px"}
              />
              <FormSelect
                placeholder="status"
                data={[
                  { value: "status", label: "Two-factures" },
                  { value: "active", label: "Actice" },
                  { value: "completed", label: "Completed" },
                ]}
                h={"70px"}
              />
              <FormSelect
                placeholder="status"
                data={[
                  { value: "status", label: "Role" },
                  { value: "active", label: "Actice" },
                  { value: "completed", label: "Completed" },
                ]}
                h={"70px"}
              />
            </Flex>
          </>
        ) : (
          <>
            <Flex
              $gap={"65px"}
              $justify="space-between"
              style={{ paddingRight: "60px" }}
              $w="100%"
            >
              {editUserRoleModalBtns.map((col) => (
                <Flex key={col.id} $vertical={true} $gap={"20px"}>
                  {col.title ? <Title size="24px">{col.title}</Title> : ""}

                  {col.options.map((item) => (
                    <Flex $vertical={true} $gap={"15px"} $w="100%">
                      <Title size="16px">{item.title}</Title>
                      <Flex $gap={"10px"} $w="100%">
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
            </Flex>
          </>
        )}

        <Flex
          $gap={"10px"}
          $justify="end"
          style={{ marginTop: "50px" }}
          $w="100%"
        >
          <DefaultBtn
            style={{ width: "200px", height: "55px" }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </DefaultBtn>
          <PrimaryBtn
            style={{ width: "200px", height: "55px" }}
            onClick={() => setOpen(false)}
          >
            Ok
          </PrimaryBtn>
        </Flex>
      </Flex>
    </CustomModal>
  );
};
