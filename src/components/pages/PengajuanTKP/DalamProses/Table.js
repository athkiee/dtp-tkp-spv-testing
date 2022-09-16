import React from "react";
import "antd/dist/antd.css";
import { Table, Input, Button, Space, Tooltip } from "antd";
import {
  SearchOutlined,
  EyeTwoTone,
  DownloadOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import { ROUTES, API } from "../../../../configs";
import moment from "moment";
import fileDownload from "js-file-download";

export default class TableDalamProses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      dataTKP: [],
      pagination: {
        current: 1,
        pageSize: 10,
      },
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const nik_spv = localStorage.getItem("nik");

    axios
      .get(API.tkpUnderSpv + nik_spv + "/dalam-proses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const tkp = response.data.map((tkp) => ({
          index: tkp,
          key: tkp.id_tkp,
          tanggal_pengajuan: moment(tkp.tanggal_pengajuan).format('LL'),
          name: tkp.nama_lengkap,
          jobTitle: tkp.t_job_title_levelling.nama_job_title_levelling,
          roles: tkp.t_job_role.nama_job_role,
          mitra: tkp.t_mitra.nama_mitra,
          bidang: tkp.t_bidang.kode_bidang,
          supervisor: tkp.t_supervisor.nama_lengkap,
          nik_spv: tkp.nik_spv,
          kelompokPekerjaan: tkp.t_kelompok_pekerjaan.nama_kelompok_pekerjaan,
          tanggalOnboard: tkp.tanggal_onboard,
          loker: tkp.t_lokasi_kerja.nama_lokasi_kerja,
          status: tkp.t_status_tkp.nama_status_tkp,
        }));
        this.setState({
          dataTKP: tkp,
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
            style={{ width: 93.5, height: 28, background: '#FFFFFF', borderRadius: '5px', color: '#000000', fontWeight: 700,
            fontSize: 12, border: '1px solid #C4C4C4' }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 93.5, height: 28, background: '#DA1E20', borderRadius: '5px', color: '#FFFFFF', fontWeight: 700,
            fontSize: 12, border: 'none' }}
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
      .get(`http://ec2-54-179-167-74.ap-southeast-1.compute.amazonaws.com:4004/tkp/get_zip_file/` + value.key, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      })
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
            fontSize: "14px"
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
            fontSize: "14px"
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
            width: 220
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
            fontSize: "14px"
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
            fontSize: "14px"
          }}
        >
          <CircleIcon style={{ fontSize: "14px" }} /> {text}
        </Typography>
      );
    }
    else if (text === "Wawancara") {
      return (
        <Typography
          style={{
            color: "#FF787B",
            fontSize: "14px"
          }}
        >
          <CircleIcon style={{ fontSize: "14px" }} /> {text}
        </Typography>
      );
    }
    else {
      return (
        <Typography
          variant="span"
          style={{ color: "rgba(173, 173, 173, 1)",
          fontSize: "14px" }}
          
        >
          <CircleIcon style={{ fontSize: "14px" }} /> {text}
        </Typography>
      );
    }
  }

  render() {
    const { perPage } = this.props;
    const columns = [
      {
        title: "No",
        key: "index",
        render: (text, name, index) => index + 1,
      },
      {
        title: "Tanggal Pengajuan",
        dataIndex: "tanggal_pengajuan",
        key: "tanggal_pengajuan",
        sorter: (a, b) =>
          a.tanggal_pengajuan.localeCompare(b.tanggal_pengajuan),
        ...this.getColumnSearchProps("tanggal_pengajuan", "Tanggal Pengajuan"),
      },
      {
        title: "Nama Calon TKP",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps("name", "Nama Calon TKP"),
      },
      {
        title: "Job Title",
        dataIndex: "jobTitle",
        key: "jobTitle",
        sorter: (a, b) => a.roles.localeCompare(b.jobTitle),
        ...this.getColumnSearchProps("jobTitle", "Job Title"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        sorter: (a, b) => a.status.localeCompare(b.status),
        ...this.getColumnSearchProps("status", "Status"),
        render: (text) => this._renderStatus(text)
      },
      {
        width: 125,
        title: "Aksi",
        dataIndex: ['name', 'key'],
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

    const columnsekbid = [
      {
       
        title: "No",
        dataIndex: "index",
        key: "index",
        render: (text, name, index) => index + 1,
      },
      {
        
        title: "Bidang",
        dataIndex: "bidang",
        key: "bidang",
        sorter: (a, b) => a.bidang.localeCompare(b.bidang),
        ...this.getColumnSearchProps("bidang", "Bidang"),
      },
      {
      
        title: "Nama TKP",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps("name", "Nama TKP"),
      },
      {
        
        title: "Supervisor",
        dataIndex: "supervisor",
        key: "supervisor",
        sorter: (a, b) => a.supervisor.localeCompare(b.supervisor),
        ...this.getColumnSearchProps("supervisor", "Supervisor"),
      },
      {
        
        title: "Nik SPV",
        dataIndex: "nik_spv",
        key: "nik_spv",
        sorter: (a, b) => a.nik.localeCompare(b.nik_spv),
        ...this.getColumnSearchProps("nik_spv", "Nik SPV"),
      },
      {
        title: "Loker",
        dataIndex: "loker",
        key: "loker",
        sorter: (a, b) => a.loker.localeCompare(b.loker),
        ...this.getColumnSearchProps("loker", "Loker"),
      },
      {
        title: "Job Title",
        dataIndex: "jobTitle",
        key: "jobTitle",
        sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
        ...this.getColumnSearchProps("jobTitle", "Job Title"),
      },
      {
        
        title: "Kelompok Pekerjaan",
        dataIndex: "kelompokPekerjaan",
        key: "kelompokPekerjaan",
        sorter: (a, b) =>
          a.kelompokPekerjaan.localeCompare(b.kelompokPekerjaan),
        ...this.getColumnSearchProps("kelompokPekerjaan", "Kelompok Pekerjaan"),
      },

      {
        title: "Mitra",
        dataIndex: "mitra",
        key: "mitra",
        ...this.getColumnSearchProps("mitra", "Mitra"),
      },
      {
        title: "Onboard",
        dataIndex: "tanggalOnboard",
        key: "tanggalOnboard",
        sorter: (a, b) => a.tanggalOnboard.localeCompare(b.tanggalOnboard),
        ...this.getColumnSearchProps("tanggalOnboard", "Onboard"),
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
                    "http://ec2-54-179-167-74.ap-southeast-1.compute.amazonaws.com:4004/tkp/get_zip_file/216"
                  )
                }
                style={{ color: "#00FF00" }}
              />
            </span>
          </div>
        ),
      },
    ];
    const typeAuth = localStorage.getItem("typeAuth");

    return (
      <Table
        columns={typeAuth === "sekretaris" ? columnsekbid : columns}
        dataSource={this.state.dataTKP}
        pagination={{ pageSize: perPage }}
        scroll={{ x:"max-content" }}
        footer={() => ("Menampilkan 1-" + perPage + " dari " + this.state.dataTKP.length + " data")}
      
      />
    );
  }
}

TableDalamProses.defaultProps = {
  classes: {},
};

TableDalamProses.propTypes = {
  classes: PropTypes.object,
  perPage: PropTypes.string.isRequired,
};
