const BASE_URL = "https://fatewhole.herokuapp.com/api/categories";
//const BASE_URL = "http://localhost:8080/api/categories";

export async function addCategory(request) {
  const { email, categoryName } = request;
  const endpoint = BASE_URL + `/addCategory`;

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
        categoryName: categoryName,
      }),
    });
  } catch (e) {
    console.log(e);
    return { error: e };
  }
  console.log(await res);
  //Sample res:{"res": "true"}
  return { status: await res.status, res: await res.json() };
}

export async function deleteCategory(request) {
  const { email, categoryName } = request;
  const endpoint = BASE_URL + `/deleteCategory`;

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
        categoryName: categoryName,
      }),
    });
  } catch (e) {
    console.log(e);
    return { error: e };
  }
  console.log(await res);
  //Sample res:{"res": "true"}
  return { status: await res.status, res: await res.json() };
}

export async function showCategory(request) {
  const { email } = request;
  const endpoint = BASE_URL + `/showCategories`;

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
      }),
    });
  } catch (e) {
    console.log(e);
    return { error: e };
  }
  // console.log(await res);
  //Sample A list of names of categories
  return { status: await res.status, res: await res.json() };
}

export async function showArtifacts(request) {
  const { email, categoryName } = request;
  const endpoint = BASE_URL + `/showArtifacts`;

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
        categoryName: categoryName,
      }),
    });
  } catch (e) {
    console.log(e);
    return { error: e };
  }
  // console.log(await res);
  //Sample A list of names of Artifacts
  return { status: await res.status, res: await res.json() };
}
