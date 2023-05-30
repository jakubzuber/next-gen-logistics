import { Main, MainContent } from "./styled";
import { useState } from "react";

import { Link, Outlet } from 'react-router-dom';
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

const MainMenu = () => {

    const [collapsed, setCollapsed] = useState(false);

    const onClickMenuIcon = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Main collapsed={collapsed}>
            <Sidebar style={{height: '100vh', backgroundColor: 'rgb(233, 233, 238)'}} collapsed={collapsed}>
                <nav>
                    <ViewHeadlineIcon onClick={onClickMenuIcon} />
                    <Menu >
                        <SubMenu  icon={<WarehouseIcon />} label="Magazyn">
                            <MenuItem icon={<SouthIcon />} component={<Link to='admission' />}>Przyjęcia</MenuItem>
                            <MenuItem icon={<ArrowUpwardIcon />} component={<Link to='releases' />}>Wydania</MenuItem>
                            <MenuItem icon={<SyncAltIcon />} component={<Link to='transfers' />}>Przesunięcia</MenuItem>
                            <MenuItem icon={<CheckBoxOutlineBlankIcon />} component={<Link to='stocks' />}>Stany magazynowe</MenuItem>
                        </SubMenu>
                        <SubMenu icon={<MenuBookIcon />} label="Księgowość">
                            <MenuItem icon={<TaskIcon />} component={<Link to='invoices' />}>Wystawione fv</MenuItem>
                            <MenuItem icon={<NoteAddIcon />} component={<Link to='to-invoice' />}>Fv do wystawienia</MenuItem>
                        </SubMenu>
                        <SubMenu icon={<SettingsApplicationsIcon />} label="Administracja">
                            <MenuItem icon={< PersonOutlineIcon />} component={<Link to='users' />}>Użytkownicy</MenuItem>
                            <MenuItem icon={<AssignmentIndIcon />} component={<Link to='clients' />}>Klienci</MenuItem>
                        </SubMenu>
                    </Menu>
                </nav>
            </Sidebar>
            <MainContent>
                <Outlet />
            </MainContent>
        </Main>
    );
};

const subMenuStyle = {
    backgroundColor: 'rgb(177, 176, 192)'
};

export default MainMenu;