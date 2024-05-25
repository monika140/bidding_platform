const prisma = require("../DB/dbconfig");
const getNotifications = async (req, res) => {
  try {
    console.log("Fetching notifications for user:", req.user.id);
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
    });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(400).json({ error: error.message });
  }
};

const markRead = async (req, res) => {
  try {
    const { ids } = req.body;
    console.log("Marking notifications as read:", ids);
    await prisma.notification.updateMany({
      where: { id: { in: ids } },
      data: { isRead: true },
    });
    res.status(200).send();
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(400).json({ error: error.message });
  }
};
module.exports = { getNotifications, markRead };
