To install Java 17 on a Linux system and set the JAVA_HOME environment variable, follow these steps. 

### For Ubuntu/Debian:

1. **Update Package Index**:
   ```bash
   sudo apt update
   ```

2. **Install OpenJDK 17**:
   ```bash
   sudo apt install openjdk-17-jdk -y
   ```

3. **Set JAVA_HOME Environment Variable**:
   - First, find out the path of your Java installation:
     ```bash
     sudo update-alternatives --config java
     ```
     From the output, copy the path of the installation. It usually looks something like `/usr/lib/jvm/java-17-openjdk-amd64`.
   - Open `/etc/environment` in a text editor:
     ```bash
     sudo nano /etc/environment
     ```
   - Add the following line (replace `/your/java/path` with the path you copied):
     ```
     JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
     ```
   - Save and exit the editor.
   - Apply the changes:
     ```bash
     source /etc/environment
     ```
   - Verify that `JAVA_HOME` is set:
     ```bash
     echo $JAVA_HOME
     ```
To append the Java executable location to your system's `PATH` environment variable, ensuring that Java commands can be run from any terminal session, you need to modify the `PATH` variable by adding the path to the Java `bin` directory. This is slightly different from setting `JAVA_HOME`. Here's how you can do it:

1. **Find Your Java Installation Path**: 
   You've likely identified this in the previous steps. It's usually something like `/usr/lib/jvm/java-17-openjdk-amd64` for OpenJDK 17 on Ubuntu/Debian systems. Make sure to adjust the path according to your specific Java version and installation details.

2. **Set PATH Environment Variable**:
   - For a single session (temporary), you can set the `PATH` variable directly in the terminal:
     ```bash
     export PATH=$JAVA_HOME/bin:$PATH
     ```


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

