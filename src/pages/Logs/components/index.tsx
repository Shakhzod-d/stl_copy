import LogsInner from "./LogsInner";
import { LogsInnerProvider } from "./LogsInner.context";

const index = () => {
     return (
          <LogsInnerProvider>
               <LogsInner />
          </LogsInnerProvider>
     );
};

export default index;
