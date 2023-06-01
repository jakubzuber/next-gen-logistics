import { Main, MainContent, StyledMenuItem, StyledSubMenu } from "./styled";
import { useState } from "react";

import { Outlet, Link } from 'react-router-dom';
import { Sidebar, Menu } from 'react-pro-sidebar';
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
            <Sidebar 
                backgroundColor="#272953"
                style={{height: '100vh'}} collapsed={collapsed}>
                <nav>
                    <ViewHeadlineIcon onClick={onClickMenuIcon} />
                    <Menu>
                        <StyledSubMenu style={{backgroundColor: 'transparent'}} icon={<WarehouseIcon />} label="Magazyn">
                            <StyledMenuItem style={{backgroundColor: 'transparent'}} icon={<SouthIcon />} component={<Link to='admission' />}>Przyjęcia</StyledMenuItem>
                            <StyledMenuItem style={{backgroundColor: 'transparent'}} icon={<ArrowUpwardIcon />} component={<Link to='releases' />}>Wydania </StyledMenuItem>
                            <StyledMenuItem style={{backgroundColor: 'transparent'}} icon={<SyncAltIcon />} component={<Link to='transfers' />}>Przesunięcia </StyledMenuItem>
                            <StyledMenuItem style={{backgroundColor: 'transparent'}} icon={<CheckBoxOutlineBlankIcon />} component={<Link to='stocks' />}>Stany magazynowe</StyledMenuItem>
                        </StyledSubMenu>
                        <StyledSubMenu style={{backgroundColor: 'transparent'}} icon={<MenuBookIcon />} label="Księgowość">
                            <StyledMenuItem style={{backgroundColor: 'transparent'}} icon={<TaskIcon />} component={<Link to='invoices' />}>Wystawione fv</StyledMenuItem>
                            <StyledMenuItem style={{backgroundColor: 'transparent'}} icon={<NoteAddIcon />} component={<Link to='to-invoice' />}>Fv do wystawienia</StyledMenuItem>
                        </StyledSubMenu>
                        <StyledSubMenu style={{backgroundColor: 'transparent'}} icon={<SettingsApplicationsIcon />} label="Administracja">
                            <StyledMenuItem style={{backgroundColor: 'transparent'}} icon={< PersonOutlineIcon />} component={<Link to='users' />}>Użytkownicy</StyledMenuItem>
                            <StyledMenuItem style={{backgroundColor: 'transparent'}} icon={<AssignmentIndIcon />} component={<Link to='clients' />}>Klienci</StyledMenuItem>
                        </StyledSubMenu>
                    </Menu>
                </nav>
            </Sidebar>
            <MainContent>
                <Outlet />
            </MainContent>
        </Main>
    );
};


export default MainMenu;