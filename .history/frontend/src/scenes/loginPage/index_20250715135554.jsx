import {Box, Typography, useTheme, useMediaQuery} from "@mui/material";
import Form from "./Form";
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
        <Box wwidth={isNonMobileScreens ? "50%" : "93%"} p="2rem" m="2rem auto" borderRadius="1.5rem" backgroundColor={theme.palette.background.alt}>
            <Typography fontWeight="500" variant="h5" sx={{mb: "1.5rem"}}>
                Bienvenue sur Social Haven,  quoi de mieux que de s'abrutir en groupe pendant des heures ?
            </Typography>
            <Form/>
        </Box>
    </Box>;
}
export default LoginPage;