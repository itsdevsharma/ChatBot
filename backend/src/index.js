import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import {server} from './app.js';

dotenv.config({
    path: "./.env"
})

console.log("🔁 App is restarting...");


const port = process.env.PORT || 8000;


connectDB()
.then(
    server.listen(port, () => {
        console.log(`you are running on the Port. ${port}`);
        console.log("hello world");
    })
)
.catch((error) => {
    console.log(`error in connecting the database: ${error}`);
}
)






