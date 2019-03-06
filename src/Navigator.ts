import {createAppContainer, createStackNavigator} from 'react-navigation';
import postListScreen from "./screens/postListScreen";
import cameraScreen from "./screens/cameraScreen";
import writingScreen from "./screens/writingScreen";
import commentScreen from "./screens/commentScreen";

const stackNavigator = createStackNavigator({
    PostList: postListScreen,
    Camera: cameraScreen,
    Writing: writingScreen,
    Comment: commentScreen
}, {
    headerMode: "none",
    initialRouteName: 'PostList'
});


const AppNavigator = createAppContainer(stackNavigator);


export default AppNavigator;