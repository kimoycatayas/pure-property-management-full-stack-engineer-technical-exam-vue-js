import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import agentRoutes from "./routes/agentRoutes";
import propertyRoutes from "./routes/propertyRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/agents", agentRoutes);
app.use("/properties", propertyRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
