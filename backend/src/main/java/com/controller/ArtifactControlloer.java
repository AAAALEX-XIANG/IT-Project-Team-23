package com.controller;

import java.util.Base64;
import java.util.List;

import com.model.Artifact;
import com.model.Attachment;
import com.model.Category;
import com.model.Result;
import com.model.User;
import com.model.UserCache;
import com.model.ViewArtifact;
import com.model.ViewArtifactResult;
import com.model.ViewAttachmentRequest;
import com.model.ViewAttachmentResult;
import com.repositories.CacheRepository;
import com.repositories.UserRepository;


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
public class ArtifactControlloer {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CacheRepository cacheRepository;
    //Upload a artifact under a User's Category
    @PostMapping("/upload")
    public Result upload(@RequestParam String email, 
    @RequestParam String category, @RequestParam String title, 
    @RequestParam String description, @RequestParam(required = false) List<String> attachment) {
        Result result = new Result();
        Artifact artifact = new Artifact(title,description);
        UserCache cache = cacheRepository.findByEmailaddress(email);
        User user = userRepository.findByEmailaddress(email);
        Category cat = user.existCategory(category);
        if(attachment != null){
            for (String file : attachment) {
                artifact.addAttachment(cache.findAttachment(file));
            }
        }
        cat.addArtifact(artifact);
        result.setResult(true);
        result.setReason("Success");
        userRepository.save(user);
        return result;
    }

    @PostMapping("/view-artifact")
    public ViewArtifactResult viewArtifact(@RequestBody ViewArtifact request){
        User user = userRepository.findByEmailaddress(request.getEmail());
        Category category = user.existCategory(request.getCategory());
        Artifact artifact = category.getArtifacts(request.getArtifact());
        ViewArtifactResult output = new ViewArtifactResult();
        output.setTitle(artifact.getTitle());
        output.setDescription(artifact.getDescription());
        for(Attachment a : artifact.getAttachments()){
            output.addAttachment(a.getFilename());
        }
        return output;
    }


    @PostMapping("/delete-artifact")
    public Result deleteArtifact(@RequestBody ViewArtifact request){
        Result result = new Result();
        User user = userRepository.findByEmailaddress(request.getEmail());
        Category category = user.existCategory(request.getCategory());
        if(category != null){
            category.removeArtifact(request.getArtifact());
            userRepository.save(user);
            result.setResult(true);
            return result;
        }
        result.setResult(false);
        return result;
    }

    @PostMapping("/get-attachment")
    public ViewAttachmentResult viewAttachment(@RequestBody ViewAttachmentRequest request){
        User user = userRepository.findByEmailaddress(request.getEmail());
        Category category = user.existCategory(request.getCategory());
        Artifact artifact = category.getArtifacts(request.getArtifact());
        Attachment attachment = artifact.getAttachment(request.getAttachment());
        ViewAttachmentResult output = new ViewAttachmentResult();
        output.setFilename(attachment.getFilename());
        output.setFiletype(attachment.getFiletype());
        output.setContent(Base64.getEncoder().encodeToString(attachment.getContent().getData()));
        output.setSize(attachment.getSize());
        return output;
    }
}
