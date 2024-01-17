import React from "react";
import { Button } from "antd";
import Icon from "../../icon/Icon";

interface Props {
     className?: string;
     onRight?: (any: any) => any;
     onLeft?: (any: any) => any;
     disableLeft?: boolean;
     disableRight?: boolean;
}

const DoubleButton: React.FC<Props> = ({
     className,
     onRight,
     onLeft,
     disableLeft,
     disableRight,
}) => (
     <div className={`doble-button ${className || ""}`}>
          <Button onClick={onLeft} disabled={disableLeft}>
               <Icon icon="arrow-left" />
          </Button>
          <span className="line" />
          <Button onClick={onRight} disabled={disableRight}>
               <Icon icon="arrow-right" />
          </Button>
     </div>
);

export default DoubleButton;
