package com.model;

import java.io.IOException;

import com.service.FileEncodeService;

import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

// This user cache service is used for preventing any files from users to be
// uploaded straight forward into the major database of our system.
// Any sorts of malicious scripts can be detected here as this cache database is
// trivial and works as the first person to held the file from our
// users. Hence the major database will not be affected for the first time.
// There is actually no effctive algorithm to detect and solve the malicious attack been implemented here,
// but any guys who may maintain this program later are able to add some defence algorithm here. 
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
                FileEncodeService.encodeFile(file.getOriginalFilename(), new Binary(file.getBytes())), file.getSize());
        this.attachments = one;
    }

    public String getEmailaddress() {
        return emailaddress;
    }

    public void setEmailaddress(String emailaddress) {
        this.emailaddress = emailaddress;
    }

    public Attachment getAttachments() {
        return new Attachment(attachments.getFilename(), attachments.getFiletype(), attachments.getContent(),
                attachments.getSize());
    }

}
