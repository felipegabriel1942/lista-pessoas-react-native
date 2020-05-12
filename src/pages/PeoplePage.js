import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import PeopleList from '../components/PeopleList';

import axios from 'axios';

export default class PeoplePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      peoples: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    setTimeout(() => {
      axios
        .get('https://randomuser.me/api/?nat=br&results=25')
        .then(response => {
          const {results} = response.data;
          this.setState({
              peoples: results,
              loading: false
          });
        });
    }, 1500); 
  }

  renderLoading() {
    return  <ActivityIndicator size='large' color='#6ca2f7'/>;
  }

  renderList() {
    return <PeopleList
              peoples={this.state.peoples}
              onPressItem={pageParams => this.props.navigation.navigate('PeopleDetail', pageParams)}/>
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.loading ? this.renderLoading() : this.renderList() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

