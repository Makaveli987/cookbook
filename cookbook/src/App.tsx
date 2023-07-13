import { useState } from "react";
import "./App.css";
import { Recipe } from "./types/Recipe";
import RecipeList from "./components/RecipeList/RecipeList";
import RecipeModal from "./components/RecipeModal/RecipeModal";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([
    { name: "Pizza", description: "Delicious", id: 1 },
    { name: "burito", description: "Delicious", id: 2 },
    { name: "hamburger", description: "Delicious", id: 3 },
    { name: "cake", description: "Delicious", id: 4 },
  ]);

  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([
    { name: "Pizza", description: "Delicious", id: 6 },
    { name: "Pizza", description: "Delicious", id: 7 },
  ]);

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const [search, setSearch] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearch(event.target.value);
  }

  const filteredRecipes: Recipe[] = recipes.filter((recipe: Recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFavoriteRecipes: Recipe[] = favoriteRecipes.filter(
    (recipe: Recipe) => recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSaveRecipe(recipe: Recipe): void {
    // edit
  }

  function handleEditRecipe(recipe: Recipe): void {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  }

  function handleDeleteRecipe(recipe: Recipe): void {
    setRecipes(recipes.filter((r) => r.id !== recipe.id));
    setFavoriteRecipes(favoriteRecipes.filter((r) => r.id !== recipe.id));
  }

  function handleToggleFavorite(recipe: Recipe): void {
    const isFavorite = favoriteRecipes.some((r) => r.id === recipe.id);
    if (isFavorite) {
      setFavoriteRecipes(favoriteRecipes.filter((r) => r.id !== recipe.id));
      setRecipes([...recipes, recipe]);
    } else {
      setFavoriteRecipes([...favoriteRecipes, recipe]);
      setRecipes(recipes.filter((r) => r.id !== recipe.id));
    }
  }

  return (
    <div className="app-wrapper">
      <RecipeModal
        isOpen={isModalOpen}
        toggleModal={setIsModalOpen}
        recipe={selectedRecipe}
        onSave={handleSaveRecipe}
      />

      <div className="container">
        <h3>CookBook</h3>

        <div className="actions">
          <input type="text" onChange={handleSearch} />
          <button onClick={() => setIsModalOpen(true)}>Add Recipe</button>
        </div>

        <div className="recipes">
          <div className="recipe list">
            <RecipeList
              title="Favorites"
              recipes={filteredFavoriteRecipes}
              onDelete={handleDeleteRecipe}
              onFavorites={handleToggleFavorite}
              onEdit={handleEditRecipe}
            />
            <RecipeList
              title="All Recipes"
              recipes={filteredRecipes}
              onDelete={handleDeleteRecipe}
              onFavorites={handleToggleFavorite}
              onEdit={handleEditRecipe}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
