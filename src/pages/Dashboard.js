import React, { useEffect} from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Title from '../components/Title';
import api from '../services/api'
import '../styles/Dashboard.css';

export function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total</Title>
      <Typography component="p" variant="h4">
        R$ 100,00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Novembro, 2019
      </Typography>
      <div>
        <Link color="primary" href="javascript:;">
          Detalhes
        </Link>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginTop: 65,
    flexGrow: 1,
  },
  depositContext: {
    flex: 1,
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

  const userId = match.params.userId;

  const classes = useStyles();

  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [id, setId] = React.useState('');
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
     
     <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}