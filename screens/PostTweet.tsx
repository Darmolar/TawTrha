import * as React from 'react';
import { StyleSheet, 
        Dimensions, 
        Platform,
        Text, 
        View, 
        TextInput,
        TouchableOpacity, 
        Image,
        StatusBar,
        ScrollView,
        Button,
        FlatList,
        Alert,
        Switch
      } from 'react-native';

import ActionButton from 'react-native-circular-action-menu';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5, Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function PostTweet({navigation}) {
    const [data, setData] = React.useState({
        textLength: 280,
        description: "",
        shouldRepeat: 'yes',
        howManyRepeat: "2",
        pickADate: false,
        expire_after_posted: '',
        previousState_expire_after_posted: false,
        previousState_expire_end__after_posted: false,
        form_input_end_condition: 0,

    })
    
    const [date, setDate] = React.useState(new Date(1598051730000));
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const [image, setImage] = React.useState({
        files: []
    });

   const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    // useEffect(() => {
    //     (async () => {
    //     if (Platform.OS !== 'web') {
    //         const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    //         if (status !== 'granted') {
    //         alert('Sorry, we need camera roll permissions to make this work!');
    //         }
    //     }
    //     })();
    // }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
                                                                mediaTypes: ImagePicker.MediaTypeOptions.All,
                                                                allowsEditing: true,
                                                                allowsMultipleSelection: true,
                                                                aspect: [6, 5],
                                                                quality: 1,
                                                            });

        console.log(result);

        if (!result.cancelled) {
            const files = image.files
            var res = {
                        "height": result.height,
                        "type": result.type,
                        "uri": result.uri,
                        "width": result.width,
                    }
            files.push(res);

            setImage({
                ...data,
                files: files,
            });
        }
    };

    const handleTextChange = (val) =>{
        setData({
                ...data,
                description: val
            })
    }

    const removeAllDescription = () =>{
        setData({
            ...data,
            description: ''
        })
    }

    const getSelectedItem = (item, index) => {
        Alert.alert(
            'Oops',
            'Remove file?',
            [
              {
                text: 'Yes',
                onPress: () => {
                    const files = image.files
                    files.splice(index, 1)
                    setImage({
                        ...data,
                        files: files,
                    });
                }
              },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              }
            ],
            { cancelable: false }
          );
    }

    const toggleSwitch = () => setData({...data, previousState_expire_after_posted: !data.previousState_expire_after_posted});
     
    const toggleSwitch2 = () => setData({...data, previousState_expire_end__after_posted: !data.previousState_expire_end__after_posted});
    
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#f5d020" barStyle="dark-content" />
        <LinearGradient
                    colors={['#f5d020', '#f53803', 'transparent']}
                    style={styles.header_card}
                    >
            <View style={styles.card}>
                <View style={styles.card_header}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10, color: 'grey' }}>Account: @Twitter Username</Text>
                </View>
            </View>
        </LinearGradient>
        <ScrollView style={styles.schedule}>
            <View style={styles.form}>
                <View style={styles.form_group}>
                    <Text style={styles.form_label}>Description</Text>
                    <TextInput
                            placeholder="Enter description"
                            style={styles.form_input}
                            autoCapitalize="none"
                            autoCorrect={true}
                            spellCheck={true}
                            maxLength={data.textLength}
                            multiline={true}
                            numberOfLines={10}
                            scrollEnabled={true}
                            value={data.description}
                            onChangeText={(val) => handleTextChange(val)}
                         />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                        <Text>Remaining: {data.textLength - data.description.length}</Text> 
                        { data.description.length > 0 && <MaterialIcons name="close" color="red" size={20} onPress={() => removeAllDescription() } /> }
                    </View>
                </View>
                <View style={styles.form_group}>
                    <Text style={styles.form_label}>Additional</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                        <View style={styles.form_icon}>
                            <MaterialIcons name="picture-in-picture" size={24} color="white" onPress={() => pickImage() } />
                        </View>
                        <View style={styles.form_icon}>
                            <Feather name="video" size={24} color="white" onPress={() => pickImage() } />
                        </View>
                        <View style={styles.form_icon}>
                            <MaterialIcons name="gif" size={40} color="white" onPress={() => pickImage() } />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                        <FlatList 
                                data={image.files}  
                                horizontal={true}
                                inverted={true}
                                renderItem={({ item , index, separators }) => 
                                        <TouchableOpacity key={index} style={{ top: 5, padding: 10 }} onPress={() => getSelectedItem(item, index) }>
                                            <Animatable.Image animation="fadeInUp" source={item} style={styles.form_files} />
                                        </TouchableOpacity>
                                } 
                                keyExtractor={item => item.uri}
                            />
                    </View>
                </View>
                <View style={styles.form_group}>
                    <Text style={styles.form_label}>Repeat Post?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Picker
                            selectedValue={data.shouldRepeat}
                            style={{height: 50, width: 150}}
                            onValueChange={(itemValue, itemIndex) =>
                                setData({
                                            ...data,
                                            shouldRepeat: itemValue
                                        })
                            }>
                            <Picker.Item label="Post Once" value="no" />
                            <Picker.Item label="Repeat" value="yes" />
                        </Picker>                         
                        <Picker
                            selectedValue={data.howManyRepeat}
                            style={{height: 50, width: 150}}
                            onValueChange={(itemValue, itemIndex) =>
                                setData({
                                            ...data,
                                            howManyRepeat: itemValue
                                        })
                            }>
                            <Picker.Item label="Day" value="1" />
                            <Picker.Item label="Week" value="2" />
                            <Picker.Item label="Month" value="3" />
                            <Picker.Item label="Once Every Year" value="4" />
                            <Picker.Item label="Custom" value="5" />
                        </Picker>                        
                    </View>
                </View>
                <View style={styles.form_group}>
                    <Text style={styles.form_label}>Would you like thos post to expire?</Text>
                    <View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center' }}>
                            <Switch                                                      
                                trackColor={{ false: "#f5d020", true: "#f53803" }}
                                thumbColor={data.previousState_expire_after_posted ? "#f5d020" : "#f53803"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={data.previousState_expire_after_posted}
                            />
                            <Text style={styles.form_input_condition_text}>Expire after beign posted</Text>
                            <TextInput                                          
                                    placeholder="0"
                                    style={[styles.form_input_condition, { backgroundColor: data.previousState_expire_after_posted ? '#fff': 'grey'}]}
                                    value={data.expire_after_posted}
                                    editable={data.previousState_expire_after_posted}
                                    // onChangeText={(val) => handleTextChange(val)}
                                />
                            <Text style={styles.form_input_condition_text}>times</Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', top: 10 }}>
                            <Switch                                                        
                                trackColor={{ false: "#f5d020", true: "#f53803" }}
                                thumbColor={data.previousState_expire_end__after_posted ? '#f5d020': '#f53803'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch2}
                                value={data.previousState_expire_end__after_posted}
                            />
                            <Text style={styles.form_input_condition_text}>End Date           </Text>
                            <TextInput                                          
                                    placeholder="dd/mm/yyy"
                                    style={[styles.form_input_condition, { width: 100, backgroundColor: data.previousState_expire_end__after_posted ? '#fff': 'grey'}]}
                                    editable={data.previousState_expire_end__after_posted}
                                    value={data.form_input_end_condition}
                                />
                            <Text style={styles.form_input_condition_text}>times</Text>
                        </View>                   
                    </View>
                </View>
                <View style={[styles.form_group, {top: 30, marginBottom: 50}]}>
                    <Button title="Pick Date" onPress={() => setData({ ...data, pickADate: true }) } />
                       {data.pickADate == true &&  <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="calendar"
                            onChange={onChange}
                            />}
                </View> 
            </View>
        </ScrollView>
        <ActionButton buttonColor="rgba(231,76,60,1)"  position="right" useNativeDriver={true} icon={<MaterialIcons name="dashboard" size={24} color="black" style={styles.actionButtonIcon} />} >
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
        height: height / 15,
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
    form:{
        margin: 5,
    },
    form_group:{
        justifyContent: 'space-around'
    },
    form_label:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
        marginBottom: 10,
        marginTop: 20,
    },
    form_input:{
        padding: 10,
        width: 300,
        backgroundColor: '#fff',
        borderWidth: .4,
        borderRadius: 5,
        borderColor: '#000',
        textAlignVertical: 'top'
    },
    form_icon:{
        backgroundColor: '#f53803',
        width: 50,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    form_files:{
        width: 80,
        height: 70,
        borderRadius: 10,
    },
    form_input_condition:{
        padding: 10,
        width: 50,
        height: 30,
        backgroundColor: '#fff',
        borderWidth: .4,
        borderRadius: 5,
        borderColor: '#000',
        textAlignVertical: 'top',
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form_input_condition_text:{
        fontSize: 14,
        fontWeight: 'bold',
        margin: 10
    }
});
