import React from "react";
// @mui
import NextLink from "next/link";

import {
  Divider,
  Stack,
  Card,
  Typography,
  Box,
  Link,
  Avatar,
} from "@mui/material";
// utils
import { fCurrency } from "@/utils/formatNumber";
// types
// components
import Image from "../image";
import Iconify from "../iconify";
import TextMaxLine from "../text-max-line";

const TourItemCard = ({ tour, vertical }) => {
  const {
    tourId,
    title,
    level,
    price,
    ratings,
    tourCompany,
    coverImg,
    category,
    numDays,
  } = tour;
  return (
    <Card
      sx={{
        display: { sm: "flex" },
        "&:hover": {
          boxShadow: (theme) => theme.customShadows.z24,
        },
        ...(vertical && {
          flexDirection: "column",
        }),
      }}
    >
      <Box sx={{ flexShrink: { sm: 0 } }}>
        <Image
          alt={title}
          src={coverImg}
          sx={{
            height: 1,
            objectFit: "cover",
            width: { sm: 240 },
            ...(vertical && {
              width: { sm: 1 },
            }),
          }}
        />
      </Box>

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack
          spacing={{
            xs: 3,
            sm: vertical ? 3 : 1,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-around"
          >
            {category.map((item) => (
              <Typography
                variant="overline"
                sx={{ color: "primary.main" }}
                key={item}
              >
                {item}
              </Typography>
            ))}
          </Stack>

          <Stack spacing={1}>
            <Link component={NextLink} href={`/tour/${tourId}`} color="inherit">
              <TextMaxLine variant="h6" line={1}>
                {title}
              </TextMaxLine>
            </Link>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack spacing={0.5} direction="row" alignItems="center">
            <Iconify icon="carbon:star-filled" sx={{ color: "warning.main" }} />
            <Box sx={{ typography: "h6" }}>
              {Number.isInteger(ratings) ? `${ratings}.0` : ratings}
            </Box>
          </Stack>
          <Typography variant="h4">{fCurrency(price)}</Typography>
        </Stack>

        <Stack direction="row" alignItems="center">
          <Avatar src={tourCompany?.logoImg} />

          <Typography variant="body2" sx={{ ml: 1, mr: 0.5 }}>
            {tourCompany.name}
          </Typography>
        </Stack>

        <Divider
          sx={{
            borderStyle: "dashed",
            display: { sm: "none" },
            ...(vertical && {
              display: "block",
            }),
          }}
        />

        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent={"space-between"}
          sx={{ color: "text.disabled", "& > *:not(:last-child)": { mr: 2.5 } }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: "body2" }}
          >
            <Iconify icon="carbon:time" sx={{ mr: 1 }} /> {`${numDays} Days`}
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: "body2" }}
          >
            <Iconify
              icon={
                (level === "Beginner" && "carbon:skill-level-basic") ||
                (level === "Intermediate" &&
                  "carbon:skill-level-intermediate") ||
                "carbon:skill-level-advanced"
              }
              sx={{ mr: 1 }}
            />
            {level}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default TourItemCard;
