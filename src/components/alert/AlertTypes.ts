import { AlertProps } from "antd";

export interface IAlert {
  message?: string;
  type: AlertProps["type"];
}
