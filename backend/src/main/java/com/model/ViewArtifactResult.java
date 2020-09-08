package com.model;

import java.util.List;
import java.util.ArrayList;

public class ViewArtifactResult {
    
    private String title;
    private String description;
    private List<String> attachment;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getAttachment() {
        return attachment;
    }

    public void setAttachment(List<String> attachment) {
        this.attachment = attachment;
    }

    public void addAttachment(String object){
        attachment.add(object);
    }

    public ViewArtifactResult(){
        this.attachment = new ArrayList<>();
    }

}
