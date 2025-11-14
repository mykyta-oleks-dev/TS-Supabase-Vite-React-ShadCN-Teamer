import PagesWrapper from '@/components/pages-wrapper';
import { ROUTER_KEYS } from '@/constants/router.constants';
import HomePage from '@/pages/home.page';
import LogInPage from '../pages/auth/log-in.page';
import SignUpPage from '../pages/auth/sign-up.page';
import { createBrowserRouter } from 'react-router';
import CreateProfilePage from '@/pages/auth/create-profile.page';
import JoinOrCreateTeamPage from '../pages/auth/join-or-create-team.page';
import ResetPassword from '@/pages/auth/reset-password.page';
import Layout from '@/components/layout';
import ProductsTablePage from '@/pages/products/table.page';
import ProductDetailsPage from '@/pages/products/details.page';
import ProductEditPage from '@/pages/products/edit.page';
import ProductNewPage from '@/pages/products/new.page';

const router = createBrowserRouter([
    {
        path: ROUTER_KEYS.ROOT,
        element: <PagesWrapper />,
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        path: ROUTER_KEYS.PRODUCTS.ROOT,
                        children: [
                            {
                                index: true,
                                element: <ProductsTablePage />,
                            },
                            {
                                path: ROUTER_KEYS.DYNAMIC,
                                children: [
                                    {
                                        index: true,
                                        element: <ProductDetailsPage />,
                                    },
                                    {
                                        path: ROUTER_KEYS.EDIT,
                                        element: <ProductEditPage />,
                                    },
                                ],
                            },
                            {
                                path: ROUTER_KEYS.CREATE,
                                element: <ProductNewPage />
                            }
                        ],
                    },
                ],
            },
            {
                path: ROUTER_KEYS.AUTH.ROOT,
                children: [
                    {
                        index: true,
                        element: <LogInPage />,
                    },
                    {
                        path: ROUTER_KEYS.AUTH.LOG_IN,
                        element: <LogInPage />,
                    },
                    {
                        path: ROUTER_KEYS.AUTH.SIGN_UP,
                        element: <SignUpPage />,
                    },
                    {
                        path: ROUTER_KEYS.AUTH.CREATE_PROFILE,
                        element: <CreateProfilePage />,
                    },
                    {
                        path: ROUTER_KEYS.AUTH.TEAM,
                        element: <JoinOrCreateTeamPage />,
                    },
                    {
                        path: ROUTER_KEYS.AUTH.RESET_PASSWORD,
                        element: <ResetPassword />,
                    },
                ],
            },
        ],
    },
]);

export default router;
