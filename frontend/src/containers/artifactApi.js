const BASE_URL = "https://fatewhole.herokuapp.com/api/artifacts";
//const BASE_URL = "http://localhost:8080/api/artifacts";

export async function upload(request) {
  const { email, category, title, description, attachment, privacy } = request;
  let formData = new FormData();
  formData.append("email", email);
  formData.append("category", category);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("attachment", attachment);
  formData.append("privacy", privacy);
  const endpoint = BASE_URL + `/upload`;

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
  // console.log(await res);
  //sample res:{"res" : true}
  return { status: await res.status, res: await res.json() };
}

export async function switchPrivacy(request) {
  const { email, category, artifact, privacy } = request;
  const endpoint = BASE_URL + "/change-privacy";
  let formData = new FormData();
  formData.append("email", email);
  formData.append("category", category);
  formData.append("artifact", artifact);
  formData.append("privacy", privacy);
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

export async function viewArtifact(request) {
  const { email, category, title } = request;
  const endpoint = BASE_URL + `/view-artifact`;

  //fetch from server api
  let res;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        category: category,
        artifact: title,
      }),
    });
  } catch (e) {
    console.log(e);
    return { error: e };
  }
  // console.log(await res);
  //sample res:{"title" : Worked at google,"Description" : "....", "Attachment" : "fileName.pdf"}
  return { status: await res.status, res: await res.json() };
}

export async function deleteArtifact(request) {
  const { email, category, artifact } = request;
  const endpoint = BASE_URL + `/delete-artifact`;

  //fetch from server api
  let res;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        category: category,
        artifact: artifact,
      }),
    });
  } catch (e) {
    console.log(e);
    return { error: e };
  }
  // console.log(await res);
  //sample res:{"res" : "true"}
  return { status: await res.status, res: await res.json() };
}

export async function getAttachment(request) {
  const { email, category, artifact, attachment } = request;
  const endpoint = BASE_URL + `/get-attachment`;

  //fetch from server api
  let res;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        category: category,
        artifact: artifact,
        attachment: attachment,
      }),
    });
  } catch (e) {
    console.log(e);
    return { error: e };
  }
  console.log(await res);
  return { status: await res.status, res: await res.json() };
}

export async function getCategoryArtifact(request) {
  const { email } = request;
  const endpoint = BASE_URL + `/show-Category-Artifact-Attachment`;
  let formData = new FormData();
  formData.append("email", email);
  //fetch from server api
  let res;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      body: formData
    });
  } catch (e) {
    console.log(e);
    return { error: e };
  }
  console.log(await res);
  return { status: await res.status, res: await res.json() };
}
