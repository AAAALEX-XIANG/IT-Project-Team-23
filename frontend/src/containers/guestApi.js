import {serverAddress} from "../ServerAddress";

const BASE_URL = serverAddress+"api/guest";
const BASE_URL_ARTIFACT = serverAddress+"api/artifacts";

export async function getGuestDashboard(request) {
  const { link } = request;
  const endpoint = BASE_URL + `/showUserProfile`;
  let formData = new FormData();
  formData.append("link", link);
let res;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
  } catch (e) {
    console.log(e);
    return { error: e };
  }

  try{
    return { status: await res.status, res: await res.json() };
  }catch (e) {
    return undefined;
  }

}

export async function getGuestPublic(request) {
  const { link } = request;
  const endpoint = BASE_URL + `/showUserPublic`;
  let formData = new FormData();
  formData.append("link", link);
  //fetch from server api
  let res;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
  } catch (e) {
    console.log(e);
    return { error: e };
  }

  if(res !== null){
    try{
      return { status: await res.status, res: await res.json() };
    }catch (e) {
      return undefined;
    }
  }
  
}

export async function getGuestAttachment(request) {
  const { link, category, artifact, attachment } = request;
  const endpoint = BASE_URL_ARTIFACT + `/get-attachment-byLink`;
  let formData = new FormData();
  formData.append("link", link);
  formData.append("category", category);
  formData.append("artifact", artifact);
  formData.append("attachment", attachment);
  //fetch from server api
  let res;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
  } catch (e) {
    console.log(e);
    return { error: e };
  }

  try{
    return { status: await res.status, res: await res.json() };
  }catch (e) {
    return undefined;
  }
}
