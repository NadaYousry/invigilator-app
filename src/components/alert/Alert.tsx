import { Alert as AntAlert } from "antd";
import { IAlert } from "./AlertTypes";

function Alert({ message, type }: IAlert) {
  return (
    <AntAlert
      message={message}
      type={type}
      showIcon
      closable
      className="!absolute z-50 min-w-[20%] left-75 min-h-[3rem]"
    />
  );
}

export default Alert;
