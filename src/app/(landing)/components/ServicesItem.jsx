"use client";
import NextLink from "next/link";
import { Stack, Card, IconButton } from "@mui/material";
import Iconify from "@/components/iconify";
import SvgColor from "@/components/svg-color";
import TextMaxLine from "@/components/text-max-line";
const COLORS = ["primary", "secondary", "success", "warning"];

const ServicesItem = ({ service, index }) => {
  const { name, icon, content, path } = service;

  return (
    <Card
      sx={{
        px: 4,
        py: 5,
        textAlign: "center",
        ...(index === 1 && {
          py: { xs: 5, md: 8 },
        }),
        ...(index === 2 && {
          py: { xs: 5, md: 10 },
          boxShadow: (theme) => ({ md: theme.customShadows.z24 }),
        }),
      }}
    >
      <SvgColor
        src={icon}
        sx={{
          width: 88,
          height: 88,
          mx: "auto",
          color: (theme) => theme.palette[COLORS[index]].main,
        }}
      />

      <Stack spacing={1} sx={{ my: 5 }}>
        <TextMaxLine variant="h6">{name}</TextMaxLine>
        <TextMaxLine variant="body2" sx={{ color: "text.secondary" }}>
          {content}
        </TextMaxLine>
      </Stack>

      <IconButton
        component={NextLink}
        href={path}
        color={
          (index === 0 && "primary") ||
          (index === 1 && "secondary") ||
          (index === 2 && "success") ||
          "warning"
        }
      >
        <Iconify icon="carbon:direction-straight-right" />
      </IconButton>
    </Card>
  );
};

export default ServicesItem;
