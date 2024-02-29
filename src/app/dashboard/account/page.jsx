"use client";

import { useState, useCallback } from "react";
// @mui
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Container from "@mui/material/Container";

// components
import Iconify from "@/components/iconify";
import AccountGeneral from "./components/AccountGeneral";
import AccountSocialLinks from "./components/AccountSocialLinks";
import AccountChangePassword from "./components/AccountChangePassword";

const TABS = [
  {
    value: "general",
    label: "General",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  // {
  //   value: "billing",
  //   label: "Billing",
  //   icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  // },
  {
    value: "social",
    label: "Social links",
    icon: <Iconify icon="solar:share-bold" width={24} />,
  },
  {
    value: "security",
    label: "Security",
    icon: <Iconify icon="ic:round-vpn-key" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function AccountView() {
  const [currentTab, setCurrentTab] = useState("general");

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={"lg"}>
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>

      {currentTab === "general" && <AccountGeneral />}

      {/* {currentTab === "billing" && <AccountBilling />} */}

      {currentTab === "social" && <AccountSocialLinks />}

      {currentTab === "security" && <AccountChangePassword />}
    </Container>
  );
}
