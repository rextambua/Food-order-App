import React, {useEffect, useState} from 'react';
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";


const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [httpError, sehttpError] = useState(true)

    useEffect(()=>{
      const fetchMeals = async () => {
          const response = await fetch('https://my-second-project-47d93-default-rtdb.firebaseio.com/meals.json');
          if(!response.ok){
              throw new Error("Something went wrong!");
          }
          const responseData = await response.json();

          const loadedMeals = [];

          for (const key in responseData){
              loadedMeals.push({
                  id:key,
                  description:responseData[key].description,
                  name: responseData[key].name,
                  price: responseData[key].price
              });
          };
          setMeals(loadedMeals)
          setLoading(false)
      }

          fetchMeals().catch((error)=>{
            setLoading(false);
            sehttpError(error.message)
        });

      }, [])

    if (loading){
        return (
        <section className={classes.mealsLoading}>
            <p>Loading...</p>
        </section>
        )
    }
    // if (httpError){
    //     return (
    //     <section className={classes.httperror}>
    //         <p>{httpError}</p>
    //     </section>
    //     )
    // }

    const mealsList = meals.map((meal) => {
        return(
            <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price} />
        )

    })

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                {mealsList}
                 </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;