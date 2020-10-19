//stores the user login state
import {decorate, observable, computed, autorun } from "mobx";

class UserStore {
    isLoggedIn = false;
    email = "";
    user=null;

    constructor() {
        autorun(() => console.log(this.report));
    }

    get report() {
        if (localStorage.getItem("email") != null || localStorage.getItem("adminEmail") != null)
            return "Logged In!!!";
        return `Not logged In :(`;
    }
}

decorate(UserStore, {
    isLoggedIn: observable,
    email: observable,
    user: observable,
    report: computed
})

const userStore = new UserStore();

export default userStore;
