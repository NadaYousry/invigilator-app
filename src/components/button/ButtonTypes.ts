import { ICommon } from "@appTypes/generalTypes";
import { ButtonHTMLType } from "antd/es/button";
import { BaseButtonProps } from "antd/es/button/button";
import { ReactNode } from "react";

export interface IButton extends BaseButtonProps {
  children: ICommon["children"];
  className?: ICommon["className"];
  type?: BaseButtonProps["type"];
  icon?: ReactNode;
  htmlType?: ButtonHTMLType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
  loaderColor?: string;
}
