# HNG Stage One Task

## Requirements

The information required in the JSON response includes:

- **Slack Name**: Your Slack username.
- **Current Day of the Week**: Display the current day of the week in full (e.g., Monday, Tuesday, etc.).
- **Current UTC Time**: Return the current UTC time, accurate within a +/-2 minute window.
- **Track**: Display the track you signed up for (Backend). This will be based on the "track" GET parameter passed to the endpoint.
- **GitHub File URL**: Include a direct link to the specific file in the GitHub repository that's being executed.
- **GitHub Repo URL**: Include a link to the main page of the GitHub repository containing the project's entire source code.
- **Status Code**: Return "200" as a string to indicate a successful response.

## GET Parameters

The endpoint should accept two GET parameters: slack_name and track.

Example endpoint URL: <http://example.com/api?slack_name=example_name&track=backend>.

## JSON Format

```json
{
  "slack_name": "example_name",
  "current_day": "Monday",
  "utc_time": "2023-08-21T15:04:05Z",
  "track": "backend",
  "github_file_url": "https://github.com/username/repo/blob/main/file_name.ext",
  "github_repo_url": "https://github.com/username/repo",
  "status_code": "200"
}
```
