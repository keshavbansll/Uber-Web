import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import api from "../api";
import socket from "../socket";

export default function DriverDashboard() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRides = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/rides");
      setRides(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
    socket.on("new-ride", (ride) => {
      setRides((prev) => [ride, ...prev]);
    });
    return () => socket.off("new-ride");
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await api.patch(`/api/rides/${id}/status`, { status });
      setRides((prev) => prev.map((r) => (r._id === id ? res.data : r)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ mt: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}
    >
      <Typography variant="h4" gutterBottom>
        Driver Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Pending rides (requested)
      </Typography>

      <Box>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <List>
            {rides.map((ride) => (
              <ListItem
                key={ride._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  mb: 2,
                  border: "1px solid #eee",
                  borderRadius: 1,
                  p: 2,
                }}
              >
                <ListItemText
                  primary={`${ride.pickup} → ${ride.dropoff}`}
                  secondary={`Status: ${ride.status} • Rider: ${
                    ride.riderId?.name || ride.riderId
                  }`}
                />
                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                  {ride.status === "requested" && (
                    <Button
                      variant="contained"
                      onClick={() => updateStatus(ride._id, "accepted")}
                    >
                      Accept
                    </Button>
                  )}
                  {ride.status === "accepted" && (
                    <Button
                      variant="contained"
                      onClick={() => updateStatus(ride._id, "onway")}
                    >
                      Start
                    </Button>
                  )}
                  {ride.status === "onway" && (
                    <Button
                      variant="contained"
                      onClick={() => updateStatus(ride._id, "completed")}
                    >
                      Complete
                    </Button>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}
