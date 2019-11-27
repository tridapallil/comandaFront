import React, { useEffect, useState } from 'react';
import '../styles/Style.css';
import { lighten, makeStyles } from '@material-ui/core/styles';
import DataTable from '../components/DataTable';

import api from '../services/api'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  }
}));

export default function Comanda() {
  const classes = useStyles();

  const [comandas, setComandas] = useState([]);
  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Nome', object: true },
    { id: 'companyId', numeric: false, disablePadding: true, label: 'Empresa', object: true },
    { id: 'userId', numeric: false, disablePadding: true, label: 'Usuário', object: true },
    { id: 'action', numeric: true, disablePadding: false, label: 'Ações', object: false },
  ];

  const tokenId = localStorage.getItem('@comanda/token');

  useEffect(() => {
    async function loadComandas() {
      const response = await api.get('/comanda', {
        headers: {
          'x-access-token': tokenId,
        }
      })
      setComandas(response.data);
    }
    loadComandas();
  }, [tokenId]);

  return (
    <div className={classes.root}>
      <DataTable
        tableName="Comandas"
        link="comanda"
        headCell={headCells}
        arrData={comandas}
      />
    </div>
  );
}