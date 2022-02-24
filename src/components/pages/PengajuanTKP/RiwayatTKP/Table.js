import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined, EyeTwoTone, DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { ROUTES } from '../../../../configs';

const nik_spv = sessionStorage.getItem('nik');

export default class TableDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchedColumn: '',
      dataRiwayat: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4004/tkp?nik_spv='+ nik_spv)
      .then((response) => {
        const riwayat = response.data.map(riwayat => ({
          key: riwayat.id_tkp,
          bidang: riwayat.t_bidang.kode_bidang,
          name: riwayat.nama_lengkap,
          status: riwayat.t_status_tkp.nama_status_tkp,
          jobTitle: riwayat.t_job_title.nama_job_title,
        }))
        this.setState({
          dataRiwayat: riwayat
        })
      })
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
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
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
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

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  _handleOpenDetail = (key) => {
    window.location = ROUTES.DETAIL_TKP(key);
    localStorage.setItem('detail', key);
  }

  _handleOpenDetail = (key) => {
    window.location = ROUTES.DETAIL_TKP(key);
    localStorage.setItem('detail', key);
  }

  render() {

    const columns = [
      {
        title: 'No',
        width: '5%',
        key: 'index',
        render:(text, name, index) => index+1
      },
      {
        title: 'Nama TKP',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        className: 'clientName' ? "show" : "hide",
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Bidang',
        dataIndex: 'bidang',
        key: 'bidang',
        ...this.getColumnSearchProps('bidang'),
      },
      {
        title: 'Job Title',
        dataIndex: 'jobTitle',
        key: 'jobTitle',
        ...this.getColumnSearchProps('jobTitle'),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        ...this.getColumnSearchProps('status'),
      },
      {
        width: 125,
        title: 'Aksi',
        dataIndex: 'key',
        fixed: 'right',
        render: (key) => (
          <div>
            <span onClick={this._handleOpenDetail.bind(this, key)} style={{ marginRight: 15, cursor: 'pointer' }}>
              <EyeTwoTone />
            </span>
            <span>
              <DownloadOutlined style={{ color: '#00FF00' }} />
            </span>
          </div>
        )
      },
    ];
    return <Table columns={columns} dataSource={this.state.dataRiwayat} pagination={true} />;
  }
}