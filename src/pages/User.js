import React, { useEffect, useState } from 'react';
import '../styles/User.css';
import { lighten, makeStyles } from '@material-ui/core/styles';
import DataTable from '../components/DataTable';

import api from '../services/api'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  }
}));

export default function User() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Nome', object: true },
    { id: 'username', numeric: false, disablePadding: true, label: 'Usuário', object: true },
    { id: 'action', numeric: true, disablePadding: false, label: 'Ações', object: false },
  ];

  const tokenId = localStorage.getItem('@comanda/token');

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/user', {
        headers: {
          'x-access-token': tokenId,
        }
      })
      setUsers(response.data);
    }
    loadUsers();
  }, [tokenId]);

  return (
    <div className={classes.root}>
      <DataTable
        tableName="Usuários"
        link="user"
        headCell={headCells}
        arrData={users}
      />
    </div>
  );
}