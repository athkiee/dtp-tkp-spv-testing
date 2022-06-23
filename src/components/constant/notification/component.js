import React from 'react'
import Popover from "@material-ui/core/Popover";
import Card from "@material-ui/core/Card";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Avatar from "@material-ui/core/Avatar";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import WebAssetOffOutlinedIcon from '@mui/icons-material/WebAssetOffOutlined';
import axios from "axios";
import { API } from "../../../configs";


export default class NotificationPopover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            data: [],
            dataNotif: [],
            dataNotifCount: 0,
        };
    }
    


    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

  

    async componentDidMount() {
        const token = localStorage.getItem("token");
        const nik_spv = localStorage.getItem("nik");
        await axios
            .get(API.notification_spv + nik_spv + "/terbaru", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                const data = response.data.notifikasi_spv.map((notif) => ({
                    key:notif.id_notifikasi_spv,
                    kategori: notif.id_kategori_notifikasi,
                    message: notif.detail_notifikasi_spv.pesan_notifikasi,
                    status: notif.status_baca,
                    tanggal: notif.tanggal_kirim,
                    aksi: notif.detail_notifikasi_spv.aksi_notifikasi,
                }));
                this.setState({
                    data: data,
                    
                });
            });
        console.log(localStorage);

        await axios
            .get(API.notification_spv + nik_spv + "/sudah-dibaca", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                const data = response.data.notifikasi_spv.map((notif) => ({
                    key:notif.id_notifikasi_spv,
                    kategori: notif.id_kategori_notifikasi,
                    message: notif.detail_notifikasi_spv.pesan_notifikasi,
                    status: notif.status_baca,
                    tanggal: notif.tanggal_kirim,
                    aksi: notif.detail_notifikasi_spv.aksi_notifikasi,
                }));
                this.setState({
                    dataNotif: data,
                });
            }
            );
    }

   

    handleread = async (key) => {
        const token = localStorage.getItem("token");
        const data = {
            status_baca: 1,
        };
     
        await axios
            .put(API.notification_spv + `${key}`+ "/read",data,{
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                console.log("testread", response);
                
                
            });


    }

      

    

   

    handleaksi = (key) => {

        this.handleread(key);
        this.handleClose(key);
       
    }

    render() {
        const { anchorEl, open, } = this.state;
        const { data } = this.state;
        const { dataNotif} = this.state;
        return (
            <div>
                <IconButton
                    aria-label="Notifications"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <Badge badgeContent={
                        this.state.data.filter((item) => item.status === 0).length
                    } color="secondary">
                        <NotificationsNoneIcon />
                    </Badge>

                    

                  
                </IconButton>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <Card 
                    style={{
                        width:'350px',
                        height:'500px',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        }}
                    >
                        <div >
                        <Typography variant="h6" style={{ fontSize:"14px", padding: "10px", fontFamily: "Montserrat" }}>
                           Notifikasi
                        </Typography>
                        </div>
                        <div  >
                            {data.map((notif, index) => (
                                <div key={
                                    notif.key
                                } >
                              <Link
                                  onClick={() => {
                                            notif.status=1;
                                            window.location.href = notif.aksi
                                            this.handleaksi(notif.key);
                                  }}
                                   
                                   style={{ textDecoration: "none",
                                      color: "black",
                                      cursor: "pointer",
                                     }}
                                       >
                                  <div style={{ display: "flex", alignItems: "center",
                                            backgroundColor: notif.status === 0 ? "#F6FBFF" : "white", padding:"10px"
                                }}>
                                  <Avatar  variant='elips' style={{
                                        width: '50px',
                                        height: '50px',
                                                backgroundColor: notif.kategori === 2 ? '#DBE8F4' : notif.kategori === 3 ? '#CCEDC4' : notif.kategori === 4 ? '#EBD0D1' : notif.kategori === 5 ? '#FFBD70' : notif.kategori === 6 ? '#B5D8F7' : notif.kategori === 7 ? '#FF979A' : '#FF979A',
                                                color: notif.kategori === 2 ? '#66ACEA' : notif.kategori === 3 ? '#409C2A' : notif.kategori === 4 ? '#EE2E24' : notif.kategori === 5 ? '#603D13' : notif.kategori === 6 ? '#3498DB' : notif.kategori === 7 ? '#BC1D15' : '#BC1D15',
                                        

                                  }} >
                                   {
                                                    notif.kategori === 2 ? <ChatRoundedIcon /> :
                                                        notif.kategori === 3 ? <CheckCircleOutlineRoundedIcon /> :
                                                            notif.kategori === 4 ? <CloseTwoToneIcon /> :
                                                                notif.kategori === 5 ? <CancelPresentationIcon /> :
                                                                    notif.kategori === 6 ? <ContactPageIcon /> :
                                                                        notif.kategori === 7 ? <WebAssetOffOutlinedIcon /> :
                                                                            notif.kategori === 8 ? <CheckCircleOutlineRoundedIcon /> :
                                                                                notif.kategori === 9 ? <CheckCircleOutlineRoundedIcon /> :
                                                                                    notif.kategori === 10 ? <CheckCircleOutlineRoundedIcon /> :
                                                                                        notif.kategori === 11 ? <CheckCircleOutlineRoundedIcon /> :
                                            null
                                      }
                                  </Avatar>
                                      <div style={{ marginLeft: "10px" }}>
                                                <Typography style={{ fontSize: "12px" }} >{notif.message.substring(0, 36)}<br/>{notif.message.substring(36, 100)}</Typography>
                                          <Typography variant="subtitle1" style={{ fontSize: "10px" }}>
                                              {notif.tanggal}
                                          </Typography>
                                      </div>
                                  </div>
                              </Link>
                          </div> 
                            ))}
                            {dataNotif.map((notif, index) => (
                                <div key={
                                    notif.key
                                } >
                                    <Link
                                        onClick={() => {
                                            this.handleaksi(notif.key);
                                            window.location.href = notif.aksi
                                        }}

                                        style={{
                                            textDecoration: "none",
                                            color: "black",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <div style={{
                                            display: "flex", alignItems: "center",
                                            backgroundColor: notif.status === 0 ? "#F6FBFF" : "white", padding: "10px"
                                        }}>
                                            <Avatar variant='elips' style={{
                                                width: '50px',
                                                height: '50px',
                                                backgroundColor: notif.kategori === 2 ? '#DBE8F4' : notif.kategori === 3 ? '#CCEDC4' : notif.kategori === 4 ? '#EBD0D1' : notif.kategori === 5 ? '#FFBD70' : notif.kategori === 6 ? '#B5D8F7' : notif.kategori === 7 ? '#FF979A' : '#FF979A',

                                                color: notif.kategori === 2 ? '#66ACEA' : notif.kategori === 3 ? '#409C2A' : notif.kategori === 4 ? '#EE2E24' : notif.kategori === 5 ? '#603D13' : notif.kategori === 6 ? '#3498DB' : notif.kategori === 7 ? '#BC1D15' : '#BC1D15',


                                            }} >
                                                {
                                                    notif.kategori === 2 ? <ChatRoundedIcon /> :
                                                        notif.kategori === 3 ? <CheckCircleOutlineRoundedIcon /> :
                                                            notif.kategori === 4 ? <CloseTwoToneIcon /> :
                                                                notif.kategori === 5 ? <CancelPresentationIcon /> :
                                                                    notif.kategori === 6 ? <ContactPageIcon /> :
                                                                        notif.kategori === 7 ? <WebAssetOffOutlinedIcon /> :
                                                                            notif.kategori === 8 ? <CheckCircleOutlineRoundedIcon /> :
                                                                                notif.kategori === 9 ? <CheckCircleOutlineRoundedIcon /> :
                                                                                    notif.kategori === 10 ? <CheckCircleOutlineRoundedIcon /> :
                                                                                        notif.kategori === 11 ? <CheckCircleOutlineRoundedIcon /> :
                                                                                            null
                                                }
                                            </Avatar>
                                            <div style={{ marginLeft: "10px" }}>
                                                <Typography style={{ fontSize: "12px" }} >{notif.message.substring(0, 36)}<br />{notif.message.substring(36, 100)}</Typography>
                                                <Typography variant="subtitle1" style={{ fontSize: "10px" }}>
                                                    {notif.tanggal}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Popover>
            </div>
        );
    }
}
