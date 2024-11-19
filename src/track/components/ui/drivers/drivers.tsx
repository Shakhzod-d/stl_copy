import { ActiveCard, BoldNum, Item, ItemTitle } from "./drivers-style";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import { ResText, ResTitle } from "../overview-card/overview-styled";
import { Text, InfoCard } from "@/track/constants";
import { ReactNode, memo } from "react";
import useApi from "@/hooks/useApi";
import { driversCount } from "@/track/utils/mapData";

interface activeDataTypes {
  id: number;
  text: string;
  count?: number;
  color: string;
  icon: null;
}
interface Props {
  data: any;
}
export const Drivers = memo(({ data }: Props) => {
  const active = useSelector(
    (state: RootState) => state.booleans.dashboardProgress
  );

 

  const { activeData, filterData } = driversCount(data ? data?.data : []);

  return (
    <InfoCard $active={active}>
      {active ? (
        <>
          <Text $mb="60px" size={16} $font="600">
            Drivers
          </Text>
          <ActiveCard $active={active}>
            {activeData?.map((item: activeDataTypes) => {
              const Icon = () => item.icon;
              return (
                <Item key={item.id}>
                  <Icon />
                  <ItemTitle>{item.text}</ItemTitle>
                  <BoldNum>{item.count}</BoldNum>
                </Item>
              );
            })}
          </ActiveCard>
        </>
      ) : (
        <ActiveCard>
          <ResTitle>Drivers</ResTitle>
          <ActiveCard>
            {filterData?.map((item: activeDataTypes) => (
              <ResText $clr={String(item.color)} key={item.id}>
                {item.text}
              </ResText>
            ))}
          </ActiveCard>
        </ActiveCard>
      )}
    </InfoCard>
  );
});
