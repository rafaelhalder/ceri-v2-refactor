import React from "react";
import { Link, useParams } from "react-router-dom";
import { Event } from "../event.interface";
import { getById } from "../EventsService";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import styles from "./EventsShow.module.scss";

export const EventsShow = () => {
  const { id } = useParams();
  const [event, setEvent] = React.useState<Event>({} as Event);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRows = async () => {
      setLoading(true);
      const response = await getById("events", id || "");
      setEvent(response as Event);
      setLoading(false);
    };
    fetchRows();
  }, []);

  return (
    <Card className={styles.card}>
      <CardActions>
        <Link to={`/events/edit/${id}`} style={{ paddingRight: 10 }}>
          <Button size="small">Editar</Button>
        </Link>
      </CardActions>
      <CardContent>
        <Typography className={styles.title}>{event.dateTime}</Typography>

        <Typography className={styles.info}>Nome de exibição</Typography>
        <Typography className={styles.data}>{event.disabled}</Typography>

        <Typography className={styles.info}>E-mail</Typography>
        <Typography className={styles.data}>{event.local}</Typography>

        <Typography className={styles.info}>Presidente</Typography>
        <Typography className={styles.data}>{event.title}</Typography>
      </CardContent>
    </Card>
  );
};
