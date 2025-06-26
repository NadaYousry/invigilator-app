import { forwardRef } from "react";
import { Button as AntButton } from "antd";
import { IButton } from "./ButtonTypes";
import Loader from "@components/loader/Loader";

const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    {
      children,
      className,
      type = "primary",
      icon,
      htmlType = "button",
      onClick = () => {},
      loading,
      loaderColor,
      ...props
    },
    ref
  ) => {
    return (
      <AntButton
        ref={ref}
        className={`rounded-3 flex items-center gap-2 ${className}`}
        type={type}
        htmlType={htmlType}
        onClick={onClick}
        {...props}
      >
        {loading ? (
          <Loader className="relative" loaderColor={loaderColor} />
        ) : (
          <>
            {icon && <span>{icon}</span>}
            {children}
          </>
        )}
      </AntButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
