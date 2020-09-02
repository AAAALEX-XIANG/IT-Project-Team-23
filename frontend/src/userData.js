//stores the user login state
import {decorate, observable, computed, autorun } from "mobx";

class UserStore {
    isLoggedIn = false;
    username = "";
    user=null;

    constructor() {
        autorun(() => console.log(this.report));
    }

    get report() {
        if (this.isLoggedIn)
            return "Logged In!!!";
        return `Not logged In :(`;
    }
}

decorate(UserStore, {
    isLoggedIn: observable,
    username: observable,
    user: observable,
    report: computed
})

const userStore = new UserStore();

export default userStore;
