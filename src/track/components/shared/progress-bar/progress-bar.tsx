import { Progress } from "antd";
import { FC } from "react";
import { ProgressWrapper, Title, Value, ValueWrapper } from "./progress-styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
interface Props {
  title: string;
  value: number;
  color: string;
  drivers: number;
}

export const ProgressBar: FC<Props> = ({ title, value, color, drivers }) => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  return (
    <ProgressWrapper>
      <Progress
        type="dashboard"
        percent={value}
        trailColor={dark ? "#fff" : ""}
        width={155}
        gapDegree={70}
        strokeColor={color}
        strokeWidth={15}
        // format={(percent = 0) => `7 (${percent}%)`}
        showInfo={false}
      />
      <ValueWrapper>
        <div style={{ color }}>
          <Title>{title}</Title>
        </div>

        <Value>{`${drivers} (${value}%)`}</Value>
      </ValueWrapper>
    </ProgressWrapper>
  );
};
