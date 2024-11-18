import { ActiveCard, BoldNum, Item, ItemTitle } from "./drivers-style";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import { ResText, ResTitle } from "../overview-card/overview-styled";
import { Text, InfoCard } from "@/track/constants";
import { memo } from "react";
import useApi from "@/hooks/useApi";
import { driversCount } from "@/track/utils/mapData";

export const Drivers = memo(() => {
  const active = useSelector(
    (state: RootState) => state.booleans.dashboardProgress
  );

  const { data } = useApi("/count", {
    page: 1,
    limit: 1000,
  });

  // console.log("data", data ? data?.data : []);
  // const { activeData = [], filterData = [] } = driversCount(
  //   data ? data?.data : []
  // );
  
  // MUST FIX HERE
  return (
    <InfoCard $active={active}>
      {active ? (
        <>
          <Text $mb="60px" size={16} $font="600">
            Drivers
          </Text>
          <ActiveCard $active={active}>
            {[]?.map((item: any) => {
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
            {[]?.map((item: any) => (
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
