package dev.suraj.portfolio.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PortfolioController {

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of("status", "online", "service", "suraj-portfolio-api", "timestamp", Instant.now().toString());
    }

    @GetMapping("/profile")
    public Map<String, Object> profile() {
        return Map.of(
            "name", "Suraj Vishwakarma",
            "role", "Java Full Stack Developer",
            "experience", "3 years",
            "location", "Delhi, India",
            "focus", new String[]{"Java", "Spring", "Enterprise applications", "Cloud"},
            "links", Map.of(
                "linkedin", "https://www.linkedin.com/in/surajvishwakarma99",
                "github", "https://github.com/surajwakka"
            )
        );
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> contact(@Valid @RequestBody ContactRequest request) {
        // Intentionally does not persist or email personal data.
        // Connect this endpoint to an email provider or database before production use.
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(Map.of(
            "status", "received",
            "message", "Thanks, " + request.name().trim() + ". Your message is ready to be connected to a mail service."
        ));
    }

    public record ContactRequest(
        @NotBlank @Size(max = 80) String name,
        @NotBlank @Email @Size(max = 160) String email,
        @NotBlank @Size(max = 2000) String message
    ) {}
}
