import { useEffect, useState } from "react";
import { Recipe } from "../../types/Recipe";
import "./RecipeModal.css";

type Props = {
  toggleModal: (open: boolean) => void;
  isOpen: boolean;
  recipe: Recipe | null;
  onSave: (recipe: Recipe) => void;
};

export default function RecipeModal({
  toggleModal,
  isOpen,
  recipe,
  onSave,
}: Props) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  function handleSave(): void {
    const r: Recipe = {
      id: recipe ? recipe.id : Math.random(),
      name: title,
      description: description,
    };
    onSave(r);
    toggleModal(false);
    setDescription("");
    setTitle("");
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setDescription(event.target.value);
  }

  useEffect(() => {
    setTitle(recipe?.name || "");
    setDescription(recipe?.description || "");
  }, [recipe]);

  function handleClose(): void {
    toggleModal(false);
    setDescription("");
    setTitle("");
  }

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{recipe ? "Edit Recipe" : "Add Recipe"}</h3>
              <span onClick={handleClose}>X</span>
            </div>
            <div className="modal-form">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
              />
              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>

              <div className="action-buttons">
                <button onClick={handleClose}>Cancel</button>
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
