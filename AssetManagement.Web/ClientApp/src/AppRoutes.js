import AddEditBranch from "../src/components/Branch/AddEditBranch";
import CreateAsset from "./components/Asset/CreateAsset";
import EditAsset from "./components/Asset/EditAsset";
import { ListAsset } from "./components/Asset/ListAsset";
import { ListBranch } from "./components/Branch/ListBranch";
import AddEditEmployee from "./components/Employee/AddEditEmployee";
import { ListEmployee } from "./components/Employee/ListEmployee";
import Login from "./components/Login/Login";
import TestCall from "./components/test/testCall";
import Home, { } from "../src/components/Home"
import { ListRole } from "./components/Admin/ListRole";
import AddEditRole from "./components/Admin/AddEditRole";


const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/addEditEmployee',
        element: <AddEditEmployee />
    },
    {
        path: '/addEditEmployee/:employeeId',
        element: <AddEditEmployee />
    },
    {
        path: '/listEmployee',
        element: <ListEmployee />
    },
    {
        path: '/addEditBranch',
        element: <AddEditBranch />
    },
    {
        path: '/addEditBranch/:branchId',
        element: <AddEditBranch />
    },
    {
        path: '/listBranch',
        element: <ListBranch />
    },
    {
        path: '/CreateAsset',
        element: <CreateAsset />
    },
    {
        path: '/EditAsset/:assetId',
        element: <EditAsset />
    },
    {
        path: '/listAsset',
        element: <ListAsset />
    },
    {
        path: '/roleList',
        element: <ListRole />
    },
    {
        path: '/addEditRole',
        element: <AddEditRole />
    },
    {
        path: '/addEditRole/:roleId',
        element: <AddEditRole />
    }
    //},
    //{
    //    path: '/testadd/:id',
    //    element: <TestCall />
    //}
];

export default AppRoutes;
