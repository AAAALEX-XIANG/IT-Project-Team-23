import {
    Dashboard,
    loginPage,
    regPage,
    NotFound,
    Setting,
    ArticleList,
    ArticleEdit
} from '../containers'

export const mainRouter = [{
    pathname: '/login',
    component: loginPage
},{
    pathname: '/register',
    component: regPage
},{
    pathname: '/404',
    component: NotFound
}]

export const adminRouter = [{
    pathname: '/admin/dashboard',
    component: Dashboard
},{
    pathname: '/admin/setting',
    component: Setting
},{
    pathname: '/admin/article',
    component: ArticleList,
    exact: true
},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit
}]