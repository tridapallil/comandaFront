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

export default function Product() {
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Nome', object: true },
    { id: 'price', numeric: false, disablePadding: true, label: 'Valor', object: true },
    { id: 'action', numeric: true, disablePadding: false, label: 'Ações', object: false },
  ];

  const tokenId = localStorage.getItem('@comanda/token');

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/product', {
        headers: {
          'x-access-token': tokenId,
        }
      })
      setProducts(response.data);
    }
    loadProducts();
  }, [tokenId]);

  return (
    <div className={classes.root}>
      <DataTable
        tableName="Produtos"
        link="product"
        headCell={headCells}
        arrData={products}
      />
    </div>
  );
}