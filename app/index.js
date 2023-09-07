import express from "express";
import cors from "cors";
import { format, utcToZonedTime } from "date-fns-tz";

const app = express();
app.use(cors());

function getRandomOffsetMinutes(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDate() {
  const currentDate = new Date();
  const dayOfWeek = format(currentDate, "EEEE");

  // Generate a random offset between -2 and 2
  const randomOffsetMinutes = getRandomOffsetMinutes(-2, 2);

  const currentTime = new Date(
    currentDate.getTime() + randomOffsetMinutes * 60000
  );

  const utcTime = utcToZonedTime(currentTime, "UTC");
  const formattedTime = format(utcTime, "yyyy-MM-dd'T'HH:mm:ss'Z'");

  return { dayOfWeek, formattedTime };
}

app.get("/api", (req, res) => {
  const slack_name = req.query.slack_name || null;
  const track = req.query.track || null;

  // check if request contains required params
  if (slack_name === null || track === null)
    return res.status(400).json({
      Error: "Request must contain slack name and track",
      status_code: res.statusCode,
    });

  const { dayOfWeek, formattedTime } = getDate();

  const data = {
    slack_name: slack_name,
    current_day: dayOfWeek,
    utc_time: formattedTime,
    track: track,
    github_file_url:
      "https://github.com/nicholasikiroma/hng-stage-one/blob/main/server.js",
    github_repo_url: "https://github.com/nicholasikiroma/hng-stage-one",
    status_code: res.statusCode,
  };

  res.json(data);
});

export default app;
