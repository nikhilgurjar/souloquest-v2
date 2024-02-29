import React from "react";

const VerifyEmailIdTemplate = ({ name, verifyUrl }) => {
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          textAlign: "center",
          padding: "50px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={"logoImage"} alt="Logo" width="100" />
      </div>

      <div style={{ fontSize: "18px" }}>
        <p style={{ marginBottom: "10px" }}>Hi {name},</p>
        <p>{`Welcome to our app! We're very excited to have you on board.`}</p>
        <p>Please verify your email address to get started.</p>
      </div>

      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <a
          style={{
            display: "inline-block",
            padding: "10px 20px",
            background: "blue",
            color: "#fff",
            textDecoration: "none",
          }}
          href={verifyUrl}
        >
          Verify Email
        </a>
      </div>

      <p style={{ fontSize: "14px" }}>
        Thanks,
        <br />
        The Souloquest Team
      </p>
    </div>
  );
};

export default VerifyEmailIdTemplate;
