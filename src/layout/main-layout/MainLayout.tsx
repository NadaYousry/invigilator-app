import React, { useEffect } from "react";
import { ConfigProvider, Layout, Menu } from "antd";
import { themeConfig } from "@utils/theme";
import styles from "@layout/main-layout/MainLayout.module.css";
import Logo from "@/assets/images/global/Gamalearn-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { ICommon, RootState } from "@appTypes/generalTypes";
import { setError, setSuccess } from "@store/fetchStatusSlice";
import Alert from "@components/alert/Alert";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const MainLayout: React.FC<ICommon> = ({ children }) => {
  const { fetchStatus } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus?.error?.message) {
      setTimeout(() => {
        dispatch(setError(null));
      }, 4000);
    } else if (fetchStatus?.success?.message) {
      setTimeout(() => {
        dispatch(setSuccess(null));
      }, 4000);
    }
  }, [fetchStatus?.error?.message, fetchStatus?.success?.message]);
  return (
    <ConfigProvider theme={themeConfig}>
      <Layout className="w-full !min-h-screen">
        <Sider
          width={200}
          breakpoint="lg"
          collapsedWidth="0"
          className={"!bg-white"}
        >
          <img src={Logo} alt="gamalearn logo" className="logo-image p-3" />
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            className={styles.menuContainer}
          >
            <Menu.Item key="1">
              <Link to="/">
                <span className="nav-text">Downloaded Assessments</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>{" "}
        <main className="lg:w-[calc(100%-200px)] relative mt-[3rem]  w-full lg:px-4 pl-[3rem] pr-4">
          {/* {fetchStatus?.loading && <Loader />} */}
          {(fetchStatus?.error?.message || fetchStatus?.success?.message) && (
            <Alert
              message={
                fetchStatus?.error?.message || fetchStatus?.success?.message
              }
              type={fetchStatus?.error?.message ? "error" : "success"}
            />
          )}
          {children}
        </main>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
