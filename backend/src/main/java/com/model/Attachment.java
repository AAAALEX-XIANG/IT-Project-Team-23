package com.model;

import org.bson.types.Binary;


public class Attachment {

    private String filename;
    private Binary content;
    private String filetype;
    private long size;

    public Attachment(String filename, String filetype, Binary content, long size) {
        this.filename = filename;
        this.content = content;
        this.filetype = filetype;
        this.size = size;
    }


    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Binary getContent() {
        return content;
    }

    public void setContent(Binary content) {
        this.content = content;
    }

    public String getFiletype() {
        return filetype;
    }

    public void setFiletype(String filetype) {
        this.filetype = filetype;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }
}
