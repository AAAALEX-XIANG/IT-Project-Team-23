package com.service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    // Show a Hashmap of categories and artifacts (With attachments names inside)
    public Map<String, Map<String, List<String>>> showCategoryArtifactAttachments(String email) {
        Map<String, Map<String, List<String>>> output = new HashMap<>();
        User user = userRepository.findByEmailaddress(email);
        if (user == null) {
            return null;
        }
        for (Category i : user.getCategories()) {
            Map<String, List<String>> innerOutput = new HashMap<>();
            for (Artifact x : i.getArtifacts()) {
                List<String> innerList = new ArrayList<>();
                innerList.add(x.getDescription());
                innerList.add(x.getPrivacy());
                for (Attachment y : x.getAttachments()) {
                    innerList.add(y.getFilename());
                }
                innerOutput.put(x.getTitle(), innerList);
            }
            output.put(i.getName(), innerOutput);
        }
        return output;
    }

    // While User click submit with title, description and a list of attachments,
    // backend can get a list of names remaining for uploading from cache
    public Result upload(String email, String category, String title, String description, List<String> attachment,
            String privacy) {
        Result result = new Result();
        User user = userRepository.findByEmailaddress(email);
        // Check if email exists
        if (user == null) {
            result.setNoEmail();
            return result;
        }
        Category cat = user.existCategory(category);
        // Not likely to happen but convinient for testing
        if (cat == null) {
            result.setReason("Category not exist");
            result.setResult(false);
            return result;
        }
        // Check if the title already exists in the category
        if (cat.getArtifacts(title) != null) {
            result.setReason("Artifact already exists/ Title exists");
            result.setResult(false);
            return result;
        }
        Artifact artifact = new Artifact(title, description, privacy);
        artifact.setAttachments(cacheService.getFileFromCache(email, attachment));
        cat.addArtifact(artifact);
        result.setSuccess();
        userRepository.save(user);
        return result;
    }

    // Detele a particular artifact requerted by the user
    public Result deleteArtifact(ViewArtifact request) {
        Result result = new Result();
        User user = userRepository.findByEmailaddress(request.getEmail());
        if (user == null) {
            result.setNoEmail();
            return result;
        }
        Category category = user.existCategory(request.getCategory());
        if (category == null) {
            result.setReason("Category does not exist");
            result.setResult(false);
            return result;
        }
        category.removeArtifact(request.getArtifact());
        userRepository.save(user);
        result.setResult(true);
        return result;
    }

    // Show the file that the user want to view in particular
    public ViewAttachmentResult viewAttachment(ViewAttachmentRequest request) {
        User user = userRepository.findByEmailaddress(request.getEmail());
        Category category = user.existCategory(request.getCategory());
        Artifact artifact = category.getArtifacts(request.getArtifact());
        Attachment attachment = artifact.getAttachment(request.getAttachment());
        ViewAttachmentResult output = new ViewAttachmentResult();
        output.setFilename(attachment.getFilename());
        output.setFiletype(attachment.getFiletype());
        output.setContent(Base64.getEncoder().encodeToString(
                FileEncodeService.decodeFile(attachment.getFilename(), attachment.getContent()).getData()));
        output.setSize(attachment.getSize());
        return output;
    }

    // Show the file that the user want to view in particular
    public ViewAttachmentResult viewAttachmentByLink(String link, String category, String artifact, String attachment) {
        User user = userRepository.findUserByLink(link);
        Category categoryOne = user.existCategory(category);
        Artifact artifactOne = categoryOne.getArtifacts(artifact);
        Attachment attachmentOne = artifactOne.getAttachment(attachment);

        ViewAttachmentResult output = new ViewAttachmentResult();
        output.setFilename(attachmentOne.getFilename());
        output.setFiletype(attachmentOne.getFiletype());
        output.setContent(Base64.getEncoder().encodeToString(
                FileEncodeService.decodeFile(attachmentOne.getFilename(), attachmentOne.getContent()).getData()));
        output.setSize(attachmentOne.getSize());
        return output;
    }

    // Switch the privacy setting of a current artifact
    public Result switchPrivacy(String email, String category, String artifact, String privacy) {
        User user = userRepository.findByEmailaddress(email);
        Result result = new Result();
        if (user == null) {
            result.setNoEmail();
            return result;
        }
        Category cate = user.existCategory(category);
        if (cate == null) {
            result.setReason("Category does not exist");
            result.setResult(false);
            return result;
        }
        Artifact artifactOne = cate.getArtifacts(artifact);
        if (artifactOne == null) {
            result.setReason("Artifact does not exist");
            result.setResult(false);
            return result;
        }
        artifactOne.setPrivacy(privacy);
        userRepository.save(user);
        result.setSuccess();
        return result;
    }

}
