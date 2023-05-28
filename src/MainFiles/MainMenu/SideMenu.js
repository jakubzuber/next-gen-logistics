import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import SouthIcon from '@mui/icons-material/South';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TaskIcon from '@mui/icons-material/Task';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const SideMenu = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onClickMenuIcon = () => {
        setCollapsed(!collapsed);
      };

    return (
        <Sidebar collapsed={collapsed}>
            <ViewHeadlineIcon onClick={onClickMenuIcon}/>
            <Menu>
                <SubMenu icon={<WarehouseIcon />} label="Magazyn">
                    <MenuItem icon={<SouthIcon />} component={<Link to='/admission' />}>Przyjęcia</MenuItem>
                    <MenuItem icon={<ArrowUpwardIcon />} component={<Link to='/releases' />}>Wydania</MenuItem>
                    <MenuItem icon={<SyncAltIcon />}>Przesunięcia</MenuItem>
                    <MenuItem icon={<CheckBoxOutlineBlankIcon />}>Stany magazynowe</MenuItem>
                </SubMenu>
                <SubMenu icon={<MenuBookIcon/>} label="Księgowość">
                    <MenuItem icon={<TaskIcon />} >Wystawione fv</MenuItem>
                    <MenuItem icon={<NoteAddIcon />}>Fv do wystawienia</MenuItem>
                </SubMenu>
                <SubMenu icon={<SettingsApplicationsIcon />} label="Administracja">
                    <MenuItem icon={< PersonOutlineIcon />}>Użytkownicy</MenuItem>
                    <MenuItem icon={<AssignmentIndIcon/>}>Klienci</MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
};

export default SideMenu;