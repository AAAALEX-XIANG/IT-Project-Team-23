package com.model;

import java.io.IOException;

import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

@Document(collection = "Cache")
public class UserCache {

    @Id
    private ObjectId id;
    
    private String emailaddress;

    private Attachment attachments;

    

    public UserCache(String emailaddress) {
        this.emailaddress = emailaddress;
    }

    public void setAttachment(MultipartFile file) throws IOException {
        Attachment one = new Attachment(file.getOriginalFilename(), file.getContentType(),
                    new Binary(file.getBytes()), file.getSize());
        this.attachments=one;
    }

    public String getEmailaddress() {
        return emailaddress;
    }

    public void setEmailaddress(String emailaddress) {
        this.emailaddress = emailaddress;
    }

    public Attachment getAttachments() {
        return attachments;
    }

}
