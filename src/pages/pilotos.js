import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList, Image, Linking, Button, ActivityIndicator } from 'react-native';
import styles from '../utils/index'
import service from '../controller/service'
import { SafeAreaView } from 'react-navigation';
import logo from '../../assets/f1.jpg';
import moment from 'moment'



export default class Pilotos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            animating: false
        };


    }

    static navigationOptions = () => {
        return {
            title: 'Pilotos',
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    _renderItem = ({ item }) => (
        <View style={styles.Piloto}  >
            <Text style={styles.GridViewTextLayoutBlackPiloto}>{item.familyName}</Text>
            <Text style={styles.GridViewTextLayoutBlackPiloto}>{item.nationality}</Text>
            <Text style={styles.GridViewTextLayoutBlackPiloto}>{moment(item.dateOfBirth).format('DD/MM/YYYY')}</Text>
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
                    source={logo}></Image>
                <FlatList
                    data={this.state.results}
                    style={styles.flatlist}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.driverId}
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
        const item = this.props.navigation.getParam('itens');
        this.getData(item);
    }


    getData(item) {
        var self = this;
        var services = new service();
        this.setState({
            animating: true
        })

        services.get(item, 'drivers', function (dados) {

            self.setState({
                results: dados,
                animating:false
            })
 
        }); 

    }


}