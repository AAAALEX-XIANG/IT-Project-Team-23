package com.model;

public class ViewAttachmentRequest {
    
    private String email;
    private String category;
    private String artifact;
    private String attachment;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getArtifact() {
        return artifact;
    }

    public void setArtifact(String artifact) {
        this.artifact = artifact;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttackment(String attachment) {
        this.attachment = attachment;
    }


}
