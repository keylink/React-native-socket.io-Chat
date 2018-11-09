import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'LoginScreen',
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
      text: "",
      error: false
    };
  }

  /**
   * Save the input values change to state
   */
  changeTextHandler = text => {
    this.setState({
      text: text,
      error: false
    });
  };


  saveUserId = async userId => {
    try {
      await AsyncStorage.setItem('userId', JSON.stringify(userId));
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  getUserId = async () => {
    let userId = '';
    try {
      userId = await AsyncStorage.getItem('userId') || 'none';
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return userId;
  };

  onSubmitFuction = () => {
    if(this.state.text) {
      //AsyncStorage.setItem('USER_ID', this.state.text);

      this.saveUserId();

      this.props.navigation.navigate('Chat')
    } else {
      this.setState({error: true})
    }

    this.getUserId();
  };

  render() {
    return (
      <View style={ styles.loginWrapper }>
        <Text style={ styles.mainTitle }>Login</Text>
        <Text style={styles.secondaryTitle}>Enter your chat name</Text>
        <TextInput
          style={[styles.textInput, {borderColor: this.state.error ? 'red' : 'transparent' }]}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.onSubmitFuction}
          value={this.state.text}
          placeholder="Type your nickname"
          underlineColorAndroid="transparent"
        />
        <TouchableHighlight
          style={styles.inputButton}
          onPress={this.onSubmitFuction}
          underlayColor='#61dbfc'
        >
          <Text>
            Login
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#F5FCFF"
  },
  mainTitle: {
    fontSize: 20,
    paddingTop: 60,
    paddingBottom: 15
  },
  secondaryTitle: {
    fontSize: 16,
    paddingBottom: 20
  },
  textInput: {
    height: 50,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: "transparent",
    width: "90%",
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
    borderWidth: 1
  },
  inputButton: {
    width: "90%",
    display: 'flex',
    flexDirection: "row",
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 40,
    backgroundColor: '#61dbfc',
    elevation: 1,
  }
});

export default LoginScreen;