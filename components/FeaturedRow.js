import { View, Text, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity'

const FeaturedRow = ({id, title, description}) => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    sanityClient.fetch(
      `
      *[_type == 'featured' && _id == $id] {
        ...,
        restaurants[] ->{
          ...,
          dishes[] ->,
          type-> {
            name
          }
        }
      }[0]
      `,
      { id }
    ).then((data => {
      setRestaurants(data?.restaurants)
    }))
  }, [id])
  // console.log(restaurants)

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4" >
        <Text className="font-bold text-lg" >{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4" >{description}</Text>

      <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      showsHorizontalScrollIndicator={false}
      className="pt-4" 
      >
        {restaurants?.map((res) => (
          <RestaurantCard 
          key={res._id}
          id={res._id}
          imgUrl={res.image}
          title={res.name}
          rating={res.rating}
          genre={res.type?.name}
          address={res.address}
          short_description={res.short_description}
          dishes={res.dishes}
          long={res.long}
          lat={res.lat}
           />
        ))}



        {/* Restaurant cards... */}
        {/* <RestaurantCard 
        id={123}
        imgUrl="https://links.papareact.com/gn7"
        title="Sushi"
        rating={4.5}
        genre="Japanese"
        address="123 Main st."
        short_description="Short test desc"
        dishes={[]}
        long={20}
        lat={15}
         />
        <RestaurantCard 
        id={123}
        imgUrl="https://links.papareact.com/gn7"
        title="Sushi"
        rating={4.5}
        genre="Japanese"
        address="123 Main st."
        short_description="Short test desc"
        dishes={[]}
        long={20}
        lat={15}
         />
        <RestaurantCard 
        id={123}
        imgUrl="https://links.papareact.com/gn7"
        title="Sushi"
        rating={4.5}
        genre="Japanese"
        address="123 Main st."
        short_description="Short test desc"
        dishes={[]}
        long={20}
        lat={15}
         /> */}
      </ScrollView>

    </View>
  )
}

export default FeaturedRow