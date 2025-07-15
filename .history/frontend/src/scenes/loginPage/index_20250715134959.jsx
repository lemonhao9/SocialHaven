import {Box, Typography, useTheme, useMediaQuery} from "@mui/material";

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return <Box>
        <Box>
            <Box width="100%" backgroundColor={theme.palettebackground.alt} p="1rem 6%" textAlign="center">
            <Typography 
            fontWeight="bold"
            fontSize="32px"
            color="primary"
            >
                SocialHaven
            </Typography>
            </Box>
        </Box>
    </Box>;
}
export default LoginPage;