import { Recipe } from "../../types/Recipe";
import RecipeItem from "../RecipeItem/RecipeItem";

type RecipeListProps = {
  title: string;
  recipes: Recipe[];
  onDelete: (recipe: Recipe) => void;
  onFavorites: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
};

export default function RecipeList({
  title,
  recipes,
  onDelete,
  onFavorites,
  onEdit,
}: RecipeListProps) {
  return (
    <div>
      <h4>{title}</h4>
      <hr />

      {recipes.length === 0 && <p>No recipes found</p>}
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          onFavorites={onFavorites}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
