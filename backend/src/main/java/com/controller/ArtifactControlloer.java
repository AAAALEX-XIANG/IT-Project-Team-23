package com.controller;

import java.io.IOException;
import java.util.Base64;

import com.model.Artifact;
import com.model.Attachment;
import com.model.Category;
import com.model.Result;
import com.model.User;
import com.model.ViewArtifact;
import com.model.ViewArtifactResult;
import com.model.ViewAttachmentRequest;
import com.model.ViewAttachmentResult;
import com.repositories.UserRepository;

import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("api/artifacts")
public class ArtifactControlloer {

    @Autowired
    private UserRepository userRepository;
    //Upload a artifact under a User's Category
    @PostMapping("/upload")
    public MultipartFile upload(@RequestParam String email, 
    @RequestParam String category, @RequestParam String title, 
    @RequestParam String description, @RequestParam(required = false) MultipartFile[] attachment) throws IOException {
        Result result = new Result();
        Artifact artifact = new Artifact(title,description);
        User user = userRepository.findByEmailaddress(email);
        Category cat = user.existCategory(category);
        try {
            if(attachment != null){
                for (MultipartFile file : attachment) {
                    Attachment one = new Attachment(file.getOriginalFilename(), file.getContentType(),
                    new Binary(file.getBytes()), file.getSize());
                    artifact.addAttachment(one);
                }
            }
            cat.addArtifact(artifact);
            result.setResult(true);
            userRepository.save(user);
            return attachment[0];

        } catch (IOException ex) {
            ex.printStackTrace();
            result.setResult(false);
            return null;
        }
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
