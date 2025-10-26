import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MapComponent from "../components/MapComponent";
import { useNavigate } from "react-router-dom";

export default function RiderDashboard() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBook = async () => {
    if (!pickup || !dropoff || !pickupCoords || !dropoffCoords) {
      setMessage("Please provide both pickup and dropoff (or select on map).");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      setMessage("Ride requested — waiting for driver.");
      // optional: emit socket event too (server will emit to drivers when ride is saved)
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setMessage(err?.response?.data?.message || "Booking failed");
      if (err?.response?.status === 401) nav("/login");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ mt: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}
    >
      <Typography variant="h4" gutterBottom>
        Book a ride
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Signed in as: {user.name} ({user.role})
      </Typography>

      <Box sx={{ display: "grid", gap: 2 }}>
        <Box>
          <Typography variant="subtitle2">Pickup address</Typography>
          <TextField
            fullWidth
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Type address or click map"
          />
          <MapComponent coords={pickupCoords} setCoords={setPickupCoords} />
        </Box>

        <Box>
          <Typography variant="subtitle2">Dropoff address</Typography>
          <TextField
            fullWidth
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            placeholder="Type address or click map"
          />
          <MapComponent coords={dropoffCoords} setCoords={setDropoffCoords} />
        </Box>

        <Button variant="contained" onClick={handleBook} disabled={loading}>
          {loading ? "Requesting..." : "Request Ride"}
        </Button>

        {message && <Typography color="primary">{message}</Typography>}
      </Box>
    </Container>
  );
}
