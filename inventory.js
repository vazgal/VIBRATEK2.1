const { supabase } = require("../lib/supabase");

module.exports = async (req, res) => {
  if (!supabase) return res.status(503).json({ error: "Supabase no configurado" });

  if (req.method === "GET") {
    const { data, error } = await supabase.from("inventory").select("*").order("sku", { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data || []);
  }

  if (req.method === "POST") {
    const newItem = req.body;
    const { data, error } = await supabase.from("inventory").insert(newItem).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ message: "Refacción agregada", data });
  }

  return res.status(405).json({ error: "Method not allowed" });
};
