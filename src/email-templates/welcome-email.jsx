import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const SouloquestConfirmationEmail = ({ validationURL, name }) => (
  <Html>
    <Head />
    <Preview>Confirm your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={"/assets/logo_png.png"}
            width="120"
            height="36"
            alt="Souloquest"
          />
        </Section>
        <Heading style={h1}>Confirm your email address</Heading>
        <Text style={heroText}>Hi {name}</Text>
        <Text style={heroText}>
          Welcome to Souloquest, the all in one tour management platform that
          helps you uncover qualified leads and fill tours faster.
        </Text>

        <Section style={btnContainer}>
          <Button style={button} href={validationURL}>
            Confirm Email address
          </Button>
        </Section>

        <Text style={text}>
          If you didn't request this email, there's nothing to worry about, you
          can safely ignore it.
        </Text>

        <Text style={text}>Happy Travelling!!</Text>

        <Section>
          <Row style={footerLogos}>
            <Column style={{ width: "66%" }}>
              <Img
                src={"/assets/logo_png.png"}
                width="120"
                height="36"
                alt="Souloquest"
              />
            </Column>
            <Column>
              <Section>
                <Row>
                  <Column>
                    <Link href="https://instagram.com/souloquest">
                      <Img
                        src={"/assets/instagram-png.png"}
                        width="32"
                        height="32"
                        alt="Souloquest"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                  {/* <Column>
                    <Link href="/">
                      <Img
                        src={`${baseUrl}/static/slack-facebook.png`}
                        width="32"
                        height="32"
                        alt="Slack"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column> */}
                  <Column>
                    <Link href="https://linkedin.com/souloquest">
                      <Img
                        src={`/assets/linkedin-png.png`}
                        width="32"
                        height="32"
                        alt="Souloquest"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                </Row>
              </Section>
            </Column>
          </Row>
        </Section>

        {/* <Section>
          <Link
            style={footerLink}
            href="https://slackhq.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Our blog
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://slack.com/legal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Policies
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://slack.com/help"
            target="_blank"
            rel="noopener noreferrer"
          >
            Help center
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://slack.com/community"
            target="_blank"
            rel="noopener noreferrer"
            data-auth="NotApplicable"
            data-linkindex="6"
          >
            Slack Community
          </Link>
          <Text style={footerText}>
            ©2024 Souloquest Technologies <br />
            <br />
            All rights reserved.
          </Text>
        </Section> */}
      </Container>
    </Body>
  </Html>
);

export default SouloquestConfirmationEmail;

const footerText = {
  fontSize: "12px",
  color: "#b7b7b7",
  lineHeight: "15px",
  textAlign: "left",
  marginBottom: "50px",
};

const footerLink = {
  color: "#b7b7b7",
  textDecoration: "underline",
};

const footerLogos = {
  marginBottom: "32px",
  paddingLeft: "8px",
  paddingRight: "8px",
  width: "100%",
};

const socialMediaIcon = {
  display: "inline",
  marginLeft: "32px",
};

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center",
  verticalAlign: "middle",
};

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "12px",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
