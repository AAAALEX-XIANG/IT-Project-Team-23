package com.controller;

import java.util.List;
import java.util.Map;

import com.model.Result;
import com.model.ViewArtifact;
import com.model.ViewAttachmentRequest;
import com.model.ViewAttachmentResult;
import com.service.ArtifactService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//Control requests in relates to artifact construction by users
@CrossOrigin("*")
@RestController
@RequestMapping("api/artifacts")
public class ArtifactController {

    @Autowired
    private ArtifactService artifactService;

    // Show all the categories , artifacts attachments of a single user
    @PostMapping("/show-Category-Artifact-Attachment")
    public Map<String, Map<String, List<String>>> showCategoryArtifactAttachments(@RequestParam String email) {
        return artifactService.showCategoryArtifactAttachments(email);
    }

    // Upload a artifact under a User's Category
    @PostMapping("/upload")
    public Result upload(@RequestParam String email, @RequestParam String category, @RequestParam String title,
            @RequestParam String description, @RequestParam(required = false) List<String> attachment,
            @RequestParam String privacy) {
        return artifactService.upload(email, category, title, description, attachment, privacy);
    }

    // Delete an artifact according to an email address and a category name
    @PostMapping("/delete-artifact")
    public Result deleteArtifact(@RequestBody ViewArtifact request) {
        return artifactService.deleteArtifact(request);
    }

    // Get a prefered attachment by the user
    @PostMapping("/get-attachment")
    public ViewAttachmentResult viewAttachment(@RequestBody ViewAttachmentRequest request) {
        return artifactService.viewAttachment(request);
    }

    @PostMapping("/get-attachment-byLink")
    public ViewAttachmentResult viewAttachmentByLink(@RequestParam String link, @RequestParam String category,
            @RequestParam String artifact, @RequestParam String attachment) {
        return artifactService.viewAttachmentByLink(link, category, artifact, attachment);
    }

    // Switch the privacy of an artifact
    @PostMapping("/change-privacy")
    public Result switchPrivacy(@RequestParam String email, @RequestParam String category,
            @RequestParam String artifact, @RequestParam String privacy) {
        return artifactService.switchPrivacy(email, category, artifact, privacy);
    }
}
