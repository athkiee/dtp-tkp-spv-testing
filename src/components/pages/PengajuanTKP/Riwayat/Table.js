import React from "react";
import "antd/dist/antd.css";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

const data = [
  {
    key: "1",
    name: "2021/07/08",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Wawancara",
  },
  {
    key: "2",
    name: "2021/07/08",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Menunggu Konfirmasi",
  },
  {
    key: "3",
    name: "2021/07/08",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Menunggu Konfirmasi",
  },
  {
    key: "4",
    name: "2021/07/08",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Wawancara",
  },
  {
    key: "5",
    name: "2021/07/08",
    spvName: "Tiffany",
    jobTitle: "Developer",
    status: "Menunggu Konfirmasi",
  },
  {
    key: "6",
    name: "2021/07/08",
    spvName: "Tiffany",
    jobTitle: "Developer",
    status: "Wawancara",
  },
  {
    key: "7",
    name: "2021/07/08",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Menunggu Konfirmasi",
  },
  {
    key: "8",
    name: "2021/07/08",
    spvName: "Tiffany",
    jobTitle: "Janitor",
    status: "Menunggu Konfirmasi",
  },
  {
    key: "9",
    name: "2021/07/08",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Wawancara",
  },
  {
    key: "10",
    name: "2021/07/08",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Menunggu Konfirmasi",
  },
];

export default class TableDalamProses extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const { selectedRowKeys } = this.state;
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // };

    const columns = [
      {
        title: "Tanggal",
        dataIndex: "name",
        key: "name",
        width: "20%",
      },
      {
        title: "Nama Calon TKP",
        dataIndex: "spvName",
        key: "spvName",
        width: "20%",
        ...this.getColumnSearchProps("spvName"),
      },
      {
        title: "Job Role",
        dataIndex: "jobTitle",
        key: "jobTitle",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        width: 125,
        title: "Aksi",
        dataIndex: "aksi",
        fixed: "right",
        render: () => (
          <div>
            <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
          </div>
        ),
      },
    ];

    return (
      <Table columns={columns} dataSource={data} />
    );
  }
}
