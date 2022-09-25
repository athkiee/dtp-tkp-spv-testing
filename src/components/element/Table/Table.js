import React from "react";
import "antd/dist/antd.css";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export default class TableRiwayat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      pageSize: 10,
    };
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

  render() {
    const { filterStat, perPage } = this.props;

    return (
      <Table
        columns={columns}
        dataSource={sourceData}
        pagination={{ pageSize: perPage }}
        scroll={{ x: "max-content" }}
        footer={() =>
          "Menampilkan 1-" + perPage + " dari " + sourceData.length + " data"
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
