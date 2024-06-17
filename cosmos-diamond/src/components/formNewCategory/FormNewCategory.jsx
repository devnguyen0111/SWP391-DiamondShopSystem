import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { WarningFilled } from "@ant-design/icons";
// import { alertFail, alertSuccess } from "../../assets/hook/useNotification";
import api from "../../config/axios";

function FormNewCategory({ status, setStatus, getAllByRole }) {
  const [check, setCheck] = useState(false);
  console.log(check);
  console.log(status);
  const [formData, setFormData] = useState(null);

  const onFinish = (e) => {
    setFormData(e);
    setCheck(true);
  };

  const createNewCategory = async () => {
    console.log(formData.categories);
    try {
      const response = await api.post(
        `/addCategory?name=${formData.categories}`,
        {}
      );
      console.log(response);
      setCheck(false);
      //   setStatus(false);
      // alertSuccess(response.data.message);
      // await getAllByRole();
    } catch (e) {
      setCheck(false);
      //   setStatus(false);
      alertFail(e.response.data);
    }
    setStatus(false);
  };

  useEffect(() => {
    console.log("a");
  }, [check]);

  return (
    <Modal
      open={status}
      // onOk={setStatus}
      onCancel={() => setStatus(false)}
      footer={null}
      title={
        <div>
          <h2
            style={{
              fontFamily: "Gantari",
              fontSize: "1.7em",
              textAlign: "center",
              margin: "0.5em 0",
            }}
          >
            Create new products
          </h2>
        </div>
      }
    >
      <Form
        onFinish={onFinish}
        className="form-signup-mod__container"
        layout="vertical"
      >
        <Form.Item
          label="Category name"
          name="categories"
          className="form-signup-mod__container__label"
          rules={[
            {
              required: true,
              message: (
                <div>
                  <WarningFilled /> Please input categories!
                </div>
              ),
            },
          ]}
        >
          <Input className="form-signup-mod__container__input" />
        </Form.Item>
        <Button
          onClick={() => setCheck(true)}
          className="form-signup-mod__container__submit"
          htmlType="submit"
        >
          Create
        </Button>
        <Modal
          title="Confirm"
          open={check}
          onCancel={() => setCheck(false)}
          footer={null}
        >
          <h1>Are you sure create</h1>

          <div>
            {" "}
            <Button
              onClick={createNewCategory}
              className="form-signup-mod__container__confirm"
            >
              Confirm
            </Button>
          </div>
        </Modal>
      </Form>
    </Modal>
  );
}

export default FormNewCategory;
