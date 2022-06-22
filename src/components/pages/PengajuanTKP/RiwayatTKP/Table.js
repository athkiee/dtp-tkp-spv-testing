import React from "react";
import "antd/dist/antd.css";
import { Table, Input, Button, Space, Tooltip } from "antd";
import {
  SearchOutlined,
  EyeTwoTone,
  DownloadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { ROUTES } from "../../../../configs";
import Typography from "@material-ui/core/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import PropTypes from "prop-types";
import fileDownload from "js-file-download";

export default class TableRiwayat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      dataRiwayat: [],
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    const nik_spv = localStorage.getItem("nik");
    axios
      .get(
        "http://ec2-54-179-167-74.ap-southeast-1.compute.amazonaws.com:4004/tkp/filter/tkp-under-spv/" +
          nik_spv,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const riwayat = response.data.map((riwayat) => ({
          key: riwayat.id_tkp,
          bidang: riwayat.t_bidang.kode_bidang,
          name: riwayat.nama_lengkap,
          status: riwayat.t_status_tkp.nama_status_tkp,
          jobTitle: riwayat.t_job_title.nama_job_title,
          supervisor: riwayat.t_supervisor.nama_lengkap,
          nik_spv: riwayat.nik_spv,
          loker: riwayat.t_lokasi_kerja.nama_lokasi_kerja,
          onboard: riwayat.tanggal_onboard,
        }));
        this.setState({
          dataRiwayat: riwayat,
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    const { perPage } = this.props;
    this.setState({
      pagination: {
        ...nextProps.pagination,
        pageSize: perPage,
      },
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
    localStorage.setItem("detail_id", key);
    sessionStorage.setItem("previousPath", window.location.pathname);
  };

  _getDataTkp = async (key) => {
    const token = localStorage.getItem("token");
    console.log('haha', key);
    const dataTkp = await axios
      .get(`http://ec2-54-179-167-74.ap-southeast-1.compute.amazonaws.com:4004/tkp/get_zip_file/` + key, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      })
      .then((response) => response)
      .catch((error) => console.error(error));

    const { status, data } = dataTkp;
    if (status === 200) {
      fileDownload(data, `${key}.zip`);
    }
  };

  render() {
    const { filterStat } = this.props;
    const { perPage } = this.props;
    const { dataRiwayat } = this.state;
    const sourceData =
      filterStat !== ""
        ? dataRiwayat.filter((obj) => obj.status === filterStat).splice( 0, perPage )
        : dataRiwayat;
  
      

    const columns = [
      {
        title: "No",
        width: "5%",
        key: "index",
        render: (text, name, index) => index + 1,
      },
      {
        title: "Nama TKP",
        dataIndex: "name",
        key: "name",
        width: "20%",
        className: "clientName" ? "show" : "hide",
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Bidang",
        dataIndex: "bidang",
        key: "bidang",
        sorter: (a, b) => a.bidang.localeCompare(b.bidang),
        ...this.getColumnSearchProps("bidang"),
      },
      {
        title: "Job Title",
        dataIndex: "jobTitle",
        key: "jobTitle",
        sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
        ...this.getColumnSearchProps("jobTitle"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        sorter: (a, b) => a.status.localeCompare(b.status),
        ...this.getColumnSearchProps("status"),
        render: (text) => {
          if (text === "Diterima") {
            return (
              <Typography
                style={{
                  color: "rgba(129, 199, 114, 1)",
                }}
              >
                <CircleIcon style={{ fontSize: "10px" }} /> {text}
              </Typography>
            );
          } else if (text === "Ditolak") {
            return (
              <Typography
                style={{
                  color: "rgba(238, 46, 36, 1)",
                }}
              >
                <CircleIcon style={{ fontSize: "10px" }} /> {text}
              </Typography>
            );
          } else {
            return (
              <Typography
                variant="span"
                style={{ color: "rgba(173, 173, 173, 1)" }}
              >
                <CircleIcon style={{ fontSize: "10px" }} /> {text}
              </Typography>
            );
          }
        },
      },
      {
        width: 125,
        title: "Aksi",
        dataIndex: "key",
        fixed: "right",
        render: (key) => (
          <div>
            <Tooltip placement="bottom" title={"Lihat Detail"}>
              <span
                onClick={this._handleOpenDetail.bind(this, key)}
                style={{ marginRight: 15, cursor: "pointer" }}
              >
                <EyeTwoTone />
              </span>
            </Tooltip>
            <Tooltip placement="bottom" title={"Unduh Data"}>
              <span>
                <DownloadOutlined
                  onClick={this._getDataTkp.bind(this, key)}
                  style={{ color: "#00FF00" }}
                />
              </span>
            </Tooltip>
          </div>
        ),
      },
    ];

    const columnSekbid = [
      {
        title: "No",
        key: "index",
        render: (text, name, index) => index + 1,
      },
      {
        title: "INT",
        dataIndex: "int",
        key: "int",
        sorter: (a, b) => a.int.localeCompare(b.int),
        ...this.getColumnSearchProps("int"),
      },
      {
        title: "Bidang",
        dataIndex: "bidang",
        key: "bidang",
        ...this.getColumnSearchProps("bidang"),
        sorter: (a, b) => a.bidang.localeCompare(b.bidang),
        ...this.getColumnSearchProps("bidang"),

      },
      {
        title: "Nama TKP",
        dataIndex: "name",
        key: "name",
        className: "clientName" ? "show" : "hide",
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Supervisor/PIC",
        dataIndex: "supervisor",
        key: "supervisor",
        sorter: (a, b) => a.supervisor.localeCompare(b.supervisor),
        ...this.getColumnSearchProps("supervisor"),
      },
      {
        title: "NIK SPV",
        dataIndex: "nik_spv",
        key: "nik_spv",
        ...this.getColumnSearchProps("nik_spv"),
        sorter: (a, b) => a.nik_spv.localeCompare(b.nik_spv),
      },
      {
        title: "Loker",
        dataIndex: "loker",
        key: "loker",
        ...this.getColumnSearchProps("loker"),
        sorter: (a, b) => a.loker.localeCompare(b.loker),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        ...this.getColumnSearchProps("status"),
        render: (text) => {
          if (text === "Diterima") {
            return (
              <Typography
                style={{
                  color: "rgba(129, 199, 114, 1)",
                }}
              >
                <CircleIcon style={{ fontSize: "10px" }} /> {text}
              </Typography>
            );
          } else if (text === "Ditolak") {
            return (
              <Typography
                style={{
                  color: "rgba(238, 46, 36, 1)",
                }}
              >
                <CircleIcon style={{ fontSize: "10px" }} /> {text}
              </Typography>
            );
          } else {
            return (
              <Typography
                variant="span"
                style={{ color: "rgba(173, 173, 173, 1)" }}
              >
                <CircleIcon style={{ fontSize: "10px" }} /> {text}
              </Typography>
            );
          }
        },
      },

      {
        title: "Job Title",
        dataIndex: "jobTitle",
        key: "jobTitle",
        ...this.getColumnSearchProps("jobTitle"),
        sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
      },
      {
        title: "Onboard",
        dataIndex: "onboard",
        key: "onboard",
        ...this.getColumnSearchProps("onboard"),
        sorter: (a, b) => a.onboard.localeCompare(b.onboard),
      },
      {
        title: "Perubahan Status Terakhir",
        dataIndex: "last_status",
        key: "last_status",
        ...this.getColumnSearchProps("last_status"),
        sorter: (a, b) => a.last_status.localeCompare(b.last_status),
      },

      {
        width: 125,
        title: "Aksi",
        dataIndex: "key",
        fixed: "right",
        render: (key) => (
          <div>
            <Tooltip placement="bottom" title={"Lihat Detail"}>
              <span
                onClick={this._handleOpenDetail.bind(this, key)}
                style={{ marginRight: 15, cursor: "pointer" }}
              >
                <EyeTwoTone />
              </span>
            </Tooltip>
            <Tooltip placement="bottom" title={"Unduh Data"}>
              <span>
                <DownloadOutlined
                  onClick={this._getDataTkp.bind(this, key)}
                  style={{ color: "#00FF00" }}
                />
              </span>
            </Tooltip>
          </div>
        ),
      },
    ];

    const typeAuth = localStorage.getItem("typeAuth");
    return (
      <Table
        columns={typeAuth === "sekretaris" ? columnSekbid : columns}
        dataSource={sourceData}
        pagination={{ pageSize: perPage }}
        scroll={{ x: "max-content" }}
        footer={() => ("menampilkan 1-" +perPage+ " dari " +sourceData.length+ " data")}
      />
    );
  }
}

TableRiwayat.defaultProps = {
  classes: {},
};

TableRiwayat.propTypes = {
  classes: PropTypes.object,
  perPage: PropTypes.string.isRequired,
  filterStat: PropTypes.string.isRequired,
};
