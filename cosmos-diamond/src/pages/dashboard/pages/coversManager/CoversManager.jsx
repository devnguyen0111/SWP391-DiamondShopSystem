import { Button, ConfigProvider, Flex, Input, Table } from "antd";
import api from "../../../../config/axios";
import { alertFail } from "../../../../hooks/useNotification";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { SearchOutlined } from "@ant-design/icons";

function CoversManager() {
  const [coverList, setCoverList] = useState([]);
  const [filteredCoverList, setFilteredCoverList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const nav = useNavigate();

  const columns = [
    {
      title: "Cover ID",
      dataIndex: "coverId",
      key: "coverId",
      sorter: (a, b) => a.coverId - b.coverId,
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Cover name",
      dataIndex: "coverName",
      key: "coverName",
    },
    {
      title: "Category",
      key: "categoryId",
      render: (cover) => {
        if (cover.categoryId === 1) {
          return <span>Ring</span>;
        } else if (cover.categoryId === 2) {
          return <span>Pendant</span>;
        } else if (cover.categoryId === 3) {
          return <span>Earrings</span>;
        }
      },
    },
    {
      title: "Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Detail",
      key: "detail",
      render: (_, data) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultBg: "white",
                defaultColor: "black",
                defaultHoverBg: "white",
                defaultHoverBorderColor: "black",
                defaultHoverColor: "black",
                defaultActiveBg: "black",
                defaultActiveBorderColor: "black",
                defaultActiveColor: "white",
              },
            },
          }}
        >
          <Button
            type="default"
            onClick={() => nav(`/dashboard/manager/cover/${data.coverId}`)}
          >
            Detail
          </Button>
        </ConfigProvider>
      ),
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value) {
      const filteredData = coverList.filter(
        (c) =>
          c.coverName.toLowerCase().includes(value.toLowerCase()) ||
          c.coverId == value
      );
      setFilteredCoverList(filteredData);
    } else {
      setFilteredCoverList(coverList);
    }
  };

  //GET all cover
  const fetchCovers = async () => {
    try {
      const response = await api.get("api/Cover/getAllCovers");
      if (response.status !== 200) {
        alertFail("Cannot fetch Cover List");
      } else {
        setCoverList(response.data.$values);
        setFilteredCoverList(response.data.$values); // Initialize with full list
      }
    } catch (error) {
      alertFail("Cannot fetch Cover List");
    }
  };

  useEffect(() => {
    fetchCovers();
  }, []);

  return (
    <div className="model1 mode" style={{ padding: "30px" }}>
      <Flex justify="space-between">
        <Link
          to="/dashboard/manager/cover/add"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            style={{ backgroundColor: "white" }}
            className="mode__createMod"
          >
            Create New Cover <IoMdAdd />
          </Button>
        </Link>
        <div className="">
          <Input
            value={searchQuery}
            onChange={handleSearch}
            addonBefore={<SearchOutlined />}
            placeholder="Search Cover Name or Id"
          />
        </div>
      </Flex>
      <Table
        columns={columns}
        dataSource={filteredCoverList}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: false,
          pageSizeOptions: ["5"],
        }}
      />
    </div>
  );
}

export default CoversManager;
