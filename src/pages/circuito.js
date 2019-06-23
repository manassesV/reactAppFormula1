import React from 'react';
import { Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Linking }
    from 'react-native';
import styles from '../utils/index'
import service from '../controller/service'
import construtor from '../../assets/circuito.jpg';
import { View } from 'native-base';




export default class Circuito extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: {},
            circuitoName: 'Useless Placeholder',
            animating: false
        };


    }

    static navigationOptions = () => {
        return {
            title: 'Circuito'
        };
    }

    render() {
        return (
            <ScrollView >
                <View style={styles.container}>
                    <Image style={{ height: 200 }}
                        source={construtor}></Image>
                    <Text style={styles.GridViewTextLayoutCircuito}>Name</Text>
                    <Text>{this.state.circuitoName}</Text>
                    <Text style={styles.GridViewTextLayoutCircuito}>País</Text>
                    <Text>{this.state.results.country}</Text>
                    <Text style={styles.GridViewTextLayoutCircuito}>Latitude</Text>
                    <Text>{this.state.results.lat}</Text>

                    <Text style={styles.GridViewTextLayoutCircuito}>Longitude</Text>
                    <Text>{this.state.results.long}</Text>

                    <Text style={styles.GridViewTextLayoutCircuito}>Localidade</Text>
                    <Text>{this.state.results.locality}</Text>
                    <TouchableOpacity style={styles.dadosBibliografia} onPress={() => { Linking.openURL(this.state.url) }} >
                        <Text style={styles.dadosButton}
                        >Bibliografia</Text>
                    </TouchableOpacity>
                </View>
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
        var dados = item.Circuit;
        var name = dados.circuitName;
        var url = dados.url
        this.setState({
            results: dados.Location,
            circuitoName: name,
            animating: false,
            url: url
        })


    }


}