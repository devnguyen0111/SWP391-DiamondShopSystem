import React from "react";
import { Row, Col, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import './sortSettingDropDown.scss'
import DiamondList from "../sortslider/DiamondList";
function SettingDropDownGroup() {
  const items = [
    {
      key: "1",
      type: "group",
      label: "Group title",
      children: [
        {
          key: "1-1",
          label: "1st menu item",
        },
        {
          key: "1-2",
          label: "2nd menu item",
        },
      ],
    },
    {
      key: "2",
      label: "sub menu",
      children: [
        {
          key: "2-1",
          label: "3rd menu item",
        },
        {
          key: "2-2",
          label: "4th menu item",
        },
      ],
    },
    {
      key: "3",
      label: "disabled sub menu",
      disabled: true,
      children: [
        {
          key: "3-1",
          label: "5d menu item",
        },
        {
          key: "3-2",
          label: "6th menu item",
        },
      ],
    },
  ];
  return (
    <>
      <div className="sort__setting">
        <Dropdown
          
          trigger={"click"}
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
                <button className="sort__btn">
                Metal
                <DownOutlined style={{fontSize:'12px'}}/>
                </button>
              
            </Space>
          </a>
        </Dropdown>
        <DiamondList/>
      </div>
    </>
  );
}

export default SettingDropDownGroup;