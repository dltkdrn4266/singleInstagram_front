import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import postListScreen from "./screens/postListScreen";
import cameraScreen from "./screens/cameraScreen";
import writingScreen from "./screens/writingScreen";

const stackNavigator = createStackNavigator({
    PostList: postListScreen,
    Camera: cameraScreen,
    Writing: writingScreen,
}, {
    headerMode: "none",
    initialRouteName: 'PostList'
});


const AppNavigator = createAppContainer(stackNavigator);


export default AppNavigator;