import PagesWrapper from '@/components/pages-wrapper';
import { ROUTER_KEYS } from '@/constants/router.constants';
import HomePage from '@/pages/home.page';
import LogInPage from '../pages/auth/log-in.page.tsx';
import SignUpPage from '../pages/auth/sign-up.page.tsx';
import { createBrowserRouter } from 'react-router';
import CreateProfilePage from '@/pages/auth/create-profile.page.tsx';

const router = createBrowserRouter([
    {
        path: ROUTER_KEYS.ROOT,
        element: <PagesWrapper />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: ROUTER_KEYS.AUTH.ROOT,
                children: [
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
                    }
                ],
            },
        ],
    },
]);

export default router;
