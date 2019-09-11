import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App=()=> {
  const APP_ID='37443e0a';
  const APP_KEY=  '83b80e2a30056b239b3be222b40a5364';
// const exampleReq=`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`

const [recipes, setRecipes]=useState([ ])
const [search, setSearch]=useState('')
const [chor, setChor]=useState('chicken')

  //const [counter, setCounter]= useState(0);

  useEffect(()=>{
    getRecipes()
  }, [chor])

  const getRecipes=async()=>{
    const response=await fetch (`https://api.edamam.com/search?q=${chor}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data=await response.json();
    setRecipes(data.hits);
  }

const hitChange=e=>{
  setSearch(e.target.value)
}

const hitSearch=e=>{
  e.preventDefault()
  setChor(search)
  setChor('')
}

  return (
    <div className="App">
      <form className='search-form' onSubmit={hitSearch}>
        <input className='search-bar' type="text" value={search} onChange={hitChange} />
        <button  className='search-button' type='submit'>Search</button>
      </form>
    <div className='recipes'>
    {recipes.map(recipe=>(
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
         />
      ))}
    </div>
      {/* <h1 onClick={()=>setCounter(counter + 1)} >{ counter }</h1> */}
    </div>
  );
};

export default App;
