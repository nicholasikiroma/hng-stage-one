import express from "express";
import { format } from "date-fns";

const app = express();

const currentDate = new Date();
const dayOfWeek = format(currentDate, "EEEE");
const currentTime = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");

app.get("/api", (req, res) => {
  const slack_name = req.query.slack_name || null;
  const track = req.query.track || null;

  // check if request contains required params
  if (slack_name === null || track === null)
    return res
      .status(403)
      .json({ Error: "Request must contain slack name and track" });

  const data = {
    slack_name: slack_name,
    current_day: dayOfWeek,
    utc_time: currentTime,
    track: track,
    github_file_url: null,
    github_repo_url: "https://github.com/nicholasikiroma/hng-stage-one",
    status_code: res.statusCode.toString(),
  };

  res.json(data);
});

export default app;
