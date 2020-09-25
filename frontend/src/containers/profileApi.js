const BASE_URL = "https://fate-server.herokuapp.com/api/profile";


export async function updateProfile(request) {
    const { email, firstname, lastname, username, description} = request;
    let formData = new FormData();
    formData.append("email",email);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("username", username);
    formData.append("description", description);

    const endpoint = BASE_URL + `/updateProfile`;

    //fetch from server api
    let res;
    try {
        res = await fetch(endpoint, {
            method: "POST",
            body: formData
        });
    } catch(e) {
        console.log(e);
        return {error: e};
    }

    //sample res:{"res" : true}
    return {status: await res.status, res: await res.json()};
}

export async function viewProfile(request) {
    const {email} = request;
    const endpoint = BASE_URL + `/viewprofile`;
    let formData = new FormData();
    formData.append("email",email);

    //fetch from server api
    let res;
    try {
        res = await fetch(endpoint, {
            method: "POST",
            body: formData
        });
    } catch(e) {
        console.log(e);
        return {error: e};
    }

    return {status: await res.status, res: await res.json()};
}
