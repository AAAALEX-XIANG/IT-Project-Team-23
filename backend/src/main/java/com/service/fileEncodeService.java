package com.service;

import java.nio.charset.Charset;

import com.Encoder.md5Util;

import org.bson.types.Binary;

public class FileEncodeService {

    public static Binary encodeFile(String filename, Binary content) {
        String md5 = md5Util.md5(filename);
        String encodeContent = new String(content.getData(), Charset.forName("ISO-8859-1"));
        int position = 3;
        for (int i = 0; i < md5.length(); i++) {
            if ((position + i) <= encodeContent.length()) {
                encodeContent = encodeContent.substring(0, position + i) + md5.charAt(i) + encodeContent.substring(position + i);
                position += 3;
            }
        }
        return new Binary(encodeContent.getBytes(Charset.forName("ISO-8859-1")));
    }

    public static Binary decodeFile(String filename, Binary content) {
        String md5 = md5Util.md5(filename);
        String decodeContent = new String(content.getData(), Charset.forName("ISO-8859-1"));
        int position = 3;
        for (int i = 0; i < md5.length(); i++) {
            if (position + 1 <= decodeContent.length()) {
                decodeContent = decodeContent.substring(0, position) + decodeContent.substring(position + 1);
                position += 3;
            }
        }
        return new Binary(decodeContent.getBytes(Charset.forName("ISO-8859-1")));
    }
    
}
