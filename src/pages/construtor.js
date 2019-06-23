import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList, Image, Linking, ActivityIndicator } from 'react-native';
import styles from '../utils/index'
import service from '../controller/service'
import { SafeAreaView } from 'react-navigation';
import { Button } from 'native-base';
import construtor from '../../assets/construtor.jpg';




export default class Contrutores extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            animating: false
        };


    }

    static navigationOptions = () => {
        return {
            title: 'Construstor',
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    _renderItem = ({ item }) => (
        <View style={styles.GridViewContainer}  >
            <Text style={styles.GridViewTextLayoutBlackPiloto}>{item.name}</Text>
            <Text style={styles.GridViewTextLayoutBlackPiloto}>{item.nationality}</Text>
            <TouchableOpacity style={styles.dadosBibliografia} onPress={() => { Linking.openURL(item.url) }} >
                <Text style={styles.dadosButton}
                >Bibliografia</Text>
            </TouchableOpacity>
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
                    keyExtractor={item => item.constructorId}
                    numColumns={2}
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

        services.get(item, 'constructors', function (dados) {


            self.setState({
                results: dados,
                animating:false
            })

        });

    }


}