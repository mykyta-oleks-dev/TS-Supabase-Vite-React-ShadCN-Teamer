import PagesWrapper from '@/components/pages-wrapper';
import { ROUTER_KEYS } from '@/constants/router.constants';
import HomePage from '@/pages/home.page';
import LogInPage from '@/pages/log-in.page';
import { createBrowserRouter } from 'react-router';

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
                ],
            },
        ],
    },
]);

export default router;
