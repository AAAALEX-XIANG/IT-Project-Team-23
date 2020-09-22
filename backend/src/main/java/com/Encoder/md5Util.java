package com.Encoder;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class md5Util {
    public static String md5(String password) { 
        byte[] encodePassword= null; 
        try { 
            encodePassword = MessageDigest.getInstance("md5").digest( 
            password.getBytes()); 
        } 
        catch (NoSuchAlgorithmException e) { 
            e.printStackTrace();
        } 
        String md5code = new BigInteger(1, encodePassword).toString(16);// 16进制数字 
        return md5code; 
    } 
}
