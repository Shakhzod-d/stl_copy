import React from "react";
import "./truck-loader.css";
import { Spin } from "antd";

const TruckLoader: React.FC = () => {
     return (
          <div className="loader-wrapper">
               <Spin size="large" />
          </div>
     );

     {
          /* return (
          //  <div className="loader-wrapper">
          //     <div className="truck-wrapper">...</div>
          //  </div>
          <div className="truck-wrapper">
               <div className="truck">
                    <div className="truck-container"></div>
                    <div className="glases"></div>
                    <div className="bonet"></div>

                    <div className="base"></div>

                    <div className="base-aux"></div>
                    <div className="wheel-back"></div>
                    <div className="wheel-front"></div>

                    <div className="smoke"></div>
               </div>
          </div>
     ); */
     }
};

export default TruckLoader;
