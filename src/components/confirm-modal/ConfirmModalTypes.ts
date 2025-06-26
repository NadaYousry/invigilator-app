import { ModalProps } from "antd";
import { ReactNode } from "react";

export interface ConfirmModalProps extends ModalProps {
  description?: ReactNode;
}
