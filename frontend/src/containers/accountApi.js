const BASE_URL = "https://fate-server.herokuapp.com/api/account";

/*=========================================================================*/
/*========================     Login/reg        ===========================*/
/*=========================================================================*/
/**
 * Verifies user login from server API
 */
export async function login(userDetails) {
    const {email, password} = userDetails;
    const endpoint = BASE_URL + `/login`;

    let requestBody = new FormData();
    requestBody.append("email",email);
    requestBody.append("password", password);
    if (!email) {
        alert("please enter your email"); //TODO: change to not alert
        return;
    }
    if (!password) {
        alert("please enter your password"); //TODO
        return;

    }
    //fetch from server api
    let res;
    try {
        res = await fetch(endpoint, {
            method: "POST",
            // headers: {
            //     'Access-Control-Allow-Origin': '*'
            // },
            body: requestBody
        });
    } catch(e) {
        console.log(e);
        return {error: e};
    }
    return {status: res.status, user: await res.json()};
}

/**
 * Registers user from server API
 */
export async function register(userDetails) {
    const { first_name, last_name, email, username, password, studentId } = userDetails;
    const endpoint = BASE_URL + `/register`;
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
                firstname: first_name,
                lastname: last_name,
                studentId: studentId,
                emailaddress: email,
                username: username,
                password: password
            })
        });
    } catch(e) {
        console.log(e);
        return {error: e};
    }
    console.log(res);
    return {status: res.status, res: await res.json()};
}
