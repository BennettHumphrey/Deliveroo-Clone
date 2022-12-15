import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
// import SafeViewAndroid from '../components/AndroidSafeView'
import { 
    UserIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
 } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity'

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
    })}, []);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured"] {
            ...,
            restaurants[] -> {
                ...,
                dishes[] ->
            }
        }
        `).then((data) => {
            setFeaturedCategories(data)
        })
    }, [])


    // console.log(featuredCategories)

  return (
    <SafeAreaView className="bg-white pt-5 w-screen ">

        {/* Header */}
            <View className="flex-row pb-3  items-center mx-4 space-x-2" >
                <Image 
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}    
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />       

                <View className="flex-1" >
                    <Text className="font-bold text-gray-400 text-xs" >Deliver Now!</Text>    
                    <Text className="font-bold text-xl" >Current Location
                        <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>    
                </View>    
                <UserIcon size={35} color="#00CCBB" /> 
            </View>
            {/* Search */}
            <View className="flex-row space-x-2 items-center pb-4 mx-2" >
                <View className="flex-row flex-1 space-x-2 p-3 mx-2 bg-gray-200" >
                    <MagnifyingGlassIcon color="gray" size={20} />
                    <TextInput placeholder='Restaurants and Cuisines'
                    keyboardType='default' />
                </View>
                <AdjustmentsHorizontalIcon color="#00CCBB" />
            </View>

            {/* Body */}
            <ScrollView className="bg-gray-100" contentContainerStyle={{paddingBottom: 150}} >
                {/* Categories */}
                <Categories  />
                {/* Featured */}
                {featuredCategories?.map((cat) => ( 
                        <FeaturedRow 
                        key={cat._id}
                        id={cat._id}
                        title={cat.name}
                        description={cat.short_description}
                    />)
                )}
                {/* <FeaturedRow id="1" title="Featured" description="Paid placements from our partners" /> */}
                {/* Tasty Discounts */}
                {/* <FeaturedRow id="2" title="Tasty Discounts" description="Everyone's been enjoying these tasty discounts!"  /> */}
                {/* Offers near you */}
                {/* <FeaturedRow id="3" title="Offers near you!" description="Why not support your local restaurant tonight?"  /> */}

            </ScrollView>

      
    </SafeAreaView>
  )
}

export default HomeScreen