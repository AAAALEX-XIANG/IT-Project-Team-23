package com.model;

import java.util.ArrayList;
import java.util.List;

public class Artifact {
    private String title;
    private String description;
    private List<Attachment> attachments;
    private String privacy;

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

    public Artifact(String title, String description, String privacy) {
        this.title = title;
        this.description = description;
        this.attachments = new ArrayList<>();
        this.privacy = privacy;
    }

    public void addAttachment(Attachment attachment){
        attachments.add(attachment);
    }

    public void removeAttachment(Attachment attachment){
        attachments.remove(attachment);
    }

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public Attachment getAttachment(String name){
        for(Attachment a: attachments){
            if(name.equals(a.getFilename())){
                return a;
            }
        }
        return null;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    public String getPrivacy() {
        return privacy;
    }

    public void setPrivacy(String privacy) {
        this.privacy = privacy;
    }
}
