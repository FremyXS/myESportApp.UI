import * as React from "react";
import {Tabbar,TabbarItem} from '@vkontakte/vkui';
import { Icon56AddCircleOutline } from '@vkontakte/icons';
import "./CustomTabbar.css";

const CustomTabbar = ({addTask}) => {
    const tabbarStyle: React.CSSProperties = {
        position: "absolute",
        bottom: "0",
        marginBottom: "22px",
        height: "60px",
        width: "60px",
        background: "var( --header_alternate_background,var(--vkui--color_background_tertiary) )",
        borderRadius: "50%",
        borderBottom: "1px solid gray"
    }
    return(
        <Tabbar>
            <TabbarItem style={tabbarStyle} onClick={addTask}>
                <Icon56AddCircleOutline color="#0000CD"/>
            </TabbarItem>
        </Tabbar>
    );
}
export default CustomTabbar