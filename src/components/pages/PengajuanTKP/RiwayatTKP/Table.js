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
      pageSize: 10,
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
        console.log(this.state.dataRiwayat);
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
  getColumnSearchProps = (dataIndex, title) => ({
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
          placeholder={`Cari ${title} disini`}
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
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{
              width: 93.5,
              height: 28,
              background: "#FFFFFF",
              borderRadius: "5px",
              color: "#000000",
              fontWeight: 700,
              fontSize: 12,
              border: "1px solid #C4C4C4",
            }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{
              width: 93.5,
              height: 28,
              background: "#DA1E20",
              borderRadius: "5px",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 12,
              border: "none",
            }}
          >
            Cari
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

  _getDataTkp = async (value) => {
    const token = localStorage.getItem("token");
    const dataTkp = await axios
      .get(
        `http://ec2-54-179-167-74.ap-southeast-1.compute.amazonaws.com:4004/tkp/get_zip_file/` +
          value.key,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      )
      .then((response) => response)
      .catch((error) => console.error(error));

    const { status, data } = dataTkp;
    if (status === 200) {
      fileDownload(data, `${value.name}.zip`);
    }
  };

  _renderStatus = (text) => {
    if (text === "Diterima") {
      return (
        <Typography
          style={{
            color: "rgba(129, 199, 114, 1)",
            fontSize: "14px",
          }}
        >
          <CircleIcon style={{ fontSize: "14px" }} /> {text}
        </Typography>
      );
    } else if (text === "Ditolak") {
      return (
        <Typography
          style={{
            color: "rgba(238, 46, 36, 1)",
            fontSize: "14px",
          }}
        >
          <CircleIcon style={{ fontSize: "14px" }} /> {text}
        </Typography>
      );
    } else if (text === "Kontrak Tidak Diperpanjang") {
      return (
        <Typography
          style={{
            color: "#36ADFD",
            fontSize: "14px",
            width: 220,
          }}
        >
          <CircleIcon style={{ fontSize: "14px" }} /> {text}
        </Typography>
      );
    } else if (text === "Menunggu Konfirmasi") {
      return (
        <Typography
          style={{
            color: "#F1B44C",
            fontSize: "14px",
          }}
        >
          <CircleIcon style={{ fontSize: "14px" }} /> {text}
        </Typography>
      );
    } else if (text === "Perubahan Job Title") {
      return (
        <Typography
          style={{
            color: "#FF8E26",
            fontSize: "14px",
          }}
        >
          <CircleIcon style={{ fontSize: "14px" }} /> {text}
        </Typography>
      );
    } else if (text === "Wawancara") {
      return (
        <Typography
          style={{
            color: "#FF787B",
            fontSize: "14px",
          }}
        >
          <CircleIcon style={{ fontSize: "14px" }} /> {text}
        </Typography>
      );
    } else {
      return (
        <Typography
          variant="span"
          style={{ color: "rgba(173, 173, 173, 1)", fontSize: "14px" }}
        >
          <CircleIcon style={{ fontSize: "14px" }} /> {text}
        </Typography>
      );
    }
  };

  render() {
    const { filterStat } = this.props;
    const { perPage } = this.props;
    const { dataRiwayat } = this.state;
    const sourceData =
      filterStat !== ""
        ? dataRiwayat
            .filter((obj) => obj.status === filterStat)
            .splice(0, perPage)
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
        ...this.getColumnSearchProps("name", "Nama TKP"),
      },
      {
        title: "Bidang",
        dataIndex: "bidang",
        key: "bidang",
        sorter: (a, b) => a.bidang.localeCompare(b.bidang),
        ...this.getColumnSearchProps("bidang", "Bidang"),
      },
      {
        title: "Job Title",
        dataIndex: "jobTitle",
        key: "jobTitle",
        sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
        ...this.getColumnSearchProps("jobTitle", "Job Title"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        sorter: (a, b) => a.status.localeCompare(b.status),
        ...this.getColumnSearchProps("status", "Status"),
        render: (text) => this._renderStatus(text),
      },
      {
        width: 125,
        title: "Aksi",
        dataIndex: ["name", "key"],
        fixed: "right",
        render: (text, id) => (
          <div>
            <Tooltip placement="bottom" title={"Lihat Detail"}>
              <span
                onClick={this._handleOpenDetail.bind(this, id.key)}
                style={{ marginRight: 15, cursor: "pointer" }}
              >
                <EyeTwoTone />
              </span>
            </Tooltip>
            <Tooltip placement="bottom" title={"Unduh Data"}>
              <span>
                <DownloadOutlined
                  onClick={this._getDataTkp.bind(this, id)}
                  style={{ color: "#00FF00" }}
                />
              </span>
            </Tooltip>
          </div>
        ),
      },
    ];

    const showFormattedDate = (date) => {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(date).toLocaleDateString("id-ID", options);
    };
    const columnSekbid = [
      {
        title: "No",
        key: "index",
        render: (text, current, index) => index + 1,
      },
      {
        title: "Nama TKP",
        dataIndex: "name",
        key: "name",
        className: "clientName" ? "show" : "hide",
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps("name", "Nama TKP"),
        render: (text) => {
          return <Typography style={{ fontSize: "14px" }}>{text}</Typography>;
        },
      },
      {
        title: "Supervisor",
        dataIndex: "supervisor",
        key: "supervisor",
        sorter: (a, b) => a.supervisor.localeCompare(b.supervisor),
        ...this.getColumnSearchProps("supervisor", "Supervisor"),
        render: (text) => {
          return <Typography style={{ fontSize: "14px" }}>{text}</Typography>;
        },
      },
      {
        title: "NIK SPV",
        dataIndex: "nik_spv",
        key: "nik_spv",
        ...this.getColumnSearchProps("nik_spv", "NIK SPV"),
        render: (text) => {
          return <Typography style={{ fontSize: "14px" }}>{text}</Typography>;
        },
      },
      {
        title: "Loker",
        dataIndex: "loker",
        key: "loker",
        ...this.getColumnSearchProps("loker", "Loker"),
        sorter: (a, b) => a.loker.localeCompare(b.loker),
        render: (text) => {
          return <Typography style={{ fontSize: "14px" }}>{text}</Typography>;
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        ...this.getColumnSearchProps("status", "Status"),
        render: (text) => this._renderStatus(text),
      },

      {
        title: "Job Title",
        dataIndex: "jobTitle",
        key: "jobTitle",
        ...this.getColumnSearchProps("jobTitle", "Job Title"),
        sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
        render: (text) => {
          return <Typography style={{ fontSize: "14px" }}>{text}</Typography>;
        },
      },
      {
        title: "Onboard",
        dataIndex: "onboard",
        key: "onboard",
        sorter: (a, b) => {
          const aa = new Date(a.onboard);
          const bb = new Date(b.onboard);
          return aa - bb;
        },
        render: (text) => {
          return text ? (
            <Typography style={{ fontSize: "14px" }}>
              {showFormattedDate(text)}
            </Typography>
          ) : (
            "-"
          );
        },
      },
      {
        title: "Perubahan Status Terakhir",
        dataIndex: "last_status",
        key: "last_status",
        ...this.getColumnSearchProps(
          "last_status",
          "Perubahan Status Terakhir"
        ),
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
        footer={() =>
          "Menampilkan 1 - " +
          (sourceData.length < perPage ? sourceData.length : perPage) +
          " dari " +
          sourceData.length +
          " data"
        }
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
