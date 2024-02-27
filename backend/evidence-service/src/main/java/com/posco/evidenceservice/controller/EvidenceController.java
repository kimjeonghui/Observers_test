package com.posco.evidenceservice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.IOException;

@CrossOrigin(origins = "${react.url}")
@Controller
public class EvidenceController {
    @PostMapping("/receipts/${id}")
    public String monthEvidenceList() throws IOException {
        return "Post Request Success";
    }
}
