import React, { useEffect} from 'react';
import '../styles/User.css';
import { lighten, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ComandaTable from '../components/ComandaTable';

import Paper from '@material-ui/core/Paper';

import api from '../services/api'
const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginTop: 65,
    flexGrow: 1,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function User({ match, history }) {

  const classes = useStyles();

  const userId = match.params.userId;

  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [id, setId] = React.useState('');
  const [type, setType] = React.useState('');
  const [companyId, setCompanyId] = React.useState('');
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [age, setAge] = React.useState('');

  const tokenId = localStorage.getItem('@comanda/token');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/user', { _id : id, name, username});

    if (!response.data.error) {
      history.push('/user');
    }
  }

  const handleChange = event => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (userId) {
      async function loadUser() {
        const response = await api.get('/user/' + userId, {
          headers: {
            'x-access-token': tokenId,
          }
        })
        setId(response.data._id);
        setName(response.data.name);
        setUsername(response.data.username);
      }

      loadUser();
    }
  }, [tokenId]);

  return (
    <div className={classes.root}>
      <Grid className={classes.root}>
        <form onSubmit={handleSubmit}>
        <Input id="component-simple" value={id} onChange={handleChange} type="hidden"/>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography className={classes.title} variant="h6" >
                Cadastro
              </Typography>
            </Grid>
            <Grid spacing={3} container>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="component-simple">Name</InputLabel>
                  <Input 
                    id="component-simple" 
                    value={name} 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="component-simple">Usuário</InputLabel>
                  <Input 
                    id="component-simple" 
                    value={username} 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={companyId}
                    onChange={e => setCompanyId(e.target.value)}
                    >
                    <MenuItem value={1}>Ydeal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              <Button type="submit" variant="contained" color="primary">
                Salvar
              </Button>
            </Grid>
            </Grid>
          </Paper>
        </form>
        </Grid>
        <Grid className={classes.root}>
        <ComandaTable/>
        </Grid>
    </div>
  );
}