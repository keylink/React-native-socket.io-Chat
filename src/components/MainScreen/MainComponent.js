import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'HomeScreen',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#F5FCFF" }}>
        <TouchableHighlight
          style={styles.buttonAbout}
          onPress={() => this.props.navigation.navigate('Details')}
          underlayColor='#61dbfc'
        >
          <Text style={{textAlign: 'center', color: "#fff"}}>
            About
          </Text>
        </TouchableHighlight>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={ styles.imageStyles }
            source={require('../../../assets/1_ypTuZbQNEV1oGkAfn85AUA.png')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStyles: {
    width: 200,
    height: 200,
    borderRadius: 35,
    marginLeft: 10,
    marginRight: 10
  },
  buttonAbout: {
    alignSelf: 'flex-end',
    width: "20%",
    backgroundColor: "#61dbfc",
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 5
  }
});

export default HomeScreen;