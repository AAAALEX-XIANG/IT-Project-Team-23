const BASE_URL = "https://fate-e-portfolio.herokuapp.com/api/guest";
const BASE_URL_ARTIFACT = "https://fate-e-portfolio.herokuapp.com/api/artifacts";

export async function getGuestDashboard(request) {
  const { link } = request;
  const endpoint = BASE_URL + `/showUserProfile`;
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

  //sample res:{"res" : true}
  return { status: await res.status, res: await res.json() };
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

  //sample res:{"res" : true}
  return { status: await res.status, res: await res.json() };
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
  console.log(await res);
  return { status: await res.status, res: await res.json() };
}
