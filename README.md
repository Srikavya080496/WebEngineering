## Asssignment 1 for Web Engineering Course

#### Introduction
The `ControllerApiClass` is a Spring Boot controller designed to interact with NASA's Astronomy Picture of the Day (APOD) API. This controller allows users to fetch astronomy pictures based on specific dates, date ranges, or randomly by specifying a count. It also supports fetching thumbnail images when available. This guide provides an overview of the API usage, including how to set up the controller in a Spring Boot application and examples of making requests to the APOD API through this controller.

#### API Usage
To use the `ControllerApiClass`, ensure your Spring Boot application is correctly set up with the necessary dependencies, including Spring Web and Spring Boot Starter. The controller uses `RestTemplate` for HTTP requests, so ensure this is configured in your application context if not already.

The endpoint exposed by `ControllerApiClass` is `/get`, which supports several optional query parameters to customize the API call to the NASA APOD API. These parameters are:

- `date`: The date of the astronomy picture to fetch (formatted as YYYY-MM-DD).
- `start_date`: The start date of a date range for fetching astronomy pictures.
- `end_date`: The end date of a date range for fetching astronomy pictures.
- `count`: The number of random astronomy pictures to fetch (ignored if a date or date range is specified).
- `thumbs`: A boolean indicating whether to fetch thumbnails instead of full images (where available).

#### Examples

1. **Fetching a Picture for a Specific Date**
   - Request: `/get?date=2024-02-01`
   - This request fetches the astronomy picture of the day for February 1, 2024.

2. **Fetching Pictures for a Date Range**
   - Request: `/get?start_date=2024-01-01&end_date=2024-01-07`
   - This request fetches astronomy pictures for each day from January 1, 2024, to January 7, 2024.

3. **Fetching Random Pictures**
   - Request: `/get?count=5`
   - This request fetches 5 random astronomy pictures.

4. **Fetching a Picture with Thumbnail**
   - Request: `/get?date=2024-02-01&thumbs=true`
   - This request fetches the astronomy picture of the day for February 1, 2024, with a preference for a thumbnail image if available.

