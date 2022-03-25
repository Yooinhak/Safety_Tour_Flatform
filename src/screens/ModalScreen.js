import React, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'

export default function ModalScreen({offModal}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={offModal} style={styles.background} />
            <View style={styles.modal}>
                <Text style={styles.titleText}>코로나 안전 수치란 ?</Text>
                <Text>코로나19 안전지수는 코로나19의 잠재적인 발생 가능성을 예측하는 것을 목적으로, 확진자 수와 관련이 높은 유동인구나 택시/지하철의 수요 데이터 등을 함께 분석하여 산출한 수치입니다.</Text>
                <Text style={{marginVertical: 20}}>일반적으로 한 장소에서 물리적인 접촉 정도가 높은 경우 코로나19 안전지수가 높게 나타나며, 그 정도에 따라 아래와 같은 4개의 단계로 구분됩니다.</Text>
                
                <View style={styles.imageContainer}>
                    <View style={styles.eachImage}> 
                        <Image 
                            style={styles.imageSize}
                            source={require('./Service/image/bad.png')} 
                        />
                        <Text style={{color:'red'}}>경계</Text>
                        <Text style={{color:'red'}}>100 - 80</Text>
                    </View>
                    <View style={styles.eachImage}>
                        <Image 
                            style={styles.imageSize}
                            source={require('./Service/image/notGood.png')} 
                        />
                        <Text style={{color:'orange'}}>주의</Text>
                        <Text style={{color:'orange'}}>80 - 60</Text>
                    </View>
                    <View style={styles.eachImage}>
                        <Image 
                            style={styles.imageSize}
                            source={require('./Service/image/soso.png')} 
                        />
                        <Text style={{color:'green'}}>보통</Text>
                        <Text style={{color:'green'}}>60 - 30</Text>
                    </View>
                    <View style={styles.eachImage}>
                        <Image 
                            style={styles.imageSize}
                            source={require('./Service/image/great.png')} 
                        />
                        <Text style={{color:'blue'}}>양호</Text>
                        <Text style={{color:'blue'}}>30 - 0</Text>
                    </View>
                </View>
                
                <TouchableOpacity onPress={offModal}>
                    <Text style={styles.doneText}>
                        닫기    
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent'
      },
      background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      modal: {
        marginHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '60%',
        backgroundColor: 'white',
        padding: 10
      },
      doneText: {
        color: 'rgb(1,123,255)',
        fontSize: 15,
        margin: 10
      },
      titleText: {
        fontSize: 18,
        margin: 10
      },
      imageSize: {
          width: 40,
          height: 40
      },
      imageContainer: {
        flexDirection: 'row',
      },
      eachImage: {
          marginHorizontal: 15,
          alignItems: 'center'
      }
})