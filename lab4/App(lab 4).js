import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState(null);

  // Generate unique ID
  const generateId = () =>
    Date.now().toString(36) + Math.random().toString(36).substr(2);

  // ➕ CREATE (Add Item)
  const addItem = (name) => {
    const newItem = {
      id: generateId(),
      name,
      completed: false,
    };
    setItems([...items, newItem]);
  };

  // ❌ DELETE
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // ✔️ TOGGLE COMPLETE
  const toggleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // ✏️ UPDATE NAME
  const updateItem = (newName) => {
    setItems(
      items.map((item) =>
        item.id === editId ? { ...item, name: newName } : item
      )
    );
    setEditId(null);
  };

  // Handle submit (Add + Edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.trim()) return;

    if (editId) {
      updateItem(value);
    } else {
      addItem(value);
    }

    setValue("");
  };

  // Load edit value into input
  useEffect(() => {
    if (editId) {
      const item = items.find((i) => i.id === editId);
      if (item) setValue(item.name);
    }
  }, [editId, items]);

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Grocery Bud</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. eggs"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">
          {editId ? "Edit" : "Add"}
        </button>
      </form>

      {/* LIST */}
      <div style={{ marginTop: "20px" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {/* CHECKBOX */}
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(item.id)}
            />

            {/* NAME */}
            <span
              style={{
                flex: 1,
                textDecoration: item.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {item.name}
            </span>

            {/* EDIT */}
            <button onClick={() => setEditId(item.id)}>
              Edit
            </button>

            {/* DELETE */}
            <button onClick={() => removeItem(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;