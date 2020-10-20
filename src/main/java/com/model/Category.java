package com.model;

import java.util.ArrayList;
import java.util.List;

public class Category {

    private String name;
    private List<Artifact> artifacts;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category(String name) {
        this.name = name;
        this.artifacts = new ArrayList<>();
    }

    public void addArtifact(Artifact artifact) {
        artifacts.add(artifact);
    }

    public void removeArtifact(String name) {
        for (Artifact a : artifacts) {
            if (name.equals(a.getTitle())) {
                artifacts.remove(a);
                return;
            }
        }
    }

    public List<Artifact> getArtifacts() {
        return artifacts;
    }

    public Artifact getArtifacts(String name) {
        for (Artifact a : artifacts) {
            if (name.equals(a.getTitle())) {
                return a;
            }
        }
        return null;
    }

    public void setArtifacts(List<Artifact> artifacts) {
        this.artifacts = artifacts;
    }

}
