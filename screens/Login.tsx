import * as React from 'react';
import { StyleSheet, 
        Dimensions, 
        Platform,
        Text, 
        View, 
        TextInput,
        TouchableHighlight, 
        Image,
        StatusBar
        } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';


export default function Home({navigation}) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    secureTextEntry: true,
  })

  const handlePasswordChange = (val) =>{
    setData({
      ...data,
      password: val
    })
  }

  const handleEmailChange = (val) =>{
    setData({
      ...data,
      email: val
    })
  }

  const handleSecureTextEntry = () =>{
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#f5d020" barStyle="light-content" />
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View style={styles.footer}
            animation="fadeInUp"
          >
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome
               name="user-o" 
               color="#05375a"
               size={20}
               />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(email) => handleEmailChange(email)}
            /> 
            <Feather
                name="check-circle"
                color="green"
                size={20}
                />
          </View>
          <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
          <View style={styles.action}>
            <FontAwesome
               name="lock" 
               color="#05375a"
               size={20}
               />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry }
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(password) => handlePasswordChange(password)}
            /> 
            <TouchableHighlight onPress={handleSecureTextEntry}>
                <Feather
                    name={data.secureTextEntry ? "eye" : "eye-off"}
                    color="grey"
                    size={20}
                    />
            </TouchableHighlight>
          </View>
          

          <View style={styles.button}>
              <TouchableHighlight onPress={() => navigation.navigate('Dashboard') }>
                  <LinearGradient
                    colors={['#f5d020', '#f53803']}
                    style={styles.signIn}
                    >
                    <Text style={[styles.textSign, {color: '#fff'}]}
                          >Sign In</Text>
                  </LinearGradient>
              </TouchableHighlight>
          </View>
           
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableHighlight onPress={() => navigation.navigate('Register')} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                  <Text style={[styles.textSign, {color: 'grey',fontSize: 20, fontWeight: 'bold'}]}>New here?</Text>
              </TouchableHighlight>
              
              <TouchableHighlight onPress={() => navigation.navigate('Reset')} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                  <Text style={[styles.textSign, {color: 'grey',fontSize: 20, fontWeight: 'bold'}]}>Forgot Password?</Text>
              </TouchableHighlight>
          </View>
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
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'
  },
  footer:{
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30,
  },
  text_header:{
    color: '#fff',
    fontWeight: '900',
    fontSize: 30,
  },
  text_footer:{
    color: '#05375a',
    fontSize: 18,
  },
  action:{
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput:{
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a'
  },
  signIn:{
      width: 300,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'row',
      backgroundColor: '#00f'
  },
  textSign:{
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold'
  },
  button:{
    marginTop: 50,
    alignItems: 'center',
  }
});
