import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { googleLogout } from '@react-oauth/google';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import { logout } from '../../redux/actions/sessionsActions';
import { isAllowed } from '../../routes/PrivateRoutes';

const pages = [
  { label: 'User', route: 'user', access: 'READ_USER' },
  { label: 'Transaction', route: 'transaction', access: 'READ_TRANSACTION' },
];

const LOGO = styled(Typography)`
  margin-right: 16px;
  font-family: monospace;
  font-weight: 700;
  letter-spacing: 0.3rem;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const sessions = useTypedSelector((state) => state.sessions);
  const permissions = useTypedSelector((state) => state.sessions.permissions);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      label: 'Logout',
      onClick: () => {
        googleLogout();
        dispatch(logout());
      },
    },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LOGO
            variant="h6"
            noWrap
            onClick={() => navigate('/')}
            display={{ xs: 'none', md: 'flex' }}
          >
            SimDash
          </LOGO>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ access, label, route }, i) => {
                return (
                  isAllowed(permissions, access) && (
                    <MenuItem
                      key={i}
                      onClick={() => {
                        handleCloseNavMenu();
                        navigate(route);
                      }}
                    >
                      <Typography textAlign="center">{label}</Typography>
                    </MenuItem>
                  )
                );
              })}
            </Menu>
          </Box>
          <LOGO
            onClick={() => navigate('/')}
            variant="h5"
            noWrap
            display={{ xs: 'flex', md: 'none' }}
            sx={{
              flexGrow: 1,
            }}
          >
            SimDash
          </LOGO>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ access, label, route }, i) => {
              return (
                isAllowed(permissions, access) && (
                  <Button
                    key={i}
                    onClick={() => navigate(route)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {label}
                  </Button>
                )
              );
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={sessions.email} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={setting.onClick}>
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
