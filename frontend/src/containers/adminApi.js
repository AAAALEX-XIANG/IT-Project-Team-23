const BASE_URL = "https://fate-e-portfolio.herokuapp.com/api/search";

export async function search(request) {
    const { info } = request;
    const endpoint = BASE_URL + "/show";
    let formData = new FormData();
    formData.append("info", info);
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