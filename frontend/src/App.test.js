import {search} from "./containers/adminApi.js";
import {login, register} from "./containers/accountApi.js";
import {shareProfile, viewProfile} from "./containers/profileApi.js";
import {getGuestDashboard} from "./containers/guestApi.js"


test('Login with a User account', async () => {
  const {user} = await login({
    email: "lacey@gmail.com",
    password: "123456"}
    );
  expect(user.reason).toBe("User");
  expect(user.result).toBe(true);
});

test('Login with a Admin account', async () => {
  const {user} = await login({
    email: "alex@admin.com",
    password: "123456"}
    );
  expect(user.reason).toBe("Administrator");
  expect(user.result).toBe(true);
});

test('Login with a wrong email', async () => {
  const {user} = await login({
    email: "aaaaalex@foxmail.com",
    password: "123456"}
    );
  expect(user.reason).toBe("Login Failure");
  expect(user.result).toBe(false);
});

test('Login with a wrong password', async () => {
  const {user} = await login({
    email: "lacey@gmail.com",
    password: "1234567"}
    );
  expect(user.reason).toBe("Login Failure");
  expect(user.result).toBe(false);
});

test('Register with a legal information', async () => {
  const {res} = await register({
    studentId: "1888888",
    first_name: "fate",
    last_name: "eportfolio",
    password: "fate123123",
    email: "fate@test.com",
    username: "fateTestTest"  }
    );
  expect(res.reason).toBe("Success");
  expect(res.result).toBe(true);

});

test('Register with a registered email', async () => {
  const {res} = await register({
    studentId: "199999999",
    first_name: "fate",
    last_name: "eportfolio",
    password: "fate123123",
    email: "lacey@gmail.com",
    username: "fateTestTest"  }
    );
  expect(res.reason).toBe("Emailaddress already exists!");
  expect(res.result).toBe(false);
});

test('Register with a registered student ID', async () => {
  const {res} = await register({
    studentId: "910000",
    first_name: "fate",
    last_name: "eportfolio",
    password: "fate123123",
    email: "fateTestTwo@test.com",
    username: "fateTestTest"  }
    );
  expect(res.reason).toBe("Student ID already exists!");
  expect(res.result).toBe(false);
});

test('Search with an existed name', async () => {
  const {res} = await search({
    info:"alex"}
    );
  expect(Object.keys(res).length).toBe(1000);
});


test('Generate a New Sharable Link', async () => {
  jest.setTimeout(100000);
  //Get the original link of the user
  let resOne = await viewProfile({email:"lacey@gmail.com"});
  let linkOne = resOne.res.link;
  let outPutBefore = (await getGuestDashboard({link:linkOne})).res.avatar;
  //Generate a new link for the user
  let linkTwo = (await shareProfile({email: "lacey@gmail.com"})).res;
  let outPutAfter = (await getGuestDashboard({link:linkTwo})).res.avatar;
  expect(outPutBefore).toStrictEqual(outPutAfter);
  expect(linkOne).not.toBe(linkTwo);
});

