const { supabase } = require("../lib/supabase");

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (!supabase) return res.status(503).json({ error: "Supabase no configurado" });

  const { data, error } = await supabase.from("assets").select("data");
  if (error) return res.status(500).json({ error: error.message });

  const assets = (data || []).map((row) => row.data);
  res.status(200).json(assets);
};
