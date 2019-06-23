import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList, Image, Linking, ActivityIndicator } from 'react-native';
import styles from '../utils/index'
import service from '../controller/service'
import { SafeAreaView } from 'react-navigation';
import { Button } from 'native-base';
import construtor from '../../assets/construtor.jpg';




export default class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            animating: false
        };


    }

    static navigationOptions = () => {
        return {
            title: 'Resultados',
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    _renderItem = ({ item }) => (

        <View style={styles.Position} >
            <Text style={styles.Right}>{item.position}</Text>
            <Text style={styles.Left}>{item.givenName}</Text>
            <Text style={styles.Left}>{item.points}</Text>
        </View>
    );

    render() {
        return (
            <ScrollView>
                <Image style={{ height: 200 }}
                    source={construtor}></Image>
                <FlatList
                    data={this.state.results}
                    style={styles.flatlist}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.driverId}
                />
                <ActivityIndicator
                    animating={this.state.animating}
                    visible={this.state.animating}
                    color='#000'
                    size="large"
                />
            </ScrollView>
        );
    }


    componentDidMount() {
        const season = this.props.navigation.getParam('itens');
        this.getData(season);
    }

    onPressAction = (item, tipo) => {
        this.props.navigation.navigate(tipo, {
            item: item
        });
    }

    getData(item) {
        var services = new service();
        var self = this
        this.setState({
            animating: true
        })
        services.get(item, 'results', function (dados) {
            self.setState({
                results: dados,
                animating:false
            })

        });

    }


}