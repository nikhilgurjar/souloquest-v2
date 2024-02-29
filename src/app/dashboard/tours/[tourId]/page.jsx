"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTours } from "../components/TourContext";
import { varTranHover } from "@/components/animate";
import Lightbox, { useLightBox } from "@/components/lightbox";
import Image from "@/components/image";
import Iconify from "@/components/iconify";

import { m } from "framer-motion";
// @mui
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ListItemText from "@mui/material/ListItemText";
import { fDate } from "@/utils/formatTime";
import Markdown from "@/components/markdown/Markdown";
import { TOUR_CATEGORIES } from "@/utils/siteConfig";

const TourDetailPage = () => {
  const { tourId } = useParams();
  const { getTourDetailsById } = useTours();
  const [tour, setTour] = useState({});
  const router = useRouter();

  const handleEditTour = () => {
    router.push(`/dashboard/tours/edit/${tourId}`);
  };

  useEffect(() => {
    const getTourDetails = async () => {
      try {
        const response = await getTourDetailsById(tourId);
        setTour(response);
      } catch (error) {
        console.error(error);
      }
    };
    getTourDetails();
  }, [tourId]);

  console.log(tour);

  const slides = tour?.images?.map((slide) => ({
    src: slide,
  }));

  const {
    selected: selectedImage,
    open: openLightbox,
    onOpen: handleOpenLightbox,
    onClose: handleCloseLightbox,
  } = useLightBox(slides);

  const renderGallery = (
    <>
      <Box
        gap={1}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          md: slides?.length > 1 ? "repeat(2, 1fr)" : "repeat(1, 1fr)",
        }}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <m.div
          key={Array.isArray(slides) && slides[0]?.src}
          whileHover="hover"
          variants={{
            hover: { opacity: 0.8 },
          }}
          transition={varTranHover()}
          style={{ textAlign: "center" }}
        >
          <Image
            alt={Array.isArray(slides) && slides[0]?.src}
            src={Array.isArray(slides) && slides[0]?.src}
            ratio="1/1"
            onClick={() =>
              handleOpenLightbox(Array.isArray(slides) && slides[0]?.src)
            }
            sx={{
              borderRadius: 2,
              cursor: "pointer",
              maxHeight: "360px",
              maxWidth: "360px",
            }}
          />
        </m.div>

        <Box gap={1} display="grid" gridTemplateColumns="repeat(2, 1fr)">
          {slides?.slice(1, 5)?.map((slide) => (
            <m.div
              key={slide.src}
              whileHover="hover"
              variants={{
                hover: { opacity: 0.8 },
              }}
              transition={varTranHover()}
            >
              <Image
                alt={slide.src}
                src={slide.src}
                ratio="1/1"
                onClick={() => handleOpenLightbox(slide.src)}
                sx={{ borderRadius: 2, cursor: "pointer" }}
              />
            </m.div>
          ))}
        </Box>
      </Box>

      <Lightbox
        index={selectedImage}
        slides={slides}
        open={openLightbox}
        close={handleCloseLightbox}
      />
    </>
  );

  const renderHead = (
    <>
      <Stack direction="row" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {tour?.title}
        </Typography>

        <IconButton
          sx={{
            height: "40px",
          }}
        >
          <Iconify icon="mdi:edit-circle" onClick={handleEditTour} />
        </IconButton>

        <IconButton>
          <Iconify icon="solar:share-bold" />
        </IconButton>
      </Stack>

      <Stack spacing={3} direction="row" flexWrap="wrap" alignItems="center">
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ typography: "body2" }}
        >
          <Iconify icon="eva:star-fill" sx={{ color: "warning.main" }} />
          <Box component="span" sx={{ typography: "subtitle2" }}>
            {tour?.rating}
          </Box>
        </Stack>

        <Stack
          spacing={3}
          gap={3}
          direction="row"
          flexWrap="wrap"
          alignItems="center"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ typography: "body2" }}
          >
            <Iconify
              icon="ic:sharp-currency-rupee"
              sx={{ color: "warning.dark" }}
            />
            <Box component="span" sx={{ typography: "subtitle2" }}>
              From{" "}
              {Array.isArray(tour?.priceOptions) &&
                tour?.priceOptions[0]?.price}
            </Box>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            gap={0.5}
            sx={{ typography: "body2" }}
          >
            <Iconify icon="ic:round-grid-3x3" sx={{ color: "warning.dark" }} />
            <Box component="span" sx={{ typography: "subtitle2" }}>
              <Typography
                component={"span"}
                sx={{ color: "text.secondary", fontWeight: "normal" }}
                variant="body2"
              >
                {" "}
                TourId:
              </Typography>{" "}
              {tourId}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  );

  const renderDestination = (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
        }}
      >
        {tour?.destinations?.map((item) => (
          <Stack key={item} spacing={1.5} direction="row">
            <Iconify
              icon="mingcute:location-fill"
              sx={{ color: "error.main" }}
            />
            <ListItemText
              primary={item}
              primaryTypographyProps={{
                typography: "subtitle2",
                color: "text.primary",
                component: "span",
              }}
            />
          </Stack>
        ))}
      </Box>
    </>
  );

  const renderOverview = (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
      }}
    >
      {[
        {
          label: "Available from",
          value: `${fDate(tour?.startDate)}`,
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: "Tour Company",
          value: tour?.tourCompany?.name,
          icon: <Iconify icon="solar:user-rounded-bold" />,
        },
        {
          label: "Durations",
          value: `${tour?.numDays} Days`,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: "Categories",
          value: tour?.categories
            ?.map((item) => TOUR_CATEGORIES[item].label)
            .join(", "),
          icon: <Iconify icon="ic:sharp-category" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{
              typography: "body2",
              color: "text.secondary",
              mb: 0.5,
            }}
            secondaryTypographyProps={{
              typography: "subtitle2",
              color: "text.primary",
              component: "span",
            }}
          />
        </Stack>
      ))}
    </Box>
  );

  const renderContent = (
    <>
      <Stack>
        <Typography variant="h5" sx={{ color: "primary" }}>
          OverView
        </Typography>

        <Markdown children={tour?.overview} />
      </Stack>
      <Stack spacing={2} my={5}>
        <Typography variant="h4" sx={{ color: "primary.dark" }}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            INCLUSIONS/EXCLUSIONS
          </Typography>
          {`What we'll give. What we won't`}
        </Typography>
        <Grid container gap={{ xs: 3, md: 0 }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{ mb: { md: 3, xs: 1 }, color: "success.dark" }}
            >
              What is included in the tour
            </Typography>

            {tour?.included?.map((inclusion) => (
              <Stack
                key={inclusion}
                spacing={1}
                gap={1}
                my={1}
                direction="row"
                alignItems="center"
              >
                <Iconify
                  icon="eva:checkmark-circle-2-outline"
                  sx={{
                    color: "primary.main",
                  }}
                />
                {inclusion}
              </Stack>
            ))}
            {tour?.included?.length === 0 && (
              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", pl: 1.5 }}
              >
                No inclusions
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{ mb: { md: 3, xs: 1 }, color: "error.dark" }}
            >
              What is NOT included in the tour
            </Typography>

            {tour?.notIncluded?.map((inclusion) => (
              <Stack
                key={inclusion}
                spacing={1}
                gap={1}
                my={1}
                direction="row"
                alignItems="center"
              >
                <Iconify
                  icon="eva:minus-circle-fill"
                  sx={{
                    color: "error.dark",
                  }}
                />
                {inclusion}
              </Stack>
            ))}

            {tour?.notIncluded?.length === 0 && (
              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", pl: 1.5 }}
              >
                No Information given..
              </Typography>
            )}
          </Grid>
        </Grid>
      </Stack>

      <Stack spacing={2} my={2}>
        {Array.isArray(tour?.highlights) && tour?.highlights?.length > 0 && (
          <Typography variant="h4" sx={{ color: "primary.dark" }}>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              HIGHLIGHTS
            </Typography>
            What makes this tour special
          </Typography>
        )}
        {Array.isArray(tour?.highlights) &&
          tour?.highlights?.length > 0 &&
          tour?.highlights?.map((highlight, index) => (
            <Stack
              key={highlight}
              spacing={1}
              direction="row"
              alignItems="center"
            >
              <Iconify
                icon="eva:star-fill"
                sx={{
                  color: "primary.main",
                }}
              />
              {highlight}
            </Stack>
          ))}
      </Stack>

      <Stack spacing={2} gap={2} my={3}>
        <Typography variant="h5" sx={{ color: "primary" }}>
          Itenary
        </Typography>

        {tour?.itenary?.map((item) => (
          <Stack
            key={item?._id}
            spacing={1}
            direction="column"
            alignItems="center"
            gap={1}
            width={"100%"}
          >
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                background: "#eee",
                padding: "10px",
                borderRadius: "8px",
                width: "100%",
              }}
            >
              {item?.title}
            </Typography>
            <Markdown children={item?.description} />
          </Stack>
        ))}
      </Stack>
    </>
  );

  return (
    <>
      <Container maxWidth={"lg"}>
        {tour?.images?.length > 0 && renderGallery}

        <Stack sx={{ maxWidth: 720, mx: "auto" }}>
          {renderHead}

          <Divider sx={{ borderStyle: "dashed", my: 5 }} />

          {renderOverview}

          <Divider sx={{ borderStyle: "dashed", my: 5 }} />

          {renderDestination}

          <Divider sx={{ borderStyle: "dashed", my: 5 }} />

          {renderContent}
        </Stack>
      </Container>
    </>
  );
};

export default TourDetailPage;
