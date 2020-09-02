//import { useState, useEffect } from "react";
const BASE_URL = "http://localhost:3000";

/**
 * Retrieves user information
 */
export async function getUserInfo(username) {
    const endpoint = BASE_URL + `/user-management/${username}`;
    console.log("getUserInfo");

    let res;
    try {
        res = await fetch(endpoint);
    } catch(e) {
        console.log(e);
        return {error: e};
    }
    console.log(await res.status);
    return {userInfo: await res.json()}
}

/**
 * Retrieves classroom by username
 */
export async function getUserClassroom(username) {
    const endpoint = BASE_URL + `/classroom-management/user/${username}`;
    console.log("getUserClassroom");

    let res;
    try {
        res = await fetch(endpoint);
    } catch(e) {
        console.log(e);
        return {error:e};
    }
    console.log(await res.status);
    console.log(await res.json());
    return {userClass: await res.json()}
}


/*=========================================================================*/
/*========================     Login/reg        ===========================*/
/*=========================================================================*/
/**
 * Verifies user login from server API
 */
export async function login(userDetails) {
    const {username, password} = userDetails;
    const endpoint = BASE_URL + `/user-management/login`;
    console.log("login");

    if (!username) {
        alert("please enter your username"); //TODO: change to not alert
        return;
    }
    if (!password) {
        alert("please enter your password"); //TODO
        return;

        // console.log({
        //     username,
        //     password
        // });
    }
    //fetch from server api
    let res;
    try {
        res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
    } catch(e) {
        console.log(e);
        return {error: e};
    }
    return {status: await res.status, user: await res.json()};
}

/**
 * Registers user from server API
 */
export async function register(userDetails) {
    const { first_name, last_name, email, username, password, password_confirm, is_teacher} = userDetails;
    const endpoint = BASE_URL + `/user-management/register`;
    console.log("register");

    //fetch from server api
    let res;
    try {
        res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                username,
                password,
                password_confirm,
                is_teacher
            })
        });
    } catch(e) {
        console.log(e);
        return {error: e};
    }
    console.log(await res);
    return {status: await res.status, res: await res.text()};
}
