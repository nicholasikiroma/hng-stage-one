import express from "express";
import cors from "cors";
import { format, addMinutes } from "date-fns";

const app = express();
app.use(cors());

const currentDate = new Date();
const dayOfWeek = format(currentDate, "EEEE");

// Generate a random offset between -2 and 2
const randomOffsetMinutes = Math.floor(Math.random() * 5) - 2;

// Add the random offset to the current time
const currentTime = addMinutes(currentDate, randomOffsetMinutes);
const formattedTime = format(currentTime, "yyyy-MM-dd'T'HH:mm:ss'Z'");

app.get("/api", (req, res) => {
  const slack_name = req.query.slack_name || null;
  const track = req.query.track || null;

  // check if request contains required params
  if (slack_name === null || track === null)
    return res.status(400).json({
      Error: "Request must contain slack name and track",
      status_code: res.statusCode.toString(),
    });

  const data = {
    slack_name: slack_name,
    current_day: dayOfWeek,
    utc_time: formattedTime,
    track: track,
    github_file_url:
      "https://github.com/nicholasikiroma/hng-stage-one/blob/main/server.js",
    github_repo_url: "https://github.com/nicholasikiroma/hng-stage-one",
    status_code: res.statusCode.toString(),
  };

  res.json(data);
});

export default app;
