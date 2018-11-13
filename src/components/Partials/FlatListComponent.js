import React, { Component }  from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';

let USER = '';

class FlatListComponent extends React.Component {

  componentDidMount() {
    USER = AsyncStorage.getItem('USER_ID');
  }

  render() {
    let { item } = this.props;

    return (
      <View style={[{
        display: 'flex',
        alignItems: item.user._id === "android" ? "flex-end" : "flex-start",
      }]}>
        <View style={[ styles.listItemContainer,
          { flexDirection: item.user._id === "android" ? "row-reverse" : "row" }]}>
          <Image
            style={ styles.imageStyles }
            source={{ uri: item.user.avatar }}
          />
          <Text style={styles.listItem}>
            {item.text}
          </Text>
        </View>
        <View style={ styles.marginBottom } />
      </View>
    )
  }
}

FlatListComponent.propTypes = {
  item: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  listItem: {
    width: "auto",
    maxWidth: '80%',
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 14
  },
  marginBottom: {
    height: 5,
    backgroundColor: "transparent"
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 1
  },
  imageStyles: {
    width: 35,
    height: 35,
    borderRadius: 35,
    marginLeft: 10,
    marginRight: 10
  }
});

export default FlatListComponent;