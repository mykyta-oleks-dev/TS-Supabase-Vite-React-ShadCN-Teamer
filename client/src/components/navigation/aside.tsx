import { RiTeamFill as RiTeamFillIcon } from 'react-icons/ri';
import NavMenu from './nav-menu';

const Aside = () => {
    return (
        <aside className="border border-primary rounded-2xl p-3 flex flex-col gap-5">
            <h1 className="flex gap-3 items-center text-2xl">
                <RiTeamFillIcon size={30} className="text-primary" />
                <span>Teamer</span>
            </h1>
            <NavMenu />
        </aside>
    );
};

export default Aside;
