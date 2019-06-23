import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Seasons from './src/components/seasons';
import { SafeAreaView } from 'react-navigation';
import styles from './src/utils/index'
import Expo from 'expo';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        const ds = this.renderSeasons()
        this.state = {
            dataSource: ds,
            animating: false
        };

    }

    static navigationOptions = () => {
        return {
            title: 'Formula 1-Anos',
        };
    }




   
    renderSeasons() {
        let items = [];

        for (let i = 0; i <= 19; i++) {
            const year = '20' + (i > 9 ? i : `0${i}`);
            items.push(
                { key: year }

            );
        }
        return items;
    }

    getData(season) {
        this.props.navigation.navigate('Temporada', {
            season: season
        });
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity style={styles.GridViewContainer} onPress={() => this.getData(item)} >
            <Text style={styles.GridViewTextLayout}>{item.key}</Text>
        </TouchableOpacity>
    );



    render() {
        return (
            <View key="home" >
                <FlatList
                    data={this.state.dataSource}
                    style={styles.flatlist}
                    renderItem={this._renderItem}
                    numColumns={2}
                    keyExtractor={item => item.key}
                />
                <ActivityIndicator
                    animating={this.state.animating}
                    visible={this.state.animating}
                    color='#000'
                    size="large"
                    key="activity"
                />
            </View>
        );
    }
}

