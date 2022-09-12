import styled from 'styled-components';
import { Column } from '../theme';

const SidebarColumn = styled(Column)`
    min-width: 230px;
    border-right: 2px solid black;
    background-color: #eee;
`

export const OptionsSideBar = () => {
    return (
        <SidebarColumn>
            <p> Option 1 </p>
            <p> Option 2 </p>
            <p> Option 3 </p>
            <p> Option 4 </p>
            <p> Option 5 </p>
            <p> Option 6 </p>
            <p> Option 7 </p>
        </SidebarColumn>
    )
}