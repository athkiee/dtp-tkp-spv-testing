import React from 'react'
import { useState } from 'react';
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

export default function Notifications() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(null);


    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;


   
    const [notifications, setNotifications] = useState(
        [
            {
                id: 1,
                icon: <ChatRoundedIcon />, 
                backgroundColor: '#DBE8F4',
                color:'#66ACEA', 
                message: "Terdapat perubahan status calon TKP menjadi  Wawancara yang perlu anda tinjau",
                detailPage: "http://localhost:3000/Dashboard",
                receivedTime: "27 juli 2021, 09.00 WIB",
                read: false,
                status: "unread"
            },
            {
                id: 2,
                icon: <CheckCircleOutlineRoundedIcon />,
                backgroundColor: '#CCEDC4',
                color: '#409C2A',
                message: "Terdapat perubahan status calon TKP menjadi  Diterima yang perlu anda tinjau",
                detailPage: "/",
                receivedTime: "27 juli 2021, 09.00 WIB",
                read: false
            },
            {
                id: 3,
                icon: <CloseTwoToneIcon />,
                backgroundColor: '#EBD0D1',
                color: '#EE2E24',
                message: "Terdapat perubahan status calon TKP menjadi  Ditolak yang perlu anda tinjau",
                detailPage: "/",
                receivedTime: "27 juli 2021, 09.00 WIB",
                read: false
            },
            {
                id: 4,
                icon: <CancelPresentationIcon />,
                backgroundColor: '#FFBD70',
                color: '#603D13',
                message: "Terdapat perubahan status calon TKP menjadi  Kontrak Tidak Diperpanjang yang perlu anda tinjau",
                detailPage: "/",
                receivedTime: "27 juli 2021, 09.00 WIB",
                read: false
            },
            {
                id: 5,
                icon: <ContactPageIcon />,
                backgroundColor: ' #B5D8F7',
                color: '#3498DB',
                message: "Terdapat perubahan status calon TKP menjadi  Perubahan Job Title yang perlu anda tinjau",
                detailPage: "/",
                receivedTime: "27 juli 2021, 09.00 WIB",
                read: false,

            },
            {
                id: 6,
                icon: <WebAssetOffOutlinedIcon />,
                backgroundColor: '#FF979A',
                color: '#BC1D15',
                message: "Terdapat perubahan status calon TKP menjadi  Resign yang perlu anda tinjau",
                detailPage: "/",
                receivedTime: "27 juli 2021, 09.00 WIB",
                read: false

            }
        ]
    )


    const handleReadNotification = (id) => {
        const newNotifications = notifications.map(notification => {
            if (notification.id === id) {
                return {
                    ...notification,
                    read: true
                }
            }
            return notification;
        });
        setNotifications(newNotifications);

    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

       
    

    const unreadNotifications = notifications.filter(notification => !notification.read);

    const notificationsCount = unreadNotifications.length;

    const notificationsBadge = (
        
            <IconButton aria-describedby={id} onClick={handleClick}>
            
            <Badge badgeContent={notificationsCount} color="secondary">
                <NotificationsNoneIcon style={{color:'black'}} />
            </Badge>
            </IconButton>
        
    );

       
   

  

  // end notification

  return (
    <div>
          
              {notificationsBadge}
         
        <Popover
              
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            style={{
                width: '100%',
                
            }}
        >
            <Card style={{ 
                width:'350px',
                height:'500px',
                overflowY: 'scroll',
                overflowX: 'hidden',

                
                
             }}>
                  <Typography variant="h6" style={{ padding: "10px", fontFamily: "Montserrat" }}>
                    Notifikasi
                </Typography>
                  {notifications.map(notification => (
                   
                          <div key={notifications.id} style={{ padding: "10px" }}>
                              <Link
                                    onMouseEnter={() => handleReadNotification(notification.id)}
                                   href={notification.detailPage}
                                   style={{ textDecoration: "none",
                                      color: "black",
                                      cursor: "pointer",
                                      hover: {
                                          color: "black",
                                          cursor: "pointer"
                                        }}}
                                       >
                                  <div style={{ display: "flex", alignItems: "center" }}>
                                  <Avatar variant='elips' style={{
                                        width: '50px',
                                        height: '50px',
                                      backgroundColor:notification.backgroundColor,
                                      color: notification.color,

                                  }} >
                                      {notification.icon}
                                  </Avatar>
                                      <div style={{ marginLeft: "10px" }}>
                                          <Typography style={{ fontSize: "12px" }} >{notification.message}</Typography>
                                          <Typography variant="subtitle1" style={{ fontSize: "10px" }}>
                                              {notification.receivedTime}
                                          </Typography>
                                      </div>
                                  </div>
                              </Link>
                          </div> 
                    
                  ))}
                    
            </Card>
        </Popover>
    </div>
  );
} 



/*
 <Button variant="outlined" color="primary" onClick={() => handleButtonClick(notification.id)}>
                                    {notification.read ? 'Sudah dibaca' : 'Baca'}
                                </Button>
 notifications.map(notification => (
                        <div key={notifications.id} style={{ padding: "10px" }}>
                            <Link
                                to={notification.detailPage}
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    fontFamily: "Montserrat",
                                    hover: 'black'

                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img src={notification.image} style={{ width: "50px", height: "50px" }} />
                                    <div style={{ marginLeft: "10px" }}>
                                        <Typography style={{ fontSize: "12px" }} >{notification.message}</Typography>
                                        <Typography variant="subtitle1" style={{ fontSize: "10px" }}>
                                            {notification.receivedTime}
                                        </Typography>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))     
*/