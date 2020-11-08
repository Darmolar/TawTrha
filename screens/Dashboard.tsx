import * as React from 'react';
import { StyleSheet, 
        Dimensions, 
        Platform,
        Text, 
        View, 
        TextInput,
        TouchableHighlight, 
        Image,
        StatusBar,
        ScrollView,
        Button
      } from 'react-native';

import ActionButton from 'react-native-circular-action-menu';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5, Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';


export default function Dashboard({navigation}) {
  const [data, setData] = React.useState({
     
  })

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#f5d020" barStyle="dark-content" />
        <LinearGradient
                    colors={['#f5d020', '#f53803', 'transparent']}
                    style={styles.header_card}
                    >
            <View style={styles.card}>
                <View style={styles.card_header}>
                <Animatable.Image 
                        animation="bounceIn"
                        source={require('../assets/images/avatar.png')}
                        style={styles.logo}
                    />
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10, color: 'grey' }}>Twitter Username</Text>
                </View>
            </View>
        </LinearGradient>
        <ScrollView style={styles.schedule}>
            <View style={styles.scheduleHeader}>
                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Overview</Text>  
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 15 }}>Oct 13, 2020 </Text>                    
                </View>
            </View>
            <View style={styles.schedule_body}>
                <View style={styles.schedule_card}>
                    <View style={styles.card_button}>
                        <Text style={styles.card_text_number}>30</Text>
                        {/* <MaterialIcons name="dashboard" size={35} color="#fff" /> */}
                    </View>
                    <View style={styles.card_body}>
                        <Text style={styles.card_text}>Scheduled Post</Text>
                    </View>
                </View>
                <View style={styles.schedule_card}>
                    <View style={styles.card_button}>
                        <Text style={styles.card_text_number}>30</Text>
                        {/* <MaterialIcons name="dashboard" size={35} color="#fff" /> */}
                    </View>
                    <View style={styles.card_body}>
                        <Text style={styles.card_text}>Published Post</Text>
                    </View>
                </View>
                <View style={styles.schedule_card}>
                    <View style={styles.card_button}>
                        <Text style={styles.card_text_number}>30</Text>
                        {/* <MaterialIcons name="dashboard" size={35} color="#fff" /> */}
                    </View>
                    <View style={styles.card_body}>
                        <Text style={styles.card_text}>Failed Post</Text>
                    </View>
                </View>
                <View style={styles.schedule_card}>
                    <View style={styles.card_button}>
                        <Text style={styles.card_text_number}>30</Text>
                        {/* <MaterialIcons name="dashboard" size={35} color="#fff" /> */}
                    </View>
                    <View style={styles.card_body}>
                        <Text style={styles.card_text}>Drafts</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
        <ActionButton buttonColor="rgba(231,76,60,1)"  position="right" icon={<MaterialIcons name="dashboard" size={24} color="black" style={styles.actionButtonIcon} />} >
            <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() =>  navigation.navigate('Dashboard') }>
                <MaterialIcons name="dashboard" size={24} color="black" style={styles.actionButtonIcon} /> 
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => navigation.navigate('PostTweet') }>
                <FontAwesome5 name="feather-alt" size={24} color="black" style={styles.actionButtonIcon} /> 
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => navigation.navigate('Dashboard') }>
                <AntDesign name="retweet" size={24} color="black"  style={styles.actionButtonIcon} /> 
            </ActionButton.Item>                
            <ActionButton.Item buttonColor='#1abc9c' title="Profile" onPress={() => navigation.navigate('Dashboard') }>
                <AntDesign name="profile" size={24} color="black" style={styles.actionButtonIcon} /> 
            </ActionButton.Item>
        </ActionButton>
    </View>
  );
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.14;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header_card:{
        padding: 30,
        marginTop: 30,
    },
    logo:{
        width: height_logo,
        height: height_logo,
        borderRadius: 100
    },
    card:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: height / 4,
        borderColor: '#fff',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 9,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
    },
    card_header:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    schedule:{
        padding: 13
    },
    scheduleHeader:{
        flexDirection: 'row',
        justifyContent: 'space-around',    
        width: 300,
    },
    schedule_body:{
        padding: 3,
        marginTop: 22,
        paddingLeft: 15,
    },
    schedule_card:{
        flexDirection: 'row',        
        width: 300,
        borderColor: '#fff',
        backgroundColor: '#f5d020',
        shadowColor: '#000',
        shadowOpacity: 9,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        opacity: .7,
        marginVertical: 7
    },
    card_body:{
        padding: 20,
    },
    card_button:{
        margin: 20,
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    card_text_number:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff'
    },
    card_text:{
        color: '#000',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
});
