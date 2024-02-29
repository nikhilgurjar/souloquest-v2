// next
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Box, Grid, IconButton, Link, Stack, Typography } from "@mui/material";

// routes
import { PATH_PAGE, social_accounts } from "@/utils/siteConfig";

// components
import Logo from "@/components/logo";
import Iconify from "@/components/iconify";
// ----------------------------------------------------------------------

const PAGES = [
  { name: "About us", href: PATH_PAGE.ABOUT },
  { name: "Contact us", href: PATH_PAGE.CONTACT },
  { name: "How it works", href: PATH_PAGE.HOW_IT_WORKS },
  { nme: "Blog", href: PATH_PAGE.BLOG },
];

const SITE_LINKS = [
  { name: "TOURS", href: PATH_PAGE.TOUR_PAGE },
  { name: "DESTINATIONS", href: PATH_PAGE.DESTINATIONS },
  { name: "FIND PARTNER", href: PATH_PAGE.FIND_PARTNER },
];

const LINKS = [
  {
    headline: "Minimal",
    children: [
      { name: "About us", href: PATH_PAGE.ABOUT },
      { name: "Contact us", href: PATH_PAGE.CONTACT },
    ],
  },
  {
    headline: "Legal",
    children: [
      { name: "Terms and Condition", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
  {
    headline: "Contact",
    children: [
      { name: "support@minimals.cc", href: "#" },
      { name: "Los Angeles, 359  Hidden Valley Road", href: "#" },
    ],
  },
];
// ----------------------------------------------------------------------
export default function Footer() {
  return (
    <Grid
      container
      justifyContent={{
        xs: "center",
        md: "space-between",
      }}
      spacing={5}
      sx={{
        paddingInline: "20px",
        paddingY: "70px",
        bgcolor: "#008080",
        justifyContent: "center",
        color: "#fff",
        alignItems: "flex-start",
        marginTop: "6rem",
        // flexWrap: "wrap",
      }}
    >
      <Grid item xs={12} md={4} lg={4} mr={10}>
        <Logo
          sx={{ mx: { xs: "auto", md: "inherit" } }}
          primaryBackground={true}
        />
        <Typography variant="body1" sx={{ textWrap: "wrap", mt: 3 }}>
          {`
          Explore limitless possibilities with our comprehensive travel
          management platform. From seamless tour creation to efficient booking
          management and collaborative networking, elevate your travel agency's
          success with us.
          `}{" "}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          {social_accounts.map((social) => (
            <IconButton
              key={social.name}
              sx={{ color: "#fff" }}
              href={social.path}
            >
              <Iconify icon={social.icon} />
            </IconButton>
          ))}
        </Box>
      </Grid>

      <Grid item xs={12} md={3} lg={2}>
        <Typography variant="h5">Pages</Typography>
        <Stack spacing={2} mt={3}>
          {PAGES.map((page, index) => (
            <Link
              key={index}
              variant="body1"
              component={NextLink}
              color={"#fff"}
              underline="none"
              href={page.href}
            >
              {page.name}
            </Link>
          ))}
        </Stack>
      </Grid>

      <Grid xs={12} item md={3} lg={2}>
        <Typography variant="h5">Site Links</Typography>
        <Stack spacing={2} mt={3}>
          {SITE_LINKS.map((page, index) => (
            <Link
              variant="body1"
              component={NextLink}
              color={"#fff"}
              underline="none"
              key={page.href}
              href={page.href}
            >
              {page.name}
            </Link>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
