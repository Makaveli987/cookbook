import { Recipe } from "../../types/Recipe";

type Props = {
  recipe: Recipe;
  onDelete: (recipe: Recipe) => void;
  onFavorites: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
};

export default function RecipeItem({
  recipe,
  onDelete,
  onFavorites,
  onEdit,
}: Props) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{recipe.name}</span>
      <div>
        <button onClick={() => onFavorites(recipe)}>favorite</button>
        <button onClick={() => onEdit(recipe)}>edit</button>
        <button onClick={() => onDelete(recipe)}>delete</button>
      </div>
    </div>
  );
}
