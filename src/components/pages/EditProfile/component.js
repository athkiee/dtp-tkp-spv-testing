import React, { useState } from "react";
import axios from "axios";
import { Grid, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Select, Breadcrumb, Modal, Form, Input, InputNumber, Tabs, Row, Col, Avatar, Tooltip } from "antd";
import { ROUTES, API } from "../../../configs";
import HeadBar from "../../constant/headBar"
import { EditOutlined } from "@ant-design/icons";

import "./styles.css";

import ModalSuccess from "../../element/ModalSubmit/success.js";
import ModalFailed from "../../element/ModalSubmit/failed.js";


function EditProfile(){
  const token_spv = localStorage.getItem("token");
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG1pbiI6NywibmFtYV9sZW5na2FwIjoiQWRtaW4gdGVzdCAxIiwibmlrIjoiMTIzNDU2IiwiZW1haWwiOiJkdHB0a3AyMUBnbWFpbC5jb20iLCJub19ocCI6IjA4OTEyNzgzODY3MzciLCJ1c2VyX3R5cGUiOiJhZG1pbiIsImlhdCI6MTY2NjMwNjQzNCwiZXhwIjoxNjY2MzkyODM0fQ.vJjNfeZwCZjGnsvbDCnCqQrKJknSEpr1kn1fYdKO7ok"
  const id = localStorage.getItem('id_spv');
  const [form] = Form.useForm();
  // eslint-disable-next-line
  const [nikValid = true, setNikValid] = React.useState([]);
  // eslint-disable-next-line
  const [passwordValid = true, setpasswordValid] = React.useState([]);
  // eslint-disable-next-line
  const [phoneValid = true, setphoneValid] = React.useState([]);
  const [bidang, setBidang] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState([]);
  const { TabPane } = Tabs;
  const [tabKey, setTabKey] = useState(true);
  const changeTab = (key) => {
    // console.log(key);
    setTabKey(!tabKey);
  };
  React.useEffect(() => {
    fetchBidang();
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [spv, setSpv] = useState([])

  const loadData = () => {
    axios
      .get(API.loadSpv + id, {
        headers: { Authorization: `Bearer ${token_spv}` },
      })
      .then((res) => {
        if (res) {
          form.setFieldsValue({
            nik_spv: res.data.nik_spv,
            nama_lengkap: res.data.nama_lengkap,
            email: res.data.nik_spv + "@telkom.co.id",
            no_hp: res.data.no_hp,
            id_bidang: res.data.id_bidang
            // props.data ? props.data.target_id : ""
          });
          setSpv(res.data)
          // console.log("res", res)
        }
      });
  };

  const stringAvatar = () => {
    const name = spv.nama_lengkap
    if (name) {
      const splitStringName = name.split(" ");
      if (splitStringName.length === 1) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${splitStringName[0][0]}`,
        };
      } else {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${splitStringName[0][0]}${
            splitStringName[splitStringName.length - 1][0]
          }`,
        };
      }
    }
  }
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }


  const fetchBidang = () => {
    axios
      .get(API.allBidang, {
        headers: { Authorization: `Bearer ${token_spv}` },
      })
      .then((res) => {
        if (res) {
          setBidang(res.data);
        }
      });
  };

  const onFinish = (values) => {
    const dataSpv = {
      nik: values.nik_spv,
      nama_lengkap: values.nama_lengkap,
      email: values.nik_spv + "@telkom.co.id",
      no_hp: values.no_hp,
      id_bidang: values.id_bidang,
      password: values.password,
    };
    // console.log("formSubmit", dataSpv)
    axios
      .post(API.editSpv+id, dataSpv, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_spv}`,
        },
      })
      .then(async (res) => {
        if (res) {
          await form.resetFields();
          setInputSukses(true);
        } 
      })
      .catch((error, response) => {
        // console.log("eror",error)
        // console.log("eror mes",error.response.data.message)
        const message = error.response.message
        if(message === "NIK sudah terdaftar"){
          setInputGagal(true);
          setErrorMessage(message)
        } else if(message === "No. Handphone sudah terdaftar"){
          setInputGagal(true);
          setErrorMessage(message)
        } else if(message === "Email sudah terdaftar" || "NIK Tidak sesuai format"){
          setInputGagal(true);
          setErrorMessage("NIK sudah terdaftar")
        }
      });
      localStorage.setItem('nama', values.nama_lengkap);
  };

  const onFinishFailed = (errorInfo) => {
    const error = errorInfo;
    Modal.error({
      content: error,
      onOk() {},
    });
  };

    const useStyles = makeStyles((theme) => ({
        root: {
          display: "flex",
        },
        toolbar: {
          paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 8px",
          ...theme.mixins.toolbar,
        },
        submitForm: {
          width: "150px",
          height: "40px",
          color: "white",
          borderColor: "#DA1E20",
          borderRadius: 10,
          backgroundColor: "#DA1E20",
          // "&:hover": {
          //   color: "#DA1E20",
          //   backgroundColor: "white",
          //   borderColor: "#DA1E20",
          // },
        },
        containerEditSpv: {
          maxWidth: "95.3%",
          height: "auto",
          float: "center",
          marginLeft: 35,
          backgroundColor: "white",
          borderRadius: 10,
        },
        menuButton: {
          marginRight: 36,
        },
        menuButtonHidden: {
          display: "none",
        },
        title: {
          flexGrow: 1,
        },
        negativeCase: {
          fontSize: "12px",
          color: "#EE2E24",
        },
        noteModal: {
          marginTop: "8px",
          fontSize: "11px",
          lineHeight: "12px",
          color: "rgba(0, 0, 0, 0.6)",
        },
        inputForm: {
          display: "block",
          paddingLeft: 10,
          borderRadius: 2,
          height: 40,
          width: "100%",
        },
        inputPassword: {
          borderRadius: 2,
          height: 40,
          width: "100%",
        },
        selectForm: {
          display: "block",
          paddingLeft: 2,
          borderRadius: 2,
          // height: 60,
          width: "100%",
        },
        drawerPaper: {
          position: "relative",
          whiteSpace: "nowrap",
          width: drawerWidth,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        drawerPaperClose: {
          overflowX: "hidden",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
          },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          backgroundColor: "#E5E5E5",
        },
        container: {
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(4),
        },
        paper: {
          padding: theme.spacing(2),
          display: "flex",
          overflow: "auto",
          flexDirection: "column",
        },
        fixedHeight: {
          height: 240,
        },
        btnActive:{
          color:"white",
          backgroundColor:"#d51200",
          border:"none",
          fontWeight:"bolder",
          fontSize:16,
          width:"100%",
          marginTop:"20px",
          marginBottom:"50px",
          borderRadius:"10px",
          textTransform:"capitalize"
        },
        editSpvWelcome:{
          color:"#d41400",
          // fontWeight:400,
          paddingLeft:20,
          paddingTop:20,
          paddingBottom:20,
          fontSize:"1.25rem",
          fontFamily:"Montserrat"
        }
    
      }));
    const drawerWidth = 240;
    const classes = useStyles();
    const important = <b style={{ color: "#EE2E24" }}>*</b>;
    function handleChange(nikSpv) {
      form.setFieldsValue({
        email: nikSpv + "@telkom.co.id",
      });
    }
    const onSearch = (value) => {
      // console.log('search:', value);
    };
    const [openForm = false, setOpenForm] = useState()
    const foundBidang = bidang.find(obj => {
      return obj.id_bidang === spv.id_bidang;
    });

    const kodeBidang = foundBidang ? foundBidang.kode_bidang : ""

    const listProfiler = [
      {
        title: "NIK",
        desc: spv.nik_spv,
      },
      {
        title: "Nama Supervisor",
        desc: spv.nama_lengkap,
      },
      {
        title: "Email",
        desc: spv.email,
      },
      {
        title: "Nomor WhatsApp Aktif",
        desc: spv.no_hp,
      },
      {
        title: "Bidang",
        desc: kodeBidang,
      },
    ];

    const [inputSukses, setInputSukses] = useState(false)
    const [inputGagal, setInputGagal] = useState(false)
    const refreshPage = () =>{
      window.location = ROUTES.EDIT_PROFILE()
    }

    return(
        <div className={classes.root}>
            <HeadBar/>
            <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Breadcrumb style={{ marginLeft: 35, marginTop: 35 }}>
            <Breadcrumb.Item style={{ cursor: "pointer" }}>
              <a
                href="#Beranda"
                onClick={() => (window.location = ROUTES.DASHBOARD())}
              >
                Beranda
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ cursor: "pointer" }}>
              <a
                href="#KelolaAkun"
                onClick={() => (window.location = ROUTES.EDIT_PROFILE())}
              >
                Profil
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        <h1 style={{ marginLeft: 35, marginTop: 35, fontSize: 20 }}>
              <strong>Profil</strong>
            </h1>
            <p style={{ marginLeft: 35, marginBottom: 10 }}>
            Kelola Data Profil Anda pada halaman ini.
            </p>
            <Container className={classes.containerEditSpv}>
          <Grid>
            <h2 className={classes.editSpvWelcome}>Welcome Back</h2>
          </Grid>
          {/* Data */}
          <Grid container style={{paddingLeft:40}}>
            <Grid item style={{width:"max-content"}}>
              <Row align="middle">
                <Col
                  // span={12}
                  style={{
                    height:"180px",
                    width:"max-content",
                    borderRight: "4px solid #DA1E20",
                    marginBottom:20,
                    display:"flex",
                    alignItems: "center",
                        justifyContent: "center",
                  }}
                >
                  <Row >
                    <Col            
                      style={{
                        width:"max-content",
                        display: "flex",
                        flexDirection: "column",                 
                        paddingLeft:20,
                        paddingRight:20,

                      }}
                    >
                      <Avatar
                      size={110}
                      style={{
                        color: "#131b23",
                        fontSize:"2rem",
                        fontWeight: "bold",
                        backgroundColor: "#EAEAF1",
                      }}
                      {...stringAvatar(spv.nama_lengkap)}
                      />
                    </Col>
                    <Col
                      style={{width:"max-content"}}
                    >
                      <h3 
                      style={{
                              color: "#DA1E20",
                              fontWeight: "bold",
                              marginTop: 25,
                              width:"max-content",
                      }}>
                        {spv.nama_lengkap}  
                        <span
                          onClick={()=>
                            setOpenForm(!openForm)
                          }
                          style={{ cursor: "pointer", color: "#38ce76", marginLeft:5, paddingRight:30 }}
                        >
                        <Tooltip placement="rightBottom" title="Edit Profil">
                          <EditOutlined />
                        </Tooltip>
                        </span>
                      </h3>
                      <p>Supervisor</p>
                    </Col>
                  </Row>
                </Col>
                <Col
                  // span={16}
                  style={{
                    width: "500px"
                  }}
                >
                  {listProfiler.map((item, idx) => (
                        <Row style={{ marginBottom: 14, paddingLeft:30 }}>
                          <Col span={8}>{item.title}</Col>
                          <Col span={1}>:</Col>
                          <Col span={10}>{item.desc}</Col>
                        </Row>
                      ))}
                </Col>
              </Row>
              
            </Grid>
          </Grid>
          {/* Form */}
          <Grid container hidden={openForm === false ? true : false}>
            <Grid item xs={7}>
              <div style={{ margin: 30}}>
                <Form
                  form={form}
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Tabs
                    defaultActiveKey="1"
                    onChange={changeTab}
                    tabBarStyle={{
                      paddingLeft: 20,
                      borderTop: "0.85px solid #8E8181",
                      borderBottom: "0.90px solid #8E8181",
                    }}
                >
                <TabPane tab="Ubah Data" key="1" style={{textDecoration:"none", paddingLeft:20, paddingTop:10}}>
                  <label className="form-label">NIK{important}</label>
                  <Form.Item
                    name="nik_spv"
                    rules={[
                      { required: true, message: "Masukkan NIK"},
                      { pattern: /^[\d]{6,6}$/, message:"NIK tidak valid"},                
                    ]}     
                    // help={nikValid ? "NIK terdiri dari 6 digit" : null}
                    style={{marginBottom:8}} 
                  > 
                    <InputNumber type="number" style={{width: "100%"}} onChange={handleChange}
                    onWheel={(e) => e.target.blur()} disabled/>            
                  </Form.Item>

                  <label className="form-label">
                    Nama Supervisor{important}
                  </label>
                  <Form.Item
                    name="nama_lengkap"
                    rules={[
                      {
                        required: true,
                        message: "Masukkan nama Supervisor",
                      },
                      {
                        //eslint-disable-next-line
                        // pattern: /^[a-zA-Z@~`!@#$%^&*( )_=+\\\\';:\"\\/?>.<,-]+$/i,
                        pattern:/^[A-Za-z-' ]+$/,
                        message:"Nama Supervisor hanya dapat menggunakan huruf dan simbol apostrof (') & strip (-)"
                      }
                    ]}
                  >    
                  <Input disabled/>
                  </Form.Item>
                  <label className="form-label">Email{important}</label>
                  <Form.Item
                    name="email"
                    // rules={[
                    //   { required: true, message: "Email tidak boleh kosong" },
                    // ]}
                  >
                    <Input disabled/>
                  </Form.Item>

                  <label className="form-label">
                    Nomor WhatsApp Aktif{important}
                  </label>
                  <Form.Item
                    name="no_hp"
                    rules={[
                      {required: true, message: "Masukkan nomor Whatsapp aktif"},
                      {pattern : /^(\+62|62|0)8[1-9][0-9]{3,12}$/}
                    ]}
                    // help={ phoneValid ? "Nomor WhatsApp Aktif terdiri dari 6-15 karakter" : null }
                    style={{marginBottom:8}}
                  >
                    <Input style={{width:"100%"}} disabled/>
                  </Form.Item>

                  <label className="form-label">Bidang{important}</label>
                  <Form.Item
                    name="id_bidang"
                    // rules={[
                    //   { required: true, message: "Bidang tidak boleh kosong" },
                    // ]}
                  >
                    <Select 
                    showSearch
                    optionFilterProp="children"
                    onSearch={onSearch}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    disabled
                    >
                      {bidang.length > 0
                        ? bidang.map((v, i) => (
                            <Select.Option value={v.id_bidang} key={i}>
                              {v.kode_bidang}
                            </Select.Option>
                          ))
                        : null}
                    </Select>
                  </Form.Item>

                  {/* <Form.Item
                  noStyle
                  shouldUpdate
                  >
                   {({ getFieldsValue }) => {
                      const { 
                        nik_spv,
                        nama_lengkap, 
                        no_hp,
                        email,
                         } = getFieldsValue();
                      const formIsComplete = !!nik_spv && !!nama_lengkap && !!email && !!no_hp;
                      return (
                      <Button 
                        type="submit" 
                        htmlType="submit"                  
                          disabled={!formIsComplete}   
                          style={{
                            color:"white",
                            backgroundColor:"#d51200",
                            border:"none",
                            fontWeight:"bolder",
                            fontSize:16,
                            width:"100%",
                            marginTop:"10px",
                            marginBottom:"50px",
                            borderRadius:"10px",
                            textTransform:"capitalize"
                            }}  
                        >                      
                        Simpan
                      </Button>
                      );
                    }}
                  </Form.Item> */}
                </TabPane>
              
                <TabPane tab="Ubah Sandi" key="2" style={{paddingLeft:20, paddingTop:10}}>
                  <label className="form-label">Sandi Baru</label>
                  <Form.Item 
                  name="password"
                  rules={[
                    { pattern: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/ , message: "Sandi setidaknya terdiri dari 8 karakter alfanumerik"},         
                  ]}
                  // help="Sandi setidaknya terdiri dari 8 karakter alfanumerik"
                  style={{marginBottom:8}}>
                    <Input.Password />
                  </Form.Item>

                  <label className="form-label">
                    Konfirmasi Sandi Baru
                  </label>
                  <Form.Item 
                  name="password2"
                  rules={[  
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Konfirmasi sandi tidak sama'));
                      },
                    }),    
                  ]}
                  dependencies={['password']}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                  noStyle
                  shouldUpdate>
                  {({ getFieldsValue }) => {
                      const { 
                      password,
                      password2 } = getFieldsValue();
                      const formIsComplete = !!password && !!password2;
                      return (
                      <Button 
                        type="submit" 
                        htmlType="submit"                  
                          disabled={!formIsComplete}   
                          style={{
                            cursor:"pointer",
                            color:"white",
                            backgroundColor:"#d51200",
                            border:"none",
                            fontWeight:"bolder",
                            fontSize:16,
                            width:"100%",
                            marginTop:"10px",
                            marginBottom:"50px",
                            borderRadius:"10px",
                            textTransform:"capitalize"
                            }}  
                        >                      
                        Simpan
                      </Button>
                      );
                    }}
                  </Form.Item>
                  </TabPane>
                </Tabs>
                </Form>
              </div>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="lg" className={classes.container}></Container>
        <ModalSuccess
          open={inputSukses}
          handleClose={() => {
            setInputSukses(false)
            refreshPage()
            }
          }
          title={"Sandi Berhasil Diubah"}
        />
        <ModalFailed
          open={inputGagal}
          handleClose={() =>
            setInputGagal(false)
          }
          color={"#2ECC71"}
          title={errorMessage}
          description={"Sandi Gagal Diubah "}
        />
            </main>
        </div>
    );
}
export default EditProfile