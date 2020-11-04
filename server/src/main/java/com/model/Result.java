package com.model;

public class Result {

    // Although the value name is "res", as the methods are name with "Result", the
    // response of any requests relate to this class will be "Result"
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
