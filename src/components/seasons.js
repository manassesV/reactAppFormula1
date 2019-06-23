import React, { PureComponent } from 'react';
import { View} from 'react-native';
import { Button, Text} from 'native-base';
import styles from '../utils/index';



class Seasons extends PureComponent {
    
    render() {
        return (
            <View style={styles.container}>
                {this.renderSeasons()}
            </View>
        );
    }

}

export default Seasons;

