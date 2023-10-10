// Data
import { CallLogs } from "../data";

// Chat Element Component
import CallLogElement from "./CallLogElement";

const CallElementDisplay = () => {
  return (
    <>
      {CallLogs.map((call) => {
        return <CallLogElement key={call.id} {...call} />;
      })}
    </>
  );
};

export default CallElementDisplay;
