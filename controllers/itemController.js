const prisma = require("../DB/dbconfig");

//Get all items
const getAllItems = async (req, res) => {
  try {
    console.log("Fetching all items");
    const items = await prisma.item.findMany();
    res
      .status(200)
      .json({ items, status: true, msg: "Items found successfully" });
  } catch (err) {
    console.log("Error fetching items:", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// GET a single item
const getItemById = async (req, res) => {
  // Implementation for fetching item by ID
  try {
    const itemId = req.params.id;
    console.log("Fetching item by ID:", itemId);
    const item = await prisma.item.findUnique({ where: { id: parseInt(id) } });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    console.error("Error fetching item:", err);
    res.status(500).json({ message: err.message });
  }
};

// POST a new item
const createItem = async (req, res) => {
  // Implementation for creating a new item
  try {
    const { name, description, startingPrice, endTime } = req.body;
    console.log("Creating new item:", {
      name,
      description,
      startingPrice,
      endTime,
    });
    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        startingPrice,
        currentPrice: startingPrice,
        endTime,
        userId: req.user.id,
      },
    });
    return res.json({ status: 200, data: newItem, msg: "Item created." });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(400).json({ error: error.message });
  }
};

// PUT update a item
const updateItem = async (req, res) => {
  // Implementation for updating a item
  try {
    const itemId = req.params.id;
    const { name, description, startingPrice, endTime } = req.body;
    console.log("Updating item:", {
      itemId,
      name,
      description,
      startingPrice,
      endTime,
    });

    const updatedItem = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { name, description, startingPrice, endTime },
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({
      status: 200,
      msg: "Item updated successfully",
    });
  } catch (err) {
    console.log("Error updating item:", err); // Log the error to the console
    res.status(400).json({ message: err.message });
  }
};

//delete item
const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    console.log("Deleting item by ID:", itemId);
    const deletedItem = await prisma.item.delete({
      where: {
        id: Number(itemId),
      },
    });
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ status: 200, msg: "Item deleted successfully" });
  } catch (error) {
    console.log("Error deleting item:", err); // Log the error to the console
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
