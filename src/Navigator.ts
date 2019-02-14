import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import postListScreen from "./screens/postListScreen";
import cameraScreen from "./screens/cameraScreen";

const stackNavigator = createStackNavigator({
    PostList: postListScreen,
    Camera: cameraScreen
}, {
    headerMode: "none",
    initialRouteName: 'PostList'
});


const AppNavigator = createAppContainer(stackNavigator);


export default AppNavigator;