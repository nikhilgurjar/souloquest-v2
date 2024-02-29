"use client";
import React from "react";
import { Collapse, ListItemButton } from "@mui/material";

const CollapseRefined = ({ header, children, ...props }) => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton slot="p" onClick={handleToggle}>
        {header}
      </ListItemButton>
      <Collapse in={open} {...props}>
        {children}
      </Collapse>
    </>
  );
};

export default CollapseRefined;
