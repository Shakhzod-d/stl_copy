import { Progress } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
interface Props {
  percent: number;
  size?: number;
  color: string;
}
export const CustomProgress = ({ percent, size = 24, color }: Props) => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  return (
    <Progress
      type="dashboard"
      percent={percent}
      strokeWidth={22}
      showInfo={false}
      strokeColor={color}
      trailColor={dark ? "gray" : undefined} // "gray" ni trail rangiga qo'yish
      width={size} // "size" ni width sifatida ishlatish
    />
  );
};
