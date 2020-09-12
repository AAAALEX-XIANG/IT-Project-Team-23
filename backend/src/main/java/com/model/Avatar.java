package com.model;

import org.bson.types.Binary;


public class Avatar {
    
    private String imageName;
    private Binary image;
    private String imageType;
    private long size;

    public Avatar(String imageName, String imageType, Binary image, long size) {
        this.imageName = imageName;
        this.imageType = imageType;
        this.image = image;
        this.size = size;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public Binary getImage() {
        return image;
    }

    public void setImage(Binary image) {
        this.image = image;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

}
