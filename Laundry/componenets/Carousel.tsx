import * as React from 'react';
import { Dimensions, Text, View, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const Corosol = () => {
    const width = Dimensions.get('window').width;
    const list = [
        { id: 1, title: 'First', image: 'https://th.bing.com/th?id=OIP.tLotgCDtzgTdwJcTiXWRCwHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.6&pid=3.1&rm=2' },
        { id: 2, title: 'Second', image: 'https://dataconomy.com/wp-content/uploads/2022/10/NightCafe-AI-image-generator-7.jpg' },
        { id: 3, title: 'Third', image: 'https://blog.pincel.app/wp-content/uploads/2023/09/0-add-hidden-text-or-symbol-into-AI-photo.jpg' }
    ]
    return (
        <View style={{ flex: 1, padding:10, }}>
            <Carousel width={width*0.95} height={width / 2} autoPlay={true} data={list} scrollAnimationDuration={1500}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <View style={{flex: 1, borderWidth: 1, borderRadius:10,  justifyContent: 'center',}}>
                        <Image source={{ uri: item.image }} style={{ width: '100%', height: "100%", borderRadius: 10 }} />
                    </View>
                )}
            />
        </View>
    );
}

export default Corosol