package com.spring.nasaApi.SpringNASAAPI.Controller;

import com.spring.nasaApi.SpringNASAAPI.Model.APODResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collections;
import java.util.List;

@CrossOrigin(
    origins = {
        "http://localhost:3000",
        "https://3000-srikavya080-webengineer-2qnxntpyuu6.ws-us110.gitpod.io"
        },
    methods = {
                RequestMethod.OPTIONS,
                RequestMethod.GET,
                RequestMethod.PUT,
                RequestMethod.DELETE,
                RequestMethod.POST
})
@RestController
public class NasaController {

    private String apiKey="rg6gbzupnDax7xQry6XXVr68bdcU5CHJS57hhGfd";

    private static final String APOD_URL = "https://api.nasa.gov/planetary/apod";



    @GetMapping("/apod")
    public List<APODResponse> getAPOD(@RequestParam(required = false) String date,
                                @RequestParam(required = false) String start_date,
                                @RequestParam(required = false) String end_date,
                                @RequestParam(required = false) Integer count,
                                @RequestParam(required = false) Boolean thumbs) {
        RestTemplate restTemplate = new RestTemplate();
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(APOD_URL)
                .queryParam("api_key", apiKey)
                .queryParam("date", date)
                .queryParam("start_date", start_date)
                .queryParam("end_date", end_date)
                .queryParam("count", count)
                .queryParam("thumbs", thumbs);

        String url = uriBuilder.toUriString();

        try {
            ResponseEntity<List<APODResponse>> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<APODResponse>>() {}
            );
            return responseEntity.getBody();
        } catch (Exception e) {

            try {
                APODResponse singleResponse = restTemplate.getForObject(url, APODResponse.class);
                return Collections.singletonList(singleResponse);
            } catch (Exception ex) {

                throw new RuntimeException( ex.getMessage(), ex);
            }
        }
    }
}