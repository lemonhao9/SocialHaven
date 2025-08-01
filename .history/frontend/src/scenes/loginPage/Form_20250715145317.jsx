import {useState} from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/materrial";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index.js";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
     email: yup.string().email("invalid email").required("required"),
     password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initialValuesLogin = {
    email:  "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("()min-width:600px");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";


    const handleFormSubmit = async (validateYupSchema, onSubmitProps) => {};

    return{
        <Formik onSubmit={handleFormSubmit} initialValues={isLogin ? initialValuesLogin : initialValuesRegister} validationSchema={isLogin ? loginSchema : registerSchema}>
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
        }) => (
            <form onSubmit={handleSumit}>
                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{
                    "& > div":{gridColumn: isNonMobile ? undefined : "span 4"},
                }}>
                    {isRegister && (
                        <>
                        <TextField
                        label="Prénom"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        error={Boolean(tooched.firstName) && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        sx={{ gridColumns: "span 2"}}
                        />
                        <TextField
                        label="Nom"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        error={Boolean(tooched.lastName) && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        sx={{ gridColumns: "span 2"}}
                        />
                        <TextField
                        label="Localisation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        name="location"
                        error={Boolean(tooched.location) && Boolean(errors.location)}
                        helperText={touched.location && errors.location}
                        sx={{ gridColumns: "span 4"}}
                        />
                        <TextField
                        label="Occupation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.occupation}
                        name="occupation"
                        error={Boolean(tooched.occupation) && Boolean(errors.occupation)}
                        helperText={touched.occupation && errors.occupation}
                        sx={{ gridColumns: "span 4"}}
                        />
                        <Box gridColumn="span 4" border={`1px solid ${palette.neutral.medium}`} borderRadius= "5px" p="1rem">
                            <Dropzone acceptedFiles=".jpg, .jpeg, .png" multiple={false} onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0]) }>
                                {({getRootProps, getInputProps}) => (
                                    <Box {...getRootProps()} border={`2px dashed ${palette.primary.main}`} p="1rem" sx={{ "&:hover": { cursor: "pointer"}}}>
                                        <input {...getInputProps()}/>
                                        {!values.pictures ? (
                                            <p>Ajouter une photo</p>
                                        ):(
                                            <FlexBetween>
                                                <Typography>{values.picture.name}</Typography>
                                                <EditOutlineIcon/>
                                            </FlexBetween>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Box>
                        </>
                    )}
                </Box>
            </form>
        )}
        </Formik>
    }
}

export default Form;