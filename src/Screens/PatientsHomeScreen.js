// Import React and Component
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';

import {images , colors} from '../assets/assets';

const PatientsHomeScreen = ({navigation}) => {
    return (
        <View style={styles.mainBody}>
            <View style={styles.upperSection}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={{margin: 20}}>
                    <Image source={images.backArrow}/>
                </TouchableOpacity>
                <View style={styles.profileField}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={images.profilePicture} style={{marginLeft:30, height:55, width:55}}/>
                        <View style={{flexDirection:"column",marginLeft:20,marginTop:5}}>
                            <Text style ={{fontSize:18,color:colors.white}}>
                                Hello,
                            </Text>
                            <Text style ={styles.profileText}>
                            Mohamed Ali
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('LoginScreen')}
                        style={styles.searchButton}>
                        <Image source={images.search} style={{width:23,height:23}} /> 
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.lowerSection}>
                    <View style ={{backgroundColor:colors.white ,borderTopRightRadius:60}}>
                        <Text style ={styles.header}>
                            What do you need?
                        </Text>
                        <View style={styles.optionsContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('LoginScreen')}
                                style={styles.optionButton}>
                                {  
                                <View  style={styles.option}>
                                    <Image source={images.stethoscope} style={{width:40,height:40}} /> 
                                    <Text style ={styles.optionText}> Doctors </Text>
                                </View>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('LoginScreen')}
                                style={styles.optionButton}>
                                {  
                                <View  style={styles.option}>
                                    <Image source={images.results} style={{width:40,height:40}} /> 
                                    <Text style ={styles.optionText}> Results </Text>
                                </View>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('LoginScreen')}
                                style={styles.optionButton}>
                                {  
                                <View  style={styles.option}>
                                    <Image source={images.assessment} style={{width:40,height:40}} /> 
                                    <Text style ={styles.optionText}> Detailed assessment </Text>
                                </View>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('LoginScreen')}
                                style={styles.optionButton}>
                                {  
                                <View  style={styles.option}>
                                    <Image source={images.progress} style={{width:40,height:40}} /> 
                                    <Text style ={styles.optionText}> Progress </Text>
                                </View>
                                }
                            </TouchableOpacity>
                        </View >
                        <View style={styles.helpfulLinks}>
                            <Text style ={styles.helpfulLinksHeader}>
                                Helpful Links
                            </Text>
                            <ScrollView horizontal style={styles.scrollView}>
                                <View style={styles.linksContainer}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('LoginScreen')}
                                        style={styles.linksButton}>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('LoginScreen')}
                                        style={styles.linksButton}>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('LoginScreen')}
                                        style={styles.linksButton}>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('LoginScreen')}
                                        style={styles.linksButton}>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('LoginScreen')}
                                        style={styles.linksButton}>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('LoginScreen')}
                                        style={styles.linksButton}>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.navBar}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PatientsHomeScreen')}
                    style={[styles.navBarButton, styles.activeButton]}>
                    <Image source={images.home} style={styles.navBarIcon} /> 
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={styles.cameraButton}>
                    <Image source={images.camera} style={styles.navBarIcon} /> 
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PatientsEditProfile')}
                    style={styles.navBarButton}>
                    <Image source={images.profileGreen} style={styles.navBarIcon} /> 
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PatientsHomeScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: colors.white,
        alignContent: 'center',
    },
    upperSection:{
        margin:0,
        height:180,
        backgroundColor:colors.darkBlue,
        borderBottomLeftRadius:60,
    },
    profileField:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginRight:20,
        marginTop:10,
    },
    profileText:{
        color:colors.white,
        fontSize:16,
    },
    searchButton:{
        backgroundColor:colors.green,
        width:40,
        height:40,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
    },
    lowerSection:{
        backgroundColor: colors.darkBlue,
    },
    header:{
        marginTop: 30,
        marginLeft: 35,
        marginRight: 35,
        color: colors.darkBlue,
        fontSize: 20,
        fontWeight:"500",
    },
    optionsContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        marginTop:30,
        gap:30,
    },
    optionButton:{
        width:150,
        height:90,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.green,
    },
    option:{
        flexDirection:'column',
        alignItems:'center',
    },
    optionText:{
        fontSize:17,
        color:colors.white,
        textAlign:'center',
    },
    helpfulLinksHeader:{
        color: colors.darkBlue,
        fontSize: 19,
    },
    helpfulLinks:{
        borderRadius:20,
        borderBottomColor:colors.mintGreen,
        borderLeftColor:colors.mintGreen,
        borderRightColor:colors.mintGreen,
        borderTopColor: colors.white,
        borderWidth:1.5,
        margin:30,
        flexDirection:'column',
        paddingLeft:10,
        paddingTop:10,
    },
    linksContainer:{
        flexDirection:'row',
        margin:3,
        gap:30,   
        paddingRight:30,    
    },
    linksButton:{
        backgroundColor:colors.mintGreen,
        width:82,
        height:110,
        borderRadius:20,
    },
    scrollView: {
        flexDirection: 'row',
        padding: 10,
    },
    navBar:{
        height:50,
        borderWidth:1.5,
        borderColor:colors.mintGreen,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    navBarButton:{
        borderRadius:40,
        width:50,
        height:50,
        marginLeft:20,
        marginRight:20,
        alignItems:'center',
        justifyContent:'center',
        marginTop:5,
    },
    activeButton:{
        backgroundColor:colors.mintGreen,
    },
    navBarIcon:{
        width:30,
        height:30,
        padding:10,
    },
    cameraButton:{
        backgroundColor:colors.green,
        width:60,
        height:60,
        borderRadius:40,
        borderColor:'#DCDCDC',
        borderTopWidth:1,
        borderRightWidth:2,
        borderLeftWidth:2,
        borderBottomWidth:5,
        marginBottom:45,
        alignItems:'center',
        justifyContent:'center',
    },
});