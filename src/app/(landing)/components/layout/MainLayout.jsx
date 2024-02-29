// next
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
// @mui
import { Box } from "@mui/material";
//
const Header = dynamic(() => import("./Header"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });
export default function MainLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 11 },
          }),
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
