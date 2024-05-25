import LottieView from "lottie-react-native"
import { FC,useRef } from "react";
const ActivityIndicator: FC<{ visible: boolean }> =
    ({ visible }) => {
        const animation = useRef(null);
        if (!visible) {
            return null
        } else {
            return (
                <LottieView
                    autoPlay
                    loop
                    source={require("../assets/animation.json")} ref={animation}
                    style={{
                        width: 600,
                        height: 600,
                        alignSelf:"center"
                    }}
                ></LottieView>
            )
        }    }export default ActivityIndicator;