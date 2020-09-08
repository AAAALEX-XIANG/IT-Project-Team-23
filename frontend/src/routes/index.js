import {
    Dashboard,
    Loginpage,
    NotFound,
    Setting,
    ArticleList,
    ArticleEdit
} from '../containers'

export const mainRouter = [{
    pathname: '/login',
    component: Loginpage
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