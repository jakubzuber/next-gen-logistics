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
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

const MainMenu = () => {
    const [collapsed, setCollapsed] = useState(true);

    const onClickMenuIcon = () => {
        setCollapsed(true);
    };

    const toogleMenu = () => {
        setCollapsed(!collapsed)
    };


    return (
        <Main collapsed={collapsed}>
            <Sidebar
                backgroundColor="#1266d4"
                style={{ height: '100%', minHeight: '100vh' }} collapsed={collapsed}>
                <nav>
                    <ViewHeadlineIcon onClick={toogleMenu} />
                    <Menu>
                        <StyledSubMenu  style={{ backgroundColor: 'transparent' }} icon={<WarehouseIcon />} label="Magazyn">
                            <StyledMenuItem onClick={() => onClickMenuIcon()} style={{ backgroundColor: 'transparent' }} icon={<SouthIcon />} component={<Link to='admission' />}>Przyjęcia</StyledMenuItem>
                            <StyledMenuItem onClick={() => onClickMenuIcon()} style={{ backgroundColor: 'transparent' }} icon={<ArrowUpwardIcon />} component={<Link to='releases' />}>Wydania </StyledMenuItem>
                            <StyledMenuItem onClick={() => onClickMenuIcon()} style={{ backgroundColor: 'transparent' }} icon={<SyncAltIcon />} component={<Link to='transfers' />}>Przesunięcia </StyledMenuItem>
                            <StyledMenuItem onClick={() => onClickMenuIcon()} style={{ backgroundColor: 'transparent' }} icon={<CheckBoxOutlineBlankIcon />} component={<Link to='stocks' />}>Stany magazynowe</StyledMenuItem>
                        </StyledSubMenu>
                        <StyledSubMenu style={{ backgroundColor: 'transparent' }} icon={<MenuBookIcon />} label="Księgowość">
                            <StyledMenuItem onClick={() => onClickMenuIcon()} style={{ backgroundColor: 'transparent' }} icon={<TaskIcon />} component={<Link to='invoices' />}>Historia wydań</StyledMenuItem>
                            <StyledMenuItem onClick={() => onClickMenuIcon()} style={{ backgroundColor: 'transparent' }} icon={<NoteAddIcon />} component={<Link to='to-invoice' />}>Historia przyjęć</StyledMenuItem>
                        </StyledSubMenu>
                        <StyledSubMenu style={{ backgroundColor: 'transparent' }} icon={<SettingsApplicationsIcon />} label="Administracja">
                            <StyledMenuItem onClick={() => onClickMenuIcon()} style={{ backgroundColor: 'transparent' }} icon={< PersonOutlineIcon />} component={<Link to='users' />}>Użytkownicy</StyledMenuItem>
                            <StyledMenuItem onClick={() => onClickMenuIcon()} style={{ backgroundColor: 'transparent' }} icon={<AssignmentIndIcon />} component={<Link to='clients' />}>Klienci</StyledMenuItem>
                            <StyledMenuItem onClick={() => onClickMenuIcon()} style={{ backgroundColor: 'transparent' }} icon={<HorizontalSplitIcon />} component={<Link to='whplaces' />}>Miejsca Mag.</StyledMenuItem>
                            <StyledMenuItem onClick={() => onClickMenuIcon()} style={{ backgroundColor: 'transparent' }} icon={<IndeterminateCheckBoxIcon />} component={<Link to='wh-carriers' />}>Nośniki</StyledMenuItem>
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