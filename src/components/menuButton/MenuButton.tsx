
import { styled } from '@mui/system';
import Button from '@mui/material/Button';

type MenuButtonProps = {
    backgroundColor?: string
}

export const MenuButton = styled(Button)<MenuButtonProps>(({ backgroundColor, theme }) => ({
    color: theme.palette.primary.contrastText,
    padding: '12px 24px',
    '&:hover': {
        backgroundColor: '#115293',
    },
    '&:disabled': {
        backgroundColor: '#e0e0e0',
        color: '#9e9e9e',
    },
}));