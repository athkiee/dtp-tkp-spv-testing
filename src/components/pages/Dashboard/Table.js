import React from "react";
import "antd/dist/antd.css";
import { Table, Input, Button, Space } from "antd";
import {
  SearchOutlined,
  EyeTwoTone,
  DownloadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { ROUTES, API } from "../../../configs";

const token = sessionStorage.getItem('token');

const data = [
  {
    key: "1",
    name: "Tono",
    jobTitle: "Administration",
    roles: "Digital Business Partnership",
    mitra: "SKI",
  },
];
const nik_spv = sessionStorage.getItem("nik");

export default class TableDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      dataTKP: []
    };
  }

  componentDidMount() {
    axios
      .get(API.tkpUnderSpv + nik_spv + '/aktif', {
        headers: { Authorization: `Bearer ${token}`}
    })
      .then((response) => {
        const tkp = response.data.map((tkp) => ({
          key: tkp.id_tkp,
          name: tkp.nama_lengkap,
          jobTitle: tkp.t_job_title.nama_job_title,
          roles: tkp.t_job_role.nama_job_role,
          mitra: tkp.t_mitra.nama_mitra,
        } ));
        this.setState({
          dataTKP: tkp,
        });
        console.log('test', response);
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
    const coba = ['mitra', 'roles'];
    const columns = [
      {
        title: "Nama TKP",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Job Title",
        dataIndex: "jobTitle",
        key: "jobTitle",
        sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
        ...this.getColumnSearchProps("jobTitle"),
      },
      {
        title: "Job Role",
        dataIndex: "roles",
        key: "roles",
        sorter: (a, b) => a.roles.localeCompare(b.roles),
        ...this.getColumnSearchProps("roles"),
      },
      {
        title: "Mitra",
        dataIndex: "mitra",
        key: "mitra",
        ...this.getColumnSearchProps("mitra"),
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
              style={{ marginRight: 15, cursor: "pointer" }}
            >
              <EyeTwoTone />
            </span>
            <span>
              <DownloadOutlined
                onClick={() =>
                  window.open(
                    "http://ec2-34-238-164-78.compute-1.amazonaws.com:4004/tkp/get_zip_file/216"
                  )
                }
                style={{ color: "#00FF00" }}
              />
            </span>
          </div>
        ),
      },
    ];
    console.log('test', coba);
    return (
      <Table
        columns={columns.filter(col => col.dataIndex !== 'mitra')}
        dataSource={this.state.dataTKP}
        pagination={true}
      />
    );
  }
}
