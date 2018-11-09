import React from 'react';
import { Button, Text, View } from 'react-native';

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'DetailsScreen',
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
        <Text style={{ fontSize: 24, alignSelf: "center", marginTop: 20, marginBottom: 20}}>About Application</Text>

        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 16, marginBottom: 10}}>React Native</Text>
          <Text>"expo": "27.0.0",</Text>
          <Text>"react": "16.5.0",</Text>
          <Text>"react-native": "0.57"</Text>
          <Text>"socket.io-client": "^2.1.1"</Text>
          <Text>"react-navigation": "^2.12.1"</Text>
        </View>

        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 16, marginBottom: 10, marginTop: 20}}>NodeJS</Text>
          <Text>"mongojs": "^2.4.0",</Text>
          <Text>"nodemon": "^1.11.0",</Text>
          <Text>"socket.io": "^1.7.2"</Text>
        </View>

        <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title="Go Back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>

      </View>
    );
  }
}

export default DetailsScreen;