import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";

/* Section Configuration */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30md", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname,'public/assets')));

/* Section Stockage */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req, file, db){
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

/* Route avec fichiers */

app.post("/auth/register", upload.single("picture"), register);

/* ROUTES */

app.use("/auth", authRoutes);

/* Section Mongoose */

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(PORT, () => console.log(`Port du serveur: ${PORT}`));
}).catch((error) => console.log(`${error} didnt connect`)
);