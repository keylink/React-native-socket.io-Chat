import React, { Component }  from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  Platform,
  Keyboard,
  AppRegistry,
  FlatList,
  TextInput,
  TouchableHighlight,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SocketIOClient from 'socket.io-client';

import FlatListComponent from '../Partials/FlatListComponent';
import InputComponent from '../Partials/InputComponent';

const isAndroid = Platform.OS == "android";
const viewPadding = 10;
let USER = '';

console.disableYellowBox = true;

if (!window.location) {
  // App is running in simulator
  window.navigator.userAgent = 'ReactNative';
}

// This must be below your `window.navigator` hack above
const socket = SocketIOClient('http://192.168.180.69:3000', {
  transports: ['websocket'] // you need to explicitly tell it to use websockets
});

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null,
      tasks: [],
      text: "",
    };

    socket.on('message', this.onReceivedMessage);
    this.determineUser();
    USER = AsyncStorage.getItem('userId');
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
  }

  _keyboardDidShow = (e) => {
    let keyboardHeight = e.endCoordinates.height;
    this.setState({
      minInputToolbarHeight: keyboardHeight + 5,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      minInputToolbarHeight: 45,
    });
  };

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }
  }

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height - 40 })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );
  }


  /**
   * Save the input values change to state
   */
  changeTextHandler = text => {
    this.setState({ text: text });
  };

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  sendMessage = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text } = prevState;

          let messageModel = {
            _id: Math.round(Math.random() * 1000000),
            text: text,
            createdAt: new Date(),
            user: {
              _id: "android",
              name: USER,
              avatar: 'https://placeimg.com/140/140/people',
            },
          };

          socket.emit('message', messageModel);

          return {
            tasks: tasks.concat(messageModel),
            text: ""
          };
        }
      );
    }
  };

  /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a userId.
   * Set the userId to the component's state.
   */
  determineUser() {
    this.setState({ userId: USER });

    socket.emit('userJoined', 'android');
  }

  /**
   * When the server sends a message to this.
   */
  onReceivedMessage = (messages) => {
    this.storeMessages(messages);
  };

  render() {
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}
      >
        <FlatList
          style={ styles.list }
          data={ this.state.tasks }
          ref={ ref => this.flatList = ref }
          onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
          onLayout={() => this.flatList.scrollToEnd({ animated: true })}
          renderItem={({ item, index }) =>
            <FlatListComponent
              item={item}
            />
          }
        />
        <InputComponent
          changeTextHandler={this.changeTextHandler}
          onSubmitEditing={this.onSubmitEditing}
          value={this.state.text}
          sendMessage={this.sendMessage}
        />
      </View>
    );
  }

  // Helper functions
  storeMessages = (messages) => {
    this.setState(
      prevState => {
        let { tasks } = prevState;
        let messageArr = [];

        messages.map((item) => {
          let messageModel = {
            _id: Math.round(Math.random() * 1000000),
            text: item.text,
            createdAt: new Date(),
            user: {
              _id: item.user ? item.user._id : "PC",
              name: item.user ? item.user._id : "PC",
              avatar: 'https://placeimg.com/140/140/any',
            },
          };

          messageArr.push(messageModel);
        });

        messageArr.reverse();
        return {
          tasks: tasks.concat(messageArr)
        };
      }
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#F5FCFF",
    padding: 10,
    paddingTop: 20
  },
  buttonStyle: {
    color: "red",
    backgroundColor: "green",
  },
  list: {
    width: "100%"
  }
});

export default ChatScreen;