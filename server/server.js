import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` INVST.AI BACKEND SERVER STARTED AT PORT ${PORT} `);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'} `);
  console.log(` Health check: http://localhost:${PORT}/health `);
  console.log(`====================================================`);
});
