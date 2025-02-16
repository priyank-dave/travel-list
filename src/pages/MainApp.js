// MainApp.js
import { useState, useEffect, useContext, useCallback } from "react";
import Form from "../components/Form";
import PackingList from "../components/PackingList";
import Stats from "../components/Stats";
import { AuthContext } from "../context/AuthContext";
import { getItems } from "../data/api";

export default function MainApp() {
  const { token } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTravelItems = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await getItems(token);
      setItems(response.data ?? []);
    } catch (error) {
      console.error("Error fetching travel items:", error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const addItem = useCallback((newItem) => {
    setItems((currentItems) => [...currentItems, newItem]);
  }, []);

  const updateItem = useCallback((id, updates) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  useEffect(() => {
    if (token) {
      fetchTravelItems();
    }
  }, [token, fetchTravelItems]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Form onAddItem={addItem} />
      <PackingList
        items={items}
        onDeleteItem={removeItem}
        onUpdateItem={updateItem}
        onRefreshList={fetchTravelItems}
      />
      <Stats items={items} />
    </div>
  );
}
