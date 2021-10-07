import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import axios from 'axios';

const data = [
  {
    key: '1',
    name: 'Tono',
    jobTitle: 'Administration',
    roles: 'Digital Business Partnership',
    mitra: 'SKI',
  }
];

export default class TableDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchedColumn: '',
      dataTKP: [{
        key: '1',
        name: 'Tono',
        jobTitle: 'Administration',
        roles: 'Digital Business Partnership',
        mitra: 'SKI',
      }]

    }
  }

  componentDidMount() {
    axios.get('http://localhost:4004/tkp/')
      .then((response) => {
        const tkp = response.data.map(tkp => ({
          key: tkp.id_tkp,
          name: tkp.nama_lengkap,
          jobTitle: tkp.t_job_title.nama_job_title,
          roles: tkp.t_job_role.nama_job_role,
          mitra: tkp.t_mitra.nama_mitra
        }))
        this.setState({
          dataTKP: tkp
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

  render() {

    const columns = [
      {
        title: 'Nama TKP',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Job Title',
        dataIndex: 'jobTitle',
        key: 'jobTitle',
        width: '20%',
        ...this.getColumnSearchProps('jobTitle'),
      },
      {
        title: 'Job Role',
        dataIndex: 'roles',
        key: 'roles',
        ...this.getColumnSearchProps('roles'),
      },
      {
        title: 'Mitra',
        dataIndex: 'mitra',
        key: 'mitra',
        ...this.getColumnSearchProps('mitra'),
      },
      {
        width: 125,
        title: 'Aksi',
        dataIndex: 'aksi',
        fixed: 'right',
        render: () => (
          <div>
            <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
            <span> </span>
            <GetAppOutlinedIcon></GetAppOutlinedIcon>
          </div>
        )
      },
    ];
    return <Table columns={columns} dataSource={this.state.dataTKP} pagination={true} />;
  }
}