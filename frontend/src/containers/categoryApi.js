const BASE_URL = "https://fate-e-portfolio.herokuapp.com/api/categories";

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
  return { status: await res.status, res: await res.json() };
}

export async function showCategory(request) {
  const { email } = request;
  const endpoint = BASE_URL + `/showCategories`;

  //fetch from server api
  let res;
  let formData = new FormData();
  formData.append("email", email)
  try {
    res = await fetch(endpoint, {
      method: "POST",
      body: formData
    });
  } catch (e) {
    console.log(e);
    return { error: e };
  }
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
  return { status: await res.status, res: await res.json() };
}
