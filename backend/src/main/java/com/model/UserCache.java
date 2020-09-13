package com.model;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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

    private List<Attachment> attachments;

    

    public UserCache(String emailaddress) {
        this.emailaddress = emailaddress;
        this.attachments = new ArrayList<>();
    }

    public void addAttachment(MultipartFile file) throws IOException {
        Attachment one = new Attachment(file.getOriginalFilename(), file.getContentType(),
                    new Binary(file.getBytes()), file.getSize());
        attachments.add(one);
    }

    public String getEmailaddress() {
        return emailaddress;
    }

    public void setEmailaddress(String emailaddress) {
        this.emailaddress = emailaddress;
    }

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    public Attachment findAttachment(String name){
        for(Attachment one:attachments){
            if(name.equals(one.getFilename())){
                return one;
            }
        }
        return null;
    }

}
