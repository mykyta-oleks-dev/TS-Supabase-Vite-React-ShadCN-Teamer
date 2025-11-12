import type { ComponentProps } from 'react';
import { Button } from './ui/button';
import { FaGoogle as FaGoogleIcon } from 'react-icons/fa';
import { handleGoogleAuth } from '@/handlers/auth.handlers';

const GoogleAuthButton = ({ ...props }: ComponentProps<typeof Button>) => {
    return (
        <Button variant="secondary" {...props} type="button" onClick={handleGoogleAuth}>
            <FaGoogleIcon /> Authenticate
        </Button>
    );
};

export default GoogleAuthButton;
