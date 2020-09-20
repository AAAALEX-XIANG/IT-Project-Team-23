package com.controller;

import java.util.List;
import java.util.Map;

import com.model.AllCategoryRequest;
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


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("api/artifacts")
public class ArtifactController {

    @Autowired
    private ArtifactService artifactService;
    


    @PostMapping("/show-Category-Artifact")
    public Map<String,List<String>> showCategoryArtifact(@RequestBody AllCategoryRequest request){
        return artifactService.showCategoryArtifact(request);
    }



    
    @PostMapping("/show-Category-Artifact-Attachment")
    public Map<String,Map<String, List<String>>> showCategoryArtifactAttachments(@RequestBody AllCategoryRequest request){
        return artifactService.showCategoryArtifactAttachments(request);
    }


    //Upload a artifact under a User's Category
    @PostMapping("/upload")
    public Result upload(@RequestParam String email, 
    @RequestParam String category, @RequestParam String title, 
    @RequestParam String description, @RequestParam(required = false) List<String> attachment,@RequestParam String privacy) {
        return artifactService.upload(email, category, title, description, attachment, privacy);
    }


    @PostMapping("/delete-artifact")
    public Result deleteArtifact(@RequestBody ViewArtifact request){
        return artifactService.deleteArtifact(request);
    }

    @PostMapping("/get-attachment")
    public ViewAttachmentResult viewAttachment(@RequestBody ViewAttachmentRequest request){
        return artifactService.viewAttachment(request);
    }
}
