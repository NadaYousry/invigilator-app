import { ConfigProvider, Spin } from "antd";

function Loader({
  className = "",
  loaderColor = "#0056a7",
}: {
  className?: string;
  loaderColor?: string;
}) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center fixed w-[calc(100%-200px)]  right-0 top-0 bg-white/50 z-50 ${className}`}
    >
      <ConfigProvider
        theme={{
          components: {
            Spin: {
              colorPrimary: loaderColor,
            },
          },
        }}
      >
        <Spin tip="Loading..." />
      </ConfigProvider>
    </div>
  );
}

export default Loader;
