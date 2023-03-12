import React from "react";
import { useParams } from "react-router-dom";
import { Authority } from "./../authority.interface";
import { getById } from "./../AuthoritiesService";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import styles from './AuthoritiesShow.module.scss';

export const AuthoritiesShow = () => {
  const { id } = useParams();
  const [authority, setAuthority] = React.useState<Authority>({} as Authority);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRows = async () => {
      setLoading(true);
      const response = await getById("authorities", id || "");
      setAuthority(response as Authority);
      setLoading(false);
    };
    fetchRows();
  }, []);

  return (
    <Card className={styles.card}>
      <CardActions>
        <Button size="small">Editar</Button>
      </CardActions>
      <CardContent>
        <Typography className={styles.title}>{authority.name}</Typography>

        <Typography className={styles.info}>Nome de exibição</Typography>
        <Typography className={styles.data}>{authority.displayName}</Typography>

        <Typography className={styles.info}>E-mail</Typography>
        <Typography className={styles.data}>{authority.email}</Typography>

        <Typography className={styles.info}>Presidente</Typography>
        <Typography className={styles.data}>{authority.chairPerson}</Typography>

        <Typography className={styles.info}>N° celular do presidente</Typography>
        <Typography className={styles.data}>{authority.chainPersonCellNumber}</Typography>

        <Typography className={styles.info}>Cidade</Typography>
        <Typography className={styles.data}>{authority.city}</Typography>

        <Typography className={styles.info}>Estado</Typography>
        <Typography className={styles.data}>{authority.state}</Typography>

        <Typography className={styles.info}>País</Typography>
        <Typography className={styles.data}>{authority.country}</Typography>

        <Typography className={styles.info}>Partido da Autoridade</Typography>
        <Typography className={styles.data}>{authority.party}</Typography>

        <Typography className={styles.info}>N° celular da Autoridade</Typography>
        <Typography className={styles.data}>{authority.cellNumber}</Typography>

        <Typography className={styles.info}>Cargo da autoridade</Typography>
        <Typography className={styles.data}>{authority.role}</Typography>
      </CardContent>
    </Card>
  );
};