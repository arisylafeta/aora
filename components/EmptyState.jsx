import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { images } from '../constants'
import { router } from 'expo-router'

const EmptyState = ({title, subtitle}) => {
    return (
        <View className="justify-center px-4 items-center">
            <Image
                source={images.empty}
                className="w-[270px] h-[215px]"
                resizeMode='contain'
            />
             <Text className="text-xl text-center text-white mt-2 font-psemibold">
                {title}
            </Text>
            <Text className="text-sm text-gray-100 font-pmedium">
                {subtitle}
            </Text>
           
           <CustomButton 
            title="Create video"
            handlePress={() => router.push("/create")}
            containerStyles="w-full my-5"

           />
        </View>
    )
}

export default EmptyState