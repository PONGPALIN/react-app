import * as React from "react";
import { ThemeProvider,createTheme, styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Header from "./component/layouts/Header";
import Menu from "./component/layouts/Menu";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./component/pages/LoginPage";
import RegisterPage from "./component/pages/RegisterPage";
import StockPage from "./component/pages/StockPage";
import StockCreatePage from "./component/pages/StockCreatePage";
import StockEditPage from "./component/pages/StockEditPage";
import ReportPage from "./component/pages/ReportPage";
import AboutUs from "./component/pages/AboutUs";
import { blueGrey } from "@mui/material/colors";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));


const theme = createTheme({
  components:{
    MuiDrawer:{
      styleOverrides:{
        paper:{
          backgroundImage:"url(" + `${process.env.PUBLIC_URL}/images/backgroundimage.jpg` +
          ")",
          width: drawerWidth,
        }
      }
    }
  }, 
  spacing: 8,
  palette:{
    primary : blueGrey,
    background:{
      default:"#CFD2D6"
    }
  }
})

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header open={open} onDrawerOpen={handleDrawerOpen} />
      <Menu open={open} onDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/stock/create" element={<StockCreatePage />} />
          <Route path="/stock/edit/:id" element={<StockEditPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<NoFound />} />
        </Routes>
      </Main>
    </Box>
    </ThemeProvider>
  );
}
const NoFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/"> Go home</Link>
  </div>
);
