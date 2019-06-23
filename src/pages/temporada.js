import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import styles from '../utils/index'
import service from '../controller/service'
import { SafeAreaView } from 'react-navigation';
import { Button } from 'native-base';



export default class Temporada extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            animating: false
        };


    }

    static navigationOptions = () => {
        return {
            title: 'Temporadas',
        };
    }



    _renderItem = ({ item }) => (
        <View style={styles.GridViewContainerTemp}  >
            <Text style={styles.GridViewTextLayoutBlack}>{item.raceName}</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.dados} onPress={() => this.onPressAction(item, "Pilotos")}>
                    <Text style={styles.dadosButton}
                    >Pilotos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dados} onPress={() => this.onPressAction(item, "Construtores")}>
                    <Text style={styles.dadosButton}>Contrutores</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dados} onPress={() => this.onPressAction(item,
                    "Results")}>
                    <Text style={styles.dadosButton}>Resultado</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dados} onPress={() => this.onPressAction(item,
                    "Circuito")}>
                    <Text style={styles.dadosButton}>Circuito</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    render() {
        return (
            <ScrollView>
                <FlatList
                    data={this.state.results}
                    style={styles.flatlist}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.date}
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
        const item = this.props.navigation.getParam('season');
        this.getData(item);
    }

    onPressAction = (item, tipo) => {
        this.props.navigation.navigate(tipo, {
            itens: item
        });
    }

    getData(item) {
        var self = this;

        this.setState({
            animating: true
        })
        var services = new service();

        services.getTemporada(item, function (dados) {
            self.setState({
                results: dados,
                animating: false
            })
        });

    }


}