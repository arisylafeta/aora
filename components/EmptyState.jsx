import { View, Text, Image } from 'react-native'
import React from 'react'

import { images } from '../constants'

const EmptyState = ({title, subtitle}) => {
    return (
        <View className="justify-center px-4 items-center">
            <Image
                source={images.empty}
                className="w-[270px] h-[215px]"
                resizeMode='contain'
            />
            <Text className="text-sm text-gray-100 font-pmedium">
                {title}
            </Text>
            <Text className="text-xl text-center text-white mt-2 font-psemibold">
                {subtitle}
            </Text>
        </View>
    )
}

export default EmptyState