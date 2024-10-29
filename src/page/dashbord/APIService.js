// APIService.js

export default class APIService {
    static InsertRecipe(values) {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('instructions', values.instructions);
      formData.append('description', values.description);
      if (values.image) {
        formData.append('image', values.image);
      }
    // Handling ingredients as an array and appending each ingredient id
    formData.append('ingredients', JSON.stringify(values.ingredients));

      return fetch('http://127.0.0.1:5000/recipes', {
        method: 'POST',
        body: formData
      })
        .then(resp => resp.json());
    }
    static UpdateRecipe(recipe_id, values) {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('instructions', values.instructions);
      formData.append('description', values.description);
      if (values.image) {
        formData.append('image', values.image);
      }
  
      return fetch(`http://127.0.0.1:5000/recipes/${recipe_id}`, {
        method: 'PUT',
        body: formData
      })
        .then(resp => resp.json());
    }

    static Insertingredient(values) {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('category', values.category);

      return fetch('http://127.0.0.1:5000/ingredients', {
        method: 'POST',
        body: formData
      })
        .then(resp => resp.json());
    }
  }
