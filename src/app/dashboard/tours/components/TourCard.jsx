"use client";
import { fCurrency } from "@/utils/formatNumber";
import { Typography } from "@mui/material";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";

import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";

import Image from "@/components/image";
import Iconify from "@/components/iconify";
import CustomPopover, { usePopover } from "@/components/custom-popover";
import { TOUR_CATEGORIES } from "@/utils/siteConfig";

const TourCard = ({ tour }) => {
  const {
    title,
    numDays,
    price,
    rating,
    images,
    tourId,
    categories,
    tourCompany,
  } = tour;

  const image_height = images?.length ? 219 / images.length : 219;

  const popover = usePopover();
  const router = useRouter();
  const pathName = usePathname();
  const isMyTour = pathName === "/dashboard/tours/mytours";

  const onView = useCallback(() => {
    router.push(`/dashboard/tours/${tourId}`);
  }, [router]);

  const onAddBooking = useCallback(() => {
    router.push(`/dashboard/bookings/create?tourId=${tourId}`);
  }, [router]);

  const onEditBooking = useCallback(() => {
    router.push(`/dashboard/tours/edit/${tourId}`);
  }, [router]);

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        right: 8,
        zIndex: 9,
        borderRadius: 1,
        position: "absolute",
        p: "2px 6px 2px 4px",
        typography: "subtitle2",
        bgcolor: "warning.lighter",
      }}
    >
      <Iconify icon="eva:star-fill" sx={{ color: "warning.main", mr: 0.25 }} />{" "}
      {rating}
    </Stack>
  );

  const renderPrice = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        left: 8,
        zIndex: 9,
        borderRadius: 1,
        bgcolor: "grey.800",
        position: "absolute",
        p: "2px 6px 2px 4px",
        color: "common.white",
        typography: "subtitle2",
      }}
    >
      {fCurrency(price)}
    </Stack>
  );

  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: "relative" }}>
        {renderPrice}
        {renderRating}
        <Image
          alt={Array.isArray(images) && images[0]}
          src={Array.isArray(images) && images[0]}
          width={1}
          height={"100%"}
          sx={{ borderRadius: 1, height: "219px", width: 1 }}
        />
      </Stack>
      {images?.length > 1 && (
        <Stack spacing={0.5} height={"100%"}>
          {images.map((imageUrl) => (
            <Image
              key={imageUrl}
              alt={imageUrl}
              src={imageUrl}
              ratio="1/1"
              width={80}
              height={"100%"}
              sx={{ borderRadius: 1, width: 80, height: `${image_height}px` }}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      primary={categories?.map((item, index) => (
        <Typography variant="caption" key={index}>
          {TOUR_CATEGORIES[item].label}
          {"   "}
        </Typography>
      ))}
      secondary={
        <Link
          component={NextLink}
          href={`/dashboard/tours/${tourId}`}
          color="inherit"
        >
          {title}
        </Link>
      }
      primaryTypographyProps={{
        typography: "caption",
        color: "error",
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: "span",
        color: "text.primary",
        typography: "h6",
      }}
    />
  );

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{
        position: "relative",
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      <IconButton
        onClick={popover.onOpen}
        sx={{ position: "absolute", bottom: 20, right: 8 }}
      >
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>

      {[
        {
          label: `${numDays} days`,
          icon: (
            <Iconify
              icon="solar:clock-circle-bold"
              sx={{ color: "info.main" }}
            />
          ),
        },
        {
          label: tourCompany?.name,
          icon: <Iconify icon="mdi:company" sx={{ color: "info.main" }} />,
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          gap={1}
          direction="row"
          alignItems="center"
          sx={{ typography: "body2" }}
        >
          {item.icon}
          {item.label}
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>
      <Card>
        {renderImages}

        {renderTexts}

        {renderInfo}
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 240, p: { xs: 1, md: 2 } }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
            onAddBooking();
          }}
          sx={{
            display: isMyTour ? "none" : "flex",
          }}
        >
          <Iconify icon="mdi:bag-suitcase" />
          Add Booking
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
            onEditBooking();
          }}
          sx={{
            display: isMyTour ? "flex" : "none",
          }}
        >
          <Iconify icon="mdi:bag-suitcase" />
          Edit Tour
        </MenuItem>
      </CustomPopover>
    </>
  );
};

export default TourCard;
