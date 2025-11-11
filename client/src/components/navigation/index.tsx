import { useMediaQuery } from '@custom-react-hooks/use-media-query';
import Aside from './aside';
import Header from './header';

const Navigation = () => {
    const isMd = useMediaQuery('(min-width: 768px)');

    if (isMd) return <Aside />;

    return <Header />;
};

export default Navigation;
