import { useLocation } from 'react-router-dom';

import Root from './Root.jsx';
import SubOne from './SubOne.jsx';

export default function Subpage() {
    let path = useLocation().pathname.match(/\/[^/]+\/([^/]+)(?:\/([^/]+))?/)?.[1]?.toLowerCase();

    if (path === undefined) return <Root />;
    else if (path === 'one') return <SubOne />;
};