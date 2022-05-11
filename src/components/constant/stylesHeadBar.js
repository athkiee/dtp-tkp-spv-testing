const drawerWidth = 240;

export const  useStyles = (theme) => ({
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
        // ...theme.mixins.toolbar,
    },
    submitForm: {
        color: "white",
        borderColor: "#DA1E20",
        borderRadius: 10,
        backgroundColor: "#DA1E20",
        "&:hover": {
            color: "#DA1E20",
            backgroundColor: "white",
            borderColor: "#DA1E20",
        },
    },
    containerTataCara: {
        width: "100%",
        height: 360,
        float: "left",
        marginLeft: 35,
        backgroundColor: "white",
        borderRadius: 10,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#E5E5E5",
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        borderBottom: "3px solid #000000",
    },
    appBarShift: {
        marginLeft: drawerWidth,
        // width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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
    drawerPaper: {
        zIndex: theme.zIndex.drawer + 1,
        borderTopRightRadius: 40,
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflow: "hidden",
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
    // appBarSpacer: theme.mixins.toolbar,
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
    menuicon : {
        color: "#000",
    },
    avatar: {

        marginRight: "10px",
        backgroundColor: "#6D6E71",
    },
    namaUser: {
        color: "#000000",
        fontSize: "16px",
        fontWeight: "bold",
        fontFamily: "Montserrat",
    },
    expandicon:{
        color: "#000000",
    },
    iconbutton:{
        fontSize: "14px",
        fontFamily: "Roboto",
        color: "#000000",
    },
    box: {
        backgroundColor: "#E5E5E5",
        height: "280px",
        width: "467px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "rgba(0, 0, 0, 0.25)",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    }
});
