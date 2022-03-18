import React from 'react'
import { View, Image, StyleSheet } from 'react-native'


//상단 공통 이미지
function CommonView() {

    return (
        <View style={styles.topContainer}>
            <Image
                source={require('./image/hImg1.png')}
                style={styles.img}
            />
            <Image
                source={require('./image/hImg2.png')}
                style={styles.img}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: '5%'
    },
    img: {
        width: 100,
        height: 100
    },
})

export default CommonView