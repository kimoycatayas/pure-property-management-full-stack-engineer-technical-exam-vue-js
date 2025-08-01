import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import agentRoutes from "./routes/agentRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import tenantRoutes from "./routes/tenantRoutes";
import noteRoutes from "./routes/noteRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/agents", agentRoutes);
app.use("/properties", propertyRoutes);
app.use("/tenants", tenantRoutes);
app.use("/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
