import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, GitHub, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import '../Styles/Footer.css'
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
       
        p: 0,
      }}
  id="footer"  >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
          <img src="https://designcontest.nyc3.digitaloceanspaces.com/data/contests/5057/entries/PLONN9uA1.png" id='footer-logo'/>
            <Typography variant="h6" color="text.primary" gutterBottom>
            <strong>About Us</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We , Job Nest is a platform where job seekers can able to search for jobs and companies can recruit job seekers directly.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              <strong>Contact Us</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
            <LocationOnIcon/>  Coimbatore 
            </Typography>
            <Typography variant="body2" color="text.secondary">
             <EmailIcon/>  jobnest@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
            <PhoneAndroidIcon/> +91 76393 31179
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" id="follow" gutterBottom>
            <strong>Connect with     us !</strong> 
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
            <Link href="https://www.github.com/SivasankarKuppusamy"  sx={{ pl: 1, pr: 1 }} color="inherit">
              <GitHub />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="http://localhost:3000">
              Job Nest
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
