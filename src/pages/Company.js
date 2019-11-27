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

export default function User() {
  const classes = useStyles();

  const [companies, setCompanies] = useState([]);
  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Nome', object: true },
    { id: 'legalName', numeric: false, disablePadding: true, label: 'Razão Social', object: true },
    { id: 'cnpj', numeric: false, disablePadding: true, label: 'CNPJ', object: true },
    { id: 'action', numeric: true, disablePadding: false, label: 'Ações', object: false },
  ];

  const tokenId = localStorage.getItem('@comanda/token');

  useEffect(() => {
    async function loadCompanies() {
      const response = await api.get('/company', {
        headers: {
          'x-access-token': tokenId,
        }
      })
      setCompanies(response.data);
    }

    loadCompanies();
  }, [tokenId]);

  return (
    <div className={classes.root}>
      <DataTable
        tableName="Empresas"
        link="company"
        headCell={headCells}
        arrData={companies}
      />
    </div>
  );
}