const prisma = require("../DB/dbconfig");

//Get - retrieve all bids for a specific item
const getBidsByItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    console.log("Fetching bids for item:", itemId);
    const bids = await prisma.bid.findMany({
      where: { itemId: parseInt(itemId) },
    });
    res.json(bids);
  } catch (error) {
    console.error("Error fetching bids:", error);
    res.status(400).json({ error: error.message });
  }
};

//POST Place a new bid on specific item
const placeBid = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { bidAmount } = req.body;
    console.log("Placing bid:", { itemId, bidAmount });
    const item = await prisma.item.findUnique({
      where: { id: parseInt(itemId) },
    });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (item.currentPrice >= bidAmount) {
      return res
        .status(400)
        .json({ error: "Bid must be higher than current price" });
    }
    const bid = await prisma.bid.create({
      data: { bidAmount, itemId: parseInt(itemId), userId: req.user.id },
    });
    await prisma.item.update({
      where: { id: parseInt(itemId) },
      data: { currentPrice: bidAmount },
    });
    res.status(201).json(bid);
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(400).json({ error: error.message });
  }
};
module.export = { getBidsByItem, placeBid };
