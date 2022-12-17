import * as React from "react";
import {Spinner} from "@vkontakte/vkui";

const Loader = () => {
    return(<div style={{ display: "flex", alignItems: "center", height: "100vh",
        flexDirection: "column" , justifyContent: "center"}}>
        <Spinner size="large" style={{ margin: "0 auto"}} />
    </div>)
}
export default Loader