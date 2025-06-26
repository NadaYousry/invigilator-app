import { Modal } from "antd";
import { FC } from "react";
import { ConfirmModalProps } from "./ConfirmModalTypes";

export const ConfirmModal: FC<ConfirmModalProps> = ({
  description,
  ...props
}) => {
  return <Modal {...props}>{description}</Modal>;
};
