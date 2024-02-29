import { Stack, Container, Typography, Box } from "@mui/material";
import ServicesItem from "./ServicesItem";
// routes
// components

const SERVICES = [
  {
    name: "Tour Management",
    icon: "/assets/icons/service/ic_service_seo.svg",
    content:
      "Complete tour management for travel agencies from tour planning to bookings.",
    path: "",
  },
  {
    name: "Partner Finder",
    icon: "/assets/icons/service/ic_service_mail.svg",
    content:
      "India's First secure travel partner finder for travel enthusiasts.",
    path: "",
  },
  {
    name: "Agency Collaboration",
    icon: "/assets/icons/service/ic_service_analysis.svg",
    content:
      "Forget the days of searching for agencies to transfer tours. Agency collaborator is here!!",
    path: "",
  },
  {
    name: "Free Marketing",
    icon: "/assets/icons/service/ic_service_bullhorn.svg",
    content: "We are going to market ourselves, win win for travel agencies",
    path: "",
  },
];

const Services = () => {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          maxWidth: 480,
          mb: { xs: 8, md: 5 },
          mx: { xs: "auto", md: "unset" },
          textAlign: { xs: "center", md: "unset" },
        }}
      >
        <Typography variant="overline" sx={{ color: "text.disabled" }}>
          How are we Unique
        </Typography>

        <Typography variant="h2">We Provide</Typography>

        <Typography sx={{ color: "text.secondary" }}>
          Things which differentiate us and make us unique
        </Typography>
      </Stack>

      <Box
        sx={{
          gap: 4,
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
        }}
      >
        {SERVICES.map((service, index) => (
          <ServicesItem key={service.name} service={service} index={index} />
        ))}
      </Box>
    </Container>
  );
};

export default Services;
