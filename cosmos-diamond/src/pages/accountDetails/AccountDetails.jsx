import React, { useEffect, useState } from "react";
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
  Row,
  Col,
  Form,
  Modal,
} from "antd";
import { ExclamationCircleOutlined, HeartOutlined, LogoutOutlined } from "@ant-design/icons";
import "./AccountDetails.scss";
import { Link, useNavigate, useParams } from "react-router-dom";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function AccountDetails() {
  const [customer, setCustomer] = useState();
  const [address, setAddress] = useState();
  const [zipcode, setZipCode] = useState();
  const [edit, setEdit] = useState(false);
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const nav = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  console.log(id);
  const logOut = () => {
    setCustomer(null);
    localStorage.removeItem("customer");
    nav("/login");
  };
  if (id) {
    useEffect(() => {
      fetch(`https://localhost:7262/api/Customer/customer/${id}/profile`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setCustomer(res.customerinfo);
          setAddress(
            `${res.ad.street} ${res.ad.state} ${res.ad.city}  ${res.ad.country} `
          );
          setZipCode(res.ad.zipCode);
        });
    }, []);
  }
  const handleEditStatus = () => {
    setEdit(!edit);
  };
  useEffect(() => {
    fetch("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((res) => res.json())
      .then((data) => setCity(data.data));
  }, []);
  const handleCity = (e) => {
    fetch(`https://esgoo.net/api-tinhthanh/2/${e.target.value}.htm`)
      .then((res) => res.json())
      .then((data) => setState(data.data));
  };
  const handleFirstName = (e)=>{
    setCustomer(prev => ({
      ...prev,
      cusFirstName: e.target.value
    }));
     
  }
  const handleLastName = (e)=>{
    setCustomer(prev => ({
      ...prev,
      cusLastName: e.target.value
    }));
     
  }
  const handleCusPhoneNum = (e)=>{
    const regex = /^[0-9]*$/
    if(regex.test(e.target.value)){
       setCustomer(prev => ({
        ...prev,
        cusPhoneNum: e.target.value
      }));
    }
  }
  const handleUpdateCustomer = ()=>{
    hideModal()
  }
  
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
                <LogoutOutlined
                  style={{ marginLeft: "0.5em" }}
                  onClick={() => logOut()}
                />
              </p>
            </div>
            <div className="account-section__banner">
              <div className="account-section__banner__inform">
                <h5 className="account-section__banner__inform__intro">
                  Welcome to your account
                </h5>
                <h1
                  className="account-section__banner__inform__title"
                  style={{ textTransform: "capitalize" }}
                >
                  {customer &&
                    `${customer.cusFirstName} ${customer.cusLastName}`}
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
                  <Button
                    className="myAccount__upper__button"
                    onClick={handleEditStatus}
                  >
                    {!edit ? "Edit Login Details" : "Cancel Edit"}
                  </Button>
                </ConfigProvider>
              </div>
              <Row className="myAccount__lower">
                <Col span={8}>
                  <h1>Login Details:</h1>
                </Col>
                {!edit && (
                  <>
                    <Col span={8} className="myAccount__lower__inform">
                      <p className="myAccount__lower__inform__text1">
                        First Name
                      </p>
                      <p
                        className="myAccount__lower__inform__text2"
                        style={{ textTransform: "capitalize" }}
                      >
                        {customer && customer.cusFirstName}
                      </p>
                      <p className="myAccount__lower__inform__text1">
                        Last Name
                      </p>
                      <p
                        className="myAccount__lower__inform__text2"
                        style={{ textTransform: "capitalize" }}
                      >
                        {customer && customer.cusLastName}
                      </p>
                      <p className="myAccount__lower__inform__text1">Address</p>
                      <p
                        className="myAccount__lower__inform__text2"
                        style={{ textTransform: "capitalize" }}
                      >
                        {address && address}
                      </p>
                    </Col>
                    <Col span={8} className="myAccount__lower__contact">
                      <p className="myAccount__lower__inform__text1">Email</p>
                      <p className="myAccount__lower__inform__text2">
                        {customer && customer.mail}
                      </p>
                      <p className="myAccount__lower__inform__text1">Phone</p>
                      <p className="myAccount__lower__inform__text2">
                        {customer && customer.cusPhoneNum}
                      </p>
                    </Col>
                  </>
                )}
                {edit && (
                  <Col span={20} style={{ width: "100%" }}>
                    <Form layout="vertical">
                      <Form.Item label="First Name" >
                        <Input onChange={(e)=>handleFirstName(e)} value={customer.cusFirstName}/>
                      </Form.Item>
                      <Form.Item label="Last Name">
                        <Input onChange={(e)=>handleLastName(e)} value={customer.cusLastName}/>
                      </Form.Item>
                      <Form.Item label="Phone Number">
                        <Input onChange={(e)=>handleCusPhoneNum(e)} value={customer.cusPhoneNum}/>
                      </Form.Item>
                      <Form.Item label="Address">
                        <Row gutter={[12, 0]}>
                          <Col span={12}>
                            <div>
                              <div className="checkout__label">
                                City/Province
                              </div>
                              <select
                                onChange={(e) => handleCity(e)}
                              >
                                {city &&
                                  city.map((city) => (
                                    <option value={city.id}>
                                      {city.full_name_en}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div>
                              <div className="checkout__label">District</div>
                              <select>
                                {state &&
                                  state.map((ward) => (
                                    <option value={ward.id}>
                                      {ward.full_name_en}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </Col>
                        </Row>
                      </Form.Item>
                      <Form.Item label="Email">
                        <Input disabled value={customer.mail} />
                      </Form.Item>
                      <ConfigProvider
                        theme={{
                          components: {
                            Button: {
                              defaultColor: "#ffffff",
                              defaultBg: "rgb(21, 21, 66)",
                              borderRadius: "6px",
                              defaultHoverBg: "rgb(21, 21, 66)",
                              defaultHoverBorderColor: "rgb(27, 27, 27)",
                              defaultHoverColor: "white",
                            },
                          },
                        }}
                      >
                        <Button style={{ width: "100%", padding: "17px 0" }} onClick={()=> showModal()}>
                          Save Login Details
                        </Button>
                      </ConfigProvider>
                    </Form>
                  </Col>
                )}
              </Row>
            </div>
          </div>
        </Card>
      </div>
      <Modal
        title="Are you sure to Update Profile ?"
        open={open}
        onOk={handleUpdateCustomer}
        onCancel={hideModal}
        okText="Update"
        cancelText="Cancel"
        icon= {<ExclamationCircleOutlined />}
      >
        
      </Modal>
    </Content>
  );
}

export default AccountDetails;
