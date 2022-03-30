import React from "react";
import "antd/dist/antd.css";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { ROUTES, API } from "../../../../configs";

export default class TableDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      dataDP: [],
    };
  }

  componentDidMount() {
    const nik_spv = sessionStorage.getItem("nik");
    const token = sessionStorage.getItem("token");
    axios
      .get(API.tkpUnderSpv + nik_spv + "/dalam-proses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const dalamProses = response.data.map((dalamProses) => ({
          key: dalamProses.id_tkp,
          name: dalamProses.nama_lengkap,
          status: dalamProses.t_status_tkp.nama_status_tkp,
          roles: dalamProses.t_job_role.nama_job_role,
        }));
        this.setState({
          dataDP: dalamProses,
        });
      });
  }

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

  _handleOpenDetail = (key) => {
    window.location = ROUTES.DETAIL_TKP(key);
    localStorage.setItem("detail", key);
  };

  render() {
    console.log("coba", this.state.dataDP);

    const columns = [
      {
        title: "Tanggal",
        dataIndex: "tanggal_pengajuan",
        key: "tanggal_pengajuan",
        width: "30%",
        sorter: (a, b) =>
          a.tanggal_pengajuan.localeCompare(b.tanggal_pengajuan),
        ...this.getColumnSearchProps("tanggal_pengajuan"),
      },
      {
        title: "Nama Calon TKP",
        dataIndex: "name",
        key: "name",
        width: "20%",
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Job Role",
        dataIndex: "roles",
        key: "roles",
        ...this.getColumnSearchProps("roles"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        ...this.getColumnSearchProps("status"),
      },
      {
        width: 125,
        title: "Aksi",
        dataIndex: "key",
        fixed: "right",
        render: (key) => (
          <div>
            <span
              onClick={this._handleOpenDetail.bind(this, key)}
              style={{ cursor: "pointer" }}
            >
              <EyeTwoTone />
            </span>
          </div>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={this.state.dataDP}
        pagination={true}
      />
    );
  }
}
