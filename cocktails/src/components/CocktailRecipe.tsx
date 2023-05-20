import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { fetchCocktails } from '../services/cocktailApi';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
}

interface CocktailRecipeParams {
  id: string;
  [key: string]: string | undefined;
}

const CocktailRecipe: React.FC = () => {
  const { id } = useParams<CocktailRecipeParams>();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    const fetchCocktailData = async () => {
      if (id) {
        try {
          const data = await fetchCocktails(id);
          setCocktail(data.drinks[0]);
        } catch (error) {
          console.error('Error fetching cocktail:', error);
        }
      }
    };

    fetchCocktailData();
  }, [id]);

  if (!cocktail) {
    return <Typography variant="body1">Loading cocktail...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {cocktail.strDrink}
      </Typography>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} style={{ marginBottom: '1rem' }} />
      <Typography variant="body2">{cocktail.strInstructions}</Typography>
    </div>
  );
};

export default CocktailRecipe;