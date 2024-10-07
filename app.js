const express = require("express");
const app = express();
app.use(express.json());

const route = require("./routes/all_routes");
// app.use(requestLogger);
// app.use(validateRequestBody);

app.use("/api", route);

app.listen(1612, () => {
  console.log("Server Running on 1612");
});
