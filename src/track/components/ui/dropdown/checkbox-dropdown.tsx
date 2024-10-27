import { Button } from "antd";
import { FC } from "react";
import { SlReload } from "react-icons/sl";
import { Item, StyledCheckbox, Wrapper } from "./dropdown-styled";

interface Props {
  item: string[];
  reloadBtn: boolean;
}
export const CheckboxDropdown: FC<Props> = ({ item, reloadBtn }) => {
  return (
    <Wrapper>
      <Item>
        {item.map((c, i) => (
          <StyledCheckbox
            value="Connect"
            style={{ borderColor: "red" }}
            key={i}
          >
            {c}
          </StyledCheckbox>
        ))}
      </Item>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {reloadBtn && (
          <Button
            type="primary"
            style={{
              background: " #f3f3f4",
              width: "100px",
              color: "#000",
              height: "49px",
            }}
          >
            <SlReload />
          </Button>
        )}
        <Button
          type="primary"
          style={{ background: "orange", width: "100%", height: "49px" }}
        >
          Apply{" "}
        </Button>
      </div>
    </Wrapper>
  );
};
