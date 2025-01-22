import React from 'react';
import LineItem from './LineItem';
import styled from 'styled-components';

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
`;

const Itemlist = ({ foodItems, deleteFood, editFood, editingId, setEditingId }) => {
  return (
    <StyledList>
      {Array.isArray(foodItems) && foodItems.length > 0 ? (
        foodItems.map((food) => (
          <LineItem
            key={food.id}
            food={food}
            deleteFood={deleteFood}
            editFood={(newName, newImageUrl, newPrice) =>
              editFood(food.id, newName, newImageUrl, newPrice)
            }
            isEditing={editingId === food.id}
            disableInteraction={!!editingId && editingId !== food.id}
            onEdit={() => setEditingId(food.id)}
            onCancelEdit={() => setEditingId(null)}
          />
        ))
      ) : (
        <p style={{ marginTop: '2rem', gridColumn: '1 / -1' }}>List is empty!</p>
      )}
    </StyledList>
  );
};

export default Itemlist;
