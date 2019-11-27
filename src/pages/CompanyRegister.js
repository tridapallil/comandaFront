import React, { useEffect } from 'react';
import '../styles/Style.css';
import { useSnackbar } from 'notistack';
import { lighten, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

export default function Company({ match, history }) {

  const classes = useStyles();

  const companyId = match.params.companyId;

  const { enqueueSnackbar } = useSnackbar();
  const [id, setId] = React.useState('');
  const [name, setName] = React.useState('');
  const [legalName, setLegalName] = React.useState('');
  const [cnpj, setCnpj] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const tokenId = localStorage.getItem('@comanda/token');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/company', { _id: id, name, legalName, cnpj, phone }, {
      headers: {
        'x-access-token': tokenId,
      },
    }).catch(error => {
      enqueueSnackbar('Falha ao efetuar cadastro.', {
        variant: 'error'
      });
    });

    if (!response.data.error) {
      history.push('/company');
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
    if (companyId) {
      async function loadCompany() {
        const response = await api.get('/company/' + companyId, {
          headers: {
            'x-access-token': tokenId,
          }
        })
        setId(response.data._id);
        setName(response.data.name);
        setLegalName(response.data.legalName);
        setCnpj(response.data.cnpj);
        setPhone(response.data.phone);
      }

      loadCompany();
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
                  <InputLabel htmlFor="component-simple">Nome Fantasia</InputLabel>
                  <Input
                    id="component-simple"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="component-simple">Razão Social</InputLabel>
                  <Input
                    id="component-simple"
                    value={legalName}
                    onChange={e => setLegalName(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="component-simple">Telefone</InputLabel>
                  <Input
                    id="component-simple"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="component-simple">CNPJ</InputLabel>
                  <Input
                    id="component-simple"
                    value={cnpj}
                    onChange={e => setCnpj(e.target.value)}
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