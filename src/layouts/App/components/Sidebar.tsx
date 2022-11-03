import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExitToApp from '@mui/icons-material/ExitToApp';
import MailIcon from '@mui/icons-material/Mail';
import { SxProps, Toolbar, Typography } from '@mui/material';
import { useAuth } from '~/context/AuthContext';

type SidebarIconProps = {
  icon: React.ReactElement;
  text: string;
  onClick?: () => void;
};

function SidebarItem({ icon, text, onClick }: SidebarIconProps & SxProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

export function Sidebar() {
  const { logout } = useAuth();
  return (
    <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ my: 2 }}>
          Logo
        </Typography>
      </Toolbar>

      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <SidebarItem key={text} text={text} icon={index % 2 === 0 ? <InboxIcon /> : <MailIcon />} />
        ))}
      </List>

      <Box sx={{ flex: 1 }}></Box>

      <Divider />

      <List>
        <SidebarItem text="Logout" icon={<ExitToApp />} onClick={logout} />
      </List>
    </Box>
  );
}
