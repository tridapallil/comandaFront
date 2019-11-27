import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BusinessIcon from '@material-ui/icons/Business';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import CustomRoutes from '../customRoutes';

import '../styles/Style.css';

import api from '../services/api'
import logo from '../assets/logo.svg';

const drawerWidth = 240;

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuIcon: {
    color: '#b8c7ce',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: '#222d32',
    color: '#b8c7ce',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    background: '#222d32',
    color: '#b8c7ce',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logoImage: {
    alignItems: 'center',
    alignContent: 'center',
    width: theme.spacing(21),
  },
}));

export default function Main({ history }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const tokenId = localStorage.getItem('@comanda/token');
  const [pages, setPages] = useState([]);

  useEffect(() => {
    async function loadPages() {
      const response = await api.get('/page', {
        headers: {
          'x-access-token': tokenId,
        }
      })
      setPages(response.data);
    }

    loadPages();
  }, [tokenId]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload();
  };
  
  const handleMenu = (id) => {
    history.push("/"+id);
    window.location.reload();
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleMain = () => {
    history.push("/");
    window.location.reload();
  };

  console.log(tokenId);

  useEffect(() => {
    async function validateToken() {
      await api.get('/validate', {
        headers: {
          'x-access-token': tokenId,
        }
      }).catch(error => {
        handleLogout();
      });
    }

    validateToken();
  }, [tokenId]);

  useEffect(() => {
    async function validateToken() {
      const response = !await api.get('/validate', {
        headers: {
          'x-access-token': tokenId,
        }
      }).catch(error => {
        handleLogout();
      });
    }

    validateToken();
  }, [tokenId]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color='inherit'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
          <MenuIcon />
          </IconButton>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <IconButton aria-label="logout">
              <PowerSettingsNewIcon onClick={handleClickOpen} />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
      color='inherit'
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <a onClick={handleMain} className="btn-cursor">
            <img src={logo} alt='Comanda +' className={classes.logoImage}></img>
          </a>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <BusinessIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {pages.map((row, index) => (
            <ListItem button key={row.link} onClick={() => handleMenu(row.link)}>
              <ListItemIcon><BusinessIcon className={classes.menuIcon} /> </ListItemIcon>
              <ListItemText primary={row.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <CustomRoutes />
      </main>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Logout
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja sair do sistema?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout} color="primary">
            Sim
            </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}