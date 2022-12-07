import { StyledList } from "./styled"
import Orders from "./Orders";
import BottomNavigation from "./BottomNavigation"

const List = () => {
    return (
        <StyledList>
            <Orders />
            <BottomNavigation />
        </StyledList>
    );
}
export default List;