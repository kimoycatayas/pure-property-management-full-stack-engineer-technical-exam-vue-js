import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import agentRoutes from "./routes/agentRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/agents", agentRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
