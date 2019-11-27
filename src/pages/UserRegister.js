import React, { useEffect } from 'react';
import '../styles/User.css';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

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
  button: {
    padding: theme.spacing(2),
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
  
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [id, setId] = React.useState('');
  const [type, setType] = React.useState('');
  const [companyId, setCompanyId] = React.useState('');

  const tokenId = localStorage.getItem('@comanda/token');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/user', { _id: id, name, username, email, phone, cpf, type, companyId, password, passwordConfirm }).catch(error => {
      enqueueSnackbar('Falha ao efetuar cadastro.', {
        variant: 'error'
      });
    });

    if (!response.data.error) {
      history.push('/user');
      enqueueSnackbar('Cadastro efetuado com sucesso!', {
        variant: 'success'
      });
    } else {
      enqueueSnackbar('Falha ao efetuar cadastro.', {
        variant: 'error'
      });
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
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setType(response.data.type);
        setCpf(response.data.cpf);
        setCompanyId(response.data.companyId);
      }

      loadUser();
    }
  }, [tokenId]);

  return (
    <div className={classes.root}>
      <Grid className={classes.root}>
        <form onSubmit={handleSubmit}>
          <Input id="component-simple" value={id} onChange={handleChange} type="hidden" />
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
                    required={true}
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
                    required={true}
                    onChange={e => setUsername(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="component-simple">E-mail</InputLabel>
                  <Input
                    id="component-simple"
                    value={email}
                    required={true}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="component-simple">Telefone</InputLabel>
                  <Input
                    id="component-simple"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="component-simple">CPF</InputLabel>
                  <Input
                    id="component-simple"
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Tipo Perfil</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    onChange={e => setType(e.target.value)}
                  >
                    <MenuItem value={1}>Sistema</MenuItem>
                    <MenuItem value={2} selected>Empresa</MenuItem>
                    <MenuItem value={3}>Cliente</MenuItem>
                  </Select>
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
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Alterar Senha
                </Typography>
                  <Divider />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="component-simple">Nova Senha</InputLabel>
                  <Input
                    id="component-simple"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="component-simple">Repetir Senha</InputLabel>
                  <Input
                    id="component-simple"
                    type="password"
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid
                container
                className={classes.button}
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
    </div>
  );
}