package com.service;

import java.nio.charset.StandardCharsets;

import com.encoder.Md5Util;

import org.bson.types.Binary;

//This class is used to apply encrytion algorithm for the content uploaded by our user
public class FileEncodeService {

    private FileEncodeService() {
        throw new IllegalStateException("Utility class");
    }

    public static Binary encodeFile(String filename, Binary content) {
        String md5 = Md5Util.md5(filename);
        String encodeContent = new String(content.getData(), StandardCharsets.ISO_8859_1);
        int position = 3;
        for (int i = 0; i < md5.length(); i++) {
            if ((position + i) <= encodeContent.length()) {
                encodeContent = encodeContent.substring(0, position + i) + md5.charAt(i)
                        + encodeContent.substring(position + i);
                position += 3;
            }
        }
        return new Binary(encodeContent.getBytes(StandardCharsets.ISO_8859_1));
    }

    public static Binary decodeFile(String filename, Binary content) {
        String md5 = Md5Util.md5(filename);
        String decodeContent = new String(content.getData(), StandardCharsets.ISO_8859_1);
        int position = 3;
        for (int i = 0; i < md5.length(); i++) {
            if (position + 1 <= decodeContent.length()) {
                decodeContent = decodeContent.substring(0, position) + decodeContent.substring(position + 1);
                position += 3;
            }
        }
        return new Binary(decodeContent.getBytes(StandardCharsets.ISO_8859_1));
    }

}
