import React from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Input,
  Breadcrumb,
  Card,
  Divider,
  ConfigProvider,
} from "antd";
import { HeartOutlined, LogoutOutlined } from "@ant-design/icons";
import "./AccountDetails.scss";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function AccountDetails() {
  return (
    <Content>
      <div className="site-layout-content">
        <Card style={{ border: "none" }}>
          <div className="account-section">
            <div className="account-section__upper">
              <p>
                <HeartOutlined style={{ marginRight: "0.5em" }} />
                Wishlist
              </p>
              <p>
                Sign Out
                <LogoutOutlined style={{ marginLeft: "0.5em" }} />
              </p>
            </div>
            <div className="account-section__banner">
              <div className="account-section__banner__inform">
                <h5 className="account-section__banner__inform__intro">
                  welcome to your account
                </h5>
                <h1 className="account-section__banner__inform__title">
                  Yen Nhu
                </h1>
              </div>
            </div>
            <div className="account-details">
              <div className="account-info">
                <h3>Account Details</h3>
                <Divider className="account-info__divider" />
              </div>
            </div>
            <div className="myAccount">
              <div className="myAccount__upper">
                <p>
                  View and manage your personal details and contact information
                </p>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        borderRadius: "none",
                        defaultHoverBg: " rgb(27, 27, 27)",
                        defaultHoverBorderColor: "rgb(27, 27, 27)",
                        defaultHoverColor: "white",
                      },
                    },
                  }}
                >
                  <Button className="myAccount__upper__button">
                    Edit Login Details
                  </Button>
                </ConfigProvider>
              </div>
              <div className="myAccount__lower">
                <h1>Login Details:</h1>
                <div className="myAccount__lower__inform">
                  <p className="myAccount__lower__inform__text1">First Name</p>
                  <p className="myAccount__lower__inform__text2">Yen Nhu</p>
                  <p className="myAccount__lower__inform__text1">Last Name</p>
                  <p className="myAccount__lower__inform__text2">Ha</p>
                </div>
                <div className="myAccount__lower__contact">
                  <p className="myAccount__lower__inform__text1">Email</p>
                  <p className="myAccount__lower__inform__text2">
                    abc@gmail.com
                  </p>
                  <p className="myAccount__lower__inform__text1">Phone</p>
                  <p className="myAccount__lower__inform__text2">0932857835</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Content>
  );
}

export default AccountDetails;
