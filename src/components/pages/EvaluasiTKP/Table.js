import React from "react";
import "antd/dist/antd.css";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

const data = [
  {
    key: "1",
    name: "Tono",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Belum dibuka",
    mitra: "SKI",
  },
  {
    key: "2",
    name: "Tony",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Belum dibuka",
    mitra: "ISH",
  },
  {
    key: "3",
    name: "Timmy",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Belum dibuka",
    mitra: "ISH",
  },
  {
    key: "4",
    name: "Bambang",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Belum dibuka",
    mitra: "SKI",
  },
  {
    key: "5",
    name: "Jonathan",
    spvName: "Tiffany",
    jobTitle: "Developer",
    status: "Belum dibuka",
    mitra: "SKI",
  },
  {
    key: "6",
    name: "Budi",
    spvName: "Tiffany",
    jobTitle: "Developer",
    status: "Belum dibuka",
    mitra: "SKI",
  },
  {
    key: "7",
    name: "Setiawan",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Belum dibuka",
    mitra: "SKI",
  },
  {
    key: "8",
    name: "Chaerul",
    spvName: "Tiffany",
    jobTitle: "Janitor",
    status: "Belum dibuka",
    mitra: "SKI",
  },
  {
    key: "9",
    name: "Syahrul",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Belum dibuka",
    mitra: "SKI",
  },
  {
    key: "10",
    name: "Jim Red",
    spvName: "Tiffany",
    jobTitle: "Administration",
    status: "Belum dibuka",
    mitra: "SKI",
  },
];

export default class TableDashboard extends React.Component {
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
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: "odd",
          text: "Select Odd Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: "even",
          text: "Select Even Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };

    const columns = [
      {
        title: "Nama TKP",
        dataIndex: "name",
        key: "name",
        width: "20%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Nama SPV",
        dataIndex: "spvName",
        key: "spvName",
        width: "20%",
        ...this.getColumnSearchProps("spvName"),
      },
      {
        title: "Job Title",
        dataIndex: "jobTitle",
        key: "jobTitle",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Mitra", 
        dataIndex: "mitra",
        key: "mitra",
      },
      {
        width: 125,
        title: "Aksi",
        dataIndex: "aksi",
        fixed: "right",
        render: () => (
          <div>
            <CloudUploadOutlinedIcon style={{marginRight:20}}></CloudUploadOutlinedIcon>
            <SendOutlinedIcon></SendOutlinedIcon>
          </div>
        ),
      },
    ];

    return (
      <Table columns={columns} rowSelection={rowSelection} dataSource={data} />
    );
  }
}
