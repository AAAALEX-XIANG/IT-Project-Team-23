package com.service;

import org.bson.types.Binary;

public interface fileEncodeService {
    Binary encodeFile(String filename, Binary content);
    Binary decodeFile(String md5);
}
