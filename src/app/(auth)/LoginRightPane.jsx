import React from "react";
import { StyledRoot } from "./styles";
import Image from "@/components/image";

const LoginRightPane = () => {
  return (
    <>
      <StyledRoot>
        <Image
          visibleByDefault
          disabledEffect
          alt="marketing market"
          src="/assets/loginimg.svg"
          loading="lazy"
          sx={{
            maxHeight: "440px",
            maxWidth: "400px",
          }}
        />
      </StyledRoot>
    </>
  );
};

export default LoginRightPane;
