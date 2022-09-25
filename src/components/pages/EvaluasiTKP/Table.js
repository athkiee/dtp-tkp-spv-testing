import React from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { Table, Input, Button, Space, Tooltip } from "antd";
import {
  SearchOutlined,
  FileAddOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { API, ROUTES } from "../../../configs";
import Typography from "@material-ui/core/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import ModalSuccess from "../../element/ModalSuccess";
import ModalConfirmation from "../../element/ModalConfirmation";
import { EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const token = localStorage.getItem("token");

export default class TableDashboard extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    modalSuccess: false,
    dialogConfirmation: false,
    evaluasi_id: "",
    dataTKP: [],
  };

  componentDidMount() {
    const nik_spv = localStorage.getItem("nik");
    const token = localStorage.getItem("token");
    axios
      .get(API.tkpUnderSpv + nik_spv + "/aktif", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        const tkp = response.data.map((tkp) => ({
          key: tkp.id_tkp,
          name: tkp.nama_lengkap,
          jobTitle: tkp.t_job_title_levelling.nama_job_title_levelling,
          status: tkp.status_buka_evaluasi,
          evaluasi: tkp.t_evaluasi_tkps.status_evaluasi,
          roles: tkp.t_job_role.nama_job_role,
          mitra: tkp.t_mitra.nama_mitra,
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

  _handleOpenDetail = (key) => {
    window.location = ROUTES.PENILAIAN_TKP(key);
    localStorage.setItem("detail_id", key);
  };

  _handleSendEvaluasi = () => {
    const { evaluasi_id } = this.state;
    const list_tkp = [{ id_tkp: evaluasi_id }];
    axios
      .post(
        API.detailTkp + "evaluasi-tkp/kirim",
        { list_tkp },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        this.setState({
          modalSuccess: true,
        });
      });
  };

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

  _renderModalConfirm = (key) => {
    this.setState({
      dialogConfirmation: true,
      evaluasi_id: key,
    });
  };

  _renderStatus = (id) => {
    const status = id.status;
    const formEval = id.evaluasi;
    if ((status === 1 && formEval === 3) || (status === 2 && formEval === 3)) {
      return (
        <Typography
          style={{
            color: "#EB681F",
            fontSize: "14px",
          }}
        >
          <CircleIcon style={{ fontSize: "14px" }} /> Draft
        </Typography>
      );
    } else if (
      (status === 1 && formEval === 1) ||
      (status === 1 && formEval === 2)
    ) {
      return (
        <Typography
          style={{
            color: "#DA1E20",
            fontSize: "14px",
          }}
        >
          <CircleIcon style={{ fontSize: "14px" }} /> Belum Dinilai
        </Typography>
      );
    } else if (
      (status === 0 && formEval === 4) ||
      (status === 0 && formEval === 3) ||
      (status === 1 && formEval === 4)
    ) {
      return (
        <Typography
          style={{
            color: "#1F9515",
            fontSize: "14px",
          }}
        >
          <CircleIcon style={{ fontSize: "14px" }} /> Sudah Dinilai
        </Typography>
      );
    } else {
      return (
        <Typography
          variant="span"
          style={{ color: "rgba(173, 173, 173, 1)", fontSize: "14px" }}
        >
          <CircleIcon style={{ fontSize: "14px" }} /> Belum Dibuka
        </Typography>
      );
    }
  };

  render() {
    const { dataTKP } = this.state;
    const { perPage } = this.props;

    const columns = [
      {
        title: "Nama TKP",
        dataIndex: "name",
        key: "name",
        width: "20%",
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps("name", "Nama TKP"),
      },
      {
        title: "Job Title",
        dataIndex: "jobTitle",
        key: "jobTitle",
        sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
        ...this.getColumnSearchProps("jobTitle", "Job Title"),
      },
      {
        title: "Status Penilaian",
        dataIndex: ["name", "key"],
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps("status", "Status Penilaian"),
        render: (text, id) => this._renderStatus(id),
      },
      {
        title: "Mitra",
        dataIndex: "mitra",
        key: "mitra",
        sorter: (a, b) => a.mitra.localeCompare(b.mitra),
        ...this.getColumnSearchProps("mitra", "Mitra"),
      },
      {
        width: 125,
        title: "Aksi",
        dataIndex: ["name", "key"],
        fixed: "right",
        render: (text, id) => (
          <div>
            {(id.status === 1 && id.evaluasi === 1) ||
            (id.status === 1 && id.evaluasi === 2) ? (
              <Tooltip placement="bottom" title={"Tambah Penilaian"}>
                <FileAddOutlined
                  onClick={this._handleOpenDetail.bind(this, id.key)}
                  style={{
                    marginRight: 20,
                    fontSize: "25px",
                    color: "#DA1E20",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            ) : (id.status === 1 && id.evaluasi === 3) ||
              (id.status === 2 && id.evaluasi === 3) ? (
              <Tooltip placement="bottom" title={"Edit Penilaian"}>
                <EditOutlined
                  onClick={this._handleOpenDetail.bind(this, id.key)}
                  style={{
                    marginRight: 20,
                    fontSize: "25px",
                    color: "#1F9515",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            ) : (
              <FileAddOutlined
                disabled
                style={{
                  marginRight: 20,
                  fontSize: "25px",
                  color: "rgba(173, 173, 173, 1)",
                }}
              />
            )}
            {(id.status === 2 && id.evaluasi === 3) ||
            (id.status === 1 && id.evaluasi === 3) ? (
              <Tooltip placement="bottom" title={"Kirim Penilaian"}>
                <SendOutlined
                  onClick={this._renderModalConfirm.bind(this, id.key)}
                  style={{
                    transform: "rotate(-45deg)",
                    fontSize: "25px",
                    color: "#BF22C2",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            ) : (
              <SendOutlined
                style={{
                  transform: "rotate(-45deg)",
                  color: "rgba(173, 173, 173, 1)",
                  fontSize: 25,
                }}
              />
            )}
          </div>
        ),
      },
    ];

    return (
      <div>
        <Table
          columns={columns}
          dataSource={dataTKP}
          pagination={{ pageSize: perPage }}
          footer={() =>
            "Menampilkan 1 - " +
            (this.state.dataTKP.length < perPage
              ? this.state.dataTKP.length
              : perPage) +
            " dari " +
            this.state.dataTKP.length +
            " data"
          }
        />
        <ModalConfirmation
          title={"Kirim Penilaian Evaluasi TKP"}
          description={"Anda yakin ingin mengirimkan Penilaian Evaluasi TKP?"}
          open={this.state.dialogConfirmation}
          handleClose={() => this.setState({ dialogConfirmation: false })}
          getData={this._handleSendEvaluasi}
        />
        <ModalSuccess
          open={this.state.modalSuccess}
          label="Pengiriman Evaluasi TKP Berhasil!"
          handleClose={() => window.location.reload()}
        />
      </div>
    );
  }
}

TableDashboard.defaultProps = {
  classes: {},
  perPage: 10,
};

TableDashboard.propTypes = {
  classes: PropTypes.object,
  perPage: PropTypes.string.isRequired,
};
