package com.model;

public class Result {

    private boolean res;
    private String reason;

    public boolean isResult() {
        return res;
    }

    public void setResult(boolean result) {
        this.res = result;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public void setNoEmail() {
        this.res = false;
        this.reason = "email not found";
    }

    public void setSuccess() {
        this.res = true;
        this.reason = "Success";
    }

}
