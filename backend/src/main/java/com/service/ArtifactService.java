package com.service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.model.AllCategoryRequest;
import com.model.Artifact;
import com.model.Attachment;
import com.model.Category;
import com.model.Result;
import com.model.User;
import com.model.ViewArtifact;
import com.model.ViewAttachmentRequest;
import com.model.ViewAttachmentResult;
import com.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class ArtifactService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CacheService cacheService;



    //Show a Hashmap of categories and artifacts (Without attachments names inside)
    public Map<String,List<String>> showCategoryArtifact(AllCategoryRequest request){
        Map<String,List<String>> output = new HashMap<>();
        User user = userRepository.findByEmailaddress(request.getEmail());
        for(Category i : user.getCategories()){
            List<String> artifacts = new ArrayList<>();
            for(Artifact x: i.getArtifacts()){
                artifacts.add(x.getTitle());
            }
            output.put(i.getName(),artifacts);
        }
        return output;
    }


    //Show a Hashmap of categories and artifacts (With attachments names inside)
    public Map<String,Map<String, List<String>>> showCategoryArtifactAttachments(AllCategoryRequest request){
        Map<String,Map<String, List<String>>> output = new HashMap<>();
        User user = userRepository.findByEmailaddress(request.getEmail());
        for(Category i : user.getCategories()){
            Map<String, List<String>> innerOutput = new HashMap<>();
            for(Artifact x: i.getArtifacts()){              
                List<String> innerList = new ArrayList<>();
                innerList.add(x.getDescription());
                innerList.add(x.getPrivacy());
                for(Attachment y : x.getAttachments()){
                    innerList.add(y.getFilename());
                }
                innerOutput.put(x.getTitle(),innerList);
            }
            output.put(i.getName(),innerOutput);
        }
        return output;
    }



    //While User click submit with title, description and a list of attachments, backend can get a list of names remaining for uploading from cache
    public Result upload(String email, String category, String title, String description, List<String> attachment, String privacy) {
        Result result = new Result();
        Artifact artifact = new Artifact(title,description,privacy);
        User user = userRepository.findByEmailaddress(email);
        Category cat = user.existCategory(category);
        artifact.setAttachments(cacheService.getFileFromCache(email, attachment));
        cat.addArtifact(artifact);
        result.setResult(true);
        result.setReason("Success");
        userRepository.save(user);
        return result;
    }

    // Detele a particular artifact requerted by the user
    public Result deleteArtifact(ViewArtifact request){
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
    

    // Show the file that the user want to view in particular
    public ViewAttachmentResult viewAttachment(ViewAttachmentRequest request){
        User user = userRepository.findByEmailaddress(request.getEmail());
        Category category = user.existCategory(request.getCategory());
        Artifact artifact = category.getArtifacts(request.getArtifact());
        Attachment attachment = artifact.getAttachment(request.getAttachment());
        ViewAttachmentResult output = new ViewAttachmentResult();
        output.setFilename(attachment.getFilename());
        output.setFiletype(attachment.getFiletype());
        output.setContent(Base64.getEncoder().encodeToString(FileEncodeService.decodeFile(attachment.getFilename(), attachment.getContent()).getData()));
        output.setSize(attachment.getSize());
        return output;
    }


    public Result switchPrivacy(String email, String category, String artifact, String privacy){
        User user = userRepository.findByEmailaddress(email);
        Result result = new Result();
        if(user == null){
            result.setReason("Email is not correct");
            result.setResult(false);
            return result;
        }
        Category cate = user.existCategory(category);
        Artifact artifactOne = cate.getArtifacts(artifact);
        artifactOne.setPrivacy(privacy);
        userRepository.save(user);
        result.setReason("Success");
        result.setResult(true);
        return result;
    }

}
