exports.apiCheck = (req, res) => {
  try {
    res.send("ok");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
