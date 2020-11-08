import * as React from 'react';
import { StyleSheet, 
        Dimensions, 
        Text, 
        View, 
        TouchableHighlight, 
        Image,
        StatusBar  } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


export default function Home({navigation}) {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#f5d020" barStyle="light-content" />
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                source={require('../assets/images/icon.png')}
                style={styles.logo}
            />
        </View>
        <Animatable.View style={styles.footer}
                animation="fadeInUpBig" >
            <Text style={styles.title}>Stay Connected with everyone</Text>
            <Text style={styles.text}>Sign In with your account.</Text>
            <Animatable.View 
                style={styles.button} 
                animation="bounceIn" 
                >
                <TouchableHighlight onPress={() => navigation.navigate('Login')}>
                    <LinearGradient
                            colors={['#f5d020', '#f53803']}
                            style={styles.signIn}
                         >
                        <Text style={styles.textSign}>Get Started</Text> 
                        <MaterialIcons
                            name="navigate-next"
                            color="#fff"
                            size={20}
                        />       
                    </LinearGradient>
                </TouchableHighlight>
            </Animatable.View>
        </Animatable.View>
    </View>
  );
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5d020'
  },
  header:{
      flex: 2,
      justifyContent: 'center',
      alignItems:'center'
  },
  footer:{
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30,
  },
  logo:{
    width: height_logo,
    height: height_logo
  },
  title:{
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text:{
      color: 'grey',
      marginTop: 5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30,
  },
  signIn:{
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row',
      backgroundColor: '#00f'
  },
  textSign:{
      color: 'white',
      fontWeight: 'bold'
  }
});
