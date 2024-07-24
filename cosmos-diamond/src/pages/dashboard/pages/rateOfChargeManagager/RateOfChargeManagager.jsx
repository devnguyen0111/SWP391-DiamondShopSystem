import { Button, Flex, Form, InputNumber } from "antd";
import { useEffect, useState } from "react";
import api from "../../../../config/axios";
import { alertFail, alertSuccess } from "../../../../hooks/useNotification";

function RateOfChargeManagager() {
  const [rate, setRate] = useState();

  const fecthRate = async () => {
    let res = await api.get(`/api/Order/huh`);
    let data = res.data;
    setRate(data.rate);
  };
  useEffect(() => {
    fecthRate();
  }, []);

  const handleFinish = async (value) => {
    const res = await api.post(`/api/Order/updateRate`, {
      changeId: 1,
      rate: value.rate,
    });
    if(res.status === 200){
        alertSuccess('Update rate successfully')
    }
    else{
        alertFail('Update rate fail')
    }
  };
  return (
    <Flex justify="center" align="center" style={{ width: "100%" }}>
      {rate && (
        <Form
          layout="vertical"
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "20px 200px",
          }}
          onFinish={handleFinish}
        >
          <Form.Item
            initialValue={rate}
            style={{ width: "100%" }}
            label="Rate Of Charge for Jewelry"
            name="rate"
            rules={[
              {
                required: true,
                message: "Please provide rate of charge",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={1} max={1.9} step={0.1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {" "}
              Update Rate
            </Button>
          </Form.Item>
        </Form>
      )}
    </Flex>
  );
}

export default RateOfChargeManagager;
